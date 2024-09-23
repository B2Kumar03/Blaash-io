import React, { useContext, useState } from "react";
import { AiOutlineYoutube } from "react-icons/ai"; // Importing YouTube icon
import { FcGoogle } from "react-icons/fc"; // Google icon for the button
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth"; 
import { app } from "../firebaseConfig"; // Firebase config
import { context } from "./ApiContext";

function Header({ onImport }) {
  const [user, setUser] = useState(null);  // State to store the logged-in user's information
  const [isImported,setIsimported]=useState(false)
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const {isLoading, setIsloading}=useContext(context)

  // Handle Google login
  const handleGoogleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        setUser(user);  // Set the logged-in user info
      })
      .catch((error) => {
        console.error("Error during login:", error.message);
      });
  };

  // Handle logout
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log(user);
        setUser(null);  // Reset user state after logging out
      })
      .catch((error) => {
        console.error("Error during logout:", error.message);
      });
      
      ;
  };

  return (
    <header className="bg-[#293245] p-8 grid grid-cols-1 md:grid-cols-2 justify-between items-center sm:items-start sm:justify-between rounded-lg">
      {/* Logo or Title */}
      <div className="text-white text-2xl font-bold mb-4 sm:mb-0">Playlist Manager</div>

      {/* Button Group */}
      <div className=" flex gap-2 justify-center items-center  ">
        {/* Import Button */}
        <button
          onClick={async()=>{
            if(isImported)return
            setIsimported(true)
            setIsloading((prev)=>!prev)
            await onImport()
            setIsloading((prev)=>!prev)
          }}
          className="flex items-center bg-white text-blue-600 font-semibold py-2 px-4 rounded hover:bg-blue-100 transition"
        >
          <AiOutlineYoutube className="mr-2" /> {/* YouTube Icon */}
          Import Playlist
        </button>

        {/* Google Login Button */}
        {user ? (
          <div className="flex items-center space-x-4">
            {/* Show user's profile image and a logout button */}
            <img
              src={user.photoURL}
              alt={user.displayName}
              className="w-10 h-10 rounded-full object-cover"
            />
            <button
              onClick={handleLogout}
              className="bg-white text-red-600 font-semibold py-2 px-4 rounded hover:bg-red-100 transition"
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={handleGoogleLogin}
            className="flex items-center bg-white text-gray-600 font-semibold py-2 px-4 rounded hover:bg-gray-100 transition"
          >
            <FcGoogle className="mr-2" /> {/* Google Icon */}
            Login with Google
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;
