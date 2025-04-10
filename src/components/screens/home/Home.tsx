import { FC, useEffect, useState } from 'react';

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

const Home: FC = () => {
	const searchParams = new URLSearchParams(window.location.search);
	const valueSearchFromURL = searchParams.get('valueSearch') || '';
	const { handleChangeSearchValue, handleClickSearch } = useSearchProducts();
	const { valueSearch, setValueSearch } = useSearchStore(store => store);
	const [filteredData, setFilteredData] = useState<ISuppliersResponse | null>(
		null,
	);

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

	useEffect(() => {
		if (valueSearchFromURL) {
			setValueSearch(valueSearchFromURL);
			const timeoutId = setTimeout(() => refetch(), 2000);
			return () => clearTimeout(timeoutId);
		}
	}, [valueSearchFromURL]);

	useEffect(() => {
		if (isSuccess) {
			// Создаем копию первого массива для модификации
			const updatedSuppliersFromTd = [
				...(data as ISuppliersResponse).suppliersFromTd,
			];
			// Создаем Set для быстрого поиска id
			const existingIds = new Set(updatedSuppliersFromTd.map(item => item.id));
			// Создаем карту для быстрого доступа к элементам по id
			const tdMap = new Map(
				updatedSuppliersFromTd.map(item => [item.id, item]),
			);

			// Проходим по всем элементам второго массива
			const filteredArr2 = (data as ISuppliersResponse).suppliersFromJs.filter(
				item => {
					// Если найдено совпадение id
					if (existingIds.has(item.tecdocSupplierId)) {
						// Находим соответствующий элемент в первом массиве
						const tdItem = tdMap.get(item.tecdocSupplierId);
						if (tdItem) {
							// Перезаписываем description_two значением из второго массива
							tdItem.description_two = item.marketPrefix;
						}
						// Исключаем элемент из второго массива
						return false;
					}
					// Оставляем элемент во втором массиве
					return true;
				},
			);

			// Обновляем состояние с модифицированным первым массивом и отфильтрованным вторым
			setFilteredData({
				suppliersFromTd: updatedSuppliersFromTd,
				suppliersFromJs: filteredArr2,
			});
		}
	}, [isSuccess]);

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
			<div className='flex flex-col border-1 border-[rgba(0,0,0,0.3)] grow mt-5 gap-7.5 rounded-[0.714rem] w-full py-2.5 px-3.5 '>
				{(isLoading || isLoading_detail) && <Loader />}
				{(isError || isError_detail) && (
					<div>
						Ошибка получения данных: {error?.message || error_detail?.message}
					</div>
				)}
				{isSuccess && filteredData && (
					<>
						<Suppliers
							title={
								filteredData.suppliersFromTd.length > 0
									? 'Поставщики из TD2018:'
									: ''
							}
							data={filteredData.suppliersFromTd}
						/>
						<Suppliers
							title={
								filteredData.suppliersFromJs.length > 0
									? 'Поставщики из JCEtalon:'
									: ''
							}
							data={filteredData.suppliersFromJs}
						/>
					</>
				)}
			</div>
		</Layout>
	);
};

export default Home;
