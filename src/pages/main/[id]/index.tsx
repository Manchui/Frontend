import { useRouter } from 'next/router';

export default function MainidPage() {
  const router = useRouter();
  const { id } = router.query;
  return <h1>ID : {id}</h1>;
}
