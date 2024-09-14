import React, { useState } from 'react';
import { PiDotsThreeOutline } from "react-icons/pi";
import RightPanel from './RightPanel';  // Import RightPanel component

const PlayList = ({ playlist }) => {
  const [selectedPlaylist, setSelectedPlaylist] = useState(null); // To store selected playlist data
  const [showPanel, setShowPanel] = useState(false); // To toggle the right panel

  // Handle click on the playlist thumbnail
  const handleThumbnailClick = (items) => {
    setSelectedPlaylist(items); // Update selected playlist
    setShowPanel((prev)=>!prev);         // Show the right panel
  };
  console.log("Rerender")

  return (
    <div className='w-full flex lg:flex-row flex-col text-white p-4 mt-4 rounded-lg'>
      <div className='w-full lg:w-[60%]'>
        <p className='text-2xl font-bold'>Product Playlists</p>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 bg-[#293245] text-white h-auto mb-4 p-4 pb-32 gap-8 mt-4 rounded-lg'>
          {playlist.length === 0 ? (
            <p>Import playlist from YouTube</p>
          ) : (
            playlist.map((items, index) => (
              <div
                key={index}
                className='bg-[#1f2733] rounded-3xl relative overflow-hidden cursor-pointer'
                onClick={() => handleThumbnailClick(items)} // OnClick sets the selected playlist
              >
                {/* Playlist Thumbnail */}
                <img
                  src={items.items[0].snippet.thumbnails.high.url}
                  alt={items.items[0].snippet.title}
                  className='w-full h-40 object-cover rounded-t-lg'
                />

                {/* Title and Blue Left Border */}
                <div className='flex items-center p-4 relative'>
                  <div className='w-[40px] rounded-r-2xl bg-blue-500 h-[40px] absolute left-0 top-4'></div>
                  <div className='ml-6'>
                    <p className='font-semibold text-white'>
                      {items.items[0].snippet.title}
                    </p>
                  </div>
                </div>

                {/* Video Count */}
                <div className='flex justify-between px-4 pb-4 items-center'>
                  <div className='text-gray-400 flex items-center'>
                    <span className='material-icons text-lg mr-1'>
                      video_library
                    </span>
                    <span>{items.items.length} Videos</span>
                  </div>

                  {/* More Options Icon */}
                  <div className='bg-[#4b4949] p-3 rounded-tr-3xl rounded-bl-2xl absolute top-0 right-0'>
                    <PiDotsThreeOutline />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Right Panel for Video List */}
     
        <RightPanel selectedPlaylist={selectedPlaylist} /> 
      
    </div>
  );
};

export default PlayList;
