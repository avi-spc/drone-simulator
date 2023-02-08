import { createContext, useRef, useState } from 'react';

export const ProgressContext = createContext();

const ProgressContextProvider = (props) => {
	const [isPlaying, setIsPlaying] = useState(true);
	const animationRef = useRef();

	const play = () => {
		setIsPlaying(true);
	};

	const pause = () => {
		cancelAnimationFrame(animationRef.current);
		setIsPlaying(false);
	};

	return (
		<ProgressContext.Provider value={{ isPlaying, play, pause, animationRef }}>
			{props.children}
		</ProgressContext.Provider>
	);
};

export default ProgressContextProvider;
