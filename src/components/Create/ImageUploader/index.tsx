import React, { useRef, useState } from 'react';
import Image from 'next/image';

interface ImageUploaderProps {
  error: string;
  setSelectedImage: (image: File | null) => void;
}

export default function ImageUploader({ error, setSelectedImage }: ImageUploaderProps) {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      setSelectedImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageRemove = () => {
    setSelectedImage(null);
    setPreviewImage(null);
  };

  return (
    <div>
      <div className="flex items-baseline gap-1">
        <h2 className="mb-3 text-base font-semibold text-gray-900">이미지</h2>
        <span className="text-sm text-gray-400">({previewImage ? '1' : '0'}/1)</span>
      </div>

      <div className="scrollbar-hide -mt-3 flex items-center space-x-3 overflow-x-auto">
        <button
          type="button"
          className="mt-3 flex size-[100px] shrink-0 flex-col items-center justify-center rounded-lg border border-blue-200 text-sm font-medium text-blue-800 mobile:size-[150px]"
          onClick={handleButtonClick}
        >
          <Image src="/icons/+.svg" alt="+" width={18} height={18} className="mb-2" />
          이미지 등록
        </button>

        <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} style={{ display: 'none' }} />

        {previewImage && (
          <div className="relative mt-3 size-[100px] shrink-0 rounded-lg border border-blue-200 mobile:size-[150px]">
            <Image src={previewImage} alt="예시 이미지" layout="fill" objectFit="cover" className="rounded-lg" />
            <button
              type="button"
              className="absolute -right-2 -top-2 flex size-5 items-center justify-center rounded-full bg-black opacity-60"
              onClick={handleImageRemove}
            >
              <Image src="/icons/x-white.svg" alt="닫기" width={12} height={12} />
            </button>
          </div>
        )}
      </div>
      {error && <p className="-mb-2 mt-1 text-sm font-medium text-red-500">{error}을 등록하세요.</p>}
    </div>
  );
}
