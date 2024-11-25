interface CardInfo {
  bgColorClass: string;
  description: string[];
  title: string;
  type: string;
}

export const FRONTEND_CARDS: CardInfo[] = [
  {
    type: 'web',
    title: '- 은동혁 -',
    description: [
      '⚬ 랜딩 페이지',
      'Framer Motion',
      '⚬ 모임 찾기 페이지 (메인 페이지)',
      '모임 검색, 카테고리,필터 기능,',
      '(Cursor 기반) 무한 스크롤',
      '⚬ 찜한 모임 페이지',
      '모임 검색, 카테고리,필터 기능,',
      '(Offset 기반) 페이지네이션',
      '⚬ 소개 페이지',
      'Framer Motion',
    ],
    bgColorClass: 'bg-[#fd4872]',
  },
  {
    type: 'web',
    title: '- 이용환 -',
    description: ['⚬ 로그인 & 회원가입', '- accessToken, refreshToken'],
    bgColorClass: 'bg-[#fd4872]',
  },
  {
    type: 'web',
    title: '- 장소희 -',
    description: ['⚬ 마이 페이지', '- ~~~~~~'],
    bgColorClass: 'bg-[#fd4872]',
  },
  {
    type: 'web',
    title: '- 이인지 -',
    description: ['⚬ 모든 리뷰 페이지', '- ~~~~~'],
    bgColorClass: 'bg-[#fd4872]',
  },
];

export const BACKEND_CARDS: CardInfo[] = [
  {
    type: 'server',
    title: '- 오예령 -',
    description: ['⚬ 랜딩 페이지', '⚬ 랜딩 페이지'],
    bgColorClass: 'bg-[#3FD9F9]',
  },
  {
    type: 'server',
    title: '- 강병훈 -',
    description: ['⚬ 랜딩 페이지', '⚬ 랜딩 페이지'],
    bgColorClass: 'bg-[#3FD9F9]',
  },
];

export const DESIGNER_CARDS: CardInfo[] = [
  {
    type: 'design',
    title: '- 권하은 -',
    description: ['⚬ 랜딩 페이지', '⚬ 랜딩 페이지'],
    bgColorClass: 'bg-[#cdf86f]',
  },
];

export const CARDS: Record<string, CardInfo[]> = {
  frontend: FRONTEND_CARDS,
  backend: BACKEND_CARDS,
  designer: DESIGNER_CARDS,
};
