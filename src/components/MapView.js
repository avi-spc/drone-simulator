import { useState, useContext, Fragment, useRef, useEffect } from 'react';
import Map from 'react-map-gl';

import DroneLayer from './DroneLayer';
import FileUpload from '../utils/FileUpload';

import { ProgressContext } from '../contexts/ProgressContext';
import { DataContext } from '../contexts/DataContext';
import ManualUpload from '../utils/ManualUpload';

const MapView = () => {
	const { route, checkPoints, totalTime } = useContext(DataContext);
	const [viewState, setViewState] = useState({ longitude: -122.414, latitude: 37.776, zoom: 6 });
	const { isPlaying, play, pause, progress, setSeekLocation, animationRef } =
		useContext(ProgressContext);

	return (
		<div className="app-container">
			<div className="map">
				<Map
					mapboxAccessToken={process.env.REACT_APP_PUBLIC_MAPBOX_TOKEN}
					{...viewState}
					onMove={(evt) => setViewState(evt.viewState)}
					mapStyle="mapbox://styles/mapbox/dark-v11"
				>
					{route && (
						<Fragment>
							<DroneLayer
								route={route}
								checkPoints={checkPoints}
								totalRouteTime={totalTime}
							/>
						</Fragment>
					)}
				</Map>
			</div>
			{route && (
				<Fragment>
					<input
						type="range"
						min={0}
						max={route.features[0].geometry.coordinates.length - 1}
						step={2}
						value={progress}
						onChange={(e) => setSeekLocation(Number(e.target.value))}
						onMouseDown={() => {
							pause();
							clearInterval(animationRef.current);
						}}
					/>
				</Fragment>
			)}
			<div className="action-group">
				<div className="upload-actions">
					<FileUpload />
					<ManualUpload />
				</div>
				{route && (
					<Fragment>
						{isPlaying ? (
							<button className="btn" onClick={pause}>
								Pause
							</button>
						) : (
							<button className="btn" onClick={play}>
								Play
							</button>
						)}
					</Fragment>
				)}
			</div>
		</div>
	);
};
export default MapView;
