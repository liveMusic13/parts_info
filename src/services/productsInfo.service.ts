import { AxiosError } from 'axios';

import { $axios } from '../api';
import {
	IApiResponse,
	IEtPartResponse,
	IFullInfo,
	ISuppliersResponse,
} from '../types/request.types';

export const ProductsInfoService = {
	suppliers: async (
		article: string,
	): Promise<
		IApiResponse<ISuppliersResponse | Error | AxiosError<{ message?: string }>>
	> => {
		if (!article) throw new Error('Артикул не введен');

		try {
			const response = await $axios.get(`/suppliers/${article}`);

			return { status: response.status, data: response.data };
		} catch (axiosError: any) {
			const error = axiosError;
			throw new Error(error.response?.data?.message || error.message);
		}
	},
	detail_info: async (
		article: string,
		name: string,
	): Promise<
		IApiResponse<IFullInfo | Error | AxiosError<{ message?: string }>>
	> => {
		try {
			const response = await $axios(`/detail-full-info/${name}/${article}`);

			return {
				data: response.data,
				status: response.status,
			};
		} catch (axiosError: any) {
			const error = axiosError;
			throw new Error(error.response?.data?.message || error.message);
		}
	},
	et_part: async (
		code: string,
		producer_id: number,
	): Promise<
		IApiResponse<IEtPartResponse[] | Error | AxiosError<{ message?: string }>>
	> => {
		try {
			const response = await $axios.get(`/et-part/${code}/${producer_id}/`);

			return {
				data: response.data,
				status: response.status,
			};
		} catch (axiosError: any) {
			const error = axiosError;
			throw new Error(error.response?.data?.message || error.message);
		}
	},
};
