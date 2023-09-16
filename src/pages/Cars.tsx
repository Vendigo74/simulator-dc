import React from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import CarsUi from '../components/car/cars';
import Stand from '../components/car/stand';
import { fetchCars } from '../feature/stands/carsAndStandsSlice';
import Post from '../components/car/post';

const Cars = () => {
	return (
		<>
			<CarsUi />
			<Stand />
			<Post />
		</>
	);
};

export default React.memo(Cars);
