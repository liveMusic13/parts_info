import { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useGetDetailInfo } from '../../hooks/requests/useGetDetailInfo';
import { useNameForDetailInfoStore, useSearchStore } from '../../store/store';
import { ISuppliersProps } from '../../types/props.types';
import { IJs, ITd } from '../../types/request.types';

import styles from './Suppliers.module.scss';

const Suppliers: FC<ISuppliersProps> = ({ data, title }) => {
	const { nameDetailInfo, setNameDetailInfo } = useNameForDetailInfoStore(
		store => store,
	);
	const { valueSearch } = useSearchStore(store => store);

	const { refetch } = useGetDetailInfo(valueSearch, nameDetailInfo);

	const handleClick = (el: IJs | ITd) => {
		if (el) {
			const stringName =
				'description' in el
					? el.description
					: 'marketPrefix' in el
						? el.name
						: 'Неизвестно';
			console.log(stringName);
			setNameDetailInfo(stringName);
		}
	};

	useEffect(() => {
		if (nameDetailInfo) refetch();
	}, [nameDetailInfo]);

	return (
		<div className={styles.wrapper_suppliers}>
			<h3 className={styles.title}>{title}</h3>
			<ul className={styles.menu}>
				{data &&
					data?.map(el => {
						const link =
							'matchcode' in el
								? `/product/${el.matchcode}_${el.description}`
								: `/product/${el.marketPrefix}_${el.name}`;
						const spanOne =
							'matchcode' in el
								? el.matchcode || 'Нету данных'
								: 'marketPrefix' in el
									? el.marketPrefix || 'Нету данных'
									: 'Неизвестно';
						const spanTwo =
							'description' in el
								? el.description || 'Нету данных'
								: 'marketPrefix' in el
									? el.name || 'Нету данных'
									: 'Неизвестно';
						return (
							<li
								key={el.id}
								className={styles.list}
								onClick={() => handleClick(el)}
							>
								<Link to={link}>
									<span>{spanOne}</span>
									<span>{spanTwo}</span>
								</Link>
							</li>
						);
					})}
			</ul>
		</div>
	);
};

export default Suppliers;
