import { FC } from 'react';

import { useJssCross } from '../../../../../hooks/requests/useJssCross';
import { useTecDocCross } from '../../../../../hooks/requests/useTecDocCross';
import { useSearchStore } from '../../../../../store/store';
import { ICroseCodeProps } from '../../../../../types/props.types';
import {
	IJSSCrossRequest,
	ITecDocCrossResponse,
} from '../../../../../types/request.types';
import Loader from '../../../../ui/loader/Loader';

const CrossCode: FC<ICroseCodeProps> = ({ isTecDoc }) => {
	const valueSearch = useSearchStore(store => store.valueSearch);

	const { data, error, isError, isLoading, isSuccess } =
		useTecDocCross(valueSearch);
	const {
		data: data_jss,
		error: error_jss,
		isError: isError_jss,
		isLoading: isLoading_jss,
		isSuccess: isSuccess_jss,
	} = useJssCross(valueSearch);

	console.log(data, data_jss);

	return (
		<>
			{(isLoading || isLoading_jss) && <Loader />}
			{(isError || isError_jss) && (
				<div>
					Ошибка получения данных: {error?.message || error_jss?.message}
				</div>
			)}
			{isTecDoc &&
				isSuccess &&
				(data as ITecDocCrossResponse[]).map((el, ind) => (
					<div
						key={ind}
						className='border-y-1 border-gray-300 py-2.5 w-full text-center'
					>
						<span className='font-bold mr-2'>{el.supplier.description}: </span>
						{el.datasupplierarticlenumber}
					</div>
				))}
			{!isTecDoc &&
				isSuccess_jss &&
				(data_jss as IJSSCrossRequest[]).map((el, ind) => (
					<div
						key={ind}
						className='border-y-1 border-gray-300 py-2.5 w-full text-center'
					>
						<span className='font-bold mr-2'>{el.et_producer.name}: </span>
						{el.cr_maincode}
					</div>
				))}
		</>
	);
};

export default CrossCode;
