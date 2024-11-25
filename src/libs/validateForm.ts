import { Toast } from '@/components/shared/Toast';

function isDoubleChecked(doubleCheck: boolean): boolean {
  if (!doubleCheck) {
    Toast('error', '중복 확인을 해주세요.');
    return false;
  }
  return true;
}
// TODO: SignupForm의 변경사항과 함께 참고해주세요.
function isValidNickname(nick: string): string | null {
  if (nick.length > 1 && nick.length < 3) {
    return '닉네임은 영문, 숫자만 사용가능하며 3자 이상이어야 합니다.';
  }
    return null;
}

function isValidPassword(password: string): string | null{
  if (password.length < 8) {
    return '비밀번호는 8자 이상이어야 합니다.';
  }
  return null;
}

function isPasswordMatching(password: string, passwordCheck: string): string | null {
  if (password !== passwordCheck) {
    return '비밀번호가 일치하지 않습니다.';
  }
    return null;
}

function isValidEmailFormat(email: string): string | null{
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return '이메일 형식을 확인해주세요.';
  }
  return null;
}

function isNotEditted(nick: string, imagePreview: string): string | null {
  if (!nick.trim() && !imagePreview) {
    return '프로필 혹은 닉네임을 수정해주세요.';
  }
  return null;
}

export { isDoubleChecked, isNotEditted,isPasswordMatching, isValidEmailFormat,isValidNickname, isValidPassword };