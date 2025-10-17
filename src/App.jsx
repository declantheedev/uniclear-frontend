import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import DashboardLayout from './pages/DashboardLayout'
import DashboardHome from './pages/DashboardHome'
import ProfileContent from './pages/ProfileContent'
import SettingsContent from './pages/SettingsContent'
import DocumentsContent from './pages/DocumentsContent'
import StatusContent from './pages/StatusContent'
import MessagesContent from './pages/MessagesContent'
import NewContent from './pages/NewContent'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }>
          <Route index element={<DashboardHome />} />
          <Route path="profile" element={<ProfileContent />} />
          <Route path="settings" element={<SettingsContent />} />
          <Route path="documents" element={<DocumentsContent />} />
          <Route path="status" element={<StatusContent />} />
          <Route path="messages" element={<MessagesContent />} />
          <Route path="new" element={<NewContent />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App