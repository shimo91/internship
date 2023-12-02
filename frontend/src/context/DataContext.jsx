import React, { createContext, useContext, useState } from 'react';
import { jwtDecode } from "jwt-decode";

const DataContext = createContext();

export const DataProvider = ({ children }) => {

  const token = sessionStorage.getItem("userToken");
  const decodeToken =jwtDecode(token);
  console.log("token : "+decodeToken.userid+" username :"+decodeToken.username)
  const loginedUser=decodeToken.username;
  const loginedId=decodeToken.userid;

  const [datauserId, setDataId] = useState(loginedId);

  // const setNewDataId = (id) => {
  //   setDataId(id);
  // };

  return (
    <DataContext.Provider value={{ datauserId, loginedUser }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  return useContext(DataContext);
};