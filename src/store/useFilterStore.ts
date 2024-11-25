import { create } from 'zustand';
import { FILTER_OPTIONS } from '@/constants/filter';
import type { FilterStateType } from '@manchui-api';

const useFilterStore = create<FilterStateType>((set) => ({
  keyword: undefined,
  location: undefined,
  category: FILTER_OPTIONS[0].id,
  closeDate: undefined,
  dateStart: undefined,
  dateEnd: undefined,
  sort: undefined,
  score: 0,
  page: 1,
  setPage: (page: number) => set({ page }),
  setKeyword: (keyword) => set({ keyword }),
  setLocation: (location) => set({ location }),
  setCategory: (category) => set({ category }),
  setCloseDate: (closeDate) => set({ closeDate }),
  setDateStart: (dateStart) => set({ dateStart }),
  setDateEnd: (dateEnd) => set({ dateEnd }),
  setSort: (sort) => set({ sort }),
  setScore: (score) => set({ score }),
  resetFilters: () =>
    set({ keyword: undefined, location: undefined, category: '',score:0, closeDate: undefined, dateStart: undefined, sort: undefined, dateEnd: undefined, page: 1 }),
}));

// States
export const useKeyword = () => useFilterStore((state) => state.keyword);
export const useLocation = () => useFilterStore((state) => state.location);
export const useCategory = () => useFilterStore((state) => state.category);
export const useCloseDate = () => useFilterStore((state) => state.closeDate);
export const useDateStart = () => useFilterStore((state) => state.dateStart);
export const useDateEnd = () => useFilterStore((state) => state.dateEnd);
export const usePage = () => useFilterStore((state) => state.page);
export const useScore = () => useFilterStore((state) => state.score);
export const useSort = () => useFilterStore((state) => state.sort);
// Actions
export const useSetKeyword = () => useFilterStore((state) => state.setKeyword);
export const useSetLocation = () => useFilterStore((state) => state.setLocation);
export const useSetCategory = () => useFilterStore((state) => state.setCategory);
export const useSetCloseDate = () => useFilterStore((state) => state.setCloseDate);
export const useSetPage = () => useFilterStore((state) => state.setPage);
export const useSetDateStart = () => useFilterStore((state) => state.setDateStart);
export const useSetDateEnd = () => useFilterStore((state) => state.setDateEnd);
export const useResetFilters = () => useFilterStore((state) => state.resetFilters);
export const useSetScore = () => useFilterStore((state) => state.setScore);
export const useSetSort = () => useFilterStore((state) => state.setSort);

export default useFilterStore;
