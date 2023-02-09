import { createContext, useRef, useState } from 'react';

export const ProgressContext = createContext();

const ProgressContextProvider = (props) => {
	const [progress, setProgress] = useState(0);

	const [isPlaying, setIsPlaying] = useState(false);
	const animationRef = useRef();

	const play = () => {
		setIsPlaying(true);
	};

	const pause = () => {
		clearInterval(animationRef.current);
		setIsPlaying(false);
	};

	const setSeekLocation = (index) => {
		setProgress(index);
	};

	const initProgress = () => {
		setProgress((prevProgress) => (prevProgress + 1) % 2000);
	};

	return (
		<ProgressContext.Provider
			value={{
				isPlaying,
				play,
				pause,
				animationRef,
				progress,
				setSeekLocation,
				initProgress
			}}
		>
			{props.children}
		</ProgressContext.Provider>
	);
};

export default ProgressContextProvider;
