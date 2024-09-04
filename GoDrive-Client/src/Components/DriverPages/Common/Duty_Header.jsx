import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../../Context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faUser, faBell, faCar } from '@fortawesome/free-solid-svg-icons';
import constants from '../../../Utils/constant';

const DutyHeader = ({ isOnDuty, toggleDuty }) => {
  const navigate = useNavigate();
  const { authState: { name = '' } = {}, removeAuth } = useAuth(); // Destructure authState
  const [driverName, setDriverName] = useState(name);

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

  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-md backdrop-blur-lg bg-opacity-70">
      <div className="text-xl font-bold">
        <Link to="/duty">
          <img src={constants.logo_dark} alt="GoDrive Logo" className="h-10 w-auto mr-4" />
        </Link>
      </div>
      <div className="flex items-center space-x-2">
        <span className={`font-semibold ${isOnDuty ? 'text-green-500' : 'text-red-500'}`}>
          {isOnDuty ? 'ON DUTY' : 'OFF DUTY'}
        </span>
        <div
          className={`relative w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${isOnDuty ? 'bg-green-500' : 'bg-red-500'}`}
          onClick={toggleDuty}
          aria-label="Toggle Duty Status"
        >
          <div
            className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${isOnDuty ? 'translate-x-6' : 'translate-x-0'}`}
          />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <span className="font-medium text-lg">{driverName}</span>
        <Link to="/duty/profile">
          <FontAwesomeIcon icon={faUser} className="text-gray-700 text-xl cursor-pointer" aria-label="Profile" />
        </Link>
        <Link to="/duty/trip-management">
          <FontAwesomeIcon icon={faCar} className="text-gray-700 text-xl cursor-pointer" aria-label="Trip Management" />
        </Link>
        <Link to="/duty/notifications">
        <FontAwesomeIcon icon={faBell} className="text-gray-700 text-xl cursor-pointer" aria-label="Notifications" />
       </Link>
        <FontAwesomeIcon icon={faSignOutAlt} className="text-gray-700 text-xl cursor-pointer" onClick={handleLogout} aria-label="Logout" />
      </div>
    </header>
  );
};

export default DutyHeader;
