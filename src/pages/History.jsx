import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { historyAPI } from '../services/api'

const History = () => {
  const [emotions, setEmotions] = useState([])
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState(null)

  useEffect(() => {
    fetchHistory()
  }, [])

  const fetchHistory = async () => {
    setLoading(true)
    try {
      const result = await historyAPI.get()
      setEmotions(result.data.emotions)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    setDeletingId(id)
    try {
      await historyAPI.delete(id)
      setTimeout(() => {
        setEmotions(emotions.filter(e => e.id !== id))
        setDeletingId(null)
      }, 1500)
    } catch (error) {
      console.error('Error:', error)
      setDeletingId(null)
    }
  }

  const getTypeInfo = (type) => {
    const types = {
      trash: { icon: '🗑️', label: '감정 쓰레기통', color: 'text-purple-400' },
      nothing: { icon: '📜', label: '아무 일 없었다', color: 'text-gray-400' },
      procrastination: { icon: '😴', label: '미루기 정당화', color: 'text-blue-400' },
    }
    return types[type] || types.trash
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto text-center py-20">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="text-6xl mb-4 inline-block"
        >
          📚
        </motion.div>
        <p className="text-xl font-retro text-gray-400">
          무의미한 기록을 불러오는 중...
        </p>
      </div>
    )
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
          📚 감정 기록
        </h1>
        <p className="text-lg font-retro text-gray-400">
          당신의 무의미한 감정 여정을 돌아보세요.
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <div className="card-retro bg-gradient-to-br from-purple-900/50 to-purple-700/50 text-center">
          <p className="text-3xl font-bold text-toxic-green">{emotions.length}</p>
          <p className="text-sm font-retro text-gray-400 mt-1">전체 감정</p>
        </div>
        <div className="card-retro bg-gradient-to-br from-gray-900 to-gray-700 text-center">
          <p className="text-3xl font-bold text-vhs-purple">
            {emotions.filter(e => e.type === 'trash').length}
          </p>
          <p className="text-sm font-retro text-gray-400 mt-1">버린 감정</p>
        </div>
        <div className="card-retro bg-gradient-to-br from-indigo-900/50 to-indigo-700/50 text-center">
          <p className="text-3xl font-bold text-ash-beige">
            {emotions.filter(e => e.type === 'procrastination').length}
          </p>
          <p className="text-sm font-retro text-gray-400 mt-1">미룬 일</p>
        </div>
      </motion.div>

      {/* Empty State */}
      {emotions.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="card-retro text-center py-16"
        >
          <div className="text-6xl mb-4">📭</div>
          <p className="text-xl font-retro text-gray-400">
            아직 기록된 감정이 없습니다.
          </p>
          <p className="text-sm font-retro text-gray-600 mt-2">
            감정 쓰레기통에서 시작해보세요!
          </p>
        </motion.div>
      ) : (
        <div className="space-y-4">
          <AnimatePresence>
            {emotions.map((emotion, index) => {
              const typeInfo = getTypeInfo(emotion.type)
              const isDeleting = deletingId === emotion.id

              return (
                <motion.div
                  key={emotion.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{
                    opacity: 0,
                    scale: 0,
                    rotate: 360,
                    transition: { duration: 1.5 }
                  }}
                  transition={{ delay: index * 0.05 }}
                  className={`card-retro ${
                    isDeleting ? 'bg-red-900/30' : 'bg-gray-900/50'
                  }`}
                >
                  {isDeleting ? (
                    <div className="text-center py-8">
                      <motion.div
                        animate={{ scale: [1, 1.5, 0] }}
                        transition={{ duration: 1.5 }}
                        className="text-4xl mb-2"
                      >
                        🌌
                      </motion.div>
                      <p className="font-retro text-toxic-green">
                        우주로 흩어지는 중...
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {/* Header */}
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{typeInfo.icon}</span>
                          <div>
                            <p className={`text-sm font-retro ${typeInfo.color}`}>
                              {typeInfo.label}
                            </p>
                            <p className="text-xs text-gray-600 font-retro">
                              {formatDate(emotion.created_at)}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleDelete(emotion.id)}
                          className="text-2xl hover:scale-110 transition-transform"
                          title="삭제"
                        >
                          🧹
                        </button>
                      </div>

                      {/* Content */}
                      <div className="border-t border-gray-700 pt-3">
                        <p className="text-sm text-gray-500 font-retro mb-1">당신의 감정:</p>
                        <p className="text-ash-beige font-retro">
                          {emotion.content}
                        </p>
                      </div>

                      {/* AI Response */}
                      {emotion.ai_response && (
                        <div className="border-t border-vhs-purple/30 pt-3">
                          <p className="text-sm text-gray-500 font-retro mb-1">AI의 위로:</p>
                          <p className="text-toxic-green font-retro">
                            {emotion.ai_response}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
      )}

      {/* Quote */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="card-retro bg-gradient-to-r from-gray-900 to-gray-800 text-center py-6"
      >
        <p className="text-lg font-retro text-gray-400 italic">
          "기록한다고 의미가 생기는 건 아니야."
        </p>
        <p className="text-xs text-gray-600 mt-2">— 하지만 재밌긴 해</p>
      </motion.div>
    </div>
  )
}

export default History
