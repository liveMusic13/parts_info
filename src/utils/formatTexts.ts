export const truncateToFirstSpace = (input: string): string => {
	const spaceIndex = input.indexOf(' ');
	return spaceIndex !== -1 ? input.slice(0, spaceIndex) : input;
};
