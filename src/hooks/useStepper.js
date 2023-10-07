import React, { useState } from 'react';

function PropertyRegisStepper() {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <div className="stepper">
      <div className={`step ${currentStep === 1 ? 'active' : ''}`}>
        Bước 1
        <button onClick={handleNextStep}>Next</button>
      </div>
      <div className={`step ${currentStep === 2 ? 'active' : ''}`}>
        Bước 2
        <button onClick={handlePrevStep}>Previous</button>
        <button onClick={handleNextStep}>Next</button>
      </div>
      <div className={`step ${currentStep === 3 ? 'active' : ''}`}>
        Bước 3
        <button onClick={handlePrevStep}>Previous</button>
      </div>
    </div>
  );
}

export default PropertyRegisStepper;
