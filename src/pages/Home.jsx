import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const Home = () => {
  const features = [
    {
      path: '/emotion-trash',
      icon: '🗑️',
      title: '감정 쓰레기통',
      description: '짜증나는 일을 버리면, B급 철학으로 위로해드립니다',
      color: 'from-purple-900 to-purple-700',
    },
    {
      path: '/nothing-happened',
      icon: '📜',
      title: '오늘도 아무 일 없었다',
      description: '당신의 무의미한 하루를 더 무의미하게 요약해드립니다',
      color: 'from-gray-900 to-gray-700',
    },
    {
      path: '/fortune',
      icon: '🔮',
      title: '운세보다 쓸모없는 예언',
      description: '1일 1회, 완전히 쓸모없는 예언을 받아보세요',
      color: 'from-indigo-900 to-indigo-700',
    },
    {
      path: '/procrastination',
      icon: '😴',
      title: '미루기 정당화',
      description: '안 해도 괜찮은 철학적 이유를 찾아드립니다',
      color: 'from-slate-900 to-slate-700',
    },
    {
      path: '/history',
      icon: '📚',
      title: '감정 기록',
      description: '당신의 무의미한 감정 여정을 돌아보세요',
      color: 'from-emerald-900 to-emerald-700',
    },
  ]

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center py-12"
      >
        <h1 className="text-5xl md:text-7xl font-pixel text-toxic-green mb-6 glitch-text text-shadow-neon">
          무의미한 위로소
        </h1>
        <p className="text-xl md:text-2xl text-ash-beige font-retro mb-4">
          "의미는 없지만, 묘하게 위로되는 곳"
        </p>
        <p className="text-md text-gray-500 font-retro">
          — 오늘도 아무 일 없었던 당신에게 바칩니다.
        </p>
      </motion.div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <motion.div
            key={feature.path}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link to={feature.path}>
              <motion.div
                className={`card-retro bg-gradient-to-br ${feature.color} h-full cursor-pointer group`}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="text-5xl mb-4 group-hover:animate-slow-pulse">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-toxic-green group-hover:text-shadow-neon transition-all">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-400 font-retro">
                  {feature.description}
                </p>
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Quote Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="card-retro bg-gradient-to-r from-vhs-purple/20 to-toxic-green/20 text-center py-8"
      >
        <p className="text-2xl font-retro text-ash-beige mb-4">
          "어차피 오늘도 지나갈 거야."
        </p>
        <p className="text-sm text-gray-500">
          — 익명의 현타 철학자
        </p>
      </motion.div>

      {/* Instructions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-center"
      >
        <h2 className="text-2xl font-pixel text-vhs-purple mb-4">사용법</h2>
        <div className="space-y-3 font-retro text-sm text-gray-400">
          <p>1. 감정을 입력하세요 (분노, 허무, 짜증 등)</p>
          <p>2. AI가 B급 철학으로 위로해줍니다</p>
          <p>3. 웃고, 삭제하고, 잊으세요</p>
          <p className="text-toxic-green mt-4">※ 모든 위로는 100% 무의미합니다</p>
        </div>
      </motion.div>
    </div>
  )
}

export default Home
