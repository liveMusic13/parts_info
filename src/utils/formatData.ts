import { ISubstitutes } from '../types/request.types';

import { truncateToFirstSpace } from './formatTexts';

export const formatSubstitutesDataToGroup = (data: ISubstitutes[]) => {
	if (data.length === 0) return {};

	//HELP: Получаем все ключи
	const keys = data.map(el =>
		truncateToFirstSpace(el.Modification.description),
	);

	//HELP: Проверяем, все ли ключи одинаковые
	const allKeysSame = keys.every(key => key === keys[0]);

	if (allKeysSame) {
		const commonKey = keys[0];
		//HELP: Создаем вложенную группу, если все ключи совпадают
		return {
			[commonKey]: data,
		};
	} else {
		//HELP: Группировка по ключам
		return data.reduce(
			(acc, el) => {
				const key = truncateToFirstSpace(el.Modification.description);
				if (!acc[key]) acc[key] = [];
				acc[key].push(el);
				return acc;
			},
			{} as { [key: string]: ISubstitutes[] },
		);
	}
};
