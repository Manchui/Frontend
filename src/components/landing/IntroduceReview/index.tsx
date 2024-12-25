/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable quotes */
import Image from 'next/image';

export function IntroduceReview() {
  return (
    <div className="flex-col-center mb-10 gap-6 text-pretty px-5 text-center text-blue-800 mobile:mb-20">
      <div className="text-24-40-response font-bold">
        <span>
          만취와 함께한<span className="text-red-300"> 경험</span>을 공유합니다.
        </span>
      </div>
      <span className="text-gray-600r mb-8 text-16-20-response font-medium">참여자들이 남긴 생생한 후기를 통해 다양한 모임의 실제 경험을 엿보세요!</span>
      <div className="flex-col-center gap-6 tablet:flex-row">
        <div className="mx-10 flex min-h-[200px] w-full flex-1 flex-col rounded-3xl bg-white p-8 text-13-16-response drop-shadow-lg tablet:mx-0">
          <div className="mb-4 flex gap-4 text-left">
            <Image src="/images/review1.png" alt="후기 사진 1" width={66} height={66} />
            <div className="flex flex-col font-semibold text-gray-800">
              <span>김민수</span>
              <span className="text-13-15-response text-gray-400">만취 요리교실</span>
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Image src="/icons/heart-red.svg" alt="좋아요" width={20} height={20} key={i} />
                ))}
              </div>
            </div>
          </div>
          <div className="text-left font-regular">{`"이번 모임은 정말 뜻깊었어요! 처음 만난 분들과 취미에 대해 이야기하며 즐거운 시간을 보냈습니다. 특히 요리 클래스가 인상 깊었고, 새로운 친구들도 많이 사귀었어요. 앞으로도 이런 모임이 자주 열렸으면 좋겠습니다!"`}</div>
        </div>
        <div className="mx-10 flex min-h-[200px] w-full flex-1 flex-col rounded-3xl bg-white p-8 text-13-16-response drop-shadow-lg tablet:mx-0">
          <div className="mb-4 flex gap-4 text-left">
            <Image src="/images/review2.png" alt="후기 사진 2" width={66} height={66} />
            <div className="flex flex-col font-semibold text-gray-800">
              <span>김민수</span>
              <span className="text-13-15-response text-gray-400">만취 요리교실</span>
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Image src="/icons/heart-red.svg" alt="좋아요" width={20} height={20} key={i} />
                ))}
              </div>
            </div>
          </div>
          <div className="text-left font-regular">{`"이번 모임은 정말 뜻깊었어요! 처음 만난 분들과 취미에 대해 이야기하며 즐거운 시간을 보냈습니다. 특히 요리 클래스가 인상 깊었고, 새로운 친구들도 많이 사귀었어요. 앞으로도 이런 모임이 자주 열렸으면 좋겠습니다!"`}</div>
        </div>
        <div className="mx-10 flex min-h-[200px] w-full flex-1 flex-col rounded-3xl bg-white p-8 text-13-16-response drop-shadow-lg tablet:mx-0">
          <div className="mb-4 flex gap-4 text-left">
            <Image src="/images/review3.png" alt="후기 사진 3" width={66} height={66} />
            <div className="flex flex-col font-semibold text-gray-800">
              <span>김민수</span>
              <span className="text-13-15-response text-gray-400">만취 요리교실</span>
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Image src="/icons/heart-red.svg" alt="좋아요" width={20} height={20} key={i} />
                ))}
              </div>
            </div>
          </div>
          <div className="text-left font-regular">{`"이번 모임은 정말 뜻깊었어요! 처음 만난 분들과 취미에 대해 이야기하며 즐거운 시간을 보냈습니다. 특히 요리 클래스가 인상 깊었고, 새로운 친구들도 많이 사귀었어요. 앞으로도 이런 모임이 자주 열렸으면 좋겠습니다!"`}</div>
        </div>
      </div>
    </div>
  );
}
