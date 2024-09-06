import React, { useState } from 'react';
import DutyHeader from './Common/Duty_Header'; 
import { Outlet } from "react-router-dom";
import OnDutyPage from './Pages/Duty/OnDutyPage';
import OffDutyPage from './Pages/Duty/OffDutyPage';

const DutyLayout = () => {
  const [isOnDuty, setIsOnDuty] = useState(false);

  const toggleDuty = () => {
    setIsOnDuty(prevState => !prevState);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <DutyHeader isOnDuty={isOnDuty} toggleDuty={toggleDuty} />
      <main className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
         
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DutyLayout;
