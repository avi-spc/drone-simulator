import { useEffect, useState, useRef, useContext } from 'react';
import { Source, Layer } from 'react-map-gl';
import { route } from './RouteData';
import { length, along } from '@turf/turf';
import { ProgressContext } from './ProgressContext';

const lineDistance = length(route.features[0]);

const arc = [];

const steps = 2000;

for (let i = 0; i < lineDistance; i += lineDistance / steps) {
	console.log(i);
	const segment = along(route.features[0], i);
	arc.push(segment.geometry.coordinates);
}

route.features[0].geometry.coordinates = arc;
// console.log(lineDistance);

let counter = 0;

const DroneLayer = ({ seekLocation }) => {
	const [currentLocation, setCurrentLocation] = useState([-122.414, 37.776]);
	// const animationRef = useRef(true);
	const { isPlaying, animationRef } = useContext(ProgressContext);
	const point = {
		type: 'FeatureCollection',
		features: [
			{
				type: 'Feature',
				properties: {},
				geometry: {
					type: 'Point',
					coordinates: currentLocation
					// coordinates: route.features[0].geometry.coordinates[seekLocation]
				}
			}
		]
	};

	const droneLayer = {
		type: 'circle',
		paint: {
			'circle-radius': 10,
			'circle-color': '#ff0000',
			'circle-opacity': 1
		}
	};

	const animate = () => {
		const start =
			route.features[0].geometry.coordinates[counter >= steps ? counter - 1 : counter];
		const end =
			route.features[0].geometry.coordinates[counter >= steps ? counter : counter + 1];

		if (!start || !end) return;

		setCurrentLocation(route.features[0].geometry.coordinates[counter]);

		if (counter < steps && isPlaying) {
			console.log(counter, isPlaying);
			animationRef.current = requestAnimationFrame(animate);
		}

		counter = counter + 1;
	};

	useEffect(() => {
		animationRef.current = requestAnimationFrame(animate);
		return () => {
			cancelAnimationFrame(animationRef.current);
		};
	}, [isPlaying]);

	return (
		<Source id="drone" type="geojson" data={point}>
			<Layer {...droneLayer} />
		</Source>
	);
};

export default DroneLayer;
