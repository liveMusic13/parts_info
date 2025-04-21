import { useQuery } from '@tanstack/react-query';

import { ProductsInfoService } from '../../services/productsInfo.service';

export const usePrPart = (article: string) => {
	return useQuery({
		queryKey: [`pr-part_${article}`],
		queryFn: () => ProductsInfoService.pr_part(article),
		select: data => data.data,
		staleTime: 5 * 60 * 1000, //HELP: кэширование на 5 минут
	});
};
