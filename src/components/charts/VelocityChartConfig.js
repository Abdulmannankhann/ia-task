export const velocityData = (data) => {
	return {
		labels: ['Velocity'],
		datasets: [
		  {
			label: 'Velocity',
			backgroundColor: 'rgba(75,192,192,0.4)',
			borderColor: 'rgba(75,192,192,1)',
			borderWidth: 1,
			hoverBackgroundColor: 'rgba(75,192,192,0.6)',
			hoverBorderColor: 'rgba(75,192,192,1)',
			data: [data?.velocity || data?.Velocity],
			barThickness: 20, // Adjust the bar thickness as needed
		  },
		],
	  }
}

export const velocityOptions = {
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