import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";

const Message = ({ message }) => {

	//console.log('message inside Message',message);
	const { authUser } = useAuthContext();
	const { selectedConversation } = useConversation();
	const fromMe = message.senderId === authUser._id;
	const formattedTime = extractTime(message.createdAt);
	const chatClassName = fromMe ? "chat-end" : "chat-start";
	const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
	const bubbleBgColor = fromMe ? "bg-blue-500" : "";
	const shakeClass = message.shouldShake ? "shake" : "";

	return (
		<div className={`chat ${chatClassName}`}>
			<div className='chat-image avatar'>
				<div className='w-10 rounded-full'>
					<img alt='Tailwind CSS chat bubble component' src={profilePic} />
				</div>
				
			</div>
			
			<div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}>{message.message}
			{
        message.type && (message.type == 'image' ? 
		(
            <img className='p-1' width='200px' src={message.src} height='200px' alt="User uploaded" />
          ) : message.type == 'video' ? (
            <video  className='p-2' width='200px' height='200px' controls>
              <source src={message.src} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : null
        )
      }
			
			</div>
			<div className='chat-footer  text-white opacity-80 flex gap-1 items-center'>{formattedTime}</div>
		</div>
	);
};
export default Message;