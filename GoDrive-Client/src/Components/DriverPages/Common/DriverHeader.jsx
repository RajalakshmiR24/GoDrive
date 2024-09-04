import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import constants from '../../../Utils/constant';
import { useAuth } from '../../../Context/AuthContext'; 

const DriverHeader = () => {
  const navigate = useNavigate();
  const { authState, removeAuth } = useAuth();
  const [driverName, setDriverName] = useState('');

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
          <Link to="/driver" className="hover:bg-black px-3 py-2 rounded">Home</Link>
        </nav>
        {/* <nav className="flex space-x-4">
          <Link to="/driver/duty" className="hover:bg-black px-3 py-2 rounded">Duty</Link>
        </nav> */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <FaUserCircle />
            <Link to="/driver/profile-settings" className="hover:underline">
              <span className="text-white">{driverName}</span> {/* Make the name clickable */}
            </Link>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center text-sm bg-black hover:bg-black px-3 py-2 rounded-lg transition duration-200 ease-in-out"
          >
            <FaSignOutAlt className="mr-2" /> Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default DriverHeader;
