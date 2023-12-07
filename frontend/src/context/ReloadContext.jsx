import React, { createContext, useContext, useState } from 'react';

const ReloadContext = createContext();

export const ReloadProvider = ({ children }) => {
  const [shouldReload, setShouldReload] = useState(false);

  const triggerReload = () => {
    setShouldReload(true);
  };

  const resetReload = () => {
    setShouldReload(false);
  };

  return (
    <ReloadContext.Provider value={{ shouldReload, triggerReload, resetReload }}>
      {children}
    </ReloadContext.Provider>
  );
};

export const useReload = () => {
  return useContext(ReloadContext);
};