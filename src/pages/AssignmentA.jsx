import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Row, Spinner, Col, Card, Container } from 'react-bootstrap';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';
import { LineChart } from '@mui/x-charts/LineChart';
import moment from 'moment/moment';



const AssignmentA = () => {
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      setLoading(true);
      axios.get("https://webfrontendassignment-isaraerospace.azurewebsites.net/api/SpectrumStatus")
	  .then((res)=>{
		if (data.length < 5) {
			console.log("if");
			setData((prev) => [...prev, {...res?.data,time:new Date().toISOString()}]);
		  } else if (data.length >= 5) {
			console.log("else");
			const newData = [...data];
			newData.pop();
			newData.unshift({...res?.data,time:new Date().toISOString()});
			setData(newData);
		  }
		setLoading(false);
	  })
	  .catch((err)=>{
		console.log(err)
		setLoading(false);
	  })

    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
    }
  };

  useEffect(() => {
	fetchData()
  }, [])
  console.log(data)
  return (
    <div className='isar-container'>
		<div className='d-flex justify-content-center'>
		<Button variant="outline-dark" onClick={fetchData} className='m-3' disabled={loading}>
		{!loading && <i className="bi bi-hand-index-thumb update-data-icon"></i>}
		{loading && <Spinner animation='border' role='status' size='sm' className='update-data-icon'></Spinner>}
        Update Spectrum Data
      </Button>
		</div>

		<Container>
			<Row>
		<Col sm={6} lg={4}>
		<Card >
		<Card.Body>
			<Card.Title className=''>Altitude: {data.length > 0 ? data[data.length - 1]?.altitude.toFixed(2) + " km": ""}</Card.Title>
			<Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
			<Box sx={{ flexGrow: 1 }}>
			<LineChart colors={["black"]}
			series={[
				{ data: data?.map(item => item.altitude.toFixed(2)).reverse() },
			]}
			xAxis={[{ scaleType: 'point', data: data?.map(item => `${moment(item.time).format('DD-MMM-YY')}\n${moment(item.time).format('HH:mm:ss')}`) }]}
			height={200} 
			/>
			</Box>
			<div className="text-end m-2 mt-0 mb-0">
					<strong style={{ fontSize: '25px' }}>•</strong> Recent 5 values
				</div>
		</Card.Body>
		</Card>
		</Col>
		</Row>
	  </Container>
    </div>
  );
};

export default AssignmentA;
