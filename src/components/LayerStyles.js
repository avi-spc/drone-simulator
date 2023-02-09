export const baseRouteLayer = {
	type: 'line',
	layout: {
		'line-join': 'round',
		'line-cap': 'round'
	},
	paint: {
		'line-color': '#d9d9d9',
		'line-width': 6
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

export const checkPointsLayer = {
	type: 'circle',
	paint: {
		'circle-radius': 6,
		'circle-color': '#6cb6ff', //6cb6ff
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
		'line-color': '#5a5a5e',
		'line-width': 4
	}
};

export const droneMarker = {
	id: 'points',
	type: 'symbol',
	source: 'points',
	layout: {
		'icon-image': 'harbor-15',
		// get the title name from the source's "title" property
		// 'text-field': ['get', 'title'],
		// 'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
		// 'text-offset': [0, 1.25],
		// 'text-anchor': 'top'
	}
};
