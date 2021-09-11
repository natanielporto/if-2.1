export const minMax = (list) => {
	if (!list.length) {
		throw new Error('List cannot be empty');
	}

	const buildMaxAndMin = ([min, max], val) => [
		Math.min(min, val),
		Math.max(max, val),
	];
	const maxAndMinIntegers = [Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER];

	return list.reduce(buildMaxAndMin, maxAndMinIntegers);
};
