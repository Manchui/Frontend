import { useCallback, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import * as m from 'framer-motion/m';
import Image from 'next/image';
import { LANDING_BUTTONS } from '@/constants/landing';

export default function LandingFeature() {
  const [selectedImage, setSelectedImage] = useState<string>(LANDING_BUTTONS[0].image);

  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  const handleButtonClick = useCallback((image: string) => {
    setSelectedImage(image);
  }, []);

  return (
    <section className="relative min-h-screen select-none">
      <div className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2">
        <m.article
          ref={ref}
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 1.2, delay: 0.2 }}
        >
          <header className="text-center">
            <h2 className="text-landing-title font-bold leading-[100%] text-black">
              만취에서 쉽고 <span className="text-primary-400">빠르게 모임</span>을 만들고,
              <br />
              <span className="text-primary-400">다양한 활동</span>에 참여하세요.
            </h2>
            <p className="mt-4 text-balance text-center text-16-20-response font-medium">몇번의 클릭만으로 당신의 관심사를 함께할 사람들을 만나보세요.</p>
          </header>
        </m.article>
        <m.section
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="mx-auto mt-5 flex w-full max-w-[1200px] justify-center mobile:mt-10 tablet:mt-20"
        >
          <nav className="relative flex h-[350px] max-w-[510px] flex-1 flex-col divide-y">
            {LANDING_BUTTONS.map(({ number, title, description, image }) => (
              <button
                type="button"
                key={title}
                onClick={() => handleButtonClick(image)}
                className={`flex-1 px-7 py-5 text-16-20-response font-bold duration-300 before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-1 before:bg-black ${
                  selectedImage === image ? 'bg-black text-white' : ''
                } hover:bg-gray-50`}
              >
                <div className="flex items-center gap-2">
                  <span>{number}</span>
                  <h3>{title}</h3>
                </div>
                <div className="mt-2 text-left text-13-16-response font-medium">{description}</div>
              </button>
            ))}
          </nav>
          <figure className="relative hidden flex-1 bg-white tablet:block">
            <Image src={selectedImage} alt="main-image" fill className="absolute size-full object-contain" />
          </figure>
        </m.section>
      </div>
    </section>
  );
}
