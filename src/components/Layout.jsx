import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'

const Layout = ({ children }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const { user, logout, isAuthenticated } = useAuth()

  const menuItems = [
    { path: '/', label: '홈', icon: '🏠' },
    { path: '/emotion-trash', label: '감정 쓰레기통', icon: '🗑️' },
    { path: '/nothing-happened', label: '오늘도 아무 일 없었다', icon: '📜' },
    { path: '/fortune', label: '쓸모없는 예언', icon: '🔮' },
    { path: '/procrastination', label: '미루기 정당화', icon: '😴' },
    { path: '/history', label: '감정 기록', icon: '📚' },
  ]

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-dark-void text-ash-beige vhs-effect">
      {/* Header */}
      <header className="border-b-2 border-vhs-purple/30 bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/">
              <motion.h1
                className="text-2xl md:text-3xl font-pixel text-toxic-green glitch-text"
                whileHover={{ scale: 1.05 }}
              >
                무의미한 위로소
              </motion.h1>
            </Link>

            {/* Desktop Nav */}
            {isAuthenticated && (
              <nav className="hidden md:flex items-center gap-6">
                {menuItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`font-retro transition-colors ${
                      location.pathname === item.path
                        ? 'text-toxic-green'
                        : 'text-ash-beige hover:text-vhs-purple'
                    }`}
                  >
                    <span className="mr-2">{item.icon}</span>
                    {item.label}
                  </Link>
                ))}
              </nav>
            )}

            {/* Auth Controls */}
            <div className="flex items-center gap-4">
              {isAuthenticated ? (
                <>
                  <div className="hidden md:block">
                    <span className="text-sm font-retro text-gray-400">
                      👤 {user?.username}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-900/50 hover:bg-red-900/70 border border-red-700 rounded-lg font-retro text-sm transition-colors"
                  >
                    로그아웃
                  </button>
                </>
              ) : (
                <div className="flex gap-2">
                  <Link
                    to="/login"
                    className="px-4 py-2 bg-vhs-purple/50 hover:bg-vhs-purple/70 border border-vhs-purple rounded-lg font-retro text-sm transition-colors"
                  >
                    로그인
                  </Link>
                  <Link
                    to="/signup"
                    className="px-4 py-2 bg-toxic-green/20 hover:bg-toxic-green/30 border border-toxic-green rounded-lg font-retro text-sm transition-colors"
                  >
                    회원가입
                  </Link>
                </div>
              )}

              {/* Mobile Menu Toggle */}
              {isAuthenticated && (
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="md:hidden p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
                >
                  {menuOpen ? '✕' : '☰'}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && isAuthenticated && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden border-t border-vhs-purple/30 bg-gray-900"
          >
            <nav className="flex flex-col p-4 gap-2">
              <div className="p-3 border-b border-gray-700 mb-2">
                <span className="text-sm font-retro text-gray-400">
                  👤 {user?.username}
                </span>
              </div>
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMenuOpen(false)}
                  className={`p-3 rounded-lg font-retro transition-colors ${
                    location.pathname === item.path
                      ? 'bg-vhs-purple text-white'
                      : 'hover:bg-gray-800'
                  }`}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.label}
                </Link>
              ))}
              <button
                onClick={() => {
                  setMenuOpen(false)
                  handleLogout()
                }}
                className="p-3 mt-2 rounded-lg font-retro bg-red-900/50 hover:bg-red-900/70 border border-red-700 transition-colors text-left"
              >
                로그아웃
              </button>
            </nav>
          </motion.div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 crt-scanline">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t-2 border-vhs-purple/30 bg-gray-900/80 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <p className="font-retro text-sm text-gray-500 text-center mb-3">
            "의미는 없지만, 묘하게 위로되는 곳" — 오늘도 아무 일 없었던 당신에게 바칩니다.
          </p>

          {/* 필수 링크 */}
          <div className="flex justify-center gap-4 mb-3 flex-wrap">
            <Link to="/privacy" className="text-xs text-gray-600 hover:text-toxic-green transition-colors">
              개인정보처리방침
            </Link>
            <span className="text-gray-700">|</span>
            <Link to="/terms" className="text-xs text-gray-600 hover:text-toxic-green transition-colors">
              이용약관
            </Link>
            <span className="text-gray-700">|</span>
            <Link to="/about" className="text-xs text-gray-600 hover:text-toxic-green transition-colors">
              소개
            </Link>
          </div>

          <p className="text-xs text-gray-600 text-center">
            © 2025 무의미한 위로소. All rights meaningless.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Layout
