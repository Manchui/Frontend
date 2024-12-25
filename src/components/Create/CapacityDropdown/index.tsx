/* eslint-disable radix */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import LongDropdown from '@/components/shared/Dropdown/LongDropdown';

type CapacitySelectorProps = {
  errorMax: string;
  errorMin: string;
  selectedMaxNum: string | null;
  selectedMinNum: string | null;
  setSelectedMaxNum: (maxNum: string) => void;
  setSelectedMinNum: (minNum: string) => void;
};

export function CapacityDropdown({ errorMin, errorMax, selectedMinNum, selectedMaxNum, setSelectedMinNum, setSelectedMaxNum }: CapacitySelectorProps) {
  const Num = Array.from({ length: 99 }).map((_, index) => (index + 2).toString());

  const handleMinChange = (value: string) => setSelectedMinNum(value);
  const handleMaxChange = (value: string) => setSelectedMaxNum(value);

  return (
    <div>
      <h2 className="mb-3 text-base font-semibold text-gray-900"> 모집 정원 </h2>
      <div className="flex w-full flex-col justify-center gap-2 mobile:flex-row mobile:justify-between tablet:gap-10">
        <div className="flex flex-1 items-center">
          <p className="mr-2 whitespace-nowrap text-sm font-medium">최소 인원 </p>
          <div className="flex-1">
            <LongDropdown
              listDropdown={Num}
              placeholder="최소 정원을 정해주세요."
              onListChange={handleMinChange}
              maxValue={selectedMaxNum ? parseInt(selectedMaxNum) : undefined}
            />
          </div>
        </div>

        <div className="flex flex-1 items-center">
          <p className="mr-2 whitespace-nowrap text-sm font-medium">최대 인원 </p>
          <div className="flex-1">
            <LongDropdown
              listDropdown={Num}
              placeholder="최대 정원을 정해주세요."
              onListChange={handleMaxChange}
              minValue={selectedMinNum ? parseInt(selectedMinNum) : undefined}
            />
          </div>
        </div>
      </div>
      {(errorMin || errorMax) && (
        <p className="-mb-5 mt-1 text-sm font-medium text-red-500">
          {errorMin} {errorMax}을 선택하세요.
        </p>
      )}
    </div>
  );
}
