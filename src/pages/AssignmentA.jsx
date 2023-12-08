import React, { useEffect, useState } from 'react';
import 'chartjs-plugin-datalabels';
import axios from 'axios';
import { Bar, Radar } from 'react-chartjs-2';
import { Button, Spinner } from 'react-bootstrap';
import { velocityData, velocityOptions } from '../components/charts/VelocityChartConfig';
import { altitudeData, altitudeOptions } from '../components/charts/AltitudeChartConfig';
import { temperatureData, temperatureOptions } from '../components/charts/TemperatureChartConfig';
import { chartContainerStyle, chartStyle, valueStyle } from "../components/charts/CommonChartStyles"

const AssignmentA = () => {
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState({
		velocity: 0,
		altitude: 0,
		temperature: 0,
		statusMessage: '',
		isAscending: false,
		isActionRequired: false,
	  });

  const fetchData = async () => {
    try {
      setLoading(true);
      axios.get("https://webfrontendassignment-isaraerospace.azurewebsites.net/api/SpectrumStatus")
	  .then((res)=>{
		setData(res?.data)
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
  

  return (
    <div className='isar-container'>
		<div className='d-flex justify-content-center'>
		<Button variant="outline-dark" onClick={fetchData} className='m-3' >
		{!loading && <i className="bi bi-hand-index-thumb update-data-icon"></i>}
		{loading && <Spinner animation='border' role='status' size='sm' className='update-data-icon'></Spinner>}
        Update Satellite Data
      </Button>
		</div>

      <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
        <div style={{ ...chartContainerStyle, ...chartStyle }}>
          <h2>Velocity</h2>
          <Bar data={velocityData(data)} options={velocityOptions}/>
          <div style={{ ...valueStyle }}>{data.velocity.toFixed(2)} m/s</div>
        </div>
        <div style={{ ...chartContainerStyle, ...chartStyle }}>
          <h2>Altitude</h2>
		  <Radar data={altitudeData(data)} options={altitudeOptions}/>
          <div style={{ ...valueStyle }}>{data.altitude.toFixed(2)} km</div>
        </div>
        <div style={{ ...chartContainerStyle, ...chartStyle, height:"200px" }}>
          <h2>Temperature</h2>
		  <Bar data={temperatureData(data)} options={temperatureOptions}/>
          <div style={{ ...valueStyle, bottom: '-100px' }}>{data.temperature.toFixed(2)}°C</div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentA;
