import React, {FC, useEffect, useState} from 'react';
import {ITimer} from "../../types/timer";
import "../../styles/blocks/timer.scss";

interface TimerProps {
	seconds: number;
}

const Timer: FC<TimerProps> = ({seconds}) => {
	const [timer, setTimerState] = useState<ITimer | null>(null);
	const [secondsLeft, setSecondsLeft] = useState<number>(0)

	useEffect(() => {
		if (timer === null) {
			setSecondsLeft(seconds);
			setTimer(secondsLeft);
		}
		const runTimerIntervalId = setInterval(countDown, 1000);
		return () => {
			clearInterval(runTimerIntervalId);
		}
	})

	const setTimer = (seconds: number) => {
		const updatedTimer = secondsToTime(seconds);
		setTimerState({hours:updatedTimer.h, minutes: updatedTimer.m, seconds: updatedTimer.s});
	}

	const secondsToTime = (secs: number) => {
		const hours = Math.floor(secs / (60 * 60));

		const divisorForMinutes = secs % (60 * 60);
		const minutes = Math.floor(divisorForMinutes / 60);

		const divisorForSeconds = divisorForMinutes % 60;
		const seconds = Math.ceil(divisorForSeconds);

		return {
			h: hours,
			m: minutes,
			s: seconds,
		}
	}

	const countDown = () => {
		if (timer === null || secondsLeft < 0) return;
		setSecondsLeft(secondsLeft - 1);
		setTimer(secondsLeft);
	}

	return (
		<div className="timer">
			<span>{timer?.hours.toString().length === 1 ? `0` + timer?.hours : timer?.hours}</span>
			<span>{timer?.minutes.toString().length === 1 ? `0` + timer?.minutes : timer?.minutes}</span>
			<span>{timer?.seconds.toString().length === 1 ? `0` + timer?.seconds : timer?.seconds}</span>
		</div>
	);
};

export default Timer;
