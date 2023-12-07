export const temperatureData = (data) => {
	return {
		labels: ['Temperature'],
		datasets: [
		  {
			label: 'Temperature',
			backgroundColor: data.temperature >= 0 ? 'rgba(255, 99, 132, 0.6)' : 'rgba(54, 162, 235, 0.6)',
		  borderColor: data.temperature >= 0 ? 'rgba(255, 99, 132, 1)' : 'rgba(54, 162, 235, 1)',
		  borderWidth: 1,
		  hoverBackgroundColor: data.temperature >= 0 ? 'rgba(255, 99, 132, 0.8)' : 'rgba(54, 162, 235, 0.8)',
		  hoverBorderColor: data.temperature >= 0 ? 'rgba(255, 99, 132, 1)' : 'rgba(54, 162, 235, 1)',
			data: [data?.temperature || data?.Temperature],
			barThickness: 20, // Adjust the bar thickness as needed
		  },
		],
	  }
};

export const temperatureOptions = {
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