import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react'; // For hamburger icons
import axiosInstance from '../api/axiosInstance';

const Layout = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axiosInstance.get('/profile');
        setProfile(response.data);
      } catch (err) {
        console.log(err.response?.data || err.message);
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setProfile(null);
    navigate('/login');
  };

  return (
    <div className="font-sans">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
        <div className="flex items-center justify-between px-4 py-5 md:px-8">
          {/* Left: Logo */}
          <div className="text-2xl font-extrabold text-green-500">
            Health & Wellness
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-6 text-gray-700 font-medium">
            <Link to="/" className="hover:text-green-500">Home</Link>
            <Link to="/about" className="hover:text-green-500">About Us</Link>
            {profile ? (
              <>
                <Link to="/dashboard" className="hover:text-green-500">Dashboard</Link>
                <Link to="/fitness" className="hover:text-green-500">Fitness</Link>
                <Link to="/nutrition" className="hover:text-green-500">Nutrition</Link>
                <Link to="/goals" className="hover:text-green-500">Goals</Link>
              </>
            ) : (
              <Link to="/login" className="hover:text-green-500">Login</Link>
            )}
          </nav>

          {/* Right: Profile + Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            {profile && (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center uppercase"
                >
                  {profile.name.charAt(0)}
                </button>
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg">
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Mobile Hamburger */}
            <button
              className="md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {menuOpen && (
          <nav className="md:hidden bg-white border-t border-gray-200 px-4 pb-4 space-y-2 text-gray-700 font-medium">
            <Link to="/" className="block hover:text-green-500" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link to="/about" className="block hover:text-green-500" onClick={() => setMenuOpen(false)}>About Us</Link>
            {profile ? (
              <>
                <Link to="/dashboard" className="block hover:text-green-500" onClick={() => setMenuOpen(false)}>Dashboard</Link>
                <Link to="/fitness" className="block hover:text-green-500" onClick={() => setMenuOpen(false)}>Fitness</Link>
                <Link to="/nutrition" className="block hover:text-green-500" onClick={() => setMenuOpen(false)}>Nutrition</Link>
                <Link to="/goals" className="block hover:text-green-500" onClick={() => setMenuOpen(false)}>Goals</Link>
              </>
            ) : (
              <Link to="/login" className="block hover:text-green-500" onClick={() => setMenuOpen(false)}>Login</Link>
            )}
          </nav>
        )}
      </header>

      {/* Main Content */}
      <main className="pt-20 px-4 md:px-8">{children}</main>
    </div>
  );
};

export default Layout;
