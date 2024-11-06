import Image from 'next/image';

import type { BaseProgressBarProps } from '.';

interface DetailsStyleProps extends BaseProgressBarProps {
  location: 'up' | 'down';
}

export function DetailsStyle({ maxValue, mainValue = 0, value, location, userList, imgLength = 0 }: DetailsStyleProps) {
  const testData =
    Array.isArray(userList) && userList.length
      ? userList
      : Array.from({ length: imgLength }, (_, index) => ({
          userId: `abcd-${index + 1}`,
          profileImagePath: '/icons/person-rounded.png',
        }));

  return (
    <div>
      {location === 'up' ? (
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="space-x-[6px] text-sm font-semibold">
              <span>모집 정원</span>
              <span>{value}명</span>
            </div>
            <div className="flex -space-x-2">
              {testData.length > 5 ? (
                <>
                  {testData.slice(0, 4).map((img, i) => (
                    <Image src={img.profileImagePath || '/icons/person-rounded.png'} key={i} alt="유저이미지" className="rounded-full" width={29} height={29} />
                  ))}
                  <div className="relative flex size-[29px] items-center justify-center rounded-full bg-[#F3F4F3]">
                    <span className="absolute text-sm font-semibold">+{testData.length - 4}</span>
                  </div>
                </>
              ) : (
                testData.map((img, i) => (
                  <Image src={img.profileImagePath || '/icons/person-rounded.png'} key={i} alt="유저이미지" className="rounded-full" width={29} height={29} />
                ))
              )}
            </div>
          </div>
          {value >= mainValue && (
            <div className="flex items-center">
              <Image className="ml-2 size-4 rounded-full bg-blue-800 p-[2px]" src="/icons/check.svg" alt="icon" width={20} height={20} />
              <span className="ml-1 text-sm font-medium text-blue-800">개설확정</span>
            </div>
          )}
        </div>
      ) : (
        <div className="mt-2 flex justify-between text-xs">
          <div className="space-x-[6px]">
            <span>최소인원</span>
            <span>{mainValue}명</span>
          </div>
          <div className="space-x-[6px]">
            <span>최대인원</span>
            <span>{maxValue}명</span>
          </div>
        </div>
      )}
    </div>
  );
}
