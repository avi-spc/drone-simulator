import { useEffect, useState, useContext, Fragment } from 'react';
import { Source, Layer } from 'react-map-gl';

import { baseRouteLayer, droneLayer, elapsedRouteLayer } from './LayerStyles';
import { ProgressContext } from '../contexts/ProgressContext';

const DroneLayer = ({ route, totalRouteTime }) => {
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
		if (progress >= route.features[0].geometry.coordinates.length) {
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
			<Source id="drone" type="geojson" data={dronePosition}>
				<Layer {...droneLayer} />
			</Source>
			<Source id="cRroute" type="geojson" data={elapsedRoute}>
				<Layer {...elapsedRouteLayer} />
			</Source>
		</Fragment>
	);
};

export default DroneLayer;
