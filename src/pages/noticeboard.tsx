import useInternalRouter from '@/hooks/useInternalRouter';

export default function NoticeBoard() {
  const router = useInternalRouter();

  return (
    <div onClick={() => router.push('/main')} className="flex-col-center min-h-screen">
      메인페이지 다시가기
    </div>
  );
}
