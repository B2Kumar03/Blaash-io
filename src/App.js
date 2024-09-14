import React, { useEffect, useState } from "react";
import { ref, set, onValue } from "firebase/database";
import { database } from "./firebaseConfig";
import Header from "./components/Header";
import LeftSidebar from "./components/LeftSidebar";
import PlayList from "./components/PlayList";

function App() {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    // Test writing data to Firebase
    const testRealtimeDatabase = () => {
      set(ref(database, "user/playlist1"), [{
        name: "Test Playlist",
        videos: ["Video 1", "Video 2"],
      }]);
    };

    // Fetch data from Firebase
    const fetchData = () => {
      const playlistRef = ref(database, "user/playlist1");
      onValue(playlistRef, (snapshot) => {
        const data = snapshot.val();
        console.log("Firebase Data:", data);
      });
      // alert("Data added")
    };

    testRealtimeDatabase();
    fetchData();
    // writeData()
  }, []);

  const API_KEY = "AIzaSyCcEuMFvHtpoWfmwx2_U__SzR-josE_zDg"; // Replace this with your YouTube API key

  // List of playlist IDs
  const PLAYLIST_IDS = [
    "PLu71SKxNbfoBuX3f4EOACle2y-tRC5Q37",
    "PL38wFHH4qYZUdIKP9jG371N3G4kbWAg2c",
    "PLI0saxAvhd_OdRWyprSe3Mln37H0u4DAp",
    "PLqM7alHXFySGyrPChD4zibQ89dvO099UL",
    "PLgPr_sLjPU2BTSKQPNaFWnoeRLSEmrTj_",
    "PLwGdqUZWnOp3t3qT7pvAznwUDzKbhEcCc",
  ];

  // Function to import playlists from YouTube
  const handleImportPlaylist = async () => {
    try {
      const promises = PLAYLIST_IDS.map(async (playlistID) => {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistID}&maxResults=10&key=${API_KEY}`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch playlist ${playlistID}`);
        }

        const data = await response.json();
        return data;
      });

      // Resolve all promises and update the playlists state
      const fetchedPlaylists = await Promise.all(promises);
      setPlaylists((prevPlaylists) => [...prevPlaylists, ...fetchedPlaylists]);
      console.log("Fetched Playlists:", fetchedPlaylists);
    } catch (error) {
      console.error("Error fetching the playlists:", error);
      alert("Error importing playlists");
    }
  };

  return (
    <>
      <Header onImport={handleImportPlaylist} />
      <div className="md:flex gap-4 ">
       <LeftSidebar />
        <PlayList playlist={playlists} />
      </div>
    </>
  );
}

export default App;
