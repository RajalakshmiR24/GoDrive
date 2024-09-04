import React, { useState, useEffect } from 'react';
import Table from '../../Common/Table';

const TripList = () => {
  const [Trips, setTrips] = useState([]);

  useEffect(() => {
    // Fetch Trip data from API
    const fetchTrips = async () => {
      // Example Trip data
      const TripData = [
        {
          tripId: '#TR-001',
          user: 'John Doe',
          Trip: 'Ayman Abu Dayya',
          vehicleType: 'Car',
          tripDate: '20 Aug 2023',
          tripTime: '10:00 AM',
          pickupAndDrop: 'Location A to Location B',
          status: 'Completed',
        },
        {
          tripId: '#TR-002',
          user: 'Jane Smith',
          Trip: 'Ibrahim Al-Yami',
          vehicleType: 'Microbus',
          tripDate: '2 Feb 2023',
          tripTime: '2:00 PM',
          pickupAndDrop: 'Location C to Location D',
          status: 'Pending',
        },
        // Add more trip data...
      ];
      setTrips(TripData);
    };

    fetchTrips();
  }, []);

  const columns = [
    { header: 'Trip ID', field: 'tripId' },
    { header: 'User', field: 'user' },
    { header: 'Trip', field: 'Trip' },
    { header: 'Vehicle Type', field: 'vehicleType' },
    { header: 'Trip Date', field: 'tripDate' },
    { header: 'Trip Time', field: 'tripTime' },
    { header: 'Pickup and Drop', field: 'pickupAndDrop' },
    { header: 'Status', field: 'status' },
  ];

  const actions = [
    {
      label: 'View',
      onClick: (row) => {
        console.log('View clicked for:', row);
      },
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Trip List</h1>
      <p className="text-sm mb-4 text-gray-600">Here are all the trips listed below</p>
      <Table columns={columns} data={Trips} actions={actions} />
    </div>
  );
};

export default TripList;
