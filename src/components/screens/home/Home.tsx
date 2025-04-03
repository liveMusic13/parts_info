import { FC } from 'react';

import { useSearchProducts } from '../../../hooks/logics/useSearchProducts';
import { useGetDetailInfo } from '../../../hooks/requests/useGetDetailInfo';
import { useGetSuppliers } from '../../../hooks/requests/useGetSuppliers';
import {
	useNameForDetailInfoStore,
	useSearchStore,
} from '../../../store/store';
import { ISuppliersResponse } from '../../../types/request.types';
import Layout from '../../layout/Layout';
import Suppliers from '../../suppliers/Suppliers';
import Input from '../../ui/input/Input';
import Loader from '../../ui/loader/Loader';

import styles from './Home.module.scss';

const Home: FC = () => {
	const { handleChangeSearchValue, handleClickSearch } = useSearchProducts();
	const valueSearch = useSearchStore(store => store.valueSearch);

	const nameDetailInfo = useNameForDetailInfoStore(
		store => store.nameDetailInfo,
	);

	const {
		isLoading: isLoading_detail,
		isError: isError_detail,
		error: error_detail,
	} = useGetDetailInfo(valueSearch, nameDetailInfo);
	const { data, isLoading, isSuccess, refetch, isError, error } =
		useGetSuppliers(valueSearch);

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
			<div className={styles.block__suppliers}>
				{isLoading && isLoading_detail && <Loader />}
				{isError && isError_detail && (
					<div>
						Ошибка получения данных: {error?.message || error_detail?.message}
					</div>
				)}
				{isSuccess && data && (
					<>
						<Suppliers
							title='Поставщики из TD2018:'
							data={(data as ISuppliersResponse).suppliersFromTd}
						/>
						<Suppliers
							title='Поставщики из JCEtalon:'
							data={(data as ISuppliersResponse).suppliersFromJs}
						/>
					</>
				)}
			</div>
		</Layout>
	);
};

export default Home;
