import { Source, Layer } from 'react-map-gl';
import { route } from './RouteData';

const RouteLayer = () => {
	const routeLayer = {
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

	return (
		<Source id="route" type="geojson" data={route}>
			<Layer {...routeLayer} />
		</Source>
	);
};

export default RouteLayer;
