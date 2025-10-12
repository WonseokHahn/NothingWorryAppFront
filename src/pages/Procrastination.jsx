import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { procrastinationAPI } from '../services/api'

const Procrastination = () => {
  const [content, setContent] = useState('')
  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!content.trim()) return

    setLoading(true)
    try {
      const result = await procrastinationAPI.send(content)
      setResponse(result.data)
    } catch (error) {
      console.error('Error:', error)
      setResponse({
        aiResponse: '지금 안 해도 돼. 어차피 서버도 지금 일하기 싫어해.',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setResponse(null)
    setContent('')
  }

  const suggestions = [
    '운동하기',
    '청소하기',
    '공부하기',
    '숙제하기',
    '빨래하기',
    '책 읽기',
  ]

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl md:text-5xl font-pixel text-toxic-green mb-4 glitch-text">
          😴 미루기 정당화
        </h1>
        <p className="text-lg font-retro text-gray-400">
          안 해도 괜찮은 철학적 이유를 찾아드립니다.
        </p>
      </motion.div>

      {/* Input Form */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="card-retro"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-retro text-gray-400 mb-2">
              뭘 미루고 있나요?
            </label>
            <input
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full bg-gray-900 border-2 border-vhs-purple/50 rounded-lg p-4 text-ash-beige font-retro focus:border-toxic-green focus:outline-none transition-colors"
              placeholder="예: 운동하기, 공부하기, 청소하기..."
              disabled={loading}
            />
          </div>

          {/* Quick Suggestions */}
          <div className="flex flex-wrap gap-2">
            <p className="text-xs text-gray-500 font-retro w-full mb-1">빠른 입력:</p>
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => setContent(suggestion)}
                className="text-xs px-3 py-1 bg-gray-800 hover:bg-vhs-purple/30 rounded-full font-retro text-gray-400 transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>

          <button
            type="submit"
            disabled={loading || !content.trim()}
            className="btn-retro w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? '철학적 변명 생성 중...' : '정당화하기 💤'}
          </button>
        </form>
      </motion.div>

      {/* Response */}
      <AnimatePresence>
        {response && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Task */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="card-retro bg-gray-900/50"
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">📝</span>
                <div>
                  <p className="text-xs text-gray-500 font-retro">미루는 일:</p>
                  <p className="text-xl font-retro text-ash-beige">
                    {response.content}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Justification */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="card-retro bg-gradient-to-br from-vhs-purple/20 to-toxic-green/20"
            >
              <div className="flex items-start gap-3">
                <div className="text-3xl">🧠</div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500 font-retro mb-2">철학적 정당화:</p>
                  <p className="text-xl md:text-2xl font-retro text-toxic-green leading-relaxed">
                    {response.aiResponse}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Approval Badge */}
            <motion.div
              initial={{ opacity: 0, rotate: -10 }}
              animate={{ opacity: 1, rotate: 0 }}
              transition={{ delay: 0.6 }}
              className="text-center"
            >
              <div className="inline-block card-retro bg-toxic-green/20 border-toxic-green px-8 py-4">
                <p className="text-2xl font-pixel text-toxic-green">
                  ✓ 미루기 승인됨
                </p>
                <p className="text-xs text-gray-400 font-retro mt-2">
                  이제 당당하게 미룰 수 있습니다
                </p>
              </div>
            </motion.div>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex gap-4"
            >
              <button
                onClick={handleReset}
                className="btn-retro flex-1"
              >
                다른 일 미루기 🔄
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Philosophy Quote */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="card-retro bg-gradient-to-r from-gray-900 to-gray-800 text-center py-6"
      >
        <p className="text-lg font-retro text-gray-400 italic">
          "시간이란 건 사실 환상이야."
        </p>
        <p className="text-xs text-gray-600 mt-2">— 미루기의 철학자</p>
      </motion.div>

      {/* Warning */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-center text-xs text-gray-600 font-retro"
      >
        <p>⚠️ 경고: 이 철학을 진지하게 받아들이면 인생이 더 무의미해질 수 있습니다.</p>
      </motion.div>
    </div>
  )
}

export default Procrastination
