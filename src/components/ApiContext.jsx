import React, { createContext,useState } from 'react';

export const context = createContext();

export const ContextProvider = ({ children }) => {
  const [isLoading, setIsloading] =useState();

  return (
    <context.Provider value={{ isLoading, setIsloading }}>
      {children}
    </context.Provider>
  );
};
