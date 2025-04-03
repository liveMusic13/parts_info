import { UseQueryResult } from '@tanstack/react-query';
import { ChangeEvent, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useSearchStore } from '../../store/store';

export const useSearchProducts = () => {
	const nav = useNavigate();
	const { pathname } = useLocation();
	const { setValueSearch } = useSearchStore(store => store);

	const handleChangeSearchValue = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => setValueSearch(e.target.value),
		[],
	);
	const handleClickSearch = useCallback(
		(refetch: UseQueryResult['refetch']) => {
			refetch();
			if (pathname !== '/') {
				nav('/');
				console.log('router');
			}
		},
		[pathname],
	);

	return {
		handleChangeSearchValue,
		handleClickSearch,
	};
};
