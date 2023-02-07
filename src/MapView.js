import { useEffect, useState, useRef } from 'react';
import Map, { Source, Layer } from 'react-map-gl';

// mapboxgl.accessToken = process.env.REACT_APP_PUBLIC_MAPBOX_TOKEN;

const geojson = {
	type: 'Feature',
	geometry: {
		type: 'LineString',
		coordinates: [
			[-122.483696, 37.833818],
			[-122.483482, 37.833174],
			[-122.483396, 37.8327],
			[-122.483568, 37.832056],
			[-122.48404, 37.831141],
			[-122.48404, 37.830497],
			[-122.483482, 37.82992],
			[-122.483568, 37.829548],
			[-122.48507, 37.829446],
			[-122.4861, 37.828802],
			[-122.486958, 37.82931],
			[-122.487001, 37.830802],
			[-122.487516, 37.831683],
			[-122.488031, 37.832158],
			[-122.488889, 37.832971],
			[-122.489876, 37.832632],
			[-122.490434, 37.832937],
			[-122.49125, 37.832429],
			[-122.491636, 37.832564],
			[-122.492237, 37.833378],
			[-122.493782, 37.833683]
		]
	}
};

const parkLayer = {
	id: 'route',
	type: 'line',
	source: 'route',
	layout: {
		'line-join': 'round',
		'line-cap': 'round'
	},
	paint: {
		'line-color': '#fff',
		'line-width': 8
	}
};

const MapView = () => {
	const [viewState, setViewState] = useState({
		longitude: -100,
		latitude: 40,
		zoom: 3.5
	});

	return (
		<div id="map">
			<Map
				mapboxAccessToken={process.env.REACT_APP_PUBLIC_MAPBOX_TOKEN}
				{...viewState}
				onMove={(evt) => setViewState(evt.viewState)}
				mapStyle="mapbox://styles/mapbox/dark-v11"
			>
				<Source id="my-data" type="geojson" data={geojson}>
					<Layer {...parkLayer} />
				</Source>
			</Map>
		</div>
	);
};
export default MapView;
