import React from 'react';
import BaseLayout from './layoutComponents/BaseLayout';
import PropertyComponent from './PropertyComponents/propertyComponent';

const PropertiesPage = () => {
  return (
    <BaseLayout>
      <div>
        <PropertyComponent />
      </div>
    </BaseLayout>
  );
};

export default PropertiesPage;
