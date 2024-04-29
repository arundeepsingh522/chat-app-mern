import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { isValidEmail, showCustomizedAlert } from "../utils/utils";


const useSearchEmail = () => {
  const [loading, setLoading] = useState(false);
  //const { setAuthUser } = useAuthContext();
  const navigate = useNavigate();

  const searchEmail = async (email) => {
    const success = handleInputErrors(email);
    if (!success) return;
    setLoading(true);
    try {
      const res = await fetch("/api/auth/searchEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      console.log("email search", data);
      if (data.error) {
        throw new Error(data.error);
      } else {
        console.log('inside response eamil search');
        localStorage.setItem("searchEmail", email);
        navigate("/update-password");
        
      }
    } catch (error) {
      showCustomizedAlert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, searchEmail }; // Corrected typo in the return statement
};

export default useSearchEmail;

function handleInputErrors(email) {
  if (!email) {
    showCustomizedAlert("Email is Required");
    return false;
  } else if (!isValidEmail(email)) {
    showCustomizedAlert("Please enter a valid email address");
    return false;
  }

  return true;
}
