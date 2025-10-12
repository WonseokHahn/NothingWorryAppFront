import { motion } from 'framer-motion'

const Terms = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-pixel text-toxic-green mb-4">
          이용약관
        </h1>
        <p className="text-gray-400 font-retro">
          무의미한 위로소 서비스 이용약관입니다.
        </p>
      </motion.div>

      <div className="card-retro space-y-6 text-sm font-retro leading-relaxed">
        <section>
          <h2 className="text-xl text-vhs-purple mb-3">제1조 (목적)</h2>
          <p className="text-gray-300">
            본 약관은 무의미한 위로소(이하 "서비스")가 제공하는 AI 기반 감정 위로 서비스의 이용과 관련하여 서비스 제공자와 이용자의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
          </p>
        </section>

        <section>
          <h2 className="text-xl text-vhs-purple mb-3">제2조 (정의)</h2>
          <div className="text-gray-300 space-y-2">
            <p>본 약관에서 사용하는 용어의 정의는 다음과 같습니다:</p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li><strong>"서비스"</strong>란 무의미한 위로소가 제공하는 모든 서비스를 의미합니다.</li>
              <li><strong>"이용자"</strong>란 본 약관에 따라 서비스를 이용하는 회원 및 비회원을 말합니다.</li>
              <li><strong>"회원"</strong>이란 서비스에 가입하여 이용하는 자를 말합니다.</li>
              <li><strong>"감정 기록"</strong>이란 이용자가 서비스를 통해 입력한 감정 및 AI의 응답을 말합니다.</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-xl text-vhs-purple mb-3">제3조 (서비스의 내용)</h2>
          <div className="text-gray-300 space-y-2">
            <p>본 서비스는 다음과 같은 AI 기반 감정 위로 기능을 제공합니다:</p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li><strong>감정 쓰레기통:</strong> 부정적 감정을 입력하고 B급 철학적 위로 받기</li>
              <li><strong>오늘도 아무 일 없었다:</strong> 하루 일과를 무의미하게 요약</li>
              <li><strong>운세보다 쓸모없는 예언:</strong> 1일 1회 무의미한 예언</li>
              <li><strong>미루기 정당화:</strong> 미루는 일의 철학적 정당화</li>
              <li><strong>감정 기록:</strong> 과거 감정 기록 열람 및 관리</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-xl text-vhs-purple mb-3">제4조 (서비스 이용계약의 성립)</h2>
          <div className="text-gray-300 space-y-2">
            <p>1. 이용계약은 이용자가 회원가입 시 본 약관에 동의하고, 서비스 제공자가 이를 승낙함으로써 성립됩니다.</p>
            <p>2. 서비스 제공자는 다음 각 호에 해당하는 경우 승낙을 거부할 수 있습니다:</p>
            <ul className="list-disc list-inside ml-4">
              <li>타인의 명의를 사용한 경우</li>
              <li>허위 정보를 기재한 경우</li>
              <li>사회의 안녕질서 또는 미풍양속을 저해할 목적으로 신청한 경우</li>
              <li>기타 서비스 제공자가 정한 이용 조건을 충족하지 못한 경우</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-xl text-vhs-purple mb-3">제5조 (서비스 이용시간)</h2>
          <p className="text-gray-300">
            1. 서비스는 연중무휴, 1일 24시간 제공함을 원칙으로 합니다.
            <br />
            2. 정기점검, 서버 장애, 기타 불가피한 사유로 서비스가 일시 중단될 수 있으며, 이 경우 사전에 공지합니다.
          </p>
        </section>

        <section>
          <h2 className="text-xl text-vhs-purple mb-3">제6조 (이용자의 의무)</h2>
          <div className="text-gray-300 space-y-2">
            <p>이용자는 다음 행위를 하여서는 안 됩니다:</p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>허위 정보 입력 또는 타인의 정보 도용</li>
              <li>서비스의 정상적인 운영을 방해하는 행위</li>
              <li>타인의 명예를 훼손하거나 불이익을 주는 행위</li>
              <li>음란물, 불법 정보 등을 게시하는 행위</li>
              <li>서비스의 정보를 무단으로 수집, 복사, 배포하는 행위</li>
              <li>자동화된 수단을 사용하여 서비스를 부정 이용하는 행위</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-xl text-vhs-purple mb-3">제7조 (서비스 제공자의 의무)</h2>
          <div className="text-gray-300 space-y-2">
            <p>1. 서비스 제공자는 안정적인 서비스 제공을 위해 최선을 다합니다.</p>
            <p>2. 서비스 제공자는 이용자의 개인정보를 보호하기 위해 개인정보처리방침을 수립하고 준수합니다.</p>
            <p>3. 서비스 제공자는 이용자의 의견을 소중히 여기며, 합리적인 범위 내에서 반영하도록 노력합니다.</p>
          </div>
        </section>

        <section>
          <h2 className="text-xl text-vhs-purple mb-3">제8조 (면책사항)</h2>
          <div className="text-gray-300 space-y-2">
            <p className="bg-yellow-900/20 border border-yellow-700 rounded-lg p-4">
              <strong>⚠️ 중요:</strong> 본 서비스는 <strong>엔터테인먼트 목적</strong>으로 제공되며, AI의 응답은 <strong>진지한 상담이나 의학적 조언이 아닙니다.</strong>
            </p>
            <p>서비스 제공자는 다음 사항에 대해 책임을 지지 않습니다:</p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>AI 응답의 정확성, 적절성, 유용성</li>
              <li>서비스 이용으로 인한 정신적, 감정적 영향</li>
              <li>천재지변, 불가항력으로 인한 서비스 중단</li>
              <li>이용자의 귀책사유로 인한 서비스 이용 장애</li>
              <li>무료로 제공되는 서비스의 품질</li>
            </ul>
            <p className="mt-4">
              <strong>정신건강 주의사항:</strong> 실제 정신건강 문제가 있는 경우, 전문가(정신과 의사, 심리상담사 등)와 상담하시기 바랍니다.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl text-vhs-purple mb-3">제9조 (저작권)</h2>
          <div className="text-gray-300 space-y-2">
            <p>1. 서비스 내 모든 콘텐츠(디자인, 텍스트, 이미지 등)의 저작권은 서비스 제공자에게 있습니다.</p>
            <p>2. 이용자가 생성한 감정 기록의 저작권은 이용자에게 있으나, 서비스 개선을 위한 통계 분석 목적으로 사용될 수 있습니다.</p>
            <p>3. AI가 생성한 응답은 서비스의 일부로, 상업적 목적으로 재사용할 수 없습니다.</p>
          </div>
        </section>

        <section>
          <h2 className="text-xl text-vhs-purple mb-3">제10조 (회원 탈퇴 및 자격 상실)</h2>
          <div className="text-gray-300 space-y-2">
            <p>1. 회원은 언제든지 탈퇴를 요청할 수 있으며, 탈퇴 즉시 모든 데이터가 삭제됩니다.</p>
            <p>2. 회원이 다음 각 호에 해당하는 경우, 서비스 제공자는 사전 통보 후 회원 자격을 제한 또는 정지시킬 수 있습니다:</p>
            <ul className="list-disc list-inside ml-4">
              <li>가입 시 허위 정보를 기재한 경우</li>
              <li>타인의 서비스 이용을 방해하거나 정보를 도용한 경우</li>
              <li>서비스의 운영을 고의로 방해한 경우</li>
              <li>본 약관을 위반한 경우</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-xl text-vhs-purple mb-3">제11조 (손해배상)</h2>
          <p className="text-gray-300">
            서비스 제공자와 이용자는 서비스 이용과 관련하여 발생한 손해에 대해 귀책사유가 있는 경우 손해배상 책임을 집니다. 다만, 무료 서비스의 경우 고의 또는 중과실이 없는 한 책임을 지지 않습니다.
          </p>
        </section>

        <section>
          <h2 className="text-xl text-vhs-purple mb-3">제12조 (분쟁 해결)</h2>
          <p className="text-gray-300">
            1. 본 약관과 관련하여 분쟁이 발생한 경우, 당사자 간 협의를 우선으로 합니다.
            <br />
            2. 협의가 이루어지지 않을 경우, 관련 법령 및 서비스 제공자의 소재지 법원을 관할 법원으로 합니다.
          </p>
        </section>

        <section>
          <h2 className="text-xl text-vhs-purple mb-3">제13조 (약관의 변경)</h2>
          <p className="text-gray-300">
            1. 서비스 제공자는 필요한 경우 약관을 변경할 수 있으며, 변경 시 시행일 7일 전 공지합니다.
            <br />
            2. 이용자가 변경된 약관에 동의하지 않을 경우, 서비스 이용을 중단하고 탈퇴할 수 있습니다.
            <br />
            3. 변경 공고 후 7일 내에 이의를 제기하지 않으면 약관 변경에 동의한 것으로 간주합니다.
          </p>
        </section>

        <div className="border-t border-gray-700 pt-6 mt-8">
          <p className="text-gray-500 text-xs">
            <strong>공고일자:</strong> 2025년 10월 12일
            <br />
            <strong>시행일자:</strong> 2025년 10월 12일
            <br />
            <strong>버전:</strong> 1.0
          </p>
        </div>
      </div>
    </div>
  )
}

export default Terms
