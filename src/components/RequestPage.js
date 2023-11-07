import React from 'react';
import { Route, useLocation } from 'react-router-dom';
import BaseLayout from './layoutComponents/BaseLayout';
import RequestComponent from './RequestComponents/requestComponent';
import RequestForLandlordComponent from './RequestComponents/requestForLandlord';

const RequestPage = () => {
  const location = useLocation();
  if (location.pathname.includes('request-receive')) {
    return (
      <BaseLayout>
        <div>
          <RequestForLandlordComponent />
        </div>
      </BaseLayout>
    );
  } else {
    return (
      <BaseLayout>
        <div>
          <RequestComponent />
        </div>
      </BaseLayout>
    );
  }
};

export default RequestPage;
