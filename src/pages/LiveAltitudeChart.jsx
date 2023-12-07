import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import * as XLSX from 'xlsx';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExport } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';

const LiveAltitudeChart = () => {
  const getInitialVisiblePoints = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 1200) {
      return 20; // Large screens
    } else if (screenWidth >= 768) {
      return 10; // Medium screens
    } else {
      return 3; // Small screens (e.g., mobile)
    }
  };
  const [initialVisiblePoints, setInitialVisiblePoints] = useState(getInitialVisiblePoints());
  const maxYAxisValue = -25000;
  const [data, setData] = useState({
	altitude:[],
	temperature:[],
	velocity:[],
	statusMessage:[],
	isActionRequired:[],
	isAscending:[],
	currentAltitude:null
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  console.log(data)

  useEffect(() => {
    const handleResize = () => {
      setInitialVisiblePoints(getInitialVisiblePoints());
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(
      data.altitude.map((point) => ({
        'Sample time': moment(point.timestamp).format('D MMMM YYYY, h:mm:ss A [and] s [seconds]'),
        'Spectrum Altitude value': point.altitude.toFixed(2),
      }))
    );
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'AltitudeData');
    XLSX.writeFile(wb, 'AltitudeData.xlsx');
  };
  
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

	  setData((prevData) => {
		return {
			altitude:[...prevData?.altitude, format("altitude", receivedData?.Altitude)],
			temperature:[...prevData?.temperature, format("temperature", receivedData?.Temperature)],
			velocity:[...prevData?.velocity, format("velocity", receivedData?.Velocity)],
			statusMessage:[...prevData?.statusMessage, format("statusMessage", receivedData?.StatusMessage)],
			isActionRequired:[...prevData?.isActionRequired, format("isActionRequired", receivedData?.IsActionRequired)],
			isAscending:[...prevData?.isAscending, format("isAscending", receivedData?.IsAscending)],
			currentAltitude:receivedData?.Altitude
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

  return (
    <div className='isar-container'>
		<div style={{ display: 'flex', justifyContent:"end"}}>
        <Button size='sm' variant="outline-dark" onClick={exportToExcel}>Export Altitude Logs
		<FontAwesomeIcon icon={faFileExport} style={{marginLeft:"5px"}}/>
		</Button>
      </div>
	  <div style={{ width: '49%', height: '30vh', margin: '20px' }}>
      <h6>Real-time Spectrum Altitude</h6>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data?.altitude?.slice(Math.max(0, currentIndex - initialVisiblePoints), currentIndex + 1)}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
		  dataKey="timestamp"
		  label={{ value: `• Live (Recent ${initialVisiblePoints} Samples)`, position: 'insideRight', offset: 15, dy: 15,fill:'red', fontWeight: 'bold' }} 
		  tickFormatter={(timestamp) => {
			return moment(timestamp).format('HH:mm:ss')
		  }}
		  />
          <YAxis
            interval={0}
            domain={[maxYAxisValue, 0]}
            ticks={[-40000, -30000, -20000,  -10000, 0]}
            label={{ value: 'Altitude (km)', angle: -90, position: 'insideLeft', offset: -10 }}
          />
          <Tooltip
            content={({ payload }) => {
              if (payload && payload.length > 0) {
                const altitude = payload[0].payload.altitude;
                const timestamp = moment(payload[0].payload.timestamp).format('D MMM YY, HH:mm:ss');

                return (
                  <div style={{ backgroundColor: '#fff', padding: '5px', border: '1px solid #ccc' }}>
                    <div>Value: <strong>{altitude?.toFixed(2)} km</strong></div>
                    <div>Sample time: <strong>{timestamp}</strong></div>
                  </div>
                );
              }

              return null;
            }}
          />
          <Legend />
          <Line type="monotone" dataKey="altitude" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
	  {data.currentAltitude && (
        <div className='d-flex justify-content-center' id='currentAltitude'>
          Current Altitude: <strong>&nbsp;{data?.currentAltitude.toFixed(2)} km</strong>
        </div>
      )}
	  </div>
    </div>
  );
};

export default LiveAltitudeChart;
