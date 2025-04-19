import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import SignUp from "./pages/SignUp"
import Login from "./pages/Login"
import Home from "./pages/Home"
import PreInterview from "./pages/PreInterview"
import Interview from "./pages/Interview"
import InterviewHistory from "./pages/InterviewHistory"
import InterviewDetails from "./pages/InterviewDetails"
import CVBuilder from "./pages/CVBuilder"
import Navbar from "./components/Navbar"
import { AuthProvider } from "./context/AuthContext"
import ProtectedRoute from "./components/ProtectedRoute"

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <div className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/cv" element={<CVBuilder />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/pre-interview"
                element={
                  <ProtectedRoute>
                    <PreInterview />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/interview/:role"
                element={
                  <ProtectedRoute>
                    <Interview />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/interview-history"
                element={
                  <ProtectedRoute>
                    <InterviewHistory />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/interview-details/:interviewId"
                element={
                  <ProtectedRoute>
                    <InterviewDetails />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
