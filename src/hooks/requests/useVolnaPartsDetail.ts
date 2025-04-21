import { useQuery } from '@tanstack/react-query';

import { ProductsInfoService } from '../../services/productsInfo.service';

export const useVolnaPartsDetail = (article: string, id: number | null) => {
	return useQuery({
		queryKey: [`valnaParts_detail_${article}_${id}`],
		queryFn: () => ProductsInfoService.volna_parts_details(article, id),
		select: data => data.data,
		staleTime: 5 * 60 * 1000, //HELP: кэширование на 5 минут
	});
};
