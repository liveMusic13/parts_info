import { useQuery } from '@tanstack/react-query';

import { ProductsInfoService } from '../../services/productsInfo.service';

export const useEtPart = (code: string, producer_id: number) => {
	const { data, refetch, isSuccess, isLoading, isError, error } = useQuery({
		queryKey: [`etPart_${code}_${producer_id}`],
		queryFn: () => ProductsInfoService.et_part(code, producer_id),
		select: data => data.data,
		staleTime: 5 * 60 * 1000, //HELP: кэширование на 5 минут
		enabled: false,
	});

	return { data, refetch, isSuccess, isLoading, isError, error };
};
