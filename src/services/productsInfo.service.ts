import { $axios } from '../api';
import {
	IApiResponse,
	IEtPartResponse,
	IFullInfo,
	IJSSCrossRequest,
	IPrPartsResponse,
	ISubstituteResponse,
	ISuppliersByIdResponse,
	ISuppliersResponse,
	ITecDocCrossResponse,
	IVolnaPartsDetailResponse,
	IVolnaPartsResponse,
} from '../types/request.types';

export const ProductsInfoService = {
	pr_part: async (
		article: string,
	): Promise<IApiResponse<IPrPartsResponse[]>> => {
		if (!article) throw new Error('Артикул не введен');

		try {
			const response = await $axios.get(`/pr-part/?article=${article}`);

			return { status: response.status, data: response.data };
		} catch (axiosError: any) {
			const error = axiosError;
			throw new Error(error.response?.data?.message || error.message);
		}
	},
	suppliers: async (
		article: string,
	): Promise<IApiResponse<ISuppliersResponse>> => {
		if (!article) throw new Error('Артикул не введен');

		try {
			const response = await $axios.get(`/suppliers/${article}`);

			return { status: response.status, data: response.data };
		} catch (axiosError: any) {
			const error = axiosError;
			throw new Error(error.response?.data?.message || error.message);
		}
	},
	suppliers_byId: async (
		id: string | number | undefined,
	): Promise<IApiResponse<ISuppliersByIdResponse[]>> => {
		try {
			if (!id) throw new Error('Id товара не найден');

			const response = await $axios.get(`/suppliers/by-id/${id}`);

			return { status: response.status, data: response.data };
		} catch (axiosError: any) {
			const error = axiosError;
			throw new Error(error.response?.data?.message || error.message);
		}
	},
	detail_info: async (
		article: string,
		name: string,
	): Promise<IApiResponse<IFullInfo>> => {
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
	): Promise<IApiResponse<IEtPartResponse[]>> => {
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
	volna_parts_details: async (
		article: string,
		id: number | null,
	): Promise<IApiResponse<IVolnaPartsDetailResponse[]>> => {
		if (!id) throw new Error('Id товара не найден');

		try {
			const response = await $axios.get(`volna-parts/part-details/${article}`);

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
		id: number | null,
	): Promise<IApiResponse<IVolnaPartsResponse[]>> => {
		if (!id) throw new Error('Id товара не найден');

		try {
			const response = await $axios.get(`volna-parts/part/${article}/${id}`);

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
	): Promise<IApiResponse<ITecDocCrossResponse[]>> => {
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
	): Promise<IApiResponse<IJSSCrossRequest[]>> => {
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
	substitute: async (
		article: string,
		producer_id: number | string,
	): Promise<IApiResponse<ISubstituteResponse>> => {
		try {
			const response = await $axios.get(
				`/substitute/${article}/${producer_id}`,
			);

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
