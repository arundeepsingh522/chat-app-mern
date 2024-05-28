import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";

import { showToast,isValidPassword,showCustomizedAlert } from "../utils/utils.js";

const usePasswordUpdate = () => {
  // Renamed to usePasswordUpdate

  const [loading, setLoading] = useState(false);

  const updatePassword = async (password,email) => {
    // Renamed to updatePassword
    const success = handleInputErrors(password);
    if (!success) {
      console.log('returning from succes');
      return;
    };
    setLoading(true);
    try {
      const searchEmail =email;
      console.log('search email',searchEmail);
      const res = await fetch("/api/auth/updateUserData", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ searchEmail, password }),
      });
      const data = await res.json();
      console.log("after password update", data.email);
      if (data.error) {
        throw new Error(data.error);
      } else {
        // Do something with the response data if needed
        // For example, set the authenticated user in context
        // setAuthUser(data);
        return data;
      }
    } catch (error) {
      showCustomizedAlert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, updatePassword }; // Corrected typo in the return statement
};

function handleInputErrors(password) {
  if (!password) {
    console.log('inside empty password');
    showCustomizedAlert("Password is required");
    return false;
  }
  console.log('ckeck');
   if(!isValidPassword(password)){
		showCustomizedAlert("Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 8 characters long.");
        return false;
	}
  // You can add more validation rules for the password if needed
  return true;
}
export default usePasswordUpdate; // Exported with the new name
