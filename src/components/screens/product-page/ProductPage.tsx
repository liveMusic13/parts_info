import { FC } from 'react';

import { useSearchProducts } from '../../../hooks/logics/useSearchProducts';
import { useGetDetailInfo } from '../../../hooks/requests/useGetDetailInfo';
import { useGetSuppliers } from '../../../hooks/requests/useGetSuppliers';
import { usePrPart } from '../../../hooks/requests/usePrPart';
import { useVolnaPartsDetail } from '../../../hooks/requests/useVolnaPartsDetail';
import {
	useNameForDetailInfoStore,
	useSearchStore,
} from '../../../store/store';
import { IFullInfo } from '../../../types/request.types';
import CardProduct from '../../card-product/CardProduct';
import OtherInfo from '../../card-product/other-info/OtherInfo';
import Layout from '../../layout/Layout';
import Input from '../../ui/input/Input';
import Loader from '../../ui/loader/Loader';

const ProductPage: FC = () => {
	const { handleChangeSearchValue, handleClickSearch } = useSearchProducts();
	const valueSearch = useSearchStore(store => store.valueSearch);

	const nameDetailInfo = useNameForDetailInfoStore(
		store => store.nameDetailInfo,
	);

	const { data: data_detail, isSuccess: isSuccess_detail } = useGetDetailInfo(
		valueSearch,
		nameDetailInfo,
	);
	const {
		data: data_prPart,
		isError: isError_prPart,
		isLoading: isLoading_prPart,
		isSuccess: isSuccess_prPart,
		error: error_prPart,
	} = usePrPart(valueSearch);
	const {
		isLoading,
		refetch,
		isError,
		error,
		data: data_supliers,
	} = useGetSuppliers(valueSearch);
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

	return (
		<Layout>
			<div>
				<Input
					placeholder='Введите запрос'
					isButton={true}
					value={valueSearch}
					onClickButton={() => handleClickSearch(refetch)}
					onChange={handleChangeSearchValue}
				/>
			</div>
			{isLoading && <Loader />}
			{/* {(isLoading || isLoading_partsDetail || isLoading_prPart) && <Loader />} */}
			{/* {(isError || isError_partsDetail || isError_prPart) && (
				<div>
					Ошибка получения данных:{' '}
					{error?.message ||
						error_partsDetail?.message ||
						error_prPart?.message}
				</div>
			)} */}
			{isError && (
				<div>
					Ошибка получения данных:{' '}
					{error?.message ||
						error_partsDetail?.message ||
						error_prPart?.message}
				</div>
			)}
			<CardProduct />
			{isSuccess_detail && isSuccess_partsDetail && isSuccess_prPart && (
				<OtherInfo
					data_detail={data_detail as IFullInfo}
					data_partsDetail={data_partsDetail}
					data_prPart={data_prPart}
				/>
			)}
		</Layout>
	);
};

export default ProductPage;
