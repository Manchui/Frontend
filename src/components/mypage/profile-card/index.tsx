import Image from 'next/image';
import Input from '@/components/shared/Input';
import Modal from '@/components/shared/Modal';
import { useModal } from '@/hooks/useModal';
import type { User } from '@/types/mypage';

export function ProfileCard({ userData }: { userData: User }) {
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <div className="relative m-auto h-auto w-full rounded-3xl p-5">
      <div className="absolute -top-1/4 right-3/4 rounded-full bg-white p-1 tablet:-top-1/3 pc:-top-1/3">
        <Image src={userData.image} alt="프로필 이미지" width={100} height={100} style={{ objectFit: 'cover' }} />
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col gap-1 tablet:gap-2 pc:gap-2">
          <div className="text-base font-semibold tablet:text-lg pc:text-lg">{userData.name}</div>
          <div className="space-y-0.5 text-xs text-gray-400 tablet:text-sm pc:text-sm">
            <div>이메일: {userData.email}</div>
            <div>가입날짜: {userData.email}</div>
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
        <Modal buttons={[{ label: '취소', onClick: () => closeModal }]} isOpen={isOpen} onClose={closeModal}>
          <div className="p-4">
            <div className="text-lg">프로필 수정하기</div>
            <Image src={userData.image} alt="프로필 이미지" width={40} height={40} style={{ objectFit: 'cover' }} />
            <div>{userData.name}</div>
            <Input type="text" name="nick" />
          </div>
        </Modal>
      </div>
    </div>
  );
}
