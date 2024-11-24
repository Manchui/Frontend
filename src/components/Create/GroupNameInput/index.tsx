/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { getCloseGatheringData } from '@/apis/getCloseGatheringData';
import LongDropdown from '@/components/shared/Dropdown/LongDropdown';
import useGetCloseGatheringData from '@/hooks/useGetCloseGatheringData';
import { dehydrate, QueryClient } from '@tanstack/react-query';

type CloseGatheringData = {
  gatheringId: number;
  groupName: string;
}[];

type GroupNameInputProps = {
  error: string;
  name: string | null;
  setGatheringId: (id: number) => void;
  setName: (name: string) => void;
};

export function GroupNameInput({ name, setName, setGatheringId, error }: GroupNameInputProps) {
  const { data: closeGatheringData } = useGetCloseGatheringData();

  // const gatheringList: CloseGatheringData = (closeGatheringData?.data?.closedGatheringList as unknown as CloseGatheringData) || [];

  const errorMessage = error === '모임 이름' ? `${error}을 입력하세요.` : error;
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Enter 키에 의한 폼 제출을 막음
    }
  };
  return (
    <div>
      <h2 className="text-base font-semibold text-gray-900">모임 이름</h2>
      {/* {gatheringList.length > 0 ? (
        <LongDropdown
          isCloseGathering
          listDropdown={gatheringList} 
          placeholder="모임 이름을 작성해주세요"
          onListChange={(selectedGroupName) => {
            setName(selectedGroupName);
            const selectedGroup = gatheringList.find((item) => item.groupName === selectedGroupName);
            if (selectedGroup) {
              setGatheringId(selectedGroup.gatheringId);
            }
          }}
        />
      ) : ( */}
      <input
        value={name || ''}
        placeholder="모임 이름을 작성해 주세요"
        className="mt-3 h-11 w-full rounded-xl border border-blue-100 bg-blue-50 pl-2 text-sm font-medium"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const inputValue = e.target.value;
          setName(inputValue);
          // const selectedGroup = gatheringList.find((item) => item.groupName === inputValue);
          // if (selectedGroup) {
          //   setGatheringId(selectedGroup.gatheringId);
          // }
        }}
        onKeyPress={handleKeyPress}
      />
      {/* )} */}
      {error && <p className="-mb-5 mt-1 text-sm font-medium text-red-500">{errorMessage}</p>}
    </div>
  );
}

export const getServerSideProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['getClosegatherings'],
    queryFn: () => getCloseGatheringData(),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
