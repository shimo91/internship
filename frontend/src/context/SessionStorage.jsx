import React, { createContext, useContext, useState } from 'react';
import { jwtDecode } from "jwt-decode";

const SessionStorage = createContext();

export const SessionProvider = ({ children }) => {
  const token = sessionStorage.getItem("userToken");
  const decodeToken =jwtDecode(token);
 const loginedUser=decodeToken.username;
 const loginedId=decodeToken.userid;
  // const [userId, setDataId] = useState(loginedId);

  // const setNewDataId = (id) => {
  //   setDataId(id);
  // };

  return (
    <SessionStorage.Provider value={{ loginedId, loginedUser }}>
      {children}
    </SessionStorage.Provider>
  );
};

export const userData = () => {
  return useContext(SessionStorage);
};