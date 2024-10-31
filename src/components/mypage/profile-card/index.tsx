import Image from 'next/image';
import Input from '@/components/shared/Input';
import Modal from '@/components/shared/Modal';
import { useModal } from '@/hooks/useModal';
import type { User } from '@/types/mypage';

export function ProfileCard({ userData }: { userData: User }) {
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <div className="relative m-auto h-[178px] w-full rounded-3xl bg-white p-5">
      <Image src={userData.image} alt="프로필 이미지" width={40} height={40} style={{ objectFit: 'cover' }} />
      <div className="flex justify-between">
        <div className="flex flex-col">
          <div>{userData.name}</div>
          <div>
            <span>E-mail.</span>
            {userData.email}
          </div>
        </div>
        <div>
          <button
            className="rounded-full bg-blue-800 px-2 py-1 text-xs text-white duration-200 hover:scale-[1.02] active:scale-[0.9] md:px-7 md:py-[6px] md:text-sm"
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
