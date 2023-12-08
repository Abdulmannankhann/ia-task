import React, { useEffect, useState } from 'react'
import CommonLineChart from '../components/liveCharts/CommonLineChart';
import { Container, Spinner, Card, Button, Col, Row } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import SystemLogs from '../components/SystemLogs';

const Assignment2 = () => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isActionRequired, setIsActionRequired] = useState([]);
	const [showSystemLogs, setShowSystemLogs] = useState(false);
	const [loading, setLoading] = useState(true);
	const [filteredIsActionRequired, setFilteredIsActionRequired] = useState([]);
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
		  setLoading(false)
		};
	
		socket.onmessage = (event) => {
		  const receivedData = JSON.parse(event.data);
		  const id = uuidv4();
		  const timestamp = new Date().toISOString();
		  const format = ( key, value ) => ({
			index: currentIndex + 1,
			[key]: value,
			timestamp:timestamp,
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
				systemDetails:[...prevData.systemDetails, {...receivedData,id:id,timestamp:timestamp}]
			}
		  });
		  setCurrentIndex((prevIndex) => prevIndex + 1);
		  setIsActionRequired((pre)=>([...pre,{...receivedData,id:id,timestamp:timestamp}]))
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
		axios.get("https://webfrontendassignment-isaraerospace.azurewebsites.net/api/ActOnSpectrum")
		.then((res)=>{
			const actionTaken = filteredIsActionRequired?.filter((v)=>(v?.id !== row?.id)).sort((a,b)=>{return new Date(a.timestamp) - new Date(b.timestamp)});
			setIsActionRequired(actionTaken)
		}).catch((err)=>{
			//console.log(err)
		})
	  }

	  const columns = [
		{
			name: 'Event Time',
			selector: row => row.timestamp,
			format: function (cell) {
			return (
				<div className='text-danger'> 
					{moment(cell.timestamp).format('D MMM YY, HH:mm:ss')}
				</div>
			);
		},
		},
		{
			name: 'Is Ascending',
			selector: row => row.IsAscending,
			format: function (cell) {
			return (
				<div className='text-danger'> 
					{cell.IsAscending ?"True" : "False"}
				</div>
			);
		},
		},
		{
			name: 'Status Message',
			selector: row => row.StatusMessage,
			format: function (cell) {
				return (
					<div className='text-danger' data-toggle="tooltip" title={cell.StatusMessage}> 
						{cell.StatusMessage}
					</div>
				);
			},
			wrap:true
		},
		{
			name: 'Action Required',
			selector: row => row.IsActionRequired,
			format: function (cell) {
				return (
					<div className='text-danger'> 
						{cell.IsActionRequired ?"True" : "False"}
					</div>
				);
			},			
		},
		{
			name:"Action",
			cell: (row) => <Button variant="outline-danger" size='sm' onClick={()=>{handleAction(row)}}>Action</Button>
		}
	  ]

	//  console.log(spectrumLiveData?.currentData)

	  useEffect(()=>{
		const filterActionMsgs = isActionRequired?.filter((data)=>{
			if(data?.IsActionRequired) return data
		}).sort((a,b)=>{
			return new Date(a.timestamp) - new Date(b.timestamp)
		})
		setFilteredIsActionRequired(filterActionMsgs)
	  },[isActionRequired])

	  if(loading){
		return (
			<div className='loader-container d-flex justify-content-center'>
			<Spinner animation="grow" variant="dark" />
			<Spinner animation="grow" variant="dark" />
			<Spinner animation="grow" variant="dark" />
			</div>
		)
	  }

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
			<Col lg={4} md={12} sm={12} xs={12} className='p-0 mt-5 mt-lg-0'>
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
			<Col lg={4} md={12} sm={12} xs={12} className='p-0 mt-5 mt-lg-0'>
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

			<Col lg={12} md={12} sm={12} xs={12} style={{ marginTop:"100px",marginBottom:"10px" }}>
			<Card>
			<Card.Header className="d-flex justify-content-between align-items-center">Spectrum Details
			<div>
				<Button variant="outline-dark" size='sm' onClick={()=>setShowSystemLogs(true)}>Check All System Logs</Button>
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
					data={filteredIsActionRequired} 
					pagination 
					paginationPerPage={3}
					paginationRowsPerPageOptions={[3, 10, 20, 40]}
					noDataComponent="There are no Actions required!"
					/>
				</Card.Body>
			</Card>
			</Col>
		</Row>
		</Container>
		<SystemLogs show={showSystemLogs} setShow={setShowSystemLogs} data={spectrumLiveData?.systemDetails}/>
	</div>
  )
}

export default Assignment2