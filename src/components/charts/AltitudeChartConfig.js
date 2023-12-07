export const altitudeData = (data) => {
	return {
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
			data: [data?.altitude || data?.Altitude],
		  },
		],
	  }
};

export const altitudeOptions = {
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
			return `${label}: ${value?.toFixed(2)} km`;
		  },
		},
	  },
	},
  };