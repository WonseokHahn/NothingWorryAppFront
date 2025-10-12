import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'

const Signup = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const { signup } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.')
      return
    }

    if (password.length < 6) {
      setError('비밀번호는 최소 6자 이상이어야 합니다.')
      return
    }

    setLoading(true)

    const result = await signup(username, email, password)

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
            회원가입
          </h1>
          <p className="text-gray-400 font-retro">
            무의미한 위로소에 오신 것을 환영합니다
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
                이메일
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-900 border-2 border-vhs-purple/50 rounded-lg p-3 text-ash-beige font-retro focus:border-toxic-green focus:outline-none transition-colors"
                placeholder="email@example.com"
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
              <p className="text-xs text-gray-600 mt-1">최소 6자 이상</p>
            </div>

            <div>
              <label className="block text-sm font-retro text-gray-400 mb-2">
                비밀번호 확인
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
              {loading ? '가입 중...' : '회원가입'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500 font-retro">
              이미 계정이 있으신가요?{' '}
              <Link to="/login" className="text-toxic-green hover:underline">
                로그인
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
            "회원가입한다고 특별해지는 건 아니야. 하지만 환영해."
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Signup
