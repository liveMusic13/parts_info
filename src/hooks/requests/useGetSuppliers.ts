import { useQuery } from '@tanstack/react-query';

import { ProductsInfoService } from '../../services/productsInfo.service';

export const useGetSuppliers = (article: string) => {
	const { data, refetch, isSuccess, isLoading, isError, error } = useQuery({
		queryKey: [`suppliers_${article}`],
		queryFn: () => ProductsInfoService.suppliers(article),
		select: data => data.data,
		staleTime: 5 * 60 * 1000, //HELP: кэширование на 5 минут
		enabled: false,
	});

	return { data, refetch, isSuccess, isLoading, isError, error };
};
