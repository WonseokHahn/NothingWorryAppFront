import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const About = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-5xl font-pixel text-toxic-green mb-4 glitch-text">
          무의미한 위로소
        </h1>
        <p className="text-2xl text-gray-400 font-retro mb-2">
          "의미는 없지만, 묘하게 위로되는 곳"
        </p>
        <p className="text-md text-gray-500 font-retro">
          — 오늘도 아무 일 없었던 당신에게 바칩니다.
        </p>
      </motion.div>

      {/* 메인 소개 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="card-retro bg-gradient-to-br from-vhs-purple/20 to-toxic-green/20"
      >
        <h2 className="text-3xl text-vhs-purple mb-4 font-pixel">📖 우리 이야기</h2>
        <div className="text-gray-300 leading-relaxed font-retro space-y-4">
          <p>
            무의미한 위로소는 현대인의 <strong className="text-toxic-green">허무</strong>와{' '}
            <strong className="text-toxic-green">짜증</strong>을 B급 철학으로 위로하는
            AI 기반 감정 케어 서비스입니다.
          </p>
          <p>
            진지하지 않지만 공감되는, 의미 없지만 웃음 나는 그런 위로를 제공합니다.
          </p>
          <p className="text-vhs-purple">
            왜냐고요? <strong>어차피 의미는 없으니까요.</strong>
          </p>
        </div>
      </motion.div>

      {/* 기능 소개 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {[
          { icon: '🗑️', title: '감정 쓰레기통', desc: '짜증나는 일을 버리세요' },
          { icon: '📜', title: '오늘도 아무 일 없었다', desc: '하루를 무의미하게 요약' },
          { icon: '🔮', title: '쓸모없는 예언', desc: '1일 1회 무의미한 예언' },
          { icon: '😴', title: '미루기 정당화', desc: '안 해도 되는 이유 찾기' },
        ].map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
            className="card-retro bg-gray-900/50 hover:bg-gray-800/50 transition-colors"
          >
            <div className="text-4xl mb-2">{feature.icon}</div>
            <h3 className="text-lg text-toxic-green mb-1">{feature.title}</h3>
            <p className="text-sm text-gray-400 font-retro">{feature.desc}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* 기술 스택 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="card-retro"
      >
        <h2 className="text-2xl text-vhs-purple mb-4 font-pixel">🛠️ 기술 스택</h2>
        <div className="flex flex-wrap gap-2">
          {['React', 'Express.js', 'OpenAI GPT-4', 'Tailwind CSS', 'Framer Motion', 'SQLite', 'JWT'].map((tech) => (
            <span
              key={tech}
              className="px-4 py-2 bg-vhs-purple/20 border border-vhs-purple rounded-lg text-sm font-retro hover:bg-vhs-purple/30 transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>
      </motion.div>

      {/* 연락처 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="card-retro bg-gradient-to-r from-gray-900 to-gray-800"
      >
        <h2 className="text-2xl text-vhs-purple mb-4 font-pixel">📧 문의</h2>
        <div className="text-gray-300 font-retro space-y-3">
          <p>
            <strong>이메일:</strong>{' '}
            <a href="mailto:contact@meaningless-consolation.com" className="text-toxic-green hover:underline">
              contact@meaningless-consolation.com
            </a>
          </p>
          <p>
            <strong>GitHub:</strong>{' '}
            <a
              href="https://github.com/meaningless-consolation"
              className="text-toxic-green hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              @meaningless-consolation
            </a>
          </p>
          <p>
            <strong>버그 제보:</strong> 버그를 발견하셨나요? 어차피 의미 없지만 알려주시면 고치겠습니다.
          </p>
        </div>
      </motion.div>

      {/* FAQ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="card-retro"
      >
        <h2 className="text-2xl text-vhs-purple mb-4 font-pixel">❓ 자주 묻는 질문</h2>
        <div className="space-y-4 text-sm font-retro">
          <div>
            <p className="text-toxic-green mb-1"><strong>Q: 이게 진짜 위로가 되나요?</strong></p>
            <p className="text-gray-400">A: 의미는 없지만, 묘하게 됩니다. 그게 우리의 컨셉입니다.</p>
          </div>
          <div>
            <p className="text-toxic-green mb-1"><strong>Q: AI가 진지한 상담을 해주나요?</strong></p>
            <p className="text-gray-400">A: 아니요. 이건 엔터테인먼트입니다. 진짜 고민은 전문가와 상담하세요.</p>
          </div>
          <div>
            <p className="text-toxic-green mb-1"><strong>Q: 내 감정이 안전한가요?</strong></p>
            <p className="text-gray-400">
              A: 네. 모든 데이터는 암호화되어 저장되며, 사용자별로 격리됩니다.{' '}
              <Link to="/privacy" className="text-vhs-purple hover:underline">
                개인정보처리방침 →
              </Link>
            </p>
          </div>
          <div>
            <p className="text-toxic-green mb-1"><strong>Q: 무료인가요?</strong></p>
            <p className="text-gray-400">A: 네, 기본 기능은 모두 무료입니다. (광고로 운영됩니다)</p>
          </div>
          <div>
            <p className="text-toxic-green mb-1"><strong>Q: 왜 만들었나요?</strong></p>
            <p className="text-gray-400">A: 어차피 의미 없는 삶인데, 웃으면서 살자고요.</p>
          </div>
        </div>
      </motion.div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="text-center card-retro bg-gradient-to-r from-vhs-purple/20 to-toxic-green/20"
      >
        <p className="text-2xl font-retro text-gray-300 mb-6">
          오늘도 허무하셨나요?
        </p>
        <Link
          to="/emotion-trash"
          className="btn-retro inline-block text-lg"
        >
          지금 바로 위로받기 →
        </Link>
      </motion.div>

      {/* 명언 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="text-center"
      >
        <p className="text-lg font-retro text-gray-400 italic">
          "어차피 오늘도 지나갈 거야."
        </p>
        <p className="text-xs text-gray-600 mt-2">
          — 익명의 현타 철학자
        </p>
      </motion.div>
    </div>
  )
}

export default About
