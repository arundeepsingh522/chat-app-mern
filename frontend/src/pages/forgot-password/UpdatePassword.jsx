import { useState } from "react";
import { Link } from "react-router-dom";
import usePasswordUpdate from "../../hooks/useUpdatePassword";
import { showToast } from "../../utils/utils";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const UpdatePassword = () => {
  const location = useLocation();
  const {email}=location.state||{};
  console.log('prop values',email);
  console.log('location state',location.state);
  const navigate = useNavigate();
  // Corrected component name
  const [password, setPassword] = useState(""); // State for password

  const { loading, updatePassword } = usePasswordUpdate(); // Renamed function and destructured values correctly

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const response = await updatePassword(password,email); // Call the updatePassword function with the password
    if (response) {
      if(response.message)
        {
          console.log("inside response.message");
          console.log("response inside update password", response);
          showToast("Password Update Succesfully !").then(()=>{
    
            navigate('/login');
    
          });;
        }
     
    } else {
      console.log("inside response.error");
      console.log("response inside update password", response);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-white">
          <span className="text-blue-500"> ChatApp</span>
        </h1>
        <h3 className="mx auto mt-2 text-white">
          Please enter new password for your account.
        </h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text ">New Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full input input-bordered h-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button className="btn btn-block btn-sm mt-4" disabled={loading}>
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Submit"
              )}
            </button>
          </div>
          <div style={{ textAlign: "center" }}>
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-sm hover:underline hover:text-white mt-2 inline-block"
            >
              Register
            </Link>
          </div>
        </form>
      </div>
      <div id="toastMessage" className="toastMessage"></div>
    </div>
  );
};

export default UpdatePassword; // Exported component with corrected name
