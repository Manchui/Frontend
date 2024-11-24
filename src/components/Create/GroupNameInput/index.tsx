import LongDropdown from '@/components/shared/Dropdown/LongDropdown';
import useGetCloseGatheringData from '@/hooks/useGetCloseGatheringData';

// 클로즈드 모임 데이터를 가져오는 훅에서 반환되는 데이터 타입을 명시적으로 정의
type CloseGatheringData = {
  gatheringId: number;
  groupName: string;
}[];

type GroupNameInputProps = {
  error: string;
  name: string | null;
  setGatheringId: (id: number) => void;
  setName: (name: string) => void; // gatheringId를 설정하는 함수
};

export function GroupNameInput({ name, setName, setGatheringId, error }: GroupNameInputProps) {
  // 타입 정의를 추가하여 closeGatheringData의 타입을 명확히 지정
  const { data: closeGatheringData } = useGetCloseGatheringData();

  // 이름을 변경할 때 실행되는 함수
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setName(inputValue);

    // name이 변경될 때 해당 이름을 가진 모임 정보 찾기
    const selectedGroup = (closeGatheringData?.data?.closedGatheringList as unknown as CloseGatheringData)?.find((item) => item.groupName === inputValue);

    if (selectedGroup) {
      setGatheringId(selectedGroup.gatheringId); // 일치하는 gatheringId 설정
    }
  };

  // groupNames는 단순한 이름 목록에서 gatheringId와 groupName을 포함하는 객체 배열로 변경해야 함
  const groupNames: string[] = (closeGatheringData?.data?.closedGatheringList as unknown as CloseGatheringData)?.map((item) => item.groupName) || [];

  const errorMessage = error === '모임 이름' ? `${error}을 입력하세요.` : error;

  return (
    <div>
      <h2 className="text-base font-semibold text-gray-900">모임 이름</h2>
      {closeGatheringData && closeGatheringData.data.gatheringCount > 0 ? (
        <LongDropdown
          isCloseGathering
          listDropdown={groupNames} // 단순한 groupName 목록을 전달
          placeholder="모임 이름을 작성해주세요"
          onListChange={(selectedGroupName) => {
            setName(selectedGroupName); // 선택된 모임 이름을 설정
            const selectedGroup = (closeGatheringData?.data?.closedGatheringList as unknown as CloseGatheringData)?.find(
              (item) => item.groupName === selectedGroupName,
            );
            if (selectedGroup) {
              setGatheringId(selectedGroup.gatheringId); // 해당 gatheringId 설정
            }
          }}
        />
      ) : (
        <input
          value={name || ''}
          placeholder="모임 이름을 작성해 주세요"
          className="mt-3 h-11 w-full rounded-xl border border-blue-100 bg-blue-50 pl-2 text-sm font-medium"
          onChange={handleChange}
        />
      )}
      {error && <p className="-mb-5 mt-1 text-sm font-medium text-red-500">{errorMessage}</p>}
    </div>
  );
}
