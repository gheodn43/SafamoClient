
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import RentalmanagerHeader from './RentalmanagerHeader';
import Footer from './Footer';

const BaseLayout = ({ children }) => {
  const [isRentalManagerPage, setIsRentalManagerPage] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    if (currentPath.includes('/rental_manage/')) {
      setIsRentalManagerPage(true);
    } else {
      setIsRentalManagerPage(false);
    }
  }, [currentPath]);

  return (
    <div>
      {isRentalManagerPage ? <RentalmanagerHeader /> : <Header />}
      {children}
      <Footer/>
    </div>
  );
};

export default BaseLayout;

