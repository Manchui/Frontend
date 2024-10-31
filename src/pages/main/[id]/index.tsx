import { useRouter } from 'next/router';
import RootLayout from '@/components/shared/RootLayout';

export default function MainidPage() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <RootLayout>
      <div className='pt-[60px]'>
        <h1>ID : {id}</h1>
      </div>
    </RootLayout>
  );
}
