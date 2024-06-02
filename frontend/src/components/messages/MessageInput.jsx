import { useRef, useState } from "react";
import { BsSend } from "react-icons/bs";
import { BsFilePlus } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";
const MessageInput = () => {
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message )
		{
			if(!file)
				{
					console.log('return');
					return;
				}else{
					console.log('sending file only');
					//setMessage('  ');

				}
		} 
    console.log("message is sending");

    let newMessage;
    console.log("file before checking", file);
    if (file) {
      //now checking checking file type and upload it to server
      console.log("file is present");
      const fileType = file.type.startsWith("image/") ? "image" : "video";

      //uploading file
	  //
      const formData = new FormData();
      formData.append("myFile", file);
      console.log("formData", formData);
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      console.log("data", data);
      newMessage = {
        message: message,
        type: fileType,
        src: data.filePath,
      };
    } else {
      console.log("file is not present");
      newMessage = {
        message: message,
      };
    }

	console.log('file uploaded');

    await sendMessage(message,newMessage.type ?newMessage.type:'', newMessage.src?newMessage.src:'');
    setMessage("");
    setFile(null);
    fileInputRef.current.value = null;
  };
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    console.log("selected file", file);
    //compressImage(selectedFile, quality, callback);
  };
  const handleImageClick = () => {
    fileInputRef.current.click();
  };
  return (
    <form className="px-4 my-3" onSubmit={handleSubmit}>
      <div className="w-full relative">
        <input
          type="text"
          className="border text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 text-white"
          placeholder="Send a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <img
          onClick={handleImageClick}
          className="plus absolute inset-y-0 end-0  mt-1 me-11"
          src="https://cdn1.iconfinder.com/data/icons/unicons-line-vol-5/24/plus-square-512.png"
        ></img>
        <input
          ref={fileInputRef}
          type="file"
          name="mypic"
          onChange={handleFileChange}
          accept="image/*,video/*"
          className="absolute opacity-0 w-full h-full cursor-pointer"
          style={{ top: 0, left: 0, zIndex: -1 }}
        />

        <button
          type="submit"
          className="text-white absolute inset-y-0 end-0 flex items-center pt-5 pe-5 pb-5 "
        >
          {loading ? (
            <div className="loading loading-spinner"></div>
          ) : (
            <BsSend />
          )}
        </button>
      </div>
    </form>
  );
};
export default MessageInput;

// STARTER CODE SNIPPET
// import { BsSend } from "react-icons/bs";

// const MessageInput = () => {
// 	return (
// 		<form className='px-4 my-3'>
// 			<div className='w-full'>
// 				<input
// 					type='text'
// 					className='border text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 text-white'
// 					placeholder='Send a message'
// 				/>
// 				<button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3'>
// 					<BsSend />
// 				</button>
// 			</div>
// 		</form>
// 	);
// };
// export default MessageInput;
