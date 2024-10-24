import MeetingCard from '@/components/mypage/meeting-card/MeetingCard';
import { ProfileCard } from '@/components/mypage/profile-card/ProfileCard';
import RootLayout from '@/components/shared/RootLayout';
import type { User } from '@/types/mypage';

const Data: User = {
  id: 'UUID',
  email: 'aaaa@gmail.com',
  name: 'hhihih',
  image: '/images/together-findpage-default.png',
};

const tt = [1, 2];
export default function MyPage() {
  return (
    <RootLayout>
      <div className="flex flex-col justify-center">
        <h1 className="text-lg font-semibold">마이 페이지</h1>
        <ProfileCard userData={Data} />
        <div className="flex flex-col gap-6">
          <div>태그</div>
          {tt.map((i) => (
            <MeetingCard key={i} />
          ))}
        </div>
      </div>
    </RootLayout>
  );
}
