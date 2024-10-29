import Image from 'next/image';
import Input from '@/components/shared/Input';
import Modal from '@/components/shared/Modal';
import { useModal } from '@/hooks/useModal';
import type { User } from '@/types/mypage';

export function ProfileCard({ userData }: { userData: User }) {
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <div className="relative m-auto h-[178px] rounded-3xl bg-white p-5">
      <div className="flex justify-between">
        <div className="text-lg font-semibold">내 프로필</div>
        <button className="duration-200 hover:scale-[1.02] active:scale-[0.9]" onClick={openModal} type="button">
          <Image src="/buttons/edit1-profile.svg" alt="이미지 수정 아이콘" width={32} height={32} />
        </button>
        <Modal buttons={[{ label: '취소', onClick: () => closeModal }]} isOpen={isOpen} onClose={closeModal}>
          <div className="p-4">
            <div className="text-lg">프로필 수정하기</div>
            <Image src={userData.image} alt="프로필 이미지" width={40} height={40} style={{ objectFit: 'cover' }} />
            <div>{userData.name}</div>
            <Input type="text" name="nick" />
          </div>
        </Modal>
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
