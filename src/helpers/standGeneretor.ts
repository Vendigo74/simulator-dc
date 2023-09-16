import { randomInteger } from './randomInteger';
import { percentageChance } from './randomizer';

export const standGeneretor = stands => {
	const newStand = stands
		.map(el => {
			if (el.freeValue > 0) {
				return el.stand;
			}
		})
		.filter(el1 => el1);
  const result = newStand[randomInteger(0, newStand.length - 1)]
  console.log(result)
	return result;
};
