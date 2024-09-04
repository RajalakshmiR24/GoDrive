import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsArrowLeftShort, BsChevronDown } from "react-icons/bs";
import { MdDashboard } from "react-icons/md";
import { RiPagesLine } from "react-icons/ri";
import { GoProjectSymlink } from "react-icons/go";
import { IoSettingsSharp } from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io";
import constants from '../../../Utils/constant';
import { useAuth } from '../../../Context/AuthContext'; // Adjust the import path accordingly


const Sidebar = ({ open, setOpen }) => {
  const [submenuOpen, setSubmenuOpen] = useState(null);
  const navigate = useNavigate();
  const { removeAuth } = useAuth();

  const handleLogout = () => {
    removeAuth(); // Call the logout method from AuthContext
    setTimeout(() => {
      navigate('/signin');
    }, 1300);
  };

  const Menus = [
    { title: "Dashboard", path: "/admin", icon: <MdDashboard /> },
    {
      title: "Transportation",
      icon: <GoProjectSymlink />,
      submenu: true,
      submenuItems: [
        { title: "User List", path: "/admin/user-list", icon: <RiPagesLine /> },
        { title: "Trip Portal", path: "/admin/trip-list", icon: <RiPagesLine /> },
        { title: "Driver List", path: "/admin/driver-list", icon: <RiPagesLine /> },
      ],
    },
    {
      title: "Management",
      icon: <GoProjectSymlink />,
      submenu: true,
      submenuItems: [
        { title: "Access Control", path: "/admin/management/access-control" },
      ],
    },
    { title: "Settings", path: "/admin/settings", icon: <IoSettingsSharp /> },
    { title: "Logout", path: "/signin", icon: <IoMdLogOut />, action: handleLogout },
  ];

  const toggleSubmenu = (index) => {
    setSubmenuOpen(submenuOpen === index ? null : index);
  };

  return (
    <div
      className={`bg-black h-screen p-5 pt-8 sticky top-0 ${
        open ? "w-full lg:w-72 md:w-60 sm:w-48" : "w-20"
      } duration-300 relative`}
    >
      <BsArrowLeftShort
        className={`bg-white text-dark-purple text-3xl rounded-full absolute -right-3 top-9 border border-dark-purple cursor-pointer ${
          !open && "rotate-180"
        }`}
        onClick={() => setOpen(!open)}
      />
      <div className="inline-flex items-center">
      {/* <Link to="/admin"> */}
      <img
        src={constants.logo_white}
        className={`w-12 text-4xl rounded cursor-pointer block float-left mr-2 duration-500 ${
          open && "rotate-[360deg]"
        }`}
        alt="Logo"
      />
    {/* </Link> */}
        <h1
          className={`text-white origin-left font-medium text-2xl duration-300 ${
            !open && "scale-0"
          }`}
        >
          GoDrive
        </h1>
      </div>

      <ul className="pt-2">
        {Menus.map((menu, index) => (
          <React.Fragment key={index}>
            <li
              className={`text-white text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-gray-800 rounded-md ${
                menu.spacing ? "mt-9" : "mt-2"
              }`}
              onClick={() => {
                if (menu.submenu) {
                  toggleSubmenu(index);
                }
                if (menu.action) {
                  menu.action();
                }
              }}
            >
              <span className="text-2xl block float-left">{menu.icon}</span>
              <Link
                to={menu.path}
                className={`text-base font-medium flex-1 duration-200 ${
                  !open && "hidden"
                }`}
              >
                {menu.title}
              </Link>
              {menu.submenu && open && (
                <BsChevronDown
                  className={`${submenuOpen === index && "rotate-180"}`}
                />
              )}
            </li>
            {menu.submenu && submenuOpen === index && open && (
              <ul className="pl-12">
                {menu.submenuItems.map((submenuItem, subIndex) => (
                  <li
                    key={subIndex}
                    className="text-white text-sm flex items-center gap-x-4 cursor-pointer p-2 px-5 hover:bg-gray-800 rounded-md mt-2"
                  >
                    <Link to={submenuItem.path}>{submenuItem.title}</Link>
                  </li>
                ))}
              </ul>
            )}
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
