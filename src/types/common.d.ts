declare module '@manchui-api' {
  export type Location = '건대 입구' | '을지로 3가' | '신림' | '홍대 입구' | '성수' | '여의도' | '강남' | '영등포' | '잠실' | '이태원';

  export type Category = '전체' | '운동' | '영화' | '공부' | '문화/예술' | '게임' | '여행' | '맛집' | '음악';

  export type GetBookmarkRequest = {
    category?: string;
    endDate?: string;
    location?: string;
    page?: number;
    query?: string;
    size: number;
    sort?: string;
    startDate?: string;
  };

  export type GetGatheringRequest = {
    category?: string;
    cursor?: number | undefined;
    endDate?: string;
    location?: string;
    page?: number;
    query?: string;
    size: number;
    sort?: string;
    startDate?: string;
  };
}
