import React, { useEffect, useState } from 'react'
import CommonLineChart from '../components/liveCharts/CommonLineChart';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Container } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import axios from 'axios';

const Assignment2 = () => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isActionRequired, setIsActionRequired] = useState([]);
	const [spectrumLiveData, setSpectrumLiveData] = useState({
		altitude:[],
		temperature:[],
		velocity:[],
		statusMessage:[],
		isActionRequired:[],
		isAscending:[],
		systemDetails:[],
		currentData:{}
	  });

	  useEffect(() => {
		const socketUrl = 'wss://webfrontendassignment-isaraerospace.azurewebsites.net/api/SpectrumWS';
		const socket = new WebSocket(socketUrl);
	
		socket.onopen = () => {
		  console.log('WebSocket connection opened');
		};
	
		socket.onmessage = (event) => {
		  const receivedData = JSON.parse(event.data);
		  const format = ( key, value ) => ({
			index: currentIndex + 1,
			[key]: value,
			timestamp: new Date().toISOString(),
		  })
	
		  setSpectrumLiveData((prevData) => {
			return {
				altitude:[...prevData?.altitude, format("value", receivedData?.Altitude)],
				temperature:[...prevData?.temperature, format("value", receivedData?.Temperature)],
				velocity:[...prevData?.velocity, format("value", receivedData?.Velocity)],
				statusMessage:[...prevData?.statusMessage, format("statusMessage", receivedData?.StatusMessage)],
				isActionRequired:[...prevData?.isActionRequired, format("isActionRequired", receivedData?.IsActionRequired)],
				isAscending:[...prevData?.isAscending, format("isAscending", receivedData?.IsAscending)],
				currentData:receivedData,
				systemDetails:[...prevData.systemDetails, receivedData]
			}
		  });
		  setCurrentIndex((prevIndex) => prevIndex + 1);
		};
	
		socket.onclose = (event) => {
		  console.log('WebSocket connection closed:', event);
		};
	
		return () => {
		  if (socket.readyState === WebSocket.OPEN || socket.readyState === WebSocket.CONNECTING) {
			socket.close();
		  }
		};
	  }, []);

	  const handleAction = (row) => {
		console.log(row)
		axios.get("https://webfrontendassignment-isaraerospace.azurewebsites.net/api/ActOnSpectrum")
		.then((res)=>{
			console.log(res)
		})
	  }

	  const columns = [
		{
			name: 'Is Ascending',
			selector: row => row.IsAscending,
			format: function (cell) {
			return (
				<div> 
					{cell.IsAscending ?"True" : "False"}
				</div>
			);
		},
		},
		{
			name: 'Status Message',
			selector: row => row.StatusMessage,
		},
		{
			name: 'Action Required',
			selector: row => row.IsActionRequired,
			format: function (cell) {
				return (
					<div> 
						{cell.IsActionRequired ?"True" : "False"}
					</div>
				);
			},			
		},
		{
			name:"Action",
			cell: (row) => <Button variant="outline-dark" size='sm' onClick={()=>{handleAction(row)}}>Click to do Action</Button>
		}
	  ]

	//  console.log(spectrumLiveData?.currentData)

	  useEffect(()=>{
		const filterActionMsgs = spectrumLiveData?.systemDetails?.filter((data)=>{
			if(data?.IsActionRequired) return data
		})
		setIsActionRequired(filterActionMsgs)
	  },[spectrumLiveData])

  return (
	<div className='isar-container' >
		<Container fluid>
		<Row>
			<Col lg={4} md={12} sm={12} xs={12} className='p-0'>
				<CommonLineChart 
				name="Altitude" 
				data={spectrumLiveData?.altitude} 
				currentData={spectrumLiveData?.currentData?.Altitude} 
				currentIndex={currentIndex} 
				buffer={2500} 
				steps={1000} 
				units="km"
				/> 
			</Col>
			<Col lg={4} md={12} sm={12} xs={12} className='p-0'>
				<CommonLineChart 
				name="Temperature" 
				data={spectrumLiveData?.temperature} 
				currentData={spectrumLiveData?.currentData?.Temperature} 
				currentIndex={currentIndex} 
				buffer={250} 
				steps={50} 
				units="°C"
				/> 
			</Col>
			<Col lg={4} md={12} sm={12} xs={12} className='p-0'>
				<CommonLineChart 
				name="Velocity"  
				data={spectrumLiveData?.velocity} 
				currentData={spectrumLiveData?.currentData?.Velocity} 
				currentIndex={currentIndex} 
				buffer={2000} 
				steps={500} 
				units="m/s"
				/> 
			</Col>
		</Row>
		<Row>

			<Col lg={12} md={12} sm={12} xs={12} style={{ marginTop:"100px" }}>
			<Card>
			<Card.Header className="d-flex justify-content-between align-items-center">Spectrum Details
			<div>
				<Button variant="outline-dark" size='sm'>Check All System Logs</Button>
			</div>
			</Card.Header>
				<Card.Body>
					<Card.Text>
						<div><strong>Current Status:</strong></div>
						<div>Status Message: <strong>{spectrumLiveData?.currentData?.StatusMessage}</strong></div>
						<div>Is Ascending: <strong>{spectrumLiveData?.currentData?.IsAscending ? "True" : "False"}</strong></div>
						<div>Is Action Required Message: <strong>{spectrumLiveData?.currentData?.IsActionRequired ? "True" : "False"}</strong></div>
					</Card.Text>
					<DataTable 
					columns={columns} 
					data={isActionRequired} 
					pagination 
					paginationPerPage={3}
					noDataComponent="There are no Actions required!"
					/>
				</Card.Body>
			</Card>
			</Col>
		</Row>
		</Container>
	</div>
  )
}

export default Assignment2