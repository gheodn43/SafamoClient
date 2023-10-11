import React, { createContext, useContext, useState } from 'react';

const LandlordReqContext = createContext();

export function useLandlordReqContext() {
  return useContext(LandlordReqContext);
}

export function LandlordReqProvider({ children }) {
  const [showLandlordReqCreation, setShowLandlordReqCreation] = useState(false);

  return (
    <LandlordReqContext.Provider value={{ showLandlordReqCreation, setShowLandlordReqCreation }}>
      {children}
    </LandlordReqContext.Provider>
  );
}