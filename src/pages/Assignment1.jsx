import React, { useEffect, useState } from 'react';
import { Bar, Radar } from 'react-chartjs-2';
import 'chartjs-plugin-datalabels';
import { Button, Spinner } from 'react-bootstrap';
import axios from 'axios';

const Assignment1 = () => {
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState({
		velocity: 0,
		altitude: 0,
		temperature: 0,
		statusMessage: '',
		isAscending: false,
		isActionRequired: false,
	  });

  const chartStyle = {
    maxWidth: '400px',
    height: '300px',
    position: 'relative',
  }; // Adjust height as needed

  const chartContainerStyle = {
    marginBottom: '20px',
    position: 'relative', // Added to make sure absolute positioning inside is relative to this container
  };

  const valueStyle = {
    position: 'absolute',
    bottom: '0px', // Adjust as needed
    left: '50%',
    transform: 'translateX(-50%)',
	fontWeight:600
  };

  const pieChartStyle = {
    height: '200px', // Adjust the height of the Pie chart
  };

  // Velocity data
  const velocityData = {
    labels: ['Velocity'],
    datasets: [
      {
        label: 'Velocity',
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.6)',
        hoverBorderColor: 'rgba(75,192,192,1)',
        data: [data.velocity],
		barThickness: 20, // Adjust the bar thickness as needed
      },
    ],
  };

  const velocityOptions = {
	scales: {
	  x: {
		beginAtZero: true,
	  },
	  y: {
		ticks: {
		  stepSize: 5,
		  max: 100,
		  min: -100,
		},
	  },
	},
	plugins: {
	  tooltip: {
		callbacks: {
		  label: (context) => {
			const label = context.dataset.label || '';
			const value = context.parsed.y || 0;
			return `${label}: ${value.toFixed(2)} m/s`;
		  },
		},
	  },
	},
  };

  // Altitude data
  const altitudeData = {
	labels: ['Altitude'],
	datasets: [
	  {
		label: 'Altitude',
		backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: 'rgba(75,192,192,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(75,192,192,1)',
		data: [data.altitude],
	  },
	],
  };

  const altitudeOptions = {
	scales: {
	  r: {
		stepSize: 500,
	  },
	},
	plugins: {
	  tooltip: {
		callbacks: {
		  label: (context) => {
			const label = context.dataset.label || '';
			const value = context.parsed.r || 0;
			return `${label}: ${value.toFixed(2)} km`;
		  },
		},
	  },
	},
  };

  const temperatureData = {
	labels: ['Temperature'],
	datasets: [
	  {
		label: 'Temperature',
		backgroundColor: data.temperature >= 0 ? 'rgba(255, 99, 132, 0.6)' : 'rgba(54, 162, 235, 0.6)',
      borderColor: data.temperature >= 0 ? 'rgba(255, 99, 132, 1)' : 'rgba(54, 162, 235, 1)',
      borderWidth: 1,
      hoverBackgroundColor: data.temperature >= 0 ? 'rgba(255, 99, 132, 0.8)' : 'rgba(54, 162, 235, 0.8)',
      hoverBorderColor: data.temperature >= 0 ? 'rgba(255, 99, 132, 1)' : 'rgba(54, 162, 235, 1)',
		data: [data.temperature],
		barThickness: 20, // Adjust the bar thickness as needed
	  },
	],
  };

  const temperatureOptions = {
	scales: {
	  x: {
		beginAtZero: true,
	  },
	  y: {
		ticks: {
		  stepSize: 5,
		  max: 100,
		  min: -100,
		},
	  },
	},
	plugins: {
	  tooltip: {
		callbacks: {
		  label: (context) => {
			const label = context.dataset.label || '';
			const value = context.parsed.y || 0;
			return `${label}: ${value.toFixed(2)}°C`;
		  },
		},
	  },
	},
  };

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
          <Bar data={velocityData} options={velocityOptions}/>
          <div style={{ ...valueStyle }}>{data.velocity.toFixed(2)} m/s</div>
        </div>
        <div style={{ ...chartContainerStyle, ...chartStyle }}>
          <h2>Altitude</h2>
		  <Radar data={altitudeData} options={altitudeOptions}/>
          <div style={{ ...valueStyle }}>{data.altitude.toFixed(2)} km</div>
        </div>
        <div style={{ ...chartContainerStyle, ...chartStyle, ...pieChartStyle }}>
          <h2>Temperature</h2>
		  <Bar data={temperatureData} options={temperatureOptions}/>
          <div style={{ ...valueStyle, bottom: '-100px' }}>{data.temperature.toFixed(2)}°C</div>
        </div>
      </div>
    </div>
  );
};

export default Assignment1;
