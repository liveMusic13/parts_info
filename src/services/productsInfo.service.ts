import { AxiosError } from 'axios';

import { $axios } from '../api';
import {
	IApiResponse,
	IEtPartResponse,
	IFullInfo,
	IJSSCrossRequest,
	ISuppliersResponse,
	ITecDocCrossResponse,
	IVolnaPartsResponse,
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
	volna_parts: async (
		article: string,
	): Promise<
		IApiResponse<
			IVolnaPartsResponse[] | Error | AxiosError<{ message?: string }>
		>
	> => {
		try {
			const response = await $axios.get(`volna-parts/part/${article}`);

			return {
				data: response.data,
				status: response.status,
			};
		} catch (axiosError: any) {
			const error = axiosError;
			throw new Error(error.response?.data?.message || error.message);
		}
	},
	tec_doc_cross: async (
		article: string,
	): Promise<
		IApiResponse<
			ITecDocCrossResponse[] | Error | AxiosError<{ message?: string }>
		>
	> => {
		try {
			const response = await $axios.get(`/tec-doc-cross/cross/${article}`);

			return {
				data: response.data,
				status: response.status,
			};
		} catch (axiosError: any) {
			const error = axiosError;
			throw new Error(error.response?.data?.message || error.message);
		}
	},
	jss_cross: async (
		article: string,
	): Promise<
		IApiResponse<IJSSCrossRequest[] | Error | AxiosError<{ message?: string }>>
	> => {
		try {
			const response = await $axios.get(`/cr-t-cross/bycode/${article}`);

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
