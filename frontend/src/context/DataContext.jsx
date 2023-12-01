import React, { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [dataId, setDataId] = useState(null);

  const setNewDataId = (id) => {
    setDataId(id);
  };

  return (
    <DataContext.Provider value={{ dataId, setNewDataId }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  return useContext(DataContext);
};