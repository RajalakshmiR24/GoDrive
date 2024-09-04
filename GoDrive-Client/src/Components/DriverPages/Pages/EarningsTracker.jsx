import React from 'react';

const EarningsTracker = ({ earnings }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold">Earnings Tracker</h2>
      <div className="flex space-x-4">
        <div className="flex-1">
          <h3 className="text-xl">Daily Earnings</h3>
          <p className="text-2xl font-bold">₹ {earnings.daily}</p>
        </div>
        <div className="flex-1">
          <h3 className="text-xl">Weekly Earnings</h3>
          <p className="text-2xl font-bold">₹ {earnings.weekly}</p>
        </div>
      </div>
    </div>
  );
};

export default EarningsTracker;
