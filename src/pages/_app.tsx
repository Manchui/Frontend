import '@/styles/globals.css';

import { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import { getUserInfo } from '@/apis/userApi';
import GNB from '@/components/shared/GNB';

export default function App({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const axiosUserData = async () => {
      const accessToken: string | null = localStorage.getItem('accessToken');
      if (accessToken) {
        const userData = await getUserInfo(accessToken);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        setUser(userData);
        if (userData) {
          setIsLoggedIn(true);  
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      }
      setIsLoading(false);
    };

    void axiosUserData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <GNB user={user || { email: null, id: null, img: '', nick: null }} isLoggedIn={isLoggedIn} />
      <Component {...pageProps} />
    </>
  );
}
