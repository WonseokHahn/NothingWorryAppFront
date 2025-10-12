import { createContext, useContext, useState, useEffect } from 'react'
import { authAPI } from '../services/api'

const AuthContext = createContext(null)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [token, setToken] = useState(localStorage.getItem('token'))

  // 초기 로드 시 토큰 확인
  useEffect(() => {
    const checkAuth = async () => {
      const savedToken = localStorage.getItem('token')
      if (savedToken) {
        try {
          const response = await authAPI.me(savedToken)
          setUser(response.data.user)
          setToken(savedToken)
        } catch (error) {
          console.error('Auth check failed:', error)
          localStorage.removeItem('token')
          setToken(null)
        }
      }
      setLoading(false)
    }

    checkAuth()
  }, [])

  const login = async (username, password) => {
    try {
      const response = await authAPI.login(username, password)
      const { token, user } = response.data

      localStorage.setItem('token', token)
      setToken(token)
      setUser(user)

      return { success: true }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || '로그인에 실패했습니다.'
      }
    }
  }

  const signup = async (username, email, password) => {
    try {
      const response = await authAPI.signup(username, email, password)
      const { token, user } = response.data

      localStorage.setItem('token', token)
      setToken(token)
      setUser(user)

      return { success: true }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || '회원가입에 실패했습니다.'
      }
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
    setUser(null)
  }

  const value = {
    user,
    token,
    loading,
    login,
    signup,
    logout,
    isAuthenticated: !!token
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
