import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
	return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
	const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem("chat-user")) || null);
  const updateAuthUser = (newUserData) => {
    setAuthUser(newUserData);
  };
	return <AuthContext.Provider value={{ authUser, setAuthUser ,updateAuthUser }}>{children}</AuthContext.Provider>;
};

//old code uncomment it if the new code give exceptions fine

/*


// new code comment or delete it if this give error or exceptions
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

let updateAuthUserFunction = (updatedUser) => {
  console.error('updateAuthUser function not initialized');
};

export const AuthContextProvider = ({ children }) => {
	const currentUser = JSON.parse(localStorage.getItem("chat-user"));
	console.log('ctc currunt useer:',currentUser);
	const [authUser, setAuthUser] = useState(currentUser || null);
  

  const updateAuthUser = (updatedUser) => {
    setAuthUser(updatedUser);
  };

  updateAuthUserFunction = updateAuthUser;

  return (
    <AuthContext.Provider value={{ authUser, updateAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const updateAuthUser = (updatedUser) => {
  updateAuthUserFunction(updatedUser);
};*/
