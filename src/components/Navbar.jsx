 

import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { BookOpen, Plus, LogOut, User } from "lucide-react"

const Navbar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/books" className="flex items-center space-x-2 text-xl font-bold text-primary-600">
            <BookOpen className="h-6 w-6" />
            <span>BookReview</span>
          </Link>

          {user && (
            <div className="flex items-center space-x-4">
              <Link to="/books" className="text-gray-700 hover:text-primary-600 transition-colors">
                Books
              </Link>
              <Link
                to="/add-book"
                className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>Add Book</span>
              </Link>
              <div className="flex items-center space-x-2 text-gray-700">
                <User className="h-4 w-4" />
                <span>{user.username}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 text-gray-700 hover:text-red-600 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
