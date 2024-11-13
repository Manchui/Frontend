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
    // if (!nick.trim() && !imagePreview) {
    //   Toast('error', '프로필 혹은 닉네임을 수정해주세요.');
    //   return;
    // }
    const [editVal, nickVal] = [
      validator.isNotEditted(nick, imagePreview),
      validator.isValidNickname(nick),
    ];
    if(!editVal || !nickVal) return; 
    await editUserInfo(nick || userInfo.name, imagePreview || userInfo.image);
  };

  const handleImageClick = () => {
    document.getElementById('imageInput')?.click();
  };

  return (
    <div className="relative m-auto h-auto w-full rounded-3xl p-2.5 tablet:p-4 pc:p-5">
      <div className="absolute left-[4%] top-[-40%] rounded-full bg-white p-1 phablet:left-[7%] tablet:left-[6%] pc:left-[8.5%]">
        <Image
          className="size-[60px] rounded-full object-cover phablet:size-[70px] md:size-[90px]"
          src={userInfo.image}
          alt="프로필 이미지"
          width={70}
          height={70}
        />
      </div>
      <div className="flex">
        <div className="m-2 size-1/6 phablet:size-1/5 tablet:size-1/6" />
        <div className="flex flex-1 justify-between">
          <div className="flex flex-col gap-1 tablet:gap-2 pc:gap-2">
            <div className="text-16-20-response font-semibold">{userInfo.name}</div>
            <div className="space-y-0.5 text-13-15-response text-gray-400">
              <div>이메일: {userInfo.email}</div>
              <div>가입날짜: {userInfo.createdAt}</div>
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
      </div>
    </div>
  );
}
