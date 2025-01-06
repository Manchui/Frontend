import { getCloseGatheringData } from '@/apis/getCloseGatheringData';
import type { GetCloseGatheringResponse } from '@manchui-api';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

const useGetCloseGatheringData = () =>
  useQuery<GetCloseGatheringResponse>({
    queryKey: ['create'],
    queryFn: () => getCloseGatheringData(),
    placeholderData: keepPreviousData,
  });

export default useGetCloseGatheringData;
