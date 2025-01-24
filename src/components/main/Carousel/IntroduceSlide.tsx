import Image from 'next/image';
import Link from 'next/link';

const cards = [
  { bg: '#3FD9F9', id: 'server', img: '/images/position/server.min.svg' },
  { bg: '#fd4872', id: 'web', img: '/images/position/web.min.svg' },
  { bg: '#cdf86f', id: 'design', img: '/images/position/design.min.svg' },
] as const;

export default function IntroduceSlide() {
  return (
    <Link href="/introduce" className="mx-auto flex h-[300px] max-w-[1000px] flex-col justify-center gap-4 font-bold text-white">
      <h1 className="text-center text-2xl">▫ 만취 프로젝트 개발자 ▫</h1>
      <div className="flex justify-center gap-4">
        {cards.map(({ id, img, bg }) => (
          <div key={id} className="rounded-sm p-4" style={{ backgroundColor: bg }}>
            <Image src={img} alt={id} width={150} height={150} priority loading="eager" />
          </div>
        ))}
      </div>
    </Link>
  );
}
