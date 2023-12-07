import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [datauserId, setDataId] = useState('');
  const [loginedUser, setLoginedUser] = useState('');
  const [stdname, setStdName] = useState('');

  useEffect(() => {
    const token = sessionStorage.getItem("userToken");
    if (!token) {
      console.error("Token not found or invalid.");
      // Handle the case where the token is not present or invalid
    } else {
      try {
        const decodeToken = jwtDecode(token);

        const userId = decodeToken.userid;
        const userName = decodeToken.username;
        const studentName = decodeToken.stdname;

        setDataId(userId);
        setLoginedUser(userName);
        setStdName(studentName);
      } catch (error) {
        console.error("Error decoding token:", error);
        // Handle token decoding errors
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
