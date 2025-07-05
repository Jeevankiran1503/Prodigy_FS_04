import React from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { useNavigate } from 'react-router-dom';
import { LogOut, User, MessageSquare } from 'lucide-react';

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 px-4 py-3 sticky">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo/Brand */}
        <div 
          className="flex items-center cursor-pointer"
          onClick={() => navigate('/')}
        >
          <MessageSquare className="h-6 w-6 text-indigo-600 mr-2" />
          <span className="text-xl font-semibold text-gray-800">ChatApp</span>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/profile')}
            className="flex items-center space-x-1 text-gray-600 hover:text-indigo-600 transition-colors duration-200"
            aria-label="Profile"
          >
            <User className="h-5 w-5" />
            {authUser?.fullName && (
              <span className="hidden sm:inline-block">{authUser.fullName}</span>
            )}
          </button>

          <button
            onClick={logout}
            className="flex items-center space-x-1 text-gray-600 hover:text-red-600 transition-colors duration-200"
            aria-label="Logout"
          >
            <LogOut className="h-5 w-5" />
            <span className="hidden sm:inline-block">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;