import { FC } from 'react';
import { Link } from 'react-router-dom';

import { useNameForDetailInfoStore } from '../../store/store';
import { ISuppliersProps } from '../../types/props.types';
import { IJs, ITd } from '../../types/request.types';

const Suppliers: FC<ISuppliersProps> = ({ data, title }) => {
	const setNameDetailInfo = useNameForDetailInfoStore(
		store => store.setNameDetailInfo,
	);

	const handleClick = (el: IJs | ITd) => {
		if (el) {
			const stringName =
				'description' in el
					? el.description
					: 'marketPrefix' in el
						? el.name
						: 'Неизвестно';
			setNameDetailInfo(stringName);
		}
	};

	return (
		<div>
			<h3 className='font-medium mb-2 '>{title}</h3>
			<ul className='flex flex-col gap-3.5'>
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
						const spanOne_two = 'description' in el ? el?.description_two : '';
						const spanTwo =
							'description' in el
								? el.description || 'Нету данных'
								: 'marketPrefix' in el
									? el.name || 'Нету данных'
									: 'Неизвестно';
						const color =
							'description' in el ? 'text-blue-500' : 'text-[var(--red)]';

						return (
							<li key={el.id} onClick={() => handleClick(el)}>
								<Link
									to={link}
									className='flex gap-3 w-full rounded-[0.428rem] py-2.5 px-3.5 shadow-[0px_0px_4px_rgba(0,0,0,0.4)] transition-[box-shadow_0.3s_ease,font-size_0.3s_ease] hover:text-[1.1rem] hover:cursor-pointer hover:shadow-[0px_0px_7px_rgba(0,0,0,0.6)]'
								>
									<img
										src={el.img || '/images/no_image.jpg'}
										alt='preview'
										className='w-32 h-32 rounded-[0.428rem]'
									/>
									<div className='flex flex-col gap-2'>
										<p className='flex items-center gap-1.5 font-bold text-[1.2rem]'>
											<span className={`${color}`}>{spanOne}</span>
											{spanOne_two && (
												<>
													/
													<span className={`text-[var(--red)]`}>
														{spanOne_two}
													</span>
												</>
											)}
											<span className='text-[0.7rem] opacity-20'>
												{' '}
												({el.id})
											</span>
										</p>
										<span>{spanTwo}</span>
									</div>
								</Link>
							</li>
						);
					})}
			</ul>
		</div>
	);
};

export default Suppliers;
