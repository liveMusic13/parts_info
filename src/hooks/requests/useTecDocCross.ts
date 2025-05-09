import { useQuery } from '@tanstack/react-query';

import { ProductsInfoService } from '../../services/productsInfo.service';

export const useTecDocCross = (article: string) => {
	const { data, refetch, isSuccess, isLoading, isError, error } = useQuery({
		queryKey: [`tec_doc_cross_${article}`],
		queryFn: () => ProductsInfoService.tec_doc_cross(article),
		select: data => data.data,
		staleTime: 5 * 60 * 1000, //HELP: кэширование на 5 минут
	});

	return { data, refetch, isSuccess, isLoading, isError, error };
};
