import DataContextProvider from './contexts/DataContext';
import MapView from './components/MapView';
import ProgressContextProvider from './contexts/ProgressContext';

function App() {
	return (
		<div className="App">
			<DataContextProvider>
				<ProgressContextProvider>
					<MapView />
				</ProgressContextProvider>
			</DataContextProvider>
		</div>
	);
}

export default App;
