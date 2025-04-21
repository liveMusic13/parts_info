import { FC } from 'react';

import { useGetSuppliersById } from '../../../hooks/requests/useGetSuppliersById';
import { IAdditionalInfoProps } from '../../../types/props.types';
import Loader from '../../ui/loader/Loader';

const AdditionalInfo: FC<IAdditionalInfoProps> = ({ id, image }) => {
	const { data, isSuccess, isLoading, isError, error } =
		useGetSuppliersById(id);

	console.log('data', data);

	return (
		<div className='flex flex-col gap-1.5 '>
			{isLoading && <Loader />}
			{isError && <div>Ошибка получения данных: {error?.message}</div>}
			{isSuccess && data && (
				<>
					<div className='w-52 min-h-25 max-h-52 rounded-[0.5rem] shadow-[0px_0px_4px_rgba(0,0,0,0.2)] mb-8'>
						<img
							src={image || '/images/no_image.jpg'}
							alt='image'
							className='h-full'
						/>
					</div>
					<div>
						<p className='font-bold'>Адрес:</p>
						<span>{data[0].city1}</span>, <span>{data[0].city2}</span>
						<span>
							{data[0].street1}, {data[0].street2}
						</span>
					</div>
					{data[0].countrycode && (
						<div>
							<p className='font-bold'>Страна и код страны:</p>
							<span>{data[0].countrycode}</span>
						</div>
					)}
					{data[0].name1 && (
						<div>
							<p className='font-bold'>Полное наименование бренда:</p>
							<span>
								{data[0].name1} {data[0].name2}
							</span>
						</div>
					)}
					{data[0].homepage && (
						<div>
							<p className='font-bold'>Адрес сайта:</p>
							{/* <a href={data[0].homepage} target='_blank'>
								{data[0].homepage}
							</a> */}
							<span>{data[0].homepage}</span>
						</div>
					)}
					{data[0].postalcodecity && (
						<div>
							<p className='font-bold'>Индекс города:</p>
							<span>{data[0].postalcodecity}</span>
						</div>
					)}
					{data[0].postalcodepob && (
						<div>
							<p className='font-bold'>Индекс почтового ящика:</p>
							<span>{data[0].postalcodepob}</span>
						</div>
					)}
					{data[0].postalcodewholesaler && (
						<div>
							<p className='font-bold'>Индекс представителя:</p>
							<span>{data[0].postalcodewholesaler}</span>
						</div>
					)}
					{data[0].postalcountrycode && (
						<div>
							<p className='font-bold'>Почтовый код страны:</p>
							<span>{data[0].postalcountrycode}</span>
						</div>
					)}
					{data[0].postofficebox && (
						<div>
							<p className='font-bold'>Номер почтового ящика:</p>
							<span>{data[0].postofficebox}</span>
						</div>
					)}
					<div>
						<p className='font-bold'>Почта:</p>
						<a href={`mailto:${data[0].email}`}>{data[0].email}</a>
					</div>
					{data[0].fax && (
						<div>
							<p className='font-bold'>Факс:</p>
							<span>{data[0].fax}</span>
						</div>
					)}
					{data[0].telephone && (
						<div>
							<p className='font-bold'>Телефон:</p>
							<span>{data[0].telephone}</span>
						</div>
					)}
				</>
			)}
		</div>
	);
};

export default AdditionalInfo;
