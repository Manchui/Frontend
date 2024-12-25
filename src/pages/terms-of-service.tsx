export default function TermsOfService() {
  return (
    <div className="mx-auto mt-[60px] max-w-3xl rounded-lg bg-white p-6 shadow-lg">
      <h1 className="mb-4 text-2xl font-bold">만취 이용약관</h1>

      <p className="mb-4">
        본 약관은 만취를 이용함에 있어 사용자와 웹사이트 간의 권리, 의무, 책임사항 및 기타 필요한 사항을 규정합니다.
      </p>

      <h2 className="mb-2 mt-6 text-xl font-semibold">1. 약관의 적용</h2>
      <p className="mb-4">본 약관은 만취 웹사이트를 이용하는 모든 사용자에게 적용됩니다. 사용자는 웹사이트를 이용함으로써 본 약관에 동의한 것으로 간주됩니다.</p>

      <h2 className="mb-2 mt-6 text-xl font-semibold">2. 서비스 이용</h2>
      <p className="mb-4">만취는 아래의 서비스를 제공합니다:</p>
      <ul className="mb-4 ml-6 list-disc">
        <li>사용자가 참여할 수 있는 다양한 모임 제공</li>
        <li>모임 및 사용자 리뷰 작성 기능</li>
        <li>개인 프로필 추가 기능</li>
        <li>개인 정보 수정 기능</li>
        <li>회원 탈퇴 기능</li>
      </ul>
      <p className="mb-4">
        만취는 안정적인 서비스 제공을 위해 최선을 다하지만, 서비스 제공이 일시적으로 중단될 수 있는 상황(예: 점검, 기술적 문제)에 대해 사전 공지합니다.
      </p>

      <h2 className="mb-2 mt-6 text-xl font-semibold">3. 사용자 의무</h2>
      <ul className="mb-4 ml-6 list-disc">
        <li>사용자는 만취 웹사이트의 서비스 이용 시 관련 법령 및 본 약관을 준수해야 합니다.</li>
        <li>타인의 정보를 도용하거나 부정확한 정보를 제공해서는 안 됩니다.</li>
        <li>불법적인 행위, 허위 정보 제공, 서비스 운영 방해 등을 하지 않아야 합니다.</li>
      </ul>

      <h2 className="mb-2 mt-6 text-xl font-semibold">4. 개인정보 보호</h2>
      <p className="mb-4">
        웹사이트는 사용자의 개인정보를 보호하며, 개인정보처리방침에 따라 안전하게 관리합니다. 자세한 내용은
        <strong> 개인정보처리방침</strong>을 참조하십시오.
      </p>

      <h2 className="mb-2 mt-6 text-xl font-semibold">5. 서비스 이용 제한</h2>
      <p className="mb-4">만취는 사용자가 다음의 행위를 할 경우 서비스 이용을 제한하거나 계정을 삭제할 수 있습니다:</p>
      <ul className="mb-4 ml-6 list-disc">
        <li>법령 또는 약관을 위반하는 행위</li>
        <li>다른 사용자의 권리를 침해하거나 피해를 주는 행위</li>
        <li>다른 사용자의 명에를 훼손하는 행위</li>
        <li>서비스 운영을 방해하거나 웹사이트의 명예를 훼손하는 행위</li>
      </ul>

      <h2 className="mb-2 mt-6 text-xl font-semibold">6. 책임의 한계</h2>
      <p className="mb-4">
        만취 웹사이트는 서비스 제공과 관련하여 발생할 수 있는 기술적 오류, 사용자 간 분쟁, 외부 요인으로 인한 문제 등에 대해 책임을 지지 않습니다. 다만, 서비스
        안정성을 위해 최선을 다합니다.
      </p>

      <h2 className="mb-2 mt-6 text-xl font-semibold">7. 약관의 변경</h2>
      <p className="mb-4">
        본 약관은 법령의 개정 또는 서비스 정책 변경에 따라 수정될 수 있으며, 변경 사항은 사전에 공지됩니다. 변경된 약관에 동의하지 않는 경우, 사용자는 서비스
        이용을 중단하고 계정을 삭제할 수 있습니다.
      </p>

      <h2 className="mb-2 mt-6 text-xl font-semibold">8. 기타</h2>
      <p className="mb-4">본 약관과 관련된 모든 분쟁은 관련 법령에 따라 해결되며, 관할 법원은 웹사이트 운영 소재지를 기준으로 합니다.</p>

      <p className="mt-6 text-sm text-gray-600">본 약관은 2024년 11월 21일부터 적용됩니다.</p>
    </div>
  );
}
