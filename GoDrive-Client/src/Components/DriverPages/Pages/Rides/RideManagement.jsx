import React, { useState, useEffect } from 'react';
import api from '../../../../Utils/axios'; // Adjust the path to where you store the API config
import BackButton from '../../Common/BackButton'; // Adjust the path based on your file structure
import { useAuth } from '../../../../Context/AuthContext'; // Adjust the path based on your file structure

const RideManagement = () => {
  const [trips, setTrips] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const { authState } = useAuth(); // Get authentication state
  const driverId = authState.id; // Extract driver ID from authentication state

  useEffect(() => {
    const fetchTripsAndDriver = async () => {
      try {
        const tripResponse = await api.get('/trips/getalltrips');
        setTrips(tripResponse.data);

        if (driverId) {
          const driverResponse = await api.get(`/drivers/getdrivers/${driverId}`);
          setDrivers([driverResponse.data]);
        }
      } catch (error) {
        console.error('Error fetching trips or driver:', error);
      }
    };

    fetchTripsAndDriver();
  }, [driverId]);

  const handleAccept = async (tripId) => {
    try {
      const response = await api.post('/ride/newride/create', { tripId, driverId });
      console.log('Ride accepted:', response.data);
      setTrips((prevTrips) =>
        prevTrips.map((trip) =>
          trip._id === tripId ? { ...trip, status: 'Accepted' } : trip
        )
      );
    } catch (error) {
      console.error('Error accepting ride:', error);
    }
  };

  const handleReject = async (tripId) => {
    try {
      const response = await api.put(`/ride/cancel-ride/${tripId}/cancel`);
      console.log('Ride rejected:', response.data);
      setTrips((prevTrips) =>
        prevTrips.map((trip) =>
          trip._id === tripId ? { ...trip, status: 'Rejected' } : trip
        )
      );
    } catch (error) {
      console.error('Error rejecting ride:', error);
    }
  };

  return (
    <div className="space-y-4">
      <BackButton />
      {trips.map((trip) => (
        <div key={trip._id} className="p-4 bg-gray-100 rounded-lg shadow-md">
          <h3 className="text-xl font-bold">Trip {trip._id}</h3>
          <p>Pickup Location: {trip.pickupLocation}</p>
          <p>Drop Location: {trip.dropLocation}</p>
          <p>Pickup Time: {new Date(trip.pickupTime).toLocaleString()}</p>
          <p>For Whom: {trip.forWhom}</p>
          <p>Name: {trip.name}</p>
          <p>Date: {new Date(trip.date).toLocaleDateString()}</p>
          <div className="flex space-x-2">
            <button
              onClick={() => handleAccept(trip._id)}
              className="px-4 py-2 bg-green-500 text-white rounded-md"
            >
              Accept
            </button>
            <button
              onClick={() => handleReject(trip._id)}
              className="px-4 py-2 bg-red-500 text-white rounded-md"
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RideManagement;
