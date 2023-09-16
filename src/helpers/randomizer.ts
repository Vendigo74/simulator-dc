const arrayShuffle = function (array) {
	/*eslint-disable */
	for (let i = 0, length = array.length, swap = 0, temp = ''; i < length; i = i + 1) {
		swap = Math.floor(Math.random() * (i + 1));
		temp = array[swap];
		array[swap] = array[i];
		array[i] = temp;
	}
	return array;
};

export const percentageChance = function (values, chances) {
	let pool = [];
	for (let i = 0; i < chances.length; i = i + 1) {
		for (let i2 = 0; i2 < chances[i]; i2 = i2 + 1) {
			pool.push(i);
		}
	}

	return values[arrayShuffle(pool)['0']];
};
