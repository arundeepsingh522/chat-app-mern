import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "../../components/sidebar/Sidebar";
import { useAuthContext } from "../../context/AuthContext";
import React, {useRef} from "react";
import { compressImage } from "../../utils/utils";
const Home = () => {
  const fileInputRef = useRef(null);
  const { authUser } = useAuthContext();
  console.log("authuser",authUser);
  let quality=90;
  const callback=async (compressedFile)=>{
    console.log('compressed file',compressedFile);

    const formData = new FormData();
    formData.append('file', compressedFile);

    try {
        const response = await fetch('/api/auth/upload', {
            method: 'POST',
            body: formData,
            headers: {
              'Content-Type': 'multipart/form-data' // Specify content type
          }
        });

        if (!response.ok) {
            throw new Error('Failed to upload file.');
        }

        console.log('File uploaded successfully.');
    } catch (error) {
        console.error('Error uploading file:', error.message);
    }

  };
  const profileClick= async()=>{
	try{
		const userEmail=authUser.email;
		console.log("profile click",userEmail)
		//calling api
		const result = await fetch("/api/auth/updateProfilePic",{
			method:"Post",
			headers:{"Content-Type":"application/json"},
			body:JSON.stringify({userEmail,updatedProfilePic}),

		});
	}catch(error)
	{

	}
	if(result.ok)
		{
			console.log("success",result);
		}

    
}
const handleImageClick =()=>
  {
    fileInputRef.current.click();
    
    
  }
  const handleFileChange=(e)=>{
    const selectedFile= e.target.files[0];
    console.log('selected file',selectedFile);
    compressImage(selectedFile,quality,callback);

  }
  return (
    <div>
      <div className="container-home">
        <div className="user-id">
          <h2>{authUser.username}</h2>
		  <input id="inputFile" ref={fileInputRef}
      type="file" name="mypic"  required 
      onChange={handleFileChange} accept="image/*"
       alt="Click to upload"/>
          <img onClick={handleImageClick} alt="Profile" src={authUser.profilePic}/>
        </div>
        <div className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
          <Sidebar />
          <MessageContainer />
        </div>
      </div>
    </div>
  );
};
export default Home;
