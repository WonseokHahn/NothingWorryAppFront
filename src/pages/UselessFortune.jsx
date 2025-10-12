import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { fortuneAPI } from '../services/api'

const UselessFortune = () => {
  const [fortune, setFortune] = useState(null)
  const [loading, setLoading] = useState(false)
  const [revealed, setRevealed] = useState(false)
  const [cached, setCached] = useState(false)

  useEffect(() => {
    fetchFortune()
  }, [])

  const fetchFortune = async () => {
    setLoading(true)
    try {
      const result = await fortuneAPI.get()
      setFortune(result.data.fortune)
      setCached(result.data.cached)
    } catch (error) {
      console.error('Error:', error)
      setFortune('오늘 당신은 존재할 것입니다. 언젠가는 사라질 거예요. 이것이 운명입니다.')
      setCached(false)
    } finally {
      setLoading(false)
    }
  }

  const handleReveal = () => {
    setRevealed(true)
  }

  const crystalBallVariants = {
    idle: {
      scale: [1, 1.05, 1],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    reveal: {
      scale: [1, 1.2, 1],
      rotate: [0, 360],
      transition: {
        duration: 1
      }
    }
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
          🔮 운세보다 쓸모없는 예언
        </h1>
        <p className="text-lg font-retro text-gray-400">
          1일 1회, 완전히 무의미한 예언을 받아보세요.
        </p>
      </motion.div>

      {/* Crystal Ball */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="card-retro bg-gradient-to-br from-indigo-900/50 to-purple-900/50 relative overflow-hidden"
      >
        <div className="text-center py-12">
          <motion.div
            variants={crystalBallVariants}
            animate={revealed ? "reveal" : "idle"}
            className="inline-block text-8xl mb-6"
          >
            🔮
          </motion.div>

          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <p className="text-xl font-retro text-gray-400">
                  예언을 불러오는 중...
                </p>
              </motion.div>
            ) : !revealed ? (
              <motion.div
                key="unrevealed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <p className="text-2xl font-retro text-vhs-purple">
                  오늘의 예언이 준비되었습니다.
                </p>
                <button
                  onClick={handleReveal}
                  className="btn-retro text-lg px-8 py-4"
                >
                  예언 공개하기 ✨
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="revealed"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <div className="card-retro bg-gradient-to-r from-toxic-green/20 to-vhs-purple/20 max-w-2xl mx-auto">
                  <p className="text-2xl md:text-3xl font-retro text-toxic-green leading-relaxed">
                    {fortune}
                  </p>
                </div>

                {cached && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm text-gray-500 font-retro"
                  >
                    ※ 이미 오늘의 예언을 받았습니다. 내일 다시 오세요.
                  </motion.p>
                )}

                <button
                  onClick={() => setRevealed(false)}
                  className="btn-retro bg-gray-800 hover:bg-gray-700"
                >
                  다시 보기 🔄
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mystical Background Effect */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{
              background: [
                'radial-gradient(circle at 20% 50%, rgba(138, 92, 246, 0.1) 0%, transparent 50%)',
                'radial-gradient(circle at 80% 50%, rgba(160, 255, 184, 0.1) 0%, transparent 50%)',
                'radial-gradient(circle at 20% 50%, rgba(138, 92, 246, 0.1) 0%, transparent 50%)',
              ]
            }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute inset-0"
          />
        </div>
      </motion.div>

      {/* Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-center space-y-4"
      >
        <div className="card-retro bg-gray-900/50">
          <h3 className="text-lg font-retro text-vhs-purple mb-3">예언 사용법:</h3>
          <ul className="space-y-2 text-sm font-retro text-gray-400">
            <li>✓ 하루에 한 번만 예언을 받을 수 있습니다</li>
            <li>✓ 예언은 100% 쓸모없습니다</li>
            <li>✓ 진지하게 받아들이지 마세요</li>
            <li>✓ 그냥 웃고 넘기세요</li>
          </ul>
        </div>

        <p className="text-xs text-gray-600 font-retro italic">
          "운명이란 결국 당신이 오늘 뭘 먹을지 고민하는 것과 같습니다."
        </p>
      </motion.div>
    </div>
  )
}

export default UselessFortune
