import MapView from './MapView';
import ProgressContextProvider from './ProgressContext';

function App() {
	return (
		<div className="App">
			<ProgressContextProvider>
				<MapView />
			</ProgressContextProvider>
		</div>
	);
}

export default App;
