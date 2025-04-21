import { FC, memo } from 'react';

import { IInfoProps } from '../../../types/props.types';

const Info: FC<IInfoProps> = memo(({ title, value, classNameText }) => {
	const valueResult =
		typeof value === 'boolean' ? (value ? 'Да' : 'Нет') : value;

	return (
		<div className='flex items-center justify-between w-full'>
			<h4 className='text-[rgba(0,0,0,0.5)]'>{title}</h4>
			<p className={`font-bold text-end ${classNameText}`}>{valueResult}</p>
		</div>
	);
});

export default Info;
