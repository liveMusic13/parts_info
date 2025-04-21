import { FC, useEffect, useState } from 'react';

import { useEtPart } from '../../hooks/requests/useEtPart';
import { useGetDetailInfo } from '../../hooks/requests/useGetDetailInfo';
import { useGetSuppliers } from '../../hooks/requests/useGetSuppliers';
import { usePrPart } from '../../hooks/requests/usePrPart';
import { useVolnaPartsDetail } from '../../hooks/requests/useVolnaPartsDetail';
import { useNameForDetailInfoStore, useSearchStore } from '../../store/store';
import { IFullInfo } from '../../types/request.types';
import Button from '../ui/button/Button';
import Loader from '../ui/loader/Loader';

import AdditionalInfo from './additional-info/AdditionalInfo';
import Info from './info/Info';
import SliderImage from './slider-image/SliderImage';

const CardProduct: FC = () => {
	const [viewDescription, setViewDescription] = useState<boolean>(false);
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
	const { data: data_supliers } = useGetSuppliers(valueSearch);
	const {
		data: data_prPart,
		isError: isError_prPart,
		isLoading: isLoading_prPart,
		isSuccess: isSuccess_prPart,
		error: error_prPart,
	} = usePrPart(valueSearch);

	const {
		data: data_partsDetail,
		isError: isError_partsDetail,
		isLoading: isLoading_partsDetail,
		isSuccess: isSuccess_partsDetail,
		error: error_partsDetail,
	} = useVolnaPartsDetail(
		valueSearch,
		data_supliers?.suppliersFromTd[0].id || null,
	);

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
		if (isSuccess_etPart) setViewDescription(true);
	}, [isSuccess_etPart]);

	useEffect(() => {
		if (nameDetailInfo) refetch_detailInfo();
	}, [nameDetailInfo]);

	return (
		<div className='mt-5 w-4/5 p-7.5 bg-[var(--white)] rounded-xl shadow-[0px_0px_10px_rgba(0,0,0,0.08)] flex justify-between gap-10'>
			{(isLoading || isLoading_partsDetail || isLoading_prPart) && <Loader />}
			{(isError || isError_partsDetail || isError_prPart) && (
				<div>
					Ошибка получения данных:{' '}
					{error?.message ||
						error_partsDetail?.message ||
						error_prPart?.message}
				</div>
			)}
			{isSuccess && isSuccess_partsDetail && isSuccess_prPart && (
				<>
					<SliderImage
						data={data as IFullInfo}
						data_partsDetail={data_partsDetail}
						data_prPart={data_prPart}
					/>
					<div className='grow-1'>
						<Info
							title='Нормализованный артикул:'
							value={(data as IFullInfo)?.normalized_article || ''}
						/>
						<Info
							title='Поставщик JC:'
							classNameText='text-[var(--red)]'
							value={(data as IFullInfo)?.supplier_from_jc?.name || ''}
						/>
						<Info
							title='Поставщик TD:'
							classNameText='text-blue-500'
							value={(data as IFullInfo)?.supplier_from_td?.description || ''}
						/>
						<Info
							title='Ean'
							value={(data as IFullInfo)?.article_ean?.ean || ''}
						/>

						{data_prPart && data_prPart[0] && (
							<>
								<Info
									title='Код вендора, с ресурса которого был спаршен продукт'
									value={data_prPart[0].Vendor_Code || ''}
								/>
								<Info title='Код OEM' value={data_prPart[0].OEM_Code || ''} />
								<Info
									title='Название категории'
									value={data_prPart[0].Vendor_Category_Name || ''}
								/>
							</>
						)}
						<Button
							className={`rounded-[0.428rem] my-2.5 ${viewDescription ? 'hidden' : ''}`}
							onClick={handleClick}
						>
							Дополнительно
						</Button>
						{isError_etPart && (
							<div>Ошибка получения данных: {error_etPart?.message}</div>
						)}
						{isLoading_etPart && <Loader />}
						{viewDescription &&
							isSuccess_etPart &&
							!isError_etPart &&
							data_etPart &&
							data_etPart[0] && (
								<>
									<Info title='Код детали: ' value={data_etPart[0].code} />
									<Info
										title='Литературный код детали: '
										value={data_etPart[0].longcode}
									/>
									<Info title='Вес детали: ' value={data_etPart[0].weight} />
									<Info title='Объем детали: ' value={data_etPart[0].V} />
									<Info
										title='Флаг неизменности (кода) детали: '
										value={data_etPart[0].nochangeflag}
									/>
									<Info
										title='Флаг старой детали: '
										value={data_etPart[0].old}
									/>
									<Info
										title='Флаг удаленности детали: '
										value={data_etPart[0].deleted}
									/>
									<Info
										title='Флаг разрешенности детали: '
										value={data_etPart[0].accepted}
									/>
								</>
							)}
						{isSuccess_partsDetail && (
							<Info
								title='Название: '
								value={data_partsDetail[0]?.name || 'Нету данных'}
							/>
						)}
					</div>
					{isSuccess && isSuccess_partsDetail && (
						<AdditionalInfo
							id={data?.supplier_from_td?.id}
							image={data_partsDetail[0]?.manufacturer_image}
						/>
					)}
				</>
			)}
		</div>
	);
};

export default CardProduct;
