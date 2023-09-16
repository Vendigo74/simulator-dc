import { Select } from 'antd';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { carToStand, changeCarStand } from '../../feature/stands/carsAndStandsSlice';

const { Option } = Select;

function SelectStand({ car }) {
	const dispatch = useAppDispatch();

	const { stands } = useAppSelector(state => state.stands);

	function handleChange(value) {

		dispatch(carToStand({ standForSell: value, car }));
		dispatch(changeCarStand({ standCar: value, idResult: car.idResult }));
	}

	return (
		<>
			<Select defaultValue={car?.standCar} style={{ width: 150 }} onChange={handleChange}>
				{stands.map(el => {
					if (el.playerValue > 0) {
						if (el.playerValue > el.cars.length) {
							return (
								<Option key={el.stand} value={el.stand}>
									{el.stand}
								</Option>
							);
						}
					}
				})}
			</Select>
		</>
	);
}

export default SelectStand;
