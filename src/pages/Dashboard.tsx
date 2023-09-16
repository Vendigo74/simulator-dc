import React from 'react';
import GameDescription from '../components/game-description/game-description';
import MyDC from '../components/mydc/mydc';
import GameStatus from '../components/game-status/game-status';
import Bill from '../components/bill/bill';

const Home = () => (
	<>
		<MyDC />
		<GameStatus />
		<Bill />
		<GameDescription />
	</>
);

export default React.memo(Home);
