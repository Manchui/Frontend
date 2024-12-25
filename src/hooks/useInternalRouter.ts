import { type Url } from 'next/dist/shared/lib/router/router';
import { useRouter } from 'next/router';

type LandingPath = '/';
type LoginPath = '/login';
type SignupPath = '/signup';
type MainPath = '/main';
type CreatePath = '/create';
type ReviewPath = '/review';
type DetailPath = '/detail';
type BookmarkPath = '/bookmark';
type MyPagePath = '/mypage';
type IntroducePath = '/introduce';
type NoticeBoardPath = '/noticeboard';
type FAQPath = '/faq';

// 프로젝트에서 사용할 내부 경로 타입을 하나로 통합합니다.
export type InternalPaths =
  | LandingPath
  | LoginPath
  | SignupPath
  | MainPath
  | CreatePath
  | ReviewPath
  | DetailPath
  | BookmarkPath
  | MyPagePath
  | IntroducePath
  | NoticeBoardPath
  | FAQPath;

interface TransitionOptions {
  locale?: string | false;
  scroll?: boolean;
  shallow?: boolean;
  unstable_skipClientCache?: boolean;
}

/**
 * @description
 * useRouter의 push 메서드를 InternalPaths 타입을 적용해 타입 안전한 'push' 메서드를 제공하는 커스텀 훅입니다.
 * push 외의 메서드는 Next.js의 useRouter와 동일하게 사용할 수 있습니다.
 *
 * @example
 * router.push('/') - 로그인 페이지 이동
 * router.push('/main', undefined, { scroll: false }) - 옵션 사용(페이지 상단으로 스크롤하지 않음)
 * router.push('/detail', `/detail/${gatheringId}`) - 다이나믹 라우팅(타입 안정성 유지하면서 as에 실제 URL 지정)
 * router.push('/mypage', undefined, { shallow: true }); - shallow 옵션 사용해 URL만 변경
 */
const useInternalRouter = () => {
  const router = useRouter();

  return {
    ...router,
    push: (path: InternalPaths, as?: Url, options?: TransitionOptions) => router.push(path, as, options),
  };
};

export default useInternalRouter;
