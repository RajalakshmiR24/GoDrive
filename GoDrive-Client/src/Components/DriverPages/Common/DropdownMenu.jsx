import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faUser, faBell, faCar,faHistory } from '@fortawesome/free-solid-svg-icons';

const DropdownMenu = ({ isOpen, onClose, onLogout }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed top-14 right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
      <Link to="/duty/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={onClose}>
        <FontAwesomeIcon icon={faUser} className="mr-2" /> Profile
      </Link>
      <Link to="/duty/ride-management" className="block px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={onClose}>
        <FontAwesomeIcon icon={faCar} className="mr-2" /> Ride Management
      </Link>
      <Link to="/duty/ride-history" className="block px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={onClose}>
        <FontAwesomeIcon icon={faHistory} className="mr-2" /> Ride History
      </Link>
      <Link to="/duty/notifications" className="block px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={onClose}>
        <FontAwesomeIcon icon={faBell} className="mr-2" /> Notifications
      </Link>
      <button
        onClick={onLogout}
        className="block w-full px-4 py-2 text-gray-700 hover:bg-gray-100 text-left"
      >
        <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" /> Logout
      </button>
    </div>,
    document.body // Render the dropdown menu directly into the body
  );
};

export default DropdownMenu;
