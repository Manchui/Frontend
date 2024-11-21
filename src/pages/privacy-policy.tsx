export default function PrivacyPolicy() {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-[60px]">
      <h1 className="text-2xl font-bold mb-4">만취 웹사이트 개인정보처리방침</h1>
      <p className="mb-4">
        만취 웹사이트(이하 “웹사이트”)는 사용자 여러분의 개인정보를 중요하게 생각하며, 관련 법령을 준수하여 안전하게 관리하고
        있습니다. 본 방침은 웹사이트에서 수집하는 개인정보의 종류, 사용 목적, 보관, 권리, 그리고 보안 조치에 대해 명시하고
        있습니다.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. 수집하는 개인정보</h2>
      <ul className="list-disc ml-6">
        <li>닉네임</li>
        <li>이메일</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. 개인정보의 수집 및 이용 목적</h2>
      <p className="mb-4">
        수집된 개인정보는 아래의 목적으로만 사용됩니다:
      </p>
      <ul className="list-disc ml-6 mb-4">
        <li>
          <strong>닉네임</strong>: 웹사이트에서 사용자 식별 및 계정 생성, 로그인 인증, 모임 및 리뷰 작성 시 활용.
        </li>
        <li>
          <strong>이메일</strong>: 사용자 계정 식별, 로그인 인증, 중요한 알림 및 계정 복구.
        </li>
      </ul>
      <p className="mb-4">본 웹사이트는 개인정보를 마케팅 목적으로 사용하지 않습니다.</p>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. 개인정보의 제3자 제공</h2>
      <p className="mb-4">
        원칙적으로 사용자의 개인정보를 제3자와 공유하지 않습니다. 단, Google 계정을 이용한 빠른 로그인 서비스를 제공하기 위해
        최소한의 정보가 Google과 공유될 수 있습니다. 이 과정은 Google의 개인정보 보호 정책을 따릅니다.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. 개인정보의 보관 및 이용 기간</h2>
      <p className="mb-4">
        개인정보는 웹사이트 사용 기간 동안 보관되며, 사용자 계정 삭제 요청 시 삭제됩니다. 계정 삭제 요청이 없을 경우, 수집된
        개인정보는 최종 활동일로부터 <strong>10년</strong>간 보관 후 안전하게 파기됩니다.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">5. 사용자의 권리</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>
          <strong>정보 수정 및 삭제</strong>: 마이페이지에서 닉네임 및 이메일 정보를 수정하거나 계정을 삭제할 수 있습니다.
        </li>
        <li>
          <strong>모임 및 리뷰 활동</strong>: 웹사이트 내 모임에 참여하거나 리뷰를 작성할 권리가 있습니다.
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">6. 개인정보 보호를 위한 보안 조치</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>개인정보는 암호화된 형태로 저장되며, 전송 시 SSL(Secure Socket Layer) 프로토콜을 통해 보호됩니다.</li>
        <li>개인정보에 대한 접근은 권한을 부여받은 관리자만 가능하며, 접근 기록은 정기적으로 점검합니다.</li>
        <li>서버 및 데이터베이스에 대한 보안 취약점 점검을 주기적으로 수행합니다.</li>
        <li>비정상적인 접근 시도를 탐지하고 차단하기 위한 시스템을 운영합니다.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">7. 개인정보처리방침의 변경</h2>
      <p className="mb-4">
        본 방침은 법령의 변경 또는 서비스 개선 등의 이유로 수정될 수 있으며, 변경 시 공지사항을 통해 사전에 안내합니다.
      </p>

      <p className="text-sm text-gray-600 mt-6">
        <strong>문의처</strong>: 개인정보와 관련된 문의 사항은 고객지원 이메일을 통해 접수할 수 있습니다.
      </p>
      <p className="text-sm text-gray-600">시행일: 2024년 11월 21일부터 적용됩니다.</p>
    </div>
  );
}