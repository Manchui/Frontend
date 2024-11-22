import { useState } from 'react';
import Image from 'next/image';
import { editUserInfo } from '@/apis/user/putUser';
import Input from '@/components/shared/Input';
import Modal from '@/components/shared/Modal';
import { useModal } from '@/hooks/useModal';
import * as validator from '@/libs/validateForm';
import { userStore } from '@/store/userStore';

export function ProfileCard() {
  const { isOpen, openModal, closeModal } = useModal();
  const [nick, setNick] = useState('');
  const userInfo = userStore((state) => state.user);
  const [imagePreview, setImagePreview] = useState('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files || null;
    if (!files) return;
    const previewUrl = URL.createObjectURL(files[0]);
    setImagePreview(previewUrl);
  };

  const handleEdit = async () => {
    const [editVal, nickVal] = [validator.isNotEditted(nick, imagePreview), validator.isValidNickname(nick)];
    if (!editVal || !nickVal) return;
    await editUserInfo(nick || userInfo.name, imagePreview || userInfo.image);
  };

  const handleImageClick = () => {
    document.getElementById('imageInput')?.click();
  };

  return (
    <article className="relative m-auto h-auto w-full rounded-3xl p-4">
      <div className="absolute left-[6%] top-[-30%] rounded-full bg-white p-1">
        <div className="size-[60px] tablet:size-[90px]">
          <Image className="relative rounded-full bg-background object-cover p-1" src={userInfo.image} alt="프로필 이미지" fill />
        </div>
      </div>
      <section className="flex pb-10">
        <div className="m-2 size-1/6" />
        <div className="flex flex-1 justify-between">
          <div className="flex flex-col gap-2">
            <div className="text-16-20-response font-semibold">{userInfo.name}</div>
            <div className="space-y-0.5 text-13-15-response text-gray-400">
              <div>이메일: {userInfo.email}</div>
              <div>가입날짜: {userInfo.createdAt}</div>
            </div>
          </div>
          <button
            className="max-h-8 rounded-full bg-blue-800 px-2 py-1.5 text-xs text-white duration-200 hover:scale-[1.02] active:scale-[0.9] md:px-7 md:text-sm"
            type="button"
            onClick={openModal}
          >
            수정하기
          </button>
          <Modal
            buttons={[
              { label: '취소', onClick: () => closeModal },
              {
                label: '수정하기',
                onClick: () => {
                  void handleEdit();
                },
              },
            ]}
            isOpen={isOpen}
            onClose={closeModal}
          >
            <div className="flex flex-col gap-5 px-6 pt-6">
              <div className="text-2lg font-semibold">프로필 수정하기</div>
              <div onClick={handleImageClick} className="relative size-14 cursor-pointer hover:opacity-80">
                <Image src={imagePreview || userInfo.image} alt="프로필 이미지" fill className="rounded-full border-2 border-blue-500 object-cover" />
              </div>

              <Input type="text" name="nick" nickValue={userInfo.name} onChange={(e) => setNick(e.target.value)} />
              <input id="imageInput" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            </div>
          </Modal>
        </div>
      </section>
    </article>
  );
}
