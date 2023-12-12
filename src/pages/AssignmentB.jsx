import React, { useEffect, useState } from "react";
import CommonLineChart from "../components/liveCharts/CommonLineChart";
import { Container, Card, Button, Col, Row } from "react-bootstrap";
import DataTable from "react-data-table-component";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import SystemLogs from "../components/logs/SystemLogs";
import Loader from "../components/loader/Loader";
import { initialSpectrumLiveData } from "../utils/initialState";
import { ToastContainer, toast } from "react-toastify";
import { SPECTRUM_WS_ENDPOINT, ACT_ON_SPECTRUM_ENDPOINT } from "api/apiConfig";
import { ActonSpectrumColumn } from "../components/table/tableColumns";

const AssignmentB = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isActionRequired, setIsActionRequired] = useState([]);
  const [showSystemLogs, setShowSystemLogs] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filteredIsActionRequired, setFilteredIsActionRequired] = useState([]);
  const [spectrumLiveData, setSpectrumLiveData] = useState(initialSpectrumLiveData);

  useEffect(() => {
    const socket = new WebSocket(SPECTRUM_WS_ENDPOINT);

    socket.onopen = () => {
      console.log("WebSocket connection opened");
      setLoading(false);
    };

    socket.onmessage = (event) => {
      const receivedData = JSON.parse(event.data);
      const id = uuidv4();
      const timestamp = new Date().toISOString();
      const format = (key, value) => ({
        index: currentIndex + 1,
        [key]: value,
        timestamp: timestamp,
      });

      setSpectrumLiveData((prevData) => {
        return {
          altitude: [...prevData?.altitude, format("value", receivedData?.Altitude)],
          temperature: [...prevData?.temperature, format("value", receivedData?.Temperature)],
          velocity: [...prevData?.velocity, format("value", receivedData?.Velocity)],
          statusMessage: [...prevData?.statusMessage, format("statusMessage", receivedData?.StatusMessage)],
          isActionRequired: [...prevData?.isActionRequired, format("isActionRequired", receivedData?.IsActionRequired)],
          isAscending: [...prevData?.isAscending, format("isAscending", receivedData?.IsAscending)],
          currentData: receivedData,
          systemDetails: [...prevData.systemDetails, { ...receivedData, id: id, timestamp: timestamp }],
        };
      });
      setCurrentIndex((prevIndex) => prevIndex + 1);
      setIsActionRequired((pre) => [...pre, { ...receivedData, id: id, timestamp: timestamp }]);
    };

    socket.onclose = (event) => {
      console.log("WebSocket connection closed:", event);
      toast.info(`WebSocket connection closed`, {
        position: toast.POSITION.TOP_CENTER,
      });
    };

    return () => {
      if (socket.readyState === WebSocket.OPEN || socket.readyState === WebSocket.CONNECTING) {
        socket.close();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAction = (row) => {
    try {
      axios
        .get(ACT_ON_SPECTRUM_ENDPOINT)
        .then((res) => {
          const actionTaken = filteredIsActionRequired
            ?.filter((v) => v?.id !== row?.id)
            .sort((a, b) => {
              return new Date(a.timestamp) - new Date(b.timestamp);
            });
          setIsActionRequired(actionTaken);
        })
        .catch((err) => {
          toast.error(`${err.message}`, {
            position: toast.POSITION.TOP_CENTER,
          });
        });
    } catch (err) {
      toast.error(`${err.message}`, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  const tableColumns = ActonSpectrumColumn(handleAction);

  useEffect(() => {
    const filterActionMsgs = isActionRequired
      // eslint-disable-next-line array-callback-return
      ?.filter((data) => {
        if (data?.IsActionRequired) return data;
      })
      .sort((a, b) => {
        return new Date(a.timestamp) - new Date(b.timestamp);
      });
    setFilteredIsActionRequired(filterActionMsgs);
  }, [isActionRequired]);

  if (loading) {
    return (
      <div className="loader-container">
        <Loader />
      </div>
    );
  }

  return (
    <div className="isar-container">
      <Container fluid>
        <Row className="mb-4">
          <Col lg={4} md={12} sm={12} xs={12} className="p-0">
            <CommonLineChart name="Altitude" data={spectrumLiveData?.altitude} currentData={spectrumLiveData?.currentData?.Altitude} currentIndex={currentIndex} buffer={2500} steps={1000} units="km" />
          </Col>
          <Col lg={4} md={12} sm={12} xs={12} className="p-0 mt-5 mt-lg-0">
            <CommonLineChart name="Temperature" data={spectrumLiveData?.temperature} currentData={spectrumLiveData?.currentData?.Temperature} currentIndex={currentIndex} buffer={250} steps={50} units="°C" />
          </Col>
          <Col lg={4} md={12} sm={12} xs={12} className="p-0 mt-5 mt-lg-0">
            <CommonLineChart name="Velocity" data={spectrumLiveData?.velocity} currentData={spectrumLiveData?.currentData?.Velocity} currentIndex={currentIndex} buffer={2000} steps={500} units="m/s" />
          </Col>
        </Row>
        <Row className="mb-4 mt-2">
          <Col lg={12} md={12} sm={12} xs={12} style={{ marginTop: "120px", marginBottom: "10px" }}>
            <Card>
              <Card.Header className="d-flex justify-content-between align-items-center">
                Spectrum Details
                <div>
                  <Button variant="outline-dark" size="sm" onClick={() => setShowSystemLogs(true)}>
                    Check All System Logs
                  </Button>
                </div>
              </Card.Header>
              <Card.Body>
                <Card.Text>
                  <div>
                    <strong>Current Status:</strong>
                  </div>
                  <div>
                    Status Message: <strong>{spectrumLiveData?.currentData?.StatusMessage}</strong>
                  </div>
                  <div>
                    Is Ascending: <strong>{spectrumLiveData?.currentData?.IsAscending ? "True" : "False"}</strong>
                  </div>
                  <div>
                    Is Action Required Message: <strong>{spectrumLiveData?.currentData?.IsActionRequired ? "True" : "False"}</strong>
                  </div>
                </Card.Text>
                <DataTable columns={tableColumns} data={filteredIsActionRequired} pagination paginationPerPage={3} paginationRowsPerPageOptions={[3, 10, 20, 40]} noDataComponent="There are no Actions required!" />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <SystemLogs show={showSystemLogs} setShow={setShowSystemLogs} data={spectrumLiveData?.systemDetails} />
      <ToastContainer />
    </div>
  );
};

export default AssignmentB;
