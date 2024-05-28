import { useState } from "react";
import { Link } from "react-router-dom";
import userSearchEmail from "../../hooks/userSearchEmail";
import { showToast } from "../../utils/utils";
import { useNavigate } from "react-router-dom";


const ForgotPassword = () => {
  const navigate = useNavigate();
   // Corrected component name
  const [email, setEmail] = useState("");
  const { loading, searchEmail  } = userSearchEmail();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response =await searchEmail(email);
    console.log('response of email search',response);
    if(response.message)
      {
        console.log('inside response.message');
        const data= email;
       // localStorage.setItem("searchEmail", data);
        const propsToSend = { email: data };
        showToast("User Found !").then(()=>{
          navigate("/update-password",{state:propsToSend});
        })
       
      }
   
  //  console.log('response of email search',response);
  };
  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-white">
          <span className="text-blue-500"> ChatApp</span>
        </h1>
        <h3 className="mx auto mt-4 text-white">
          Please enter your Email address to search for your account.</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="label mt-2">
              <span className="text-base label-text text-white">Email</span>
            </label>
            <input
              type="text"
              placeholder="Enter Email"
              className="w-full input input-bordered h-10"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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

          <div style={{textAlign:'center'}}>
            Don't have an account? <> </>   
            <Link to="/signup" className="text-sm hover:underline hover:text-white mt-2 inline-block">
              Register
            </Link>
          </div>
        </form>
      </div>
      <div id="toastMessage" className="toastMessage"></div>
    </div>
  );
};

export default ForgotPassword;
