import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useVolnaParts } from '../../../../hooks/requests/useVolnaParts';
import {
	useNameForDetailInfoStore,
	useSearchStore,
} from '../../../../store/store';
import {
	IReplacement,
	IVolnaPartsResponse,
} from '../../../../types/request.types';
import Loader from '../../../ui/loader/Loader';

import CrossCode from './cross-code/CrossCode';

const Substitutes: FC = () => {
	const valueSearch = useSearchStore(store => store.valueSearch);
	const setNameDetailInfo = useNameForDetailInfoStore(
		store => store.setNameDetailInfo,
	);
	const [arrData, setArrData] = useState<IReplacement[] | null>();
	const [viewCodeTD, setViewCodeTD] = useState<boolean>(false);
	const [viewCodeJSS, setViewCodeJSS] = useState<boolean>(false);

	const { data, error, isError, isLoading, isSuccess } =
		useVolnaParts(valueSearch);

	useEffect(() => {
		if (isSuccess) {
			const allData = (data as IVolnaPartsResponse[]).flatMap(el => [
				...el.replacements,
			]);
			setArrData(allData);
		}
	}, [data, isSuccess]);

	const handleClick = (el: IReplacement) => {
		setNameDetailInfo(el.brand);
	};
	const handleViewCode = (
		value: boolean,
		setValue: Dispatch<SetStateAction<boolean>>,
	) => setValue(!value);

	return (
		<div className='mt-5'>
			{isLoading && <Loader />}
			{isError && <div>Ошибка получения данных: {error?.message}</div>}
			<ul className='flex flex-wrap gap-3.5 '>
				{arrData &&
					arrData.map((el, ind) => (
						<li key={ind} onClick={() => handleClick(el)}>
							<Link
								to={`/product/${el.brand}`}
								className='flex flex-col h-full w-80 rounded-[0.428rem] shadow-[0px_0px_4px_rgba(0,0,0,0.4)] transition-[box-shadow_0.3s_ease,font-size_0.3s_ease] hover:text-[1.1rem] hover:cursor-pointer hover:shadow-[0px_0px_7px_rgba(0,0,0,0.6)]'
							>
								{/* Контейнер для изображения */}
								<div className='flex-shrink-0'>
									<img
										src={el.image}
										alt='preview'
										className='w-full h-42 object-cover rounded-t-[0.428rem]'
									/>
								</div>

								{/* Контейнер для текста с отступами */}
								<div className='flex flex-col flex-1 justify-between pt-2.5'>
									<div className='px-3.5'>
										<p className='text-xl font-bold'>{el.brand}</p>
										<p>Артикул: {el.article}</p>
									</div>
									<p className='text-green-500 text-right mt-2 bg-gray-300 px-3.5 pb-2.5'>
										Цена: {el.price || '-'}
									</p>
								</div>
							</Link>
						</li>
					))}
			</ul>
			<div className='mt-10'>
				<div
					className='flex gap-1.5 items-center hover:cursor-pointer group'
					onClick={() => handleViewCode(viewCodeTD, setViewCodeTD)}
				>
					<img
						src='/images/icons/arrow.svg'
						alt='arrow'
						className='w-3 h-3 group-hover:w-3.5 group-hover:h-3.5 transition-all duration-300 ease-in-out'
					/>
					<p className='uppercase font-bold text-xl group-hover:text-2xl transition-all duration-300 ease-in-out'>
						Кросскоды из TecDoc
					</p>
				</div>
				{viewCodeTD && <CrossCode isTecDoc={true} />}
				<div
					className='flex gap-1.5 items-center hover:cursor-pointer group'
					onClick={() => handleViewCode(viewCodeJSS, setViewCodeJSS)}
				>
					<img
						src='/images/icons/arrow.svg'
						alt='arrow'
						className='w-3 h-3 group-hover:w-3.5 group-hover:h-3.5 transition-all duration-300 ease-in-out'
					/>
					<p className='uppercase font-bold text-xl group-hover:text-2xl transition-all duration-300 ease-in-out'>
						Кросскоды из JCCross
					</p>
				</div>
				{viewCodeJSS && <CrossCode isTecDoc={false} />}
			</div>
		</div>
	);
};

export default Substitutes;
