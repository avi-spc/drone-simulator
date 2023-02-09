import { useEffect, useState, useContext, Fragment } from 'react';
import { Source, Layer, Marker } from 'react-map-gl';

import { baseRouteLayer, checkPointsLayer, droneLayer, elapsedRouteLayer } from './LayerStyles';
import { ProgressContext } from '../contexts/ProgressContext';

const DroneLayer = ({ route, checkPoints, totalRouteTime }) => {
	const [currentLocation, setCurrentLocation] = useState(
		route.features[0].geometry.coordinates[0]
	);
	const { isPlaying, pause, animationRef, progress, initProgress } = useContext(ProgressContext);
	// const [completedRoute, setCompletedRoute] = useState([currentLocation]);
	const [elapsedTime, setElapsedTime] = useState(0);

	const [dronePosition, setDronePosition] = useState({
		type: 'FeatureCollection',
		features: [
			{
				type: 'Feature',
				properties: {},
				geometry: {
					type: 'Point',
					coordinates: []
				}
			}
		]
	});

	const [elapsedRoute, setElapsedRoute] = useState({
		type: 'FeatureCollection',
		features: [
			{
				type: 'Feature',
				geometry: {
					type: 'LineString',
					coordinates: []
				}
			}
		]
	});

	useEffect(() => {
		if (isPlaying) {
			animationRef.current = setInterval(() => {
				initProgress();
				setElapsedTime(
					(prevTime) =>
						prevTime + totalRouteTime / route.features[0].geometry.coordinates.length
				);
			}, (totalRouteTime / route.features[0].geometry.coordinates.length) * 1000);
		}

		return () => clearInterval(animationRef.current);
	}, [isPlaying, animationRef.current]);

	useEffect(() => {
		if (progress >= route.features[0].geometry.coordinates.length - 1) {
			pause();
		}
		setCurrentLocation(route.features[0].geometry.coordinates[progress]);
		setDronePosition({
			type: 'FeatureCollection',
			features: [
				{
					type: 'Feature',
					properties: {},
					geometry: {
						type: 'Point',
						coordinates: route.features[0].geometry.coordinates[progress]
					}
				}
			]
		});

		setElapsedRoute({
			type: 'FeatureCollection',
			features: [
				{
					type: 'Feature',
					geometry: {
						type: 'LineString',
						coordinates: route.features[0].geometry.coordinates.slice(0, progress)
					}
				}
			]
		});
		// setCompletedRoute(route.features[0].geometry.coordinates.slice(0, progress));
	}, [progress]);

	return (
		<Fragment>
			<Source id="route" type="geojson" data={route}>
				<Layer {...baseRouteLayer} />
			</Source>
			<Source id="cRroute" type="geojson" data={elapsedRoute}>
				<Layer {...elapsedRouteLayer} />
			</Source>
			<Source id="checkPoints" type="geojson" data={checkPoints}>
				<Layer {...checkPointsLayer} />
			</Source>
			{checkPoints.features.map((feature, index) => (
				<Marker
					key={Math.random()}
					longitude={feature.geometry.coordinates[0]}
					latitude={feature.geometry.coordinates[1]}
					anchor="center"
				>
					<img src="" />

					{index}
				</Marker>
			))}
			{/* <Source id="drone" type="geojson" data={dronePosition}>
				<Layer {...droneLayer} />
			</Source> */}
			{dronePosition.features[0].geometry.coordinates.length && (
				<Marker
					longitude={dronePosition.features[0].geometry.coordinates[0]}
					latitude={dronePosition.features[0].geometry.coordinates[1]}
					anchor="bottom"
				>
					<img src="/images/marker.png" />
				</Marker>
			)}
		</Fragment>
	);
};

export default DroneLayer;
