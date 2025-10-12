import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { nothingHappenedAPI } from '../services/api'

const NothingHappened = () => {
  const [content, setContent] = useState('')
  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!content.trim()) return

    setLoading(true)
    try {
      const result = await nothingHappenedAPI.send(content)
      setResponse(result.data)
    } catch (error) {
      console.error('Error:', error)
      setResponse({
        aiResponse: '오늘도 아무 일 없었네. 서버도 아무 일 안 했어.',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setResponse(null)
    setContent('')
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl md:text-5xl font-pixel text-toxic-green mb-4 glitch-text">
          📜 오늘도 아무 일 없었다
        </h1>
        <p className="text-lg font-retro text-gray-400">
          당신의 무의미한 하루를 더욱 무의미하게 요약해드립니다.
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
              오늘 뭐 했어요? (솔직하게 써보세요)
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full bg-gray-900 border-2 border-vhs-purple/50 rounded-lg p-4 text-ash-beige font-retro focus:border-toxic-green focus:outline-none transition-colors min-h-[150px]"
              placeholder="예: 아침에 일어나서 출근하고, 일하고, 저녁 먹고, 유튜브 보다가 잠..."
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading || !content.trim()}
            className="btn-retro w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? '요약 중... (무의미하게)' : '하루 정리하기 📝'}
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
            {/* Original Content */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="card-retro bg-gray-900/50"
            >
              <h3 className="text-lg font-retro text-vhs-purple mb-3">당신의 하루:</h3>
              <p className="text-ash-beige font-retro leading-relaxed">
                {response.content}
              </p>
            </motion.div>

            {/* AI Summary */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="card-retro bg-gradient-to-br from-vhs-purple/20 to-toxic-green/20"
            >
              <div className="flex items-start gap-3">
                <div className="text-3xl">💭</div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500 font-retro mb-2">허무한 요약:</p>
                  <p className="text-xl md:text-2xl font-retro text-toxic-green">
                    {response.aiResponse}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex gap-4"
            >
              <button
                onClick={handleReset}
                className="btn-retro flex-1"
              >
                다시 쓰기 ✏️
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quotes */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="card-retro bg-gradient-to-r from-gray-900 to-gray-800 text-center py-6"
      >
        <p className="text-lg font-retro text-gray-400 italic">
          "결국 오늘도 하루가 지나갔네."
        </p>
        <p className="text-xs text-gray-600 mt-2">— 내일도 비슷할 거야</p>
      </motion.div>
    </div>
  )
}

export default NothingHappened
