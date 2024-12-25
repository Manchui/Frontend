import Review1 from 'public/images/landing/review1.png';
import Review2 from 'public/images/landing/review2.png';
import Review3 from 'public/images/landing/review3.png';

export const LANDING_BUTTONS = [
  {
    number: '𝟏.',
    title: '간편한 회원가입',
    description: '간단히 아이디와 비밀번호만 입력하여 빠르게 가입하실 수 있습니다.',
    image: '/images/landing/landing-signup.png',
  },
  {
    number: '𝟐.',
    title: '간편한 모임 생성',
    description: '관심 있는 새로운 모임을 빠르게 직접 만들어 사람들을 초대하세요.',
    image: '/images/landing/landing-create.png',
  },
  {
    number: '𝟑.',
    title: '다양한 모임 참여',
    description: '모임 일정에 맞춰 함께 모여 활동을 즐기고, 새로운 사람들과 교류하세요.',
    image: '/images/landing/landing-moim.png',
  },
] as const;

interface PopularMeeting {
  colSpan: number;
  description: string;
  image?: string;
  title: string;
}

export const POPULAR_MEETINGS: PopularMeeting[] = [
  {
    title: '맛집탐방 모임',
    description: '새로운 맛집을 찾아다니며 미식의 즐거움을 나누는 모임입니다. 음식과 함께 추억도 쌓아 보세요.',
    colSpan: 2,
    image: '/icons/landing/notebook.webp',
  },
  {
    title: '러닝 모임',
    description: '조깅부터 마라톤 준비까지, 다양한 러닝 스타일을 즐길 수 있는 모임입니다.',
    colSpan: 2,
  },
  {
    title: '보드게임 모임',
    description: '다양한 보드게임을 즐기며 두뇌 회전과 재미를 동시에 즐길 수 있습니다.',
    colSpan: 2,
  },
  {
    title: '개발 모임',
    description: '프로그래밍, 웹 개발, 앱 제작 등 IT 기술을 함께 배우고 공유하며 실력을 키우는 모임입니다. 초보부터 전문가까지 누구나 참여할 수 있습니다.',
    colSpan: 3,
  },
  {
    title: '자기계발 모임',
    description: '독서, 시간 관리, 목표 설정 등 함께 배우며 성장하는 모임 입니다. 나 자신을 발전시킬 동기 부여를 얻을 수 있습니다.',
    colSpan: 3,
    image: '/icons/landing/pencil.webp',
  },
] as const;

export const REVIEW_DATA = [
  {
    name: '권OO',
    title: '부동산 스터디 모임',
    content:
      '부동산 스터디에 참여한 후, 시장에 대한 이해도가 크게 향상되었습니다. 다양한 사람들과 경험을 나누며 실전 지식을 쌓을 수 있었고, 투자에 대한 자신감도 얻었습니다. 실제 사례를 통해 배운 점이 많아 매우 유익한 시간이었습니다.',
    image: Review1,
  },
  {
    name: '김OO',
    title: '요리 클래스 모임',
    subtitle: '',
    content:
      '이번 모임은 정말 뜻깊었어요! 처음 만난 분과 취미에 대해 이야기하며 즐거운 시간을 보냈습니다. 특히 요리 클래스가 인상 깊었고, 새로운 친구들도 많이 사귀었어요. 앞으로도 이런 모임이 자주 열렸으면 좋겠습니다!',
    image: Review2,
  },
  {
    name: '박OO',
    title: '보드게임 모임',
    content:
      '보드게임 모임에서 많은 재미를 느꼈어요. 팀원들과 함께 여러가지 보드게임 했던 과정이 즐겁고 많은 유대감을 쌓았어요. 다양한 게임을 하면서 집중력도 키울 수 있었습니다. 이렇게 사람들과 함께 즐기니 더 기억에 남는 시간이었어요.',
    image: Review3,
  },
] as const;
