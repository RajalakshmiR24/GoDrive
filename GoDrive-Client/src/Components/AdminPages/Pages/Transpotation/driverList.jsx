// DriverList.js
import React, { useState, useEffect } from 'react';
import Table from '../../Common/Table';

const DriverList = () => {
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    // Fetch driver data from API
    const fetchDrivers = async () => {
      // Example driver data
      const driverData = [
        {
          driver: '#ED-001',
          name: 'Ayman Abu Dayya',
          contact: '+966593948852',
          vehicleNumber: 'WZ 808 NZ',
          vehicleType: 'Car',
          joiningDate: '20 Aug 2023',
        },
        {
          driver: '#ED-002',
          name: 'Ibrahim Al-Yami',
          contact: '+96656182291',
          vehicleNumber: 'CK 986 RG',
          vehicleType: 'Microbus',
          joiningDate: '2 Feb 2023',
        },
        // Add more drivers...
      ];
      setDrivers(driverData);
    };

    fetchDrivers();
  }, []);

  const columns = [
    { header: 'Driver_ID', field: 'driver' },
    { header: 'Name', field: 'name' },
    { header: 'Contact Number', field: 'contact' },
    { header: 'Vehicle Type', field: 'vehicleType' },
    { header: 'Vehicle Number', field: 'vehicleNumber' },
    { header: 'Joining Date', field: 'joiningDate' },
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
      <h1 className="text-2xl font-bold mb-4">Driver List</h1>
      <p className="text-sm mb-4 text-gray-600">Your all drivers are listed below</p>
      <Table columns={columns} data={drivers} actions={actions} />
    </div>
  );
};

export default DriverList;
