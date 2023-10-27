import React, {useState} from 'react';
import BaseLayout from './layoutComponents/BaseLayout';
import StarRating from './Test/starRating';
const Test = () => {
  return (
    <BaseLayout>
      <div>
      <StarRating value={3.6} />
      <StarRating value={3.8} />
      </div>
    </BaseLayout>
  );
};

export default Test;


