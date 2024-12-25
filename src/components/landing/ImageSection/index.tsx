import Image from 'next/image';

export default function ImageSection() {
  return (
    <section>
      <div className="h-[300px] w-full bg-primary-400">
        <div className="relative mx-auto size-full max-w-screen-pc">
          <Image src="/icons/notebook.webp" alt="노트북그림" width={300} height={150} className="absolute -bottom-9" />
          <Image
            src="/icons/pencil.webp"
            alt="그림 그리는그림"
            width={200}
            height={50}
            className="absolute -bottom-1 right-0 hidden -scale-x-100 tablet:block"
          />
        </div>
      </div>
    </section>
  );
}
