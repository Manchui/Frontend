declare module '@manchui-api' {
  export type FilterStateType = {
    category?: string;
    closeDate?: string;
    dateEnd?: string;
    dateStart?: string;
    keyword?: string;
    location?: string | undefined;
    page?: number;
    resetFilters: () => void;
    setCategory: (category: string) => void;
    setCloseDate: (closeDate: string) => void;
    setDateEnd: (dateEnd: string | undefined) => void;
    setDateStart: (dateStart: string | undefined) => void;
    setKeyword: (keyword: string) => void;
    setLocation: (location: string | undefined) => void;
    setPage: (page: number) => void;
  };
}
