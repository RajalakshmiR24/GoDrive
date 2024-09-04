// UserList.js
import React, { useState, useEffect } from 'react';
import Table from '../../Common/Table';

const UserList = () => {
  const [Users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch User data from API
    const fetchUsers = async () => {
      // Example User data
      const UserData = [
        {
          name: 'Ayman Abu Dayya',
          email: 'ayman@example.com',
          phoneNumber: '+966593948852',
          noOfTrips: 150,
          action: 'View',
        },
        {
          name: 'Ibrahim Al-Yami',
          email: 'ibrahim@example.com',
          phoneNumber: '+96656182291',
          noOfTrips: 200,
          action: 'View',
        },
        // Add more Users...
      ];
      setUsers(UserData);
    };

    fetchUsers();
  }, []);

  const columns = [
    { header: 'Name', field: 'name' },
    { header: 'Email', field: 'email' },
    { header: 'Phone Number', field: 'phoneNumber' },
    { header: 'Number of Trips', field: 'noOfTrips' },
    { header: 'Action', field: 'action' },
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
      <h1 className="text-2xl font-bold mb-4">User List</h1>
      <p className="text-sm mb-4 text-gray-600">Your all Users are listed below</p>
      <Table columns={columns} data={Users} actions={actions} />
    </div>
  );
};

export default UserList;
