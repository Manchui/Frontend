import { Button } from '@/components/shared/button';
import { Toast } from '@/components/shared/Toast';

export default function ShareButton() {
  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      Toast('success', 'URL이 복사되었습니다!');
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      Toast('error', 'URL 복사 실패');
    }
  };

  return <Button onClick={handleShare} label="공유하기" size="small" variant="primary" />;
}
