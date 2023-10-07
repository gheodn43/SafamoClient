import React from 'react';
import BaseLayout from './layoutComponents/BaseLayout';
import PropertyComponent from './PropertyComponents/propertyComponent';
//
import { PropertyProvider } from '../hooks/usePropertyContext';
const PropertiesPage = () => {
  return (
    <BaseLayout>
      <div>
      <PropertyProvider>
        <PropertyComponent />
      </PropertyProvider>
      </div>
    </BaseLayout>
  );
};

export default PropertiesPage;
