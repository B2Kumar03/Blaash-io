import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { ref, set, onValue } from "firebase/database";
import { database } from "../firebaseConfig";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RightPanel = ({ selectedPlaylist }) => {
  const [thumbnailTitle, setThumbnailTitle] = useState('Get Sporty in Style');
  const [videoStatus, setVideoStatus] = useState('active');
  const [videos, setVideos] = useState([]);

  // Fetch playlist data from Firebase
  const fetchData = () => {
    const playlistRef = ref(database, "/user/playlist1");
    onValue(playlistRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setVideos(data);
      } else {
        setVideos([]); // Handle case where no data is found
      }
    });
  };

  // Save playlist data to Firebase
  const saveOnFirebase = () => {
    set(ref(database, 'users'+'/playlist1'), videos)
      .then(() => {
        toast.success('Playlist saved successfully!');
      })
      .catch((error) => {
        toast.error('Error saving playlist: ' + error.message);
      });
  };

  useEffect(() => {
    fetchData();  // Fetch data on component mount
  }, []);

  useEffect(() => {
    if (selectedPlaylist?.items) {
      setVideos(selectedPlaylist.items);
    }
  }, [selectedPlaylist]);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedVideos = Array.from(videos);
    const [movedVideo] = reorderedVideos.splice(result.source.index, 1);
    reorderedVideos.splice(result.destination.index, 0, movedVideo);

    setVideos(reorderedVideos);
    saveOnFirebase(); // Save the new order to Firebase
  };

  return (
    <div className='w-full lg:w-[40%] bg-[#293245] rounded-lg md:ml-4 p-4 '>
      <ToastContainer />
      <h2 className='text-xl font-bold mb-4'>Product Playlists</h2>

      <div className='mb-4 '>
        <label className='block mb-2 font-semibold text-gray-300'>Thumbnail Title</label>
        <input
          type='text'
          value={thumbnailTitle}
          onChange={(e) => setThumbnailTitle(e.target.value)}
          className='w-full p-2 rounded-lg bg-[#1f2733] text-white'
        />
      </div>

      <div className='mb-4'>
        <label className='block mb-2 font-semibold text-gray-300'>Video Status</label>
        <div className='flex items-center gap-4'>
          <label className='flex items-center'>
            <input
              type='radio'
              value='active'
              checked={videoStatus === 'active'}
              onChange={() => setVideoStatus('active')}
              className='mr-2'
            />
            Active
          </label>
          <label className='flex items-center'>
            <input
              type='radio'
              value='inactive'
              checked={videoStatus === 'inactive'}
              onChange={() => setVideoStatus('inactive')}
              className='mr-2'
            />
            Inactive
          </label>
        </div>
      </div>

      <div>
        <h3 className='font-semibold mb-2 text-gray-300'>Product List</h3>

        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId='videos'>
            {(provided) => (
              <ul
                className='list-none p-0 max-h-[460px] overflow-y-scroll scrollbar-hide'
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {videos.slice(0, 9).map((video, index) => (
                  <Draggable key={video.id} draggableId={video.id} index={index}>
                    {(provided, snapshot) => (
                      <li
                        className={`bg-[#1f2733] p-4 mb-2 rounded-lg flex justify-between items-center ${
                          snapshot.isDragging ? 'shadow-lg opacity-75' : ''
                        }`} 
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <div className='flex items-center'>
                          <img
                            src={video?.snippet?.thumbnails?.default?.url || 'https://via.placeholder.com/150'}
                            alt={video?.snippet?.title || 'No Title'}
                            className='w-16 h-16 mr-4 rounded-lg object-cover'
                          />
                          <div>
                            <p className='font-semibold text-white'>
                              {video?.snippet?.title || 'Untitled Video'}
                            </p>
                            <p className='text-gray-400'>Products Attached: 5</p>
                          </div>
                        </div>
                        <input type='checkbox' />
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </div>

      <button
        onClick={saveOnFirebase} 
        className='w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded-lg'
      >
        Update Playlist
      </button>
    </div>
  );
};

export default RightPanel;
