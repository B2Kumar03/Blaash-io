import React, { useContext, useState } from 'react';
import { PiDotsThreeOutline } from "react-icons/pi";
import { FaSpinner } from 'react-icons/fa'; // Importing a spinner icon
import RightPanel from './RightPanel'; // Import RightPanel component
import axios from 'axios'; // Import axios for API calls
import { context } from './ApiContext';

const PlayList = ({ playlist }) => {
  const [selectedPlaylist, setSelectedPlaylist] = useState(null); // To store selected playlist data
  const [showPanel, setShowPanel] = useState(false); // To toggle the right panel
  const [playListId, setPlaylistId] = useState(null); // To store the selected playlist ID
  const { isLoading, setIsloading } = useContext(context);

  console.log("Isloading", isLoading);
  
  // Handle click on the playlist thumbnail
  const handleThumbnailClick = async (items, id) => {
    setShowPanel(true); // Show the right panel when a playlist is selected
    console.log(items, "items");
    try {
      // Try fetching the playlist data from the API
      const response = await axios.get(`https://porifolio-builder-backend-1.onrender.com/api/v1/get-playlist/${id}`);
      if (response.data.success) {
        setSelectedPlaylist(response.data.data.playlistVide);
      } else {
        setSelectedPlaylist(items.items);
      }
    } catch (error) {
      console.error('Error fetching playlist data:', error);
      setSelectedPlaylist(items.items);
    }

    // Set playlist ID
    setPlaylistId(id);
  };

  console.log("Rerender");

  return (
    <div className='w-full flex lg:flex-row flex-col text-white p-4 mt-4 rounded-lg'>
      <div className='w-full lg:w-[60%]'>
        <p className='text-2xl font-bold'>Product Playlists</p>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 bg-[#293245] text-white h-auto mb-4 p-4 pb-32 gap-8 mt-4 rounded-lg'>
          {isLoading ? (
            <div className='flex justify-center items-center h-40'>
              <FaSpinner className='animate-spin text-blue-500 text-3xl' />
            </div>
          ) : (
            playlist.map((items, index) => (
              <div
                key={index}
                className='bg-[#1f2733] rounded-3xl relative overflow-hidden cursor-pointer'
                onClick={() => handleThumbnailClick(items, items.items[0].snippet.playlistId)} // Pass playlist ID along with items
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
      {showPanel && (
        <RightPanel selectedPlaylist={selectedPlaylist} playListId={playListId} />
      )}
    </div>
  );
};

export default PlayList;
