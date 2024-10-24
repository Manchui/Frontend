import Image from 'next/image';
import type { User } from '@/types/mypage';

export function ProfileCard({ userData }: { userData: User }) {
  return (
    <div className="relative m-auto h-[178px] min-w-[343px] rounded-3xl bg-white p-5 duration-100 tablet:min-w-[696px] pc:min-w-[996px]">
      <div className="flex justify-between">
        <div className="text-lg font-semibold">내 프로필</div>
        <Image src="/buttons/edit1-profile.svg" alt="이미지 수정 아이콘" width={32} height={32} />
      </div>
      <Image src={userData.image} alt="프로필 이미지" width={40} height={40} style={{ objectFit: 'cover' }} />
      {/* <div className="absolute inset-x-0 top-0 h-[65px] rounded-t-3xl bg-primary-400" /> */}
      <div className="flex flex-col">
        <div>{userData.name}</div>
        <div>
          <span>E-mail.</span>
          {userData.email}
        </div>
      </div>
    </div>
  );
}
