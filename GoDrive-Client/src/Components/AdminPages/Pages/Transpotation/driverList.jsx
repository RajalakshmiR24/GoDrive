import React, { useState, useEffect } from 'react';
import Table from '../../Common/Table';
import api from '../../../../Utils/axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const DriverList = () => {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await api.get('/drivers/getdrivers');
        const driverData = response.data;

        if (Array.isArray(driverData)) {
          setDrivers(driverData);
        } else {
          setDrivers([]);
        }

        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchDrivers();
  }, []);

  const columns = [
    { header: 'S.No', field: 'serialNumber' },
    { header: 'Name', field: 'fullName' },
    { header: 'Email', field: 'email' },
    { header: 'Phone', field: 'phone' },
    { header: 'Vehicle', field: 'vehicleDetails' },
    { header: 'Number of Rides', field: 'numRides' },
    { header: 'Joining Date', field: 'joiningDate' },
    { header: 'Active Status', field: 'activeStatus' },
  ];

  const actions = [
    {
      label: 'View',
      onClick: (row) => {
        navigate(`/admin/driver-details/${row._id}`); // Navigate to DriverDetails with driver ID
      },
    },
    {
      label: 'Edit',
      onClick: (row) => {
        console.log('Edit clicked for:', row);
      },
    },
    {
      label: 'Delete',
      onClick: (row) => {
        console.log('Delete clicked for:', row);
      },
    },
  ];

  const formatData = (drivers) => {
    return drivers.map((driver, index) => ({
      serialNumber: index + 1,
      fullName: `${driver.firstName} ${driver.lastName}`,
      email: driver.email,
      phone: driver.phone,
      vehicleDetails: `${driver.vehicleMake} - ${driver.vehicleModel}`,
      numRides: driver.numRides || 0,
      joiningDate: new Date(driver.createdAt).toLocaleDateString(),
      activeStatus: driver.verified ? 'Active' : 'Inactive',
    }));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Driver List</h1>
      <p className="text-sm mb-4 text-gray-600">Below are the drivers registered in the system.</p>
      <Table columns={columns} data={formatData(drivers)} actions={actions} />
    </div>
  );
};

export default DriverList;
