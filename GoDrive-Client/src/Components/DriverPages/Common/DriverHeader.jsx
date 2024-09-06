import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import constants from '../../../Utils/constant';
import { useAuth } from '../../../Context/AuthContext'; 

const DriverHeader = () => {
  const navigate = useNavigate();
  const { authState, removeAuth } = useAuth();
  const [driverName, setDriverName] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    if (authState && authState.name) {
      setDriverName(authState.name);
    }
  }, [authState]);

  const handleLogout = () => {
    localStorage.removeItem('driverId');
    removeAuth();
    setTimeout(() => {
      navigate('/signin');
    }, 1300);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="bg-black text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <Link to="/driver" className="text-2xl font-semibold flex items-center">
          <img
            src={constants.logo_white_full}
            alt="Logo"
            className="h-10 w-auto mr-4"
          />
        </Link>
        <nav className="flex space-x-4">
          <Link to="/driver" className="hover:bg-gray-700 px-3 py-2 rounded">Home</Link>
          {/* <Link to="/driver/duty" className="hover:bg-gray-700 px-3 py-2 rounded">Duty</Link> */}
        </nav>
        <div className="relative">
          <button 
            onClick={toggleDropdown} 
            className="flex items-center px-4 py-2 text-white rounded-lg"
          >
            <span className="mr-2">{driverName}</span>
            <span className="text-sm">▼</span>
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-black text-white rounded-lg hover:rounded-lg shadow-lg">
              <Link
                to="/driver/profile-settings"
                className="block px-4 py-2 hover:bg-gray-700"
                onClick={() => setIsDropdownOpen(false)}
              >
                Profile Settings
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 hover:bg-black"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default DriverHeader;
