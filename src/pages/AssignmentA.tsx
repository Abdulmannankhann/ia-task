import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Row, Spinner, Col, Container } from "react-bootstrap";
import Loader from "../components/loader/Loader";
import { SpectrumDatas, SpectrumStatusResponses } from "types/types";
import ChartCards from "components/cards/ChartCards";
import StatusCard from "components/cards/StatusCard";
import { ToastContainer, toast } from "react-toastify";

const AssignmentA: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<SpectrumDatas[]>([]);

  const fetchData = async () => {
    try {
      setLoading(true);
      axios
        .get<SpectrumStatusResponses>("https://webfrontendassignment-isaraerospace.azurewebsites.net/api/SpectrumStatus")
        .then((res) => {
          if (data.length < 5) {
            setData((prev) => [...prev, { ...res?.data, time: new Date().toISOString() }]);
          } else if (data.length >= 5) {
            const newData = [...data];
            newData.pop();
            newData.unshift({ ...res?.data, time: new Date().toISOString() });
            setData(newData);
          }
        })
        .catch((err) => {
          toast.error(`${err.message}`, {
            position: toast.POSITION.TOP_CENTER,
          });
        });
    } catch (error: any) {
      toast.error(`${error.message}`, {
        position: toast.POSITION.TOP_CENTER,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="isar-container">
      <div className="d-flex justify-content-center">
        <Button variant="outline-dark" onClick={fetchData} className="m-3" disabled={loading}>
          {!loading && <i className="bi bi-arrow-clockwise update-data-icon"></i>}
          {loading && <Spinner animation="border" role="status" size="sm" className="update-data-icon"></Spinner>}
          Update Spectrum Data
        </Button>
      </div>
      {data?.length === 0 && <Loader />}
      {data?.length > 0 && (
        <Container>
          <Row className="mb-2">
            <Col md={6} lg={4} className="mb-2">
              <ChartCards colors={["#8884d8"]} data={data} chartType="altitude" />
            </Col>
            <Col md={6} lg={4} className="mb-2">
              <ChartCards colors={["#8884d8"]} data={data} chartType="velocity" />
            </Col>
            <Col md={6} lg={4}>
              <ChartCards colors={["#8884d8"]} data={data} chartType="temperature" />
            </Col>
          </Row>
          <Row className="mb-4">
            <Col lg={12}>
              <StatusCard data={data} />
            </Col>
          </Row>
        </Container>
      )}
      <ToastContainer />
    </div>
  );
};

export default AssignmentA;
