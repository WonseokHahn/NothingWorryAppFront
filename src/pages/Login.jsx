import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const result = await login(username, password)

    if (result.success) {
      navigate('/')
    } else {
      setError(result.error)
    }

    setLoading(false)
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-pixel text-toxic-green mb-4 glitch-text">
            로그인
          </h1>
          <p className="text-gray-400 font-retro">
            당신의 무의미한 감정을 기록하세요
          </p>
        </div>

        <div className="card-retro">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-red-900/30 border border-red-500 rounded-lg p-3"
              >
                <p className="text-sm text-red-400 font-retro">{error}</p>
              </motion.div>
            )}

            <div>
              <label className="block text-sm font-retro text-gray-400 mb-2">
                사용자명
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-gray-900 border-2 border-vhs-purple/50 rounded-lg p-3 text-ash-beige font-retro focus:border-toxic-green focus:outline-none transition-colors"
                placeholder="username"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-retro text-gray-400 mb-2">
                비밀번호
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-900 border-2 border-vhs-purple/50 rounded-lg p-3 text-ash-beige font-retro focus:border-toxic-green focus:outline-none transition-colors"
                placeholder="••••••"
                required
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-retro w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? '로그인 중...' : '로그인'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500 font-retro">
              계정이 없으신가요?{' '}
              <Link to="/signup" className="text-toxic-green hover:underline">
                회원가입
              </Link>
            </p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center mt-6"
        >
          <p className="text-xs text-gray-600 font-retro italic">
            "로그인한다고 인생이 의미있어지는 건 아니야."
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Login
