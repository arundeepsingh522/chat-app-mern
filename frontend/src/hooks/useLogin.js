import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

import { isValidEmail,showCustomizedAlert } from "../utils/utils";

const useLogin = () => {
	const [loading, setLoading] = useState(false);
	const { setAuthUser } = useAuthContext();

	const login = async (email, password) => {
		const success = handleInputErrors(email, password);
		if (!success) return;
		setLoading(true);
		try {
			const res = await fetch("/api/auth/login",{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password }),
			});

			const data = await res.json();
			if (data.error) {
				throw new Error(data.error);
			}

			localStorage.setItem("chat-user", JSON.stringify(data));
			setAuthUser(data);
		} catch (error) {
			
			showCustomizedAlert(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { loading, login };
};
export default useLogin;

function handleInputErrors(email, password) {
	if(!email)
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
	}

	return true;
}
