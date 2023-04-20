import React from 'react';
import { MdOutlineCancel } from 'react-icons/md';
import { BsBoxSeam, BsCurrencyDollar, BsShield } from 'react-icons/bs';
import { Button } from '.';
import { userProfileData } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';
import avatar from '../data/avatar.jpg';
import { logout } from '../store/action/workerAction';
import { useDispatch, useSelector } from 'react-redux';
import { FaUserAlt } from 'react-icons/fa';
import { Link } from "react-router-dom";

const UserProfile = () => {
  const dispatch = useDispatch();
  const { currentColor } = useStateContext();
  const {worker} = useSelector((state) => state.worker);

  const onClickLogout = () => {
    // console.log("logout")
    dispatch(logout());
  }

  return (
    <div className="nav-item absolute right-1 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg dark:text-gray-200">Worker Profile</p>
        <Button
          icon={<MdOutlineCancel />}
          color="rgb(153, 171, 180)"
          bgHoverColor="light-gray"
          size="2xl"
          borderRadius="50%"
        />
      </div>
      <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
        <img
          className="rounded-full h-24 w-24"
          src={`/image/workerImages/${worker?.avatar}`}
          alt="user-profile"
        />
        <div>
          <p className="font-semibold text-xl dark:text-gray-200"> {worker?.firstName} {worker?.lastName} </p>
          <p className="text-gray-500 text-sm dark:text-gray-400">  Professional   </p>
          <p className="text-gray-500 text-sm font-semibold dark:text-gray-400"> {worker?.email} </p>
        </div>
      </div>
      <div>
        {/* {userProfileData.map((item, index) => ( */}
        <Link to='profile' className="flex gap-5 border-b-1 border-color p-4 hover:bg-light-gray cursor-pointer  dark:hover:bg-[#42464D]">
          <button
            type="button"
            style={{ color: '#03C9D7', backgroundColor: '#E5FAFB' }}
            className=" text-xl rounded-full p-3 hover:bg-light-gray"
          >
            <FaUserAlt />
          </button>

          <div>
            <p className="font-semibold dark:text-gray-200 ">My Profile</p>
            <p className="text-gray-500 text-sm dark:text-gray-400"> Account Settings </p>
          </div>
        </Link>
        {/* ))} */}
      </div>
      <div className="mt-5" onClick={onClickLogout}>
        <Button
          color="white"
          bgColor={currentColor}
          text="Logout"
          borderRadius="10px"
          width="full"
        />
      </div>
    </div>

  );
};

export default UserProfile;
