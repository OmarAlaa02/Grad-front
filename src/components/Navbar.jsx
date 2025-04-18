"use client"

import { Link, useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { useState } from "react"

const Navbar = () => {
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  const isActive = (path) => {
    return location.pathname === path
  }

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-teal-700 rounded-lg flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <span className="text-xl font-bold text-gradient">Interview coach</span>
          </Link>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-teal-600 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Desktop menu */}
          {currentUser ? (
            <div className="hidden md:flex items-center space-x-6">
              <Link
                to="/"
                className={`text-gray-700 hover:text-teal-600 font-medium transition-colors ${isActive("/") ? "text-teal-600" : ""}`}
              >
                Dashboard
              </Link>
              <Link
                to="/interview-history"
                className={`text-gray-700 hover:text-teal-600 font-medium transition-colors ${isActive("/interview-history") ? "text-teal-600" : ""}`}
              >
                Interview History
              </Link>
              <Link to="/pre-interview" className="btn-primary text-sm py-2 px-4 rounded-2xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                New Interview
              </Link>
              <div className="relative group">
                <button className="flex items-center space-x-1 bg-teal-50 text-teal-800 rounded-full px-3 py-1.5 hover:bg-teal-100 transition-colors">
                  <span>{currentUser.email.split("@")[0]}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-10 hidden group-hover:block">
                  <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-teal-50 hover:text-teal-700">
                    Profile Settings
                  </a>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-teal-50 hover:text-teal-700"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/login" className="text-gray-700 hover:text-teal-600 font-medium">
                Login
              </Link>
              <Link to="/signup" className="btn-primary text-sm py-2 px-4">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-3 px-4">
          {currentUser ? (
            <div className="space-y-3">
              <div className="flex items-center space-x-2 mb-4 pb-3 border-b border-gray-100">
                <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                  <span className="text-teal-700 font-medium">{currentUser.email.charAt(0).toUpperCase()}</span>
                </div>
                <div>
                  <p className="text-sm font-medium">{currentUser.email.split("@")[0]}</p>
                  <p className="text-xs text-gray-500">{currentUser.email}</p>
                </div>
              </div>
              <Link
                to="/"
                className={`block py-2 text-gray-700 hover:text-teal-600 ${isActive("/") ? "text-teal-600 font-medium" : ""}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                to="/interview-history"
                className={`block py-2 text-gray-700 hover:text-teal-600 ${isActive("/interview-history") ? "text-teal-600 font-medium" : ""}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Interview History
              </Link>
              <Link
                to="/pre-interview"
                className="block py-2 text-gray-700 hover:text-teal-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Start New Interview
              </Link>
              <button
                onClick={() => {
                  handleLogout()
                  setIsMenuOpen(false)
                }}
                className="block py-2 text-gray-700 hover:text-teal-600 w-full text-left"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <Link
                to="/login"
                className="block py-2 text-gray-700 hover:text-teal-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="block py-2 text-gray-700 hover:text-teal-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  )
}

export default Navbar
