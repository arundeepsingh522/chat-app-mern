import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import { isValidEmail,isValidPassword,showCustomizedAlert } from "../utils/utils.js";
const useSignup = () => {
	const [loading, setLoading] = useState(false);
	const { setAuthUser } = useAuthContext();

	const signup = async ({ fullName, username, password, confirmPassword, gender,email }) => {
		const success = handleInputErrors({ fullName, username, password, confirmPassword, gender,email});
		
		if (!success) return;

		setLoading(true);
		try {
			const res = await fetch("/api/auth/signup", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ fullName, username, password, confirmPassword, gender,email }),
			});

			const data = await res.json();
			if (data.error) {
				throw new Error(data.error);
			}
			localStorage.setItem("chat-user", JSON.stringify(data));
			setAuthUser(data);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { loading, signup };
};
export default useSignup;

function handleInputErrors({ fullName, username, password, confirmPassword, gender ,email}) {

	console.log('email in handle errors',email);
	if (!fullName) {
		showCustomizedAlert("Full Name is Required");
		//toast.error("Please fill in all fields");
		return false;
	}else if(fullName.length<6)
	{
		showCustomizedAlert("Full Name must be at least 6 characters");
        return false;
	}else if(!username)
	{
		showCustomizedAlert("Username is Required");
        return false;
	}else if(username.length<6)
	{
		showCustomizedAlert("Username must be at least 6 characters");
		return false;
	}else if(!email)
	{
		showCustomizedAlert("Email is Required");
        return false;
	}else if(!isValidEmail(email))
	{
		showCustomizedAlert("Please enter a valid email address");
		return false;
	}
	else if(!password){
		showCustomizedAlert("Password is Required");
        return false;
	}else if(!isValidPassword(password)){
		showCustomizedAlert("Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 8 characters long.");
        return false;
	}else if (password!==confirmPassword)
	{
		showCustomizedAlert("Password and Confirm Password do not match");
        return false;
	}else if(!gender)
	{
		showCustomizedAlert("Please select a gender");
		return false;
	}

	return true;
}
