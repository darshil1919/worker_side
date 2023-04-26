import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { SiShopware } from 'react-icons/si';
import { MdOutlineCancel } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { FiShoppingBag } from 'react-icons/fi';
import { RiContactsLine } from 'react-icons/ri';
import { IoMdContacts } from 'react-icons/io';
import { AiOutlineShoppingCart, AiOutlineSchedule } from 'react-icons/ai';
import { GoRequestChanges } from 'react-icons/go';
import { MdWorkOutline } from 'react-icons/md';

import { useStateContext } from '../contexts/ContextProvider';

const Sidebar = () => {
  const { currentColor, activeMenu, setActiveMenu, screenSize } = useStateContext();

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  const activeLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-white  text-md m-2';
  const normalLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2';

  return (
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {activeMenu && (
        <>
          <div className="flex justify-between items-center">
            <Link to="/" onClick={handleCloseSideBar} className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900">
              <span>WORKER</span>
            </Link>
            <TooltipComponent content="Menu" position="BottomCenter">
              <button
                type="button"
                onClick={() => setActiveMenu(!activeMenu)}
                style={{ color: currentColor }}
                className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
              >
                <MdOutlineCancel />
              </button>
            </TooltipComponent>
          </div>
          <div className="mt-10 ">
            <div key="Dashboard">
              <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase">
                Dashboard
              </p>
              <NavLink
                to="/"
                key="dashboard"
                onClick={handleCloseSideBar}
                style={({ isActive }) => ({
                  backgroundColor: isActive ? currentColor : '',
                })}
                className={({ isActive }) => (isActive ? activeLink : normalLink)}
              >
                <FiShoppingBag />
                <span className="capitalize ">Dashborad</span>
              </NavLink>
            </div>

            <div key="Pages">
              <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase">
                Pages
              </p>
              <NavLink
                to="/work"
                key="work"
                onClick={handleCloseSideBar}
                style={({ isActive }) => ({
                  backgroundColor: isActive ? currentColor : '',
                })}
                className={({ isActive }) => (isActive ? activeLink : normalLink)}
              >
                <MdWorkOutline />
                <span className="capitalize ">work</span>
              </NavLink>
              <NavLink
                to="/request"
                key="request"
                onClick={handleCloseSideBar}
                style={({ isActive }) => ({
                  backgroundColor: isActive ? currentColor : '',
                })}
                className={({ isActive }) => (isActive ? activeLink : normalLink)}
              >
                <GoRequestChanges />
                <span className="capitalize ">request</span>
              </NavLink>
              <NavLink
                to="/schedule"
                key="schedule"
                onClick={handleCloseSideBar}
                style={({ isActive }) => ({
                  backgroundColor: isActive ? currentColor : '',
                })}
                className={({ isActive }) => (isActive ? activeLink : normalLink)}
              >
                <AiOutlineSchedule />
                <span className="capitalize">schedule</span>
              </NavLink>
              {/* <NavLink
                to="/service"
                key="service"
                onClick={handleCloseSideBar}
                style={({ isActive }) => ({
                  backgroundColor: isActive ? currentColor : '',
                })}
                className={({ isActive }) => (isActive ? activeLink : normalLink)}
              >
                <RiContactsLine />
                <span className="capitalize">Service</span>
              </NavLink> */}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
