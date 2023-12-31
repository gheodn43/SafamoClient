
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer'
import RentalmanagerHeader from './RentalmanagerHeader';

const BaseLayout = ({ children }) => {
  const [isRentalManagerPage, setIsRentalManagerPage] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    if (currentPath.includes('/rental_manage')) {
      setIsRentalManagerPage(true);
    } else {
      setIsRentalManagerPage(false);
    }
  }, [currentPath]);

  return (
    <div className='main-body'>
      {isRentalManagerPage ? <RentalmanagerHeader /> : <Header />}
      {children}
      <Footer/>
    </div>
  );
};

export default BaseLayout;

