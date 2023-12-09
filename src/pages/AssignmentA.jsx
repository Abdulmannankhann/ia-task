import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Row, Spinner, Col, Card, Container } from "react-bootstrap";
import { LineChart } from "@mui/x-charts/LineChart";
import moment from "moment/moment";
import Loader from "../components/loader/Loader";

const AssignmentA = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      setLoading(true);
      axios
        .get("https://webfrontendassignment-isaraerospace.azurewebsites.net/api/SpectrumStatus")
        .then((res) => {
          if (data.length < 5) {
            setData((prev) => [...prev, { ...res?.data, time: new Date().toISOString() }]);
          } else if (data.length >= 5) {
            const newData = [...data];
            newData.pop();
            newData.unshift({ ...res?.data, time: new Date().toISOString() });
            setData(newData);
          }
          setLoading(false);
        })
        .catch((err) => {
          //  console.log(err);
          setLoading(false);
        });
    } catch (error) {
      //  console.error("Error fetching data:", error);
    } finally {
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="isar-container">
      <div className="d-flex justify-content-center">
        <Button variant="outline-dark" onClick={fetchData} className="m-3" disabled={loading}>
          {!loading && <i class="bi bi-arrow-clockwise update-data-icon"></i>}
          {loading && <Spinner animation="border" role="status" size="sm" className="update-data-icon"></Spinner>}
          Update Spectrum Data
        </Button>
      </div>
      {data?.length === 0 && <Loader />}
      {data?.length > 0 && (
        <Container>
          <Row className="mb-2">
            <Col md={6} lg={4} className="mb-2">
              <Card>
                <Card.Body>
                  <Card.Title className="">Altitude: {data.length > 0 ? data[data.length - 1]?.altitude.toFixed(2) + " km" : ""}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
                  <LineChart
                    colors={["#8884d8"]}
                    series={[
                      {
                        data: data?.map((item) => item.altitude.toFixed(2)).reverse(),
                      },
                    ]}
                    xAxis={[
                      {
                        scaleType: "point",
                        data: data?.map((item) => `${moment(item.time).format("DD-MMM-YY")}\n${moment(item.time).format("HH:mm:ss")}`),
                      },
                    ]}
                    height={200}
                  />
                  <div className="text-end m-2 mt-0 mb-0">
                    <strong style={{ fontSize: "25px" }}>•</strong> Recent 5 values
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={4} className="mb-2">
              <Card>
                <Card.Body>
                  <Card.Title className="">Temperature: {data.length > 0 ? data[data.length - 1]?.temperature.toFixed(2) + " °C" : ""}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
                  <LineChart
                    colors={["#8884d8"]}
                    series={[
                      {
                        data: data?.map((item) => item.temperature.toFixed(2)).reverse(),
                      },
                    ]}
                    xAxis={[
                      {
                        scaleType: "point",
                        data: data?.map((item) => `${moment(item.time).format("DD-MMM-YY")}\n${moment(item.time).format("HH:mm:ss")}`),
                      },
                    ]}
                    height={200}
                  />
                  <div className="text-end m-2 mt-0 mb-0">
                    <strong style={{ fontSize: "25px" }}>•</strong> Recent 5 values
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={4}>
              <Card>
                <Card.Body>
                  <Card.Title className="">Velocity: {data.length > 0 ? data[data.length - 1]?.velocity.toFixed(2) + " m/s" : ""}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
                  <LineChart
                    colors={["#8884d8"]}
                    series={[
                      {
                        data: data?.map((item) => item.velocity.toFixed(2)).reverse(),
                      },
                    ]}
                    xAxis={[
                      {
                        scaleType: "point",
                        data: data?.map((item) => `${moment(item.time).format("DD-MMM-YY")}\n${moment(item.time).format("HH:mm:ss")}`),
                      },
                    ]}
                    height={200}
                  />
                  <div className="text-end m-2 mt-0 mb-0">
                    <strong style={{ fontSize: "25px" }}>•</strong> Recent 5 values
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row className="mb-4">
            <Col lg={12}>
              <Card>
                <Card.Body>
                  <Card.Title className="">Spectrum Status</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    Status Message: <strong>{data.length > 0 ? data[data.length - 1]?.statusMessage : ""}</strong>
                  </Card.Subtitle>
                  <Card.Subtitle className="mb-2 text-muted">
                    Is Ascending: <strong>{data.length > 0 ? (data[data.length - 1]?.isAscending ? "True" : "False") : ""}</strong>
                  </Card.Subtitle>
                  <Card.Subtitle className="mb-2 text-muted">
                    Is Action Required: <strong>{data.length > 0 ? (data[data.length - 1]?.isActionRequired ? "True" : "False") : ""}</strong>
                  </Card.Subtitle>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
};

export default AssignmentA;
