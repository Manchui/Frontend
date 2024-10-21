import Image from 'next/image';
import Link from 'next/link';

export default function Drawer() {
  return (
    <button>
      <Image src="/icons/menu.svg" alt="메뉴 " width={38} height={38} />

      <div className="hidden">
        <ul>
          <li>
            <Link href="/main">모임 찾기</Link>
          </li>
          <li>
            <Link href="/bookmark">찜한 모임</Link>
          </li>
          <li>
            <Link href="/mypage">모든 리뷰</Link>
          </li>
        </ul>
      </div>
    </button>
  );
}
