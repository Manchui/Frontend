import { instance } from '@/apis/api';
import type { GetCloseGatheringResponse } from '@manchui-api';

export async function getCloseGatheringData(): Promise<GetCloseGatheringResponse> {
  try {
    const res = await instance.get<GetCloseGatheringResponse>('/api/gatherings');

    return res.data;
  } catch (e) {
    console.log('GetCloseGatheringResponse 함수에서 오류 발생', e);
    throw new Error('닫힌 모임 데이터를 불러오는데 실패했습니다.');
  }
}
