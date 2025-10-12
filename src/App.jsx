import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import EmotionTrash from './pages/EmotionTrash'
import NothingHappened from './pages/NothingHappened'
import UselessFortune from './pages/UselessFortune'
import Procrastination from './pages/Procrastination'
import History from './pages/History'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import About from './pages/About'
import './index.css'

function App() {
  return (
    <Router>
      <AuthProvider>
        <Layout>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/about" element={<About />} />

            {/* Protected routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/emotion-trash"
              element={
                <ProtectedRoute>
                  <EmotionTrash />
                </ProtectedRoute>
              }
            />
            <Route
              path="/nothing-happened"
              element={
                <ProtectedRoute>
                  <NothingHappened />
                </ProtectedRoute>
              }
            />
            <Route
              path="/fortune"
              element={
                <ProtectedRoute>
                  <UselessFortune />
                </ProtectedRoute>
              }
            />
            <Route
              path="/procrastination"
              element={
                <ProtectedRoute>
                  <Procrastination />
                </ProtectedRoute>
              }
            />
            <Route
              path="/history"
              element={
                <ProtectedRoute>
                  <History />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Layout>
      </AuthProvider>
    </Router>
  )
}

export default App
