import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "../../components/sidebar/Sidebar";
import { useAuthContext } from "../../context/AuthContext";
import React, { useRef, useState } from "react";
import { compressImage } from "../../utils/utils";
import axios from "axios";
//import { updateAuthUser } from "../../context/AuthContext";

const Home = () => {

  let [tic,setTic]=useState(false);
  
  let selectedFile;
  const fileInputRef = useRef(null);
  let { authUser,updateAuthUser} = useAuthContext(); 
  const [profilePic, setProfilePic] = useState(authUser.profilePic);
  console.log("authuser", authUser);
  let quality = 90;

  const callback = async (compressedFile) => {
    console.log("compressed file", compressedFile);

    const formData = new FormData();
    formData.append("myFile", selectedFile);
  

    try {
      const response = await axios.post(
        "http://localhost:5000/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);

      if (response.status === 200) {
        console.log(
          "File uploaded successfully......................................."
        );
        console.log("uploaded file path ", response.data.filePath);
        setProfilePic(response.data.filePath);
        profileClick(response.data.filePath);
      } else {
        throw new Error("Failed to upload file.");
      }

      console.log("success", response.data);
    } catch (error) {
      console.error("Error uploading file::::::::::::::::", error.message);
    }
  };

  const profileClick = async (url) => {
    try {
      const userName = authUser.username;
      const updatedProfilePic = profilePic;
      console.log("profile click username", userName);
      //calling api
      const response = await axios.post(
        "http://localhost:5000/api/auth/updateProfilePic",
        {
          username: userName,
          updatedProfilePic:url,
        },
        {
          headers: {
            "Content-Type": "application/json",
          }
        }
      );

      if (response.status === 200) {
        console.log("profile pic src uploading to the server");

        const userData=JSON.parse(localStorage.getItem("chat-user"));
        userData.profilePic=url;
        localStorage.setItem("chat-user", JSON.stringify(userData));

        updateAuthUser({ ...authUser, profilePic: url });

        //authUser=useAuthContext();
        //window.location.reload(true);
        console.log('updating the windowwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww');
       // const updatedUser = { ...authUser, profilePic: response.data.filePath };
          //updateAuthUser(updatedUser);

        console.log('new authUser is ',authUser);
      } else {
        throw new Error(response.data.error);
      }
    } catch (err) {
      console.log("error in updating image to server", err.message);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    selectedFile = e.target.files[0];
    console.log("selected file", selectedFile);
    compressImage(selectedFile, quality, callback);
  };

  return (
    <div>
      <div className="container-home">
        <div className="user-id">
          <h2>{authUser.username}</h2>
          <input
            id="inputFile"
            ref={fileInputRef}
            type="file"
            name="mypic"
            required
            onChange={handleFileChange}
            accept="image/*"
            alt="Click to upload"
          />
          <img
            alt="Profile"
            src={profilePic}
            onClick={handleImageClick}
            style={{ cursor: "pointer" }}
          />
        </div>
        <div className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
          <Sidebar />
          {tic?<MessageContainer />:<MessageContainer/>}
        </div>
      </div>
    </div>
  );
};

export default Home;
