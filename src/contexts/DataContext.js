import { createContext, useRef, useState } from 'react';
import { length, along } from '@turf/turf';

export const DataContext = createContext();

const DataContextProvider = (props) => {
	const [data, setData] = useState([]);
	const [coordinates, setCoordinates] = useState([]);
	const [totalTime, setTotalTime] = useState(0);
	const [route, setRoute] = useState(null);

	const initData = (newData) => {
		setData(newData);
		setCoordinates(newData.map((dataEntry) => [dataEntry[1], dataEntry[2]]));
		setTotalTime(Number(newData[newData.length - 1][0].split(':')[2]));
	};

	const setRouteData = () => {
		if (data.length) {
			const routeFeature = {
				type: 'FeatureCollection',
				features: [
					{
						type: 'Feature',
						geometry: {
							type: 'LineString',
							coordinates
						}
					}
				]
			};

			const lineDistance = length(routeFeature.features[0]);
			const arc = [];
			const steps = 2000;

			for (let i = 0; i < lineDistance; i += lineDistance / steps) {
				const segment = along(routeFeature.features[0], i);
				arc.push(segment.geometry.coordinates);
			}

			routeFeature.features[0].geometry.coordinates = arc;
			setRoute(routeFeature);
		}
		// console.log(routeFeature.features[0].geometry.coordinates.length);
	};

	return (
		<DataContext.Provider value={{ totalTime, coordinates, route, initData, setRouteData }}>
			{props.children}
		</DataContext.Provider>
	);
};

export default DataContextProvider;
