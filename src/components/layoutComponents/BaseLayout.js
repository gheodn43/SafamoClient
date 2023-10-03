
import React from 'react';
import Header from './Header';


const BaseLayout = ({ children }) => {
  return (
    <div>
      <Header />

      {children}
{/* footer */}
    </div>
  );
};
export default BaseLayout;
