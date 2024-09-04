import React from "react";
import { useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { HiOutlineBell } from "react-icons/hi";
import { HiInboxIn } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";

const Header = () => {
  const navigate = useNavigate();

  const handleSearchClick = () => {
    navigate("/search");
  };

  const handleNotificationsClick = () => {
    navigate("/admin/notification");
  };

  const handleMessagesClick = () => {
    navigate("/admin/inbox");
  };

  const handleProfileClick = () => {
    navigate("/admin/profile");
  };

  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      <div className="relative flex items-center">
        <BsSearch
          className="absolute left-3 text-xl text-gray-400 cursor-pointer"
          onClick={handleSearchClick}
        />
        <input
          type="text"
          placeholder="Search"
          className="pl-10 p-2 border rounded focus:outline-none"
        />
      </div>
      <div className="flex items-center space-x-4">
        <HiOutlineBell
          className="text-xl cursor-pointer"
          onClick={handleNotificationsClick}
        />
        <HiInboxIn
          className="text-xl cursor-pointer"
          onClick={handleMessagesClick}
        />
        <CgProfile
          className="text-xl cursor-pointer"
          onClick={handleProfileClick}
        />
      </div>
    </header>
  );
};

export default Header;
