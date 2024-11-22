/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getSocialAccess, getUserInfo } from '@/apis/user/getUser';
import Loading from '@/components/shared/Loading';
import { Toast } from '@/components/shared/Toast';
import useInternalRouter from '@/hooks/useInternalRouter';
import { formatDate } from '@/libs/formatDate';
import { userStore } from '@/store/userStore';
import { useQuery } from '@tanstack/react-query';

export default function OAuth() {
  const router = useRouter();
  const { code } = router.query;
  const routerInternal = useInternalRouter();
  const loginStore = userStore((state) => state.login);
  const userUpdate = userStore((state) => state.updateUser);
  const isLoggedIn = userStore((state) => state.isLoggedIn);

  const { data, refetch } = useQuery({
    queryKey: ['queryUserInfo'],
    queryFn: getUserInfo,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 6,
  });
  
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
          loginStore();
        } else if (!result) {
          Toast('error', '서버에 문제가 있습니다. 새로고침 후 다시 시도해주세요.');
          await routerInternal.push('/login');
        }
      } catch (error) {
        Toast('error', '새로고침 후 다시 시도해주세요.');
        void routerInternal.push('/login');
        console.log(error);
      }
    }

    void handleOAuth();
  }, [code, loginStore, routerInternal]);

  const saveUserInfo = useCallback(() => {
    void refetch();
    console.log('refetch is called');
    userUpdate({
      email: data?.res?.email || '',
      id: data?.res?.id || '',
      image: data?.res?.image || '/images/together-findpage-large.png',
      name: data?.res?.name || '',
      createdAt: data?.res?.createdAt ? formatDate(data?.res.createdAt) : '',
    });
    void router.push('/main');
  }, [refetch, userUpdate, data?.res?.email, data?.res?.id, data?.res?.image, data?.res?.name, data?.res?.createdAt, router]);

  useEffect(() => {
    if (isLoggedIn) {
      saveUserInfo();
    }
  }, [isLoggedIn, saveUserInfo]);

  return (
    <div>
      <div className="flex flex-col items-center">
        <Loading />
      </div>
    </div>
  );
}
