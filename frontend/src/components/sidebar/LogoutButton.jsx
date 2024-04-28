import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";
import { useState } from "react";

const LogoutButton = () => {
    const { loading, logout } = useLogout();
    const [tooltipVisible, setTooltipVisible] = useState(false);

    return (
        <div className='mt-auto' style={{display:'flex',flexDirection:'column'}}>
            
            <span
                id="tooltip"
                className="tooltip"
                style={{
                    backgroundColor: 'rgba(174,145,162, 0.7)',
                    color: 'white',
					borderRadius:'8px',
					padding:'1px',
					visibility: tooltipVisible ? 'visible' : 'hidden',
					transition: 'opacity 0.3s',
					width:'60px',
					marginLeft:'-12px'
                }}
            >Logout
            </span>
            {!loading ? (
                <BiLogOut
                    className='w-6 h-6 text-white cursor-pointer'
                    style={{  }}
                    onMouseEnter={() => setTooltipVisible(true)}
                    onMouseLeave={() => setTooltipVisible(false)}
                    onClick={logout}
                />
            ) : (
                <span className='loading loading-spinner'></span>
            )}
        </div>
    );
};

export default LogoutButton;
