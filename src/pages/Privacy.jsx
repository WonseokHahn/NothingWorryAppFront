import { motion } from 'framer-motion'

const Privacy = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-pixel text-toxic-green mb-4">
          개인정보처리방침
        </h1>
        <p className="text-gray-400 font-retro">
          무의미한 위로소는 사용자의 개인정보를 소중히 다룹니다.
        </p>
      </motion.div>

      <div className="card-retro space-y-6 text-sm font-retro leading-relaxed">
        <section>
          <h2 className="text-xl text-vhs-purple mb-3">1. 수집하는 개인정보</h2>
          <div className="text-gray-300 space-y-2">
            <p><strong>회원가입 시:</strong></p>
            <ul className="list-disc list-inside ml-4">
              <li>이메일 주소</li>
              <li>사용자명</li>
              <li>비밀번호 (암호화하여 저장)</li>
            </ul>
            <p className="mt-4"><strong>서비스 이용 시:</strong></p>
            <ul className="list-disc list-inside ml-4">
              <li>감정 기록 및 AI 응답</li>
              <li>IP 주소</li>
              <li>접속 로그</li>
              <li>쿠키 및 유사 기술</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-xl text-vhs-purple mb-3">2. 개인정보의 이용 목적</h2>
          <ul className="text-gray-300 list-disc list-inside space-y-1">
            <li>회원 관리 및 본인 확인</li>
            <li>서비스 제공 및 개선</li>
            <li>맞춤형 감정 위로 서비스 제공</li>
            <li>통계 분석 및 서비스 개선</li>
            <li>고객 문의 응대</li>
            <li>서비스 관련 공지사항 전달</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl text-vhs-purple mb-3">3. 개인정보의 보유 및 이용기간</h2>
          <div className="text-gray-300 space-y-2">
            <p><strong>원칙:</strong> 회원 탈퇴 시까지 보유</p>
            <p><strong>예외:</strong></p>
            <ul className="list-disc list-inside ml-4">
              <li>법령에서 정한 경우 해당 기간까지 보유</li>
              <li>탈퇴 후 즉시 파기 (복구 불가능)</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-xl text-vhs-purple mb-3">4. 개인정보의 제3자 제공</h2>
          <p className="text-gray-300">
            무의미한 위로소는 원칙적으로 사용자의 개인정보를 외부에 제공하지 않습니다.
            다만, 다음의 경우 예외로 합니다:
          </p>
          <ul className="text-gray-300 list-disc list-inside ml-4 mt-2">
            <li>사용자가 사전에 동의한 경우</li>
            <li>법령의 규정에 의거하거나 수사 목적으로 법령에 정해진 절차와 방법에 따라 요구가 있는 경우</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl text-vhs-purple mb-3">5. 쿠키 및 광고</h2>
          <div className="text-gray-300 space-y-2">
            <p>본 사이트는 다음 목적으로 쿠키를 사용합니다:</p>
            <ul className="list-disc list-inside ml-4">
              <li>로그인 상태 유지</li>
              <li>사용자 경험 개선</li>
              <li>통계 분석</li>
            </ul>

            <p className="mt-4"><strong>Google AdSense:</strong></p>
            <p>
              본 사이트는 Google AdSense를 사용하여 광고를 표시합니다.
              Google은 쿠키를 사용하여 사용자의 관심사에 맞는 광고를 제공합니다.
            </p>
            <p className="mt-2">
              Google 개인정보처리방침:{' '}
              <a
                href="https://policies.google.com/privacy"
                className="text-toxic-green hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://policies.google.com/privacy
              </a>
            </p>
            <p className="mt-2">
              맞춤 광고 거부:{' '}
              <a
                href="https://www.google.com/settings/ads"
                className="text-toxic-green hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google 광고 설정
              </a>
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl text-vhs-purple mb-3">6. 개인정보의 안전성 확보 조치</h2>
          <ul className="text-gray-300 list-disc list-inside space-y-1">
            <li>비밀번호 암호화 (bcrypt)</li>
            <li>HTTPS를 통한 안전한 통신</li>
            <li>접근 권한 관리</li>
            <li>정기적인 보안 업데이트</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl text-vhs-purple mb-3">7. 사용자의 권리</h2>
          <div className="text-gray-300 space-y-2">
            <p>사용자는 언제든지 다음의 권리를 행사할 수 있습니다:</p>
            <ul className="list-disc list-inside ml-4">
              <li>개인정보 열람 요구</li>
              <li>개인정보 수정 요구</li>
              <li>개인정보 삭제 요구</li>
              <li>개인정보 처리 정지 요구</li>
              <li>회원 탈퇴</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-xl text-vhs-purple mb-3">8. 개인정보 보호책임자</h2>
          <div className="text-gray-300">
            <p>개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리를 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.</p>
            <div className="mt-3 bg-gray-800/50 p-4 rounded-lg">
              <p><strong>개인정보 보호책임자:</strong> 무의미한 위로소 운영자</p>
              <p><strong>이메일:</strong> privacy@meaningless-consolation.com</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl text-vhs-purple mb-3">9. 개인정보처리방침 변경</h2>
          <p className="text-gray-300">
            본 개인정보처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.
          </p>
        </section>

        <div className="border-t border-gray-700 pt-6 mt-8">
          <p className="text-gray-500 text-xs">
            <strong>공고일자:</strong> 2025년 10월 12일
            <br />
            <strong>시행일자:</strong> 2025년 10월 12일
          </p>
        </div>
      </div>
    </div>
  )
}

export default Privacy
