import React from 'react';
import BaseLayout from './layoutComponents/BaseLayout';
import RequestComponent from './RequestComponents/requestComponent';

const RequestPage = () => {
  return (
    <BaseLayout>
      <div>
        <RequestComponent/>
      </div>
    </BaseLayout>
  );
};

export default RequestPage;