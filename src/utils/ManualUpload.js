import { Fragment, useContext, useState } from 'react';
import { DataContext } from '../contexts/DataContext';
import { ProgressContext } from '../contexts/ProgressContext';
import { csvToArray } from './CsvParser';

const ManualUpload = () => {
	const { initData } = useContext(DataContext);
	const { pause, setSeekLocation } = useContext(ProgressContext);

	const [timeseries, setTimeseries] = useState('');
	const [popup, setPopup] = useState(false);

	const confirmData = (e) => {
		e.preventDefault();
		initData(csvToArray(timeseries));
		setPopup(false);
		
		pause();
		setSeekLocation(0);
	};

	const closePopup = (e) => {
		e.preventDefault();
		setPopup(false);
	};

	return (
		<Fragment>
			{popup && (
				<div className="form-container">
					<form className="timeseries-data-form">
						<label>Enter data</label>
						<textarea
							cols="30"
							rows="10"
							value={timeseries}
							onChange={(e) => setTimeseries(e.target.value)}
						/>
						<button className="btn" onClick={confirmData}>
							Confirm
						</button>
						<button className="btn" onClick={closePopup}>
							Cancel
						</button>
					</form>
				</div>
			)}
			<button className="btn" onClick={() => setPopup(true)}>
				Manual Data
			</button>
		</Fragment>
	);
};

export default ManualUpload;
