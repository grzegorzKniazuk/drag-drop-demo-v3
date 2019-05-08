// https://stackoverflow.com/questions/14446511/most-efficient-method-to-groupby-on-a-array-of-objects

export const groupBy = (items, key) => items.reduce(
	(result, item) => ({
		...result,
		[item[key]]: [
			...(result[item[key]] || []),
			item,
		],
	}),
	[],
);
