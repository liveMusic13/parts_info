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

import styles from './ProductPage.module.scss';

const ProductPage: FC = () => {
	const { handleChangeSearchValue, handleClickSearch } = useSearchProducts();
	const valueSearch = useSearchStore(store => store.valueSearch);

	const nameDetailInfo = useNameForDetailInfoStore(
		store => store.nameDetailInfo,
	);

	const {
		data: data_detail,
		isLoading: isLoading_detail,
		isError: isError_detail,
		error: error_detail,
		isSuccess: isSuccess_detail,
	} = useGetDetailInfo(valueSearch, nameDetailInfo);
	const { isLoading, refetch, isError, error } = useGetSuppliers(valueSearch);

	return (
		<Layout>
			<div className={styles.block__search}>
				<Input
					placeholder='Введите запрос'
					isButton={true}
					value={valueSearch}
					onClickButton={() => handleClickSearch(refetch)}
					onChange={handleChangeSearchValue}
				/>
			</div>
			{isLoading && isLoading_detail && <Loader />}
			{isError && isError_detail && (
				<div>
					Ошибка получения данных: {error?.message || error_detail?.message}
				</div>
			)}
			<CardProduct />
			{isSuccess_detail && data_detail && (
				<OtherInfo data_detail={data_detail as IFullInfo} />
			)}
		</Layout>
	);
};

export default ProductPage;
