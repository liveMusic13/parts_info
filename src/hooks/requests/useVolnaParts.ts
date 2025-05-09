import { useQuery } from '@tanstack/react-query';

import { ProductsInfoService } from '../../services/productsInfo.service';

export const useVolnaParts = (article: string, id: number | null) => {
	const { data, refetch, isSuccess, isLoading, isError, error } = useQuery({
		queryKey: [`valnaParts_${article}_${id}`],
		queryFn: () => ProductsInfoService.volna_parts(article, id),
		select: data => data.data,
		staleTime: 5 * 60 * 1000, //HELP: кэширование на 5 минут
	});

	return { data, refetch, isSuccess, isLoading, isError, error };
};
