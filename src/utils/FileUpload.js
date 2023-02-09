import { useContext, useEffect } from 'react';
import { DataContext } from '../contexts/DataContext';

const FileUpload = () => {
	const { coordinates, initData, setRouteData } = useContext(DataContext);

	const csvToArray = (str, delimiter = ',') => {
		const rows = str.split('\n');

		const arr = rows.map((row) =>
			row.split(delimiter).map((value, index) => (index === 0 ? value : +value))
		);

		return arr;
	};

	const handleFileChange = (e) => {
		if (e.target.files.length) {
			const inputFile = e.target.files[0];

			const reader = new FileReader();

			reader.onload = (event) => {
				const text = event.target.result;
				const data = csvToArray(text);
				initData(data);
			};

			reader.readAsText(inputFile);
		}
	};

	useEffect(() => {
		setRouteData();
	}, [coordinates]);

	return (
		<div>
			<input type="file" id="csvFile" accept=".csv" onChange={handleFileChange} />
		</div>
	);
};

export default FileUpload;
