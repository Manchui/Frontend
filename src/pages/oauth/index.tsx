/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getSocialAccess, getUserInfo } from '@/apis/user/getUser';
import Loading from '@/components/shared/Loading';
import { Toast } from '@/components/shared/Toast';
import useInternalRouter from '@/hooks/useInternalRouter';
import { formatDate } from '@/libs/formatDate';
import { userStore } from '@/store/userStore';

function OAuth() {
  const router = useRouter();
  const { code } = router.query;
  const routerInternal = useInternalRouter();
  const loginStore = userStore((state) => state.login);
  const userUpdate = userStore((state) => state.updateUser);
  const isLoggedIn = userStore((state) => state.isLoggedIn);

  useEffect(() => {
    async function handleOAuth() {
      if (!code) return;

      const social = sessionStorage.getItem('social');
      try {
        if (!social) {
          throw new Error('Social is null');
        }
        const result = await getSocialAccess(social, code as string);
        if (result) {
          loginStore(); // 로그인 상태 갱신
        } else if (!result) {
          await routerInternal.push('/login');
        }
      } catch (error) {
        Toast('error', '오류가 발생했습니다. 다시 시도해주세요.');
        await routerInternal.push('/login');
        throw error;
      }
    }

    void handleOAuth();
  }, [code, loginStore, routerInternal]);

  useEffect(() => {
    async function fetchUserData() {
      if (!isLoggedIn) return;

      try {
        const userData = await getUserInfo();
        userUpdate({
          email: userData.res?.email || '',
          id: userData.res?.id || '',
          image: userData.res?.image || '/images/together-findpage-large.png',
          name: userData.res?.name || '',
          createdAt: userData.res?.createdAt ? formatDate(userData.res.createdAt) : '',
        });
        Toast('success', '로그인 성공');
        await routerInternal.push('/main');
      } catch (error) {
        Toast('error', '사용자 정보를 불러오는데 실패했습니다.');
        throw error;
      }
    }

    void fetchUserData();
  }, [isLoggedIn, routerInternal, userUpdate]);

  return (
    <div>
      <div className="flex flex-col items-center">
        <Loading />
      </div>
    </div>
  );
}
export default OAuth;
