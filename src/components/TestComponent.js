import React, {useState} from 'react';
import BaseLayout from './layoutComponents/BaseLayout';
import PropertySearch from './Test/PropertyComponents/ProperySearch'
import RoomSearch from './Test/RoomComponents/RoomSearch'
const Test = () => {
  return (
    <BaseLayout>
      <div>
      <PropertySearch />
      <RoomSearch />
      </div>
    </BaseLayout>
  );
};

export default Test;


