/**
 * @param beforeTime - 날짜 데이터 문자열
 * @returns 지나간 시간에 대한 문자열
 */
export const formatTimeAgo = (beforeTime: string) => {
  const currentTime = new Date().getTime();
  const updatedAtTime = new Date(beforeTime).getTime();

  const timeDifference = currentTime - updatedAtTime;
  const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
  const daysDifference = Math.floor(hoursDifference / 24);

  if (daysDifference > 0) {
    const remainingHours = hoursDifference % 24;

    return remainingHours > 0 ? `${daysDifference}일 ${remainingHours}시간 전` : `${daysDifference}일 전`;
  }

  return hoursDifference > 0 ? `${hoursDifference}시간 전` : '방금 전';
};
