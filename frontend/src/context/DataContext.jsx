import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [datauserId, setDataId] = useState('');
  const [loginedUser, setLoginedUser] = useState('');
  const [stdname, setStdName] = useState('');

  useEffect(() => {

  const token = sessionStorage.getItem("userToken");
  const decodeToken =jwtDecode(token);
 // console.log("token : "+decodeToken.userid+" username :"+decodeToken.username)
  const loginedUser=decodeToken.username;
  const loginedId=decodeToken.userid;
  const stdname=decodeToken.stdname;
  const [datauserId, setDataId] = useState(loginedId);

    if (!token) {
      // Handle the case where the token is not present or invalid
      console.error("Token not found or invalid.");
      // Perform necessary actions like redirecting to login or setting default values.
    } else {
      try {
        // Decode the token and extract necessary information
        const decodeToken = jwtDecode(token);
        console.log("Decoded token:", decodeToken);

        const userId = decodeToken.userid;
        const userName = decodeToken.username;
        const studentName = decodeToken.stdname;

        setDataId(userId);
        setLoginedUser(userName);
        setStdName(studentName);
      } catch (error) {
        console.error("Error decoding token:", error);
        // Handle token decoding errors (e.g., invalid token format)
      }
    }
  }, []);

  return (
    <DataContext.Provider value={{ datauserId, loginedUser, stdname }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  return useContext(DataContext);
};
