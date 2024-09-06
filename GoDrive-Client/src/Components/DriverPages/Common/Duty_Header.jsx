import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../../Context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import DropdownMenu from '../Common/DropdownMenu'; 
import constants from '../../../Utils/constant';

const DutyHeader = ({ isOnDuty, toggleDuty }) => {
  const navigate = useNavigate();
  const { authState: { name = '' } = {}, removeAuth } = useAuth();
  const [driverName, setDriverName] = useState(name);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    if (name) {
      setDriverName(name);
    }
  }, [name]);

  const handleLogout = () => {
    localStorage.removeItem('driverId');
    removeAuth();
    setTimeout(() => {
      navigate('/signin');
    }, 1300);
  };

  const handleToggleDuty = () => {
    toggleDuty();
    if (isOnDuty) {
      navigate('/duty/off-duty');
    } else {
      navigate('/duty/on-duty');
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(prevState => !prevState);
  };

  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-md backdrop-blur-lg bg-opacity-70">
      <div className="text-xl font-bold flex items-center">
        <Link to="/duty">
          <img src={constants.logo_dark} alt="GoDrive Logo" className="h-10 w-auto mr-4" />
        </Link>
        <div className="flex items-center space-x-2">
          <span className={`font-semibold ${isOnDuty ? 'text-green-500' : 'text-red-500'}`}>
            {isOnDuty ? 'ON DUTY' : 'OFF DUTY'}
          </span>
          <div
            className={`relative w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${isOnDuty ? 'bg-green-500' : 'bg-red-500'}`}
            onClick={handleToggleDuty}
            aria-label="Toggle Duty Status"
          >
            <div
              className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${isOnDuty ? 'translate-x-6' : 'translate-x-0'}`}
            />
          </div>
        </div>
      </div>
      <button
        className="relative flex items-center space-x-2 p-2 hover:bg-gray-300"
        onClick={toggleDropdown}
        aria-label="Open Menu"
      >
        <FontAwesomeIcon icon={faUser} className="text-gray-700 text-xl" />
        <span className="font-medium text-lg">{driverName}</span>
      </button>

      <DropdownMenu
        isOpen={isDropdownOpen}
        onClose={() => setIsDropdownOpen(false)}
        onLogout={handleLogout}
      />
    </header>
  );
};

export default DutyHeader;
