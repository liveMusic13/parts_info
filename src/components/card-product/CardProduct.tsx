import { FC, useEffect } from 'react';

import { useEtPart } from '../../hooks/requests/useEtPart';
import { useGetDetailInfo } from '../../hooks/requests/useGetDetailInfo';
import { useNameForDetailInfoStore, useSearchStore } from '../../store/store';
import { IEtPartResponse, IFullInfo } from '../../types/request.types';
import Button from '../ui/button/Button';
import Loader from '../ui/loader/Loader';

import styles from './CardProduct.module.scss';
import Info from './info/Info';
import SliderImage from './slider-image/SliderImage';

const CardProduct: FC = () => {
	const valueSearch = useSearchStore(store => store.valueSearch);
	const nameDetailInfo = useNameForDetailInfoStore(
		store => store.nameDetailInfo,
	);

	const { data, isLoading, isSuccess } = useGetDetailInfo(
		valueSearch,
		nameDetailInfo,
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
		if (isError_etPart) {
			console.log('isError_etPart', isError_etPart, error_etPart);
		} else if (isSuccess_etPart) {
			console.log('isSuccess_etPart', isSuccess_etPart, data_etPart);
		} else {
			console.log('xz');
		}
	}, [isError_etPart, isSuccess_etPart]);

	return (
		<div className={styles.wrapper_cardProduct}>
			{isLoading && <Loader />}
			{isSuccess && (
				<>
					<SliderImage
						arrImage={[
							...(data as IFullInfo).img_urls,
							...(data as IFullInfo).img_urls,
							...(data as IFullInfo).img_urls,
						]}
					/>
					<div className={styles.block__info}>
						<Info
							title='Нормализованный артикул:'
							value={(data as IFullInfo).normalized_article || ''}
						/>
						<Info
							title='Поставщик JC:'
							value={(data as IFullInfo).supplier_from_jc.name || ''}
						/>
						<Info
							title='Поставщик TD:'
							value={(data as IFullInfo).supplier_from_td.description || ''}
						/>
						<Info
							title='Ean'
							value={(data as IFullInfo).article_ean?.ean || ''}
						/>
						<Button
							style={{
								borderRadius: 'calc(6/1920*100vw)',
								margin: 'calc(10/1920*100vw) 0px',
							}}
							onClick={handleClick}
						>
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
