import { useQuery } from '@tanstack/react-query';

import { ProductsInfoService } from '../../services/productsInfo.service';

export const useGetSuppliersById = (id: string | number | undefined) => {
	const { data, refetch, isSuccess, isLoading, isError, error } = useQuery({
		queryKey: [`suppliers_by-id_${id}`],
		queryFn: () => ProductsInfoService.suppliers_byId(id),
		select: data => data.data,
		staleTime: 5 * 60 * 1000, //HELP: кэширование на 5 минут
		// enabled: false,
	});

	return { data, refetch, isSuccess, isLoading, isError, error };
};
