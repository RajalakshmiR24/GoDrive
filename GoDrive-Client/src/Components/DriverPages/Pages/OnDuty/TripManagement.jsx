import React, { useState } from 'react';

const TripManagement = () => {
  const [trips, setTrips] = useState([
    // Sample data
    { id: 1, status: 'active', pickup: 'Location A', dropoff: 'Location B' },
    { id: 2, status: 'completed', pickup: 'Location C', dropoff: 'Location D' },
  ]);

  const handleAccept = (id) => {
    // Logic to accept the ride
    console.log(`Accepting ride ${id}`);
  };

  const handleReject = (id) => {
    // Logic to reject the ride
    console.log(`Rejecting ride ${id}`);
  };

  return (
    <div className="space-y-4">
      {trips.map(trip => (
        <div key={trip.id} className="p-4 bg-gray-100 rounded-lg shadow-md">
          <h3 className="text-xl font-bold">Trip {trip.id}</h3>
          <p>Pickup: {trip.pickup}</p>
          <p>Dropoff: {trip.dropoff}</p>
          <p>Status: {trip.status}</p>
          {trip.status === 'active' && (
            <div className="flex space-x-2">
              <button onClick={() => handleAccept(trip.id)} className="px-4 py-2 bg-green-500 text-white rounded-md">Accept</button>
              <button onClick={() => handleReject(trip.id)} className="px-4 py-2 bg-red-500 text-white rounded-md">Reject</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TripManagement;
