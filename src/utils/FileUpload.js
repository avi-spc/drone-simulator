import { useContext, useEffect } from 'react';

import { DataContext } from '../contexts/DataContext';
import { ProgressContext } from '../contexts/ProgressContext';
import { csvToArray } from './CsvParser';

const FileUpload = () => {
	const { coordinates, initData, setRouteData } = useContext(DataContext);
	const { pause, setSeekLocation } = useContext(ProgressContext);

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

		pause();
		setSeekLocation(0);
	};

	useEffect(() => {
		setRouteData();
	}, [coordinates]);

	return (
		<div>
			<label htmlFor="csvFile" className="btn">
				Load
			</label>
			<input
				type="file"
				id="csvFile"
				accept=".csv"
				onChange={handleFileChange}
				className="hidden"
			/>
		</div>
	);
};

export default FileUpload;
