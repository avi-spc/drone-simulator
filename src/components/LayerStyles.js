export const baseRouteLayer = {
	type: 'line',
	layout: {
		'line-join': 'round',
		'line-cap': 'round'
	},
	paint: {
		'line-color': '#fff',
		'line-width': 8
	}
};

export const droneLayer = {
	type: 'circle',
	paint: {
		'circle-radius': 10,
		'circle-color': '#ff0000',
		'circle-opacity': 1
	}
};

export const elapsedRouteLayer = {
	type: 'line',
	layout: {
		'line-join': 'round',
		'line-cap': 'round'
	},
	paint: {
		'line-color': '#ff0000',
		'line-width': 2
	}
};
