import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { emotionTrashAPI } from '../services/api'

const EmotionTrash = () => {
  const [content, setContent] = useState('')
  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!content.trim()) return

    setLoading(true)
    try {
      const result = await emotionTrashAPI.send(content)
      setResponse(result.data)
    } catch (error) {
      console.error('Error:', error)
      setResponse({
        aiResponse: '서버가 허무해서 응답을 거부했습니다. 나중에 다시 시도하세요.',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = () => {
    setIsDeleting(true)
    setTimeout(() => {
      setResponse(null)
      setContent('')
      setIsDeleting(false)
    }, 2000)
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
          🗑️ 감정 쓰레기통
        </h1>
        <p className="text-lg font-retro text-gray-400">
          당신의 쓰레기 같은 감정을 버리세요. B급 철학으로 위로해드립니다.
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
              무슨 일이 있었나요? (짜증, 분노, 허무 등 아무거나 버리세요)
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full bg-gray-900 border-2 border-vhs-purple/50 rounded-lg p-4 text-ash-beige font-retro focus:border-toxic-green focus:outline-none transition-colors min-h-[150px]"
              placeholder="예: 오늘 지하철에서 발 밟혔는데 사과도 안 하더라..."
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading || !content.trim()}
            className="btn-retro w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? '생각 중... (하지만 의미는 없어)' : '버리기 🗑️'}
          </button>
        </form>
      </motion.div>

      {/* Response */}
      <AnimatePresence>
        {response && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, rotate: isDeleting ? 360 : 0 }}
            transition={{ duration: 0.5 }}
            className="card-retro bg-gradient-to-br from-vhs-purple/20 to-toxic-green/20"
          >
            {isDeleting ? (
              <div className="text-center py-12">
                <motion.div
                  animate={{ scale: [1, 1.2, 0] }}
                  transition={{ duration: 2 }}
                  className="text-6xl mb-4"
                >
                  🌌
                </motion.div>
                <p className="text-2xl font-retro text-toxic-green">
                  당신의 감정은 우주로 흩어졌습니다.
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-start gap-3 mb-4">
                  <div className="text-3xl">🤖</div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 font-retro mb-2">AI의 무의미한 위로:</p>
                    <p className="text-xl md:text-2xl font-retro text-toxic-green">
                      {response.aiResponse}
                    </p>
                  </div>
                </div>

                <div className="border-t border-vhs-purple/30 pt-4 mt-4">
                  <button
                    onClick={handleDelete}
                    className="btn-retro w-full bg-red-900 hover:bg-red-800"
                  >
                    삭제 의식 시작 🧹
                  </button>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tips */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-center text-sm text-gray-500 font-retro"
      >
        <p>💡 팁: 감정을 솔직하게 쓸수록 더 무의미한 위로를 받을 수 있습니다.</p>
      </motion.div>
    </div>
  )
}

export default EmotionTrash
