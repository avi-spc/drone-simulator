import { useEffect, useState, useRef, useContext } from 'react';
import Map, { Source, Layer } from 'react-map-gl';
import { route } from './RouteData';

import RouteLayer from './RouteLayer';
import DroneLayer from './DroneLayer';
import { ProgressContext } from './ProgressContext';

const MapView = () => {
	const [viewState, setViewState] = useState({ longitude: -122.414, latitude: 37.776, zoom: 6 });
	const { isPlaying, play, pause } = useContext(ProgressContext);
	const [seekLocation, setSeekLocation] = useState(0);

	console.log(seekLocation);

	return (
		<div id="map">
			<Map
				mapboxAccessToken={process.env.REACT_APP_PUBLIC_MAPBOX_TOKEN}
				{...viewState}
				onMove={(evt) => setViewState(evt.viewState)}
				mapStyle="mapbox://styles/mapbox/dark-v11"
			>
				<RouteLayer />
				<DroneLayer seekLocation={seekLocation} />
			</Map>
			{isPlaying ? (
				<button onClick={pause}>Pause</button>
			) : (
				<button onClick={play}>Play</button>
			)}
			<input
				type="range"
				min={0}
				max={route.features[0].geometry.coordinates.length - 1}
				step={2}
				value={seekLocation}
				onChange={(e) => setSeekLocation(e.target.value)}
			/>
		</div>
	);
};
export default MapView;
