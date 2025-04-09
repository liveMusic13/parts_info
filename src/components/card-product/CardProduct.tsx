import { FC, useEffect } from 'react';

import { useEtPart } from '../../hooks/requests/useEtPart';
import { useGetDetailInfo } from '../../hooks/requests/useGetDetailInfo';
import { useNameForDetailInfoStore, useSearchStore } from '../../store/store';
import { IEtPartResponse, IFullInfo } from '../../types/request.types';
import Button from '../ui/button/Button';
import Loader from '../ui/loader/Loader';

import Info from './info/Info';
import SliderImage from './slider-image/SliderImage';

const CardProduct: FC = () => {
	const valueSearch = useSearchStore(store => store.valueSearch);
	const nameDetailInfo = useNameForDetailInfoStore(
		store => store.nameDetailInfo,
	);

	const {
		data,
		isLoading,
		isSuccess,
		isError,
		error,
		refetch: refetch_detailInfo,
	} = useGetDetailInfo(valueSearch, nameDetailInfo);

	const articleCode = (data as IFullInfo)?.article_schema?.FoundString || '';
	const supplierId = (data as IFullInfo)?.supplier_from_jc.id;

	const {
		refetch,
		isSuccess: isSuccess_etPart,
		isLoading: isLoading_etPart,
		data: data_etPart,
		isError: isError_etPart,
		error: error_etPart,
	} = useEtPart(articleCode, supplierId);

	const handleClick = () => refetch();

	useEffect(() => {
		if (nameDetailInfo) refetch_detailInfo();
	}, [nameDetailInfo]);

	return (
		<div className='mt-5 w-full p-7.5 bg-[var(--white)] rounded-xl shadow-[0px_0px_10px_rgba(0,0,0,0.08)] flex gap-10'>
			{isLoading && <Loader />}
			{isError && <div>Ошибка получения данных: {error?.message}</div>}
			{isSuccess && (
				<>
					<SliderImage
						arrImage={[
							...(data as IFullInfo).img_urls,
							...(data as IFullInfo).img_urls,
							...(data as IFullInfo).img_urls,
						]}
					/>
					<div className='w-[41%]'>
						<Info
							title='Нормализованный артикул:'
							value={(data as IFullInfo)?.normalized_article || ''}
						/>
						<Info
							title='Поставщик JC:'
							value={(data as IFullInfo)?.supplier_from_jc?.name || ''}
						/>
						<Info
							title='Поставщик TD:'
							value={(data as IFullInfo)?.supplier_from_td?.description || ''}
						/>
						<Info
							title='Ean'
							value={(data as IFullInfo)?.article_ean?.ean || ''}
						/>
						<Button className='rounded-[0.428rem] my-2.5' onClick={handleClick}>
							Дополнительно
						</Button>
						{isError_etPart && (
							<div>Ошибка получения данных: {error_etPart?.message}</div>
						)}
						{isLoading_etPart && <Loader />}

						{isSuccess_etPart &&
							!isError_etPart &&
							(data_etPart as IEtPartResponse[]) &&
							(data_etPart as IEtPartResponse[])[0] && (
								<>
									<Info
										title='Код детали: '
										value={(data_etPart as IEtPartResponse[])[0].code}
									/>
									<Info
										title='Литературный код детали: '
										value={(data_etPart as IEtPartResponse[])[0].longcode}
									/>
									<Info
										title='Вес детали: '
										value={(data_etPart as IEtPartResponse[])[0].weight}
									/>
									<Info
										title='Объем детали: '
										value={(data_etPart as IEtPartResponse[])[0].V}
									/>
									<Info
										title='Флаг неизменности (кода) детали: '
										value={(data_etPart as IEtPartResponse[])[0].nochangeflag}
									/>
									<Info
										title='Флаг старой детали: '
										value={(data_etPart as IEtPartResponse[])[0].old}
									/>
									<Info
										title='Флаг удаленности детали: '
										value={(data_etPart as IEtPartResponse[])[0].deleted}
									/>
									<Info
										title='Флаг разрешенности детали: '
										value={(data_etPart as IEtPartResponse[])[0].accepted}
									/>
								</>
							)}
					</div>
				</>
			)}
		</div>
	);
};

export default CardProduct;
