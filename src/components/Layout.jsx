import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';

const Layout = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
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
      <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50 flex items-center justify-between px-8 py-4">
        <div className="text-2xl font-extrabold text-green-500">Health & Wellness</div>
        <nav className="space-x-6 text-gray-700 font-medium relative flex items-center">
          <Link to="/" className="hover:text-green-500">Home</Link>
          <Link to="/about" className="hover:text-green-500">About Us</Link>
          {profile ? (
            <>
              <Link to="/dashboard" className="hover:text-green-500">Dashboard</Link>
              <Link to="/fitness" className="hover:text-green-500">Fitness</Link>
              <Link to="/nutrition" className="hover:text-green-500">Nutrition</Link>
              <Link to="/goals" className="hover:text-green-500">Goals</Link>
              <div className="relative">
                <button 
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center uppercase"
                >
                  {profile.name.charAt(0)}
                </button>
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg">
                    <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-gray-100">Logout</button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <Link to="/login" className="hover:text-green-500">Login</Link>
          )}
        </nav>
      </header>

 
    </div>
  );
};

export default Layout;
