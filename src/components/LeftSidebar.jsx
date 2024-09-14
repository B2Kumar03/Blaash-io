import React, { useState } from 'react';
import { FaUser, FaVideo, FaShoppingCart, FaCalendarAlt, FaUsersCog, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { PiSquaresFourFill } from "react-icons/pi";
import { HiPhoto } from "react-icons/hi2";
import "./LeftSidebar.css"

const LeftSidebar = () => {
  const [isPlaylistManagerOpen, setPlaylistManagerOpen] = useState(false);

  return (
    <div className=" bg-[#293245] text-white h-screen p-4 mt-4 hidden   md:block rounded-lg">
      <div className="mb-6">
        <h1 className="text-4xl font-bold">bloosh</h1>
      </div>
      <ul className="space-y-4 text-2xl text-[#ccc] grid grid-cols-1 gap-4">
        <li className="flex items-center space-x-4 ">
          <PiSquaresFourFill />
          <span>Revenue</span>
        </li>
        <li>
          <div className="flex items-center justify-between space-x-2">
            <div className="flex items-center gap-2">
              <HiPhoto />
              <span className="ml-2">Shoppable Video</span>
            </div>
            <span className='text-[18px]'><FaChevronDown /></span>
          </div>
        </li>
        <li>
          <div className="flex items-center justify-between space-x-2">
            <div className="flex items-center gap-2">
            <HiPhoto />
              <span className="ml-2">Story</span>
            </div>
            <span className='text-[18px]'><FaChevronDown /></span>
          </div>
        </li>
        <li>
          <div className="flex items-center justify-between space-x-2">
            <div className="flex items-center gap-2">
            <HiPhoto />
              <span className="ml-2">Live Commerce</span>
            </div>
            <span className='text-[18px]'><FaChevronDown /></span>
          </div>
        </li>
        <li>
          <div
            className="flex items-center justify-between space-x-2 cursor-pointer"
            onClick={() => setPlaylistManagerOpen(!isPlaylistManagerOpen)}
          >
            <div className="flex items-center gap-2">
            <HiPhoto />
              <span className="ml-2">Playlist Manager</span>
            </div>
            {isPlaylistManagerOpen ? <span className='text-[18px]'><FaChevronUp /></span> : <span className='text-[18px]'><FaChevronDown /></span>}
          </div>
          {isPlaylistManagerOpen && (
            <ul className="ml-6 mt-2 space-y-2">
              <li className="bg-gray-700 p-2 rounded-lg">Product playlist</li>
            </ul>
          )}
        </li>
        <li className="flex items-center space-x-2">
          <FaUser />
          <span>One Click Post</span>
        </li>
        <li className="flex items-center space-x-2">
          <FaCalendarAlt />
          <span>Calendar</span>
        </li>
        <li className="flex items-center space-x-2">
          <FaUsersCog />
          <span>Hire Influencer</span>
        </li>
      </ul>
    </div>
  );
};

export default LeftSidebar;
