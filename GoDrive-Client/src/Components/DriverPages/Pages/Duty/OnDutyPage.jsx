import React from 'react';
import TripManagement from '../OnDuty/TripManagement';  // Import the trip management component
import NavigationMap from '../OnDuty/NavigationMap';    // Import the navigation map component
import EarningsTracker from '../EarningsTracker'; // Import the earnings tracker component
import Notifications from '../Notifications';   // Import the notifications component

const OnDutyPage = () => {
  return (
    <div className="p-4 space-y-4 text-center bg-white bg-opacity-70 backdrop-blur-md rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-red-500">Performance!</h2>
      <EarningsTracker earnings={{ daily: 1000, weekly: 5000 }} />
      <TripManagement />
      <NavigationMap location={[12.9716, 77.5946]} destination={[12.2958, 76.6394]} /> {/* Sample coordinates */}
      <Notifications />
    </div>
  );
};

export default OnDutyPage;
