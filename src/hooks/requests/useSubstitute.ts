import { useQuery } from '@tanstack/react-query';

import { ProductsInfoService } from '../../services/productsInfo.service';

export const useSubstitute = (
	article: string,
	producer_id: number | string,
) => {
	const { data, refetch, isSuccess, isLoading, isError, error } = useQuery({
		queryKey: [`substitute_${article}_${producer_id}`],
		queryFn: () => ProductsInfoService.substitute(article, producer_id),
		select: data => data.data,
		staleTime: 5 * 60 * 1000, //HELP: кэширование на 5 минут
	});

	return { data, refetch, isSuccess, isLoading, isError, error };
};
