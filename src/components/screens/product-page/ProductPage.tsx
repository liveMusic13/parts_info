import { FC } from 'react';

import { useSearchProducts } from '../../../hooks/logics/useSearchProducts';
import { useGetDetailInfo } from '../../../hooks/requests/useGetDetailInfo';
import { useGetSuppliers } from '../../../hooks/requests/useGetSuppliers';
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
	const { isLoading, refetch, isError, error } = useGetSuppliers(valueSearch);

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
			{isError && <div>Ошибка получения данных: {error?.message}</div>}
			<CardProduct />
			{isSuccess_detail && data_detail && (
				<OtherInfo data_detail={data_detail as IFullInfo} />
			)}
		</Layout>
	);
};

export default ProductPage;
