import React, { createContext, useContext, useState } from 'react';

const PropertyContext = createContext();

export function usePropertyContext() {
  return useContext(PropertyContext);
}

export function PropertyProvider({ children }) {
  const [showPropertyCreation, setShowPropertyCreation] = useState(false);

  return (
    <PropertyContext.Provider value={{ showPropertyCreation, setShowPropertyCreation }}>
      {children}
    </PropertyContext.Provider>
  );
}
