import { FC, memo } from 'react';

import { IInfoProps } from '../../../types/props.types';

import styles from './Info.module.scss';

const Info: FC<IInfoProps> = memo(({ title, value }) => {
	const valueResult =
		typeof value === 'boolean' ? (value ? 'Да' : 'Нет') : value;

	return (
		<div className={styles.info}>
			<h4 className={styles.title}>{title}</h4>
			<p className={styles.value}>{valueResult}</p>
		</div>
	);
});

export default Info;
