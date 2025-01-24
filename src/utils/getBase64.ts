import fs from 'node:fs/promises';
import path from 'node:path';
import { getPlaiceholder } from 'plaiceholder';

const getBase64 = async (src: string) => {
  // public 폴더 내 이미지 파일을 버퍼로 읽어옴
  const buffer = await fs.readFile(path.join('./public', src));

  // plaiceholder로 이미지 처리
  // size: 10은 생성될 blur 이미지의 크기 (작을수록 base64 문자열이 짧아짐)
  const {
    metadata: { height, width },
    ...plaiceholder
  } = await getPlaiceholder(buffer, { size: 10 });

  return {
    ...plaiceholder, // base64 등의 데이터
    img: { src, height, width }, // 원본 이미지 정보
  };
};

export default getBase64;
