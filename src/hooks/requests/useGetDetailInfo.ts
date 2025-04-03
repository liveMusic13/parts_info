import { useQuery } from '@tanstack/react-query';

import { ProductsInfoService } from '../../services/productsInfo.service';

export const useGetDetailInfo = (article: string, name: string) => {
	const { data, refetch, isSuccess, isLoading, isError, error } = useQuery({
		queryKey: [`suppliers_${article}_${name}`],
		queryFn: () => ProductsInfoService.detail_info(article, name),
		select: data => data.data,
		staleTime: 5 * 60 * 1000, //HELP: кэширование на 5 минут
		enabled: false,
	});

	return { data, refetch, isSuccess, isLoading, isError, error };
};
