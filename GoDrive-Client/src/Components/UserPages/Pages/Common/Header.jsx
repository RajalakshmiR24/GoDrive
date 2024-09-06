import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { BsWalletFill } from 'react-icons/bs';
import { BiSupport } from 'react-icons/bi';
import { RiAccountCircleFill } from 'react-icons/ri';
import { IoMdSettings } from 'react-icons/io';
import { FaCar, FaChevronDown } from 'react-icons/fa';
import { MdDirectionsCar } from 'react-icons/md';
import { AiOutlineHistory } from 'react-icons/ai';
import constants from '../../../../Utils/constant';
import { useAuth } from '../../../../Context/AuthContext'; 


const menuItems = [
  { href: '/user/profiles/wallet', label: 'Wallet', icon: <BsWalletFill className="mr-2" /> },
  { href: '/user/profiles/support', label: 'Support', icon: <BiSupport className="mr-2" /> },
  { href: '/user/profiles/manage_account', label: 'Manage Account', icon: <RiAccountCircleFill className="mr-2" /> },
  { href: '/user/profiles/settings', label: 'Settings', icon: <IoMdSettings className="mr-2" /> },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('/user');
  const [avatar, setAvatar] = useState("https://via.placeholder.com/150");
  const [userName, setUserName] = useState(""); 
  const { authState, removeAuth } = useAuth();
  const navigate = useNavigate();
  const menuRef = useRef(null);

  const handleNavigate = (path) => {
    setActiveTab(path);
    navigate(path);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };


  const handleLogout = () => {
    removeAuth(); // Use the logout method from AuthContext
    setTimeout(() => {
      navigate('/signin');
    }, 1300);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {

    if (authState && authState.name) {
      setUserName(authState.name);
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [authState]);

  const renderMenuItems = () =>
    menuItems.map((item, index) => (
      <React.Fragment key={item.href}>
        <a
          href={item.href}
          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          onClick={() => setIsMenuOpen(false)}
        >
          {item.icon}
          {item.label}
        </a>
      </React.Fragment>
    ));

  return (
    <header className="flex justify-between items-center p-4 bg-white shadow-md border-b border-gray-200">
      <div className="text-xl font-bold">
        <Link to="/user">
          <img src={constants.logo_dark} alt="GoDrive Logo" className="h-10 w-auto mr-4" />
        </Link> 
      </div>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <button
              onClick={() => handleNavigate('/user')}
              className={`flex items-center py-2 px-4 text-sm font-medium ${
                activeTab === '/user'
                  ? 'text-gray-900 border-b-2 border-black'
                  : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              <FaCar className="mr-1" />
              Ride
            </button>
          </li>
          <li>
            <button
              onClick={() => handleNavigate('/user/rental-form')}
              className={`flex items-center py-2 px-4 text-sm font-medium ${
                activeTab === '/user/rental-form'
                  ? 'text-gray-900 border-b-2 border-black'
                  : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              <MdDirectionsCar className="mr-1" />
              Rental
            </button>
          </li>
        </ul>
      </nav>
      <div className="flex items-center space-x-4 relative">
        <a href="/user/mytrips" className="text-gray-700 hover:text-gray-900 flex items-center text-sm font-medium">
          <AiOutlineHistory className="mr-2" />
          My Trips
        </a>
        <div className="relative flex items-center">
          <span className="mr-2 text-sm text-gray-700">{userName}</span>
          <label htmlFor="avatar-upload" className="cursor-pointer flex items-center text-gray-700 hover:text-gray-900">
            <img
              className="h-8 w-8 rounded-full border border-gray-300"
              src={avatar}
              alt="User Avatar"
            />
          </label>
          <input
            id="avatar-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAvatarChange}
          />
          <FaChevronDown
            className="ml-2 text-gray-700 hover:text-gray-900 cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          />
          {isMenuOpen && (
            <div
              ref={menuRef}
              className="absolute top-5 right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-10"
            >
              {renderMenuItems()}
              <hr className="border-t border-gray-200 my-1" />
              <button
                onClick={handleLogout}
                className="w-full text-left flex items-center px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
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

export default Header;
