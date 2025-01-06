import { instance } from '@/apis/api';
import type { GetCloseGatheringIdResponse } from '@manchui-api';

export async function getCloseGatheringIdData(gatheringsId: number): Promise<GetCloseGatheringIdResponse> {
  try {
    const res = await instance.get<GetCloseGatheringIdResponse>(`/api/gatherings/${gatheringsId}`);

    return res.data;
  } catch (e) {
    console.log('getCloseGatheringIdData 함수에서 오류 발생', e);
    throw new Error('닫힌 모임 데이터를 불러오는데 실패했습니다.');
  }
}
