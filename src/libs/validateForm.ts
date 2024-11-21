import { Toast } from '@/components/shared/Toast';

function isDoubleChecked(doubleCheck: boolean): boolean {
  if (!doubleCheck) {
    Toast('error', '중복 확인을 해주세요.');
    return false;
  }
  return true;
}

function isValidNickname(nick: string): boolean {
  if (nick.length > 1 && nick.length < 3) {
    Toast('error', '닉네임은 영문, 숫자만 사용가능하며 3자 이상이어야 합니다.');
    return false;
  }
  return true;
}

function isValidPassword(password: string): boolean {
  if (password.length < 8) {
    Toast('error', '비밀번호는 8자 이상이어야 합니다.');
    return false;
  }
  return true;
}

function isPasswordMatching(password: string, passwordCheck: string): boolean {
  if (password !== passwordCheck) {
    Toast('error', '비밀번호가 일치하지 않습니다.');
    return false;
  }
  return true;
}

function isValidEmailFormat(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    Toast('error', '이메일 형식을 확인해주세요.');
    return false;
  }
  return true;
}

function isNotEditted(nick: string, imagePreview: string): boolean {
  if (!nick.trim() && !imagePreview) {
    Toast('error', '프로필 혹은 닉네임을 수정해주세요.');
    return false;
  }
  return true;
}

export { isDoubleChecked, isNotEditted,isPasswordMatching, isValidEmailFormat,isValidNickname, isValidPassword };