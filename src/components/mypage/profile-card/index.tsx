import Image from 'next/image';
import Input from '@/components/shared/Input';
import Modal from '@/components/shared/Modal';
import { useModal } from '@/hooks/useModal';
import type { User } from '@/types/mypage';

export function ProfileCard({ userData }: { userData: User }) {
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <div className="relative m-auto h-auto w-full rounded-3xl p-2.5 tablet:p-4 pc:p-5">
      <div className="absolute left-[4%] top-[-40%] rounded-full bg-white p-1 phablet:left-[7%] tablet:left-[6%] pc:left-[8.5%]">
        <Image
          className="size-[60px] phablet:size-[70px] md:size-[90px]"
          src={userData.image}
          alt="프로필 이미지"
          width={70}
          height={70}
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div className="flex">
        <div className="m-2 size-1/6 phablet:size-1/5 tablet:size-1/6" />
        <div className="flex flex-1 justify-between">
          <div className="flex flex-col gap-1 tablet:gap-2 pc:gap-2">
            <div className="text-16-20-response font-semibold">{userData.name}</div>
            <div className="space-y-0.5 text-13-15-response text-gray-400">
              <div>이메일: {userData.email}</div>
              <div>가입날짜: {userData.createdAt}</div>
            </div>
          </div>
          <div>
            <button
              className="rounded-full bg-blue-800 px-2 py-1 text-xs text-white duration-200 hover:scale-[1.02] active:scale-[0.9] md:px-7 md:py-1.5 md:text-sm"
              type="button"
              onClick={openModal}
            >
              수정하기
            </button>
          </div>
          <Modal
            buttons={[
              { label: '취소', onClick: () => closeModal },
              { label: '수정하기', onClick: () => closeModal },
            ]}
            isOpen={isOpen}
            onClose={closeModal}
          >
            <div className="flex flex-col gap-5 px-6 pt-6">
              <div className="text-2lg font-semibold">프로필 수정하기</div>
              <Image src={userData.image} alt="프로필 이미지" width={56} height={56} style={{ objectFit: 'cover' }} />
              <Input type="text" name="nick" />
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
}
