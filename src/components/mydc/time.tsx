import React from 'react';
import { useAppSelector } from '../../app/hooks';

const padTime = time => {
	return String(time).length === 1 ? `0${time}` : `${time}`;
};

const format = time => {
	// Convert seconds into minutes and take the whole part
	const minutes = Math.floor(time / 60);

	// Get the seconds left after converting minutes
	const seconds = time % 60;

	return `${minutes}:${padTime(seconds)}`;
};

function Time() {
	const { time } = useAppSelector(state => state.client);

	return <div>{time === 0 ? 'Время вышло' : <div>До конца игры: {format(time)}</div>}</div>;
}

export default Time;
