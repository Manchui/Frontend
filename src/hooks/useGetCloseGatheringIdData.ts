/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { getCloseGatheringIdData } from '@/apis/getCloseGatheringIdData';
import type { GetCloseGatheringIdResponse } from '@manchui-api';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

const useGetCloseGatheringIdData = (gatheringId: number | null) =>
  useQuery<GetCloseGatheringIdResponse>({
    queryKey: ['create', gatheringId],
    queryFn: async () => {
        if (gatheringId === null) {
          return Promise.resolve({} as GetCloseGatheringIdResponse);
        }
        return getCloseGatheringIdData(gatheringId); 
      },    placeholderData: keepPreviousData,
    enabled: gatheringId !== null,
  });

export default useGetCloseGatheringIdData;
