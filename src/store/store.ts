import { create } from 'zustand';

import { INameForDetailInfoStore, ISearchStore } from '../types/store.types';

export const useSearchStore = create<ISearchStore>(set => ({
	valueSearch: '',
	setValueSearch: str => set({ valueSearch: str }),
}));

export const useNameForDetailInfoStore = create<INameForDetailInfoStore>(
	set => ({
		nameDetailInfo: '',
		setNameDetailInfo: str => set({ nameDetailInfo: str }),
	}),
);
