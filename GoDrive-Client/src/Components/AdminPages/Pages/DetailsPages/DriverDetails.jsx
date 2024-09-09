import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams to access route parameters
import api from '../../../../Utils/axios';
import { AiOutlineDelete } from 'react-icons/ai';
import { CiEdit } from 'react-icons/ci';

const DriverDetails = () => {
  const { driverId } = useParams(); // Extract driverId from URL parameters
  const [driver, setDriver] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeAccount, setActiveAccount] = useState('accountInfo');

  useEffect(() => {
    const fetchDriverDetails = async () => {
      if (driverId) {
        try {
          const response = await api.get(`/drivers/getdrivers/${driverId}`);
          setDriver(response.data.driver); // Access driver details from the response
          setLoading(false);
        } catch (error) {
          setError(error.message);
          setLoading(false);
        }
      } else {
        setError("Driver ID not provided");
        setLoading(false);
      }
    };

    fetchDriverDetails();
  }, [driverId]);

  const renderComponent = () => {
    switch (activeAccount) {
      case 'accountInfo':
        return (
          <div>
            <h2 className="text-xl font-bold mb-4">Driver Information</h2>
            <p><strong>Name:</strong> {driver ? `${driver.firstName} ${driver.lastName}` : ''}</p>
            <p><strong>Email:</strong> {driver ? driver.email : ''}</p>
            <p><strong>Phone:</strong> {driver ? driver.phone : ''}</p>
            <p><strong>Date of Birth:</strong> {driver ? new Date(driver.dob).toLocaleDateString() : ''}</p>
            <p><strong>License Number:</strong> {driver ? driver.licenseNumber : ''}</p>
            <p><strong>Vehicle:</strong> {driver ? `${driver.vehicleMake} - ${driver.vehicleModel}` : ''}</p>
            <p><strong>Insurance Policy:</strong> {driver ? driver.insurancePolicy : ''}</p>
            <p><strong>Profile Picture:</strong> {driver ? <img src={`http://localhost:5000/${driver.profilePicture}`} alt="Profile" className="w-32 h-32 object-cover"/> : ''}</p>
          </div>
        );
      case 'security':
        return <div>Security details go here.</div>;
      case 'privacyUser':
        return <div>Documents go here.</div>;
      default:
        return <div>Driver Information</div>;
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className='p-6'>
      <div className='flex justify-between items-center mb-6'>
        <div>
          <h1 className='text-2xl font-semibold'>Driver Details</h1>
          <p className='text-gray-500'>Home &gt; Driver Details</p>
        </div>
        <div className='flex gap-3'>
          <button className='bg-blue-600 px-4 py-2 rounded-md text-white hover:bg-blue-700'>
            Edit <CiEdit className='inline-block ml-2' />
          </button>
          <button className='bg-red-600 px-4 py-2 rounded-md text-white hover:bg-red-700'>
            Delete <AiOutlineDelete className='inline-block ml-2' />
          </button>
        </div>
      </div>
      <div className="flex justify-center gap-4 mb-4">
        {['Driver Info', 'Bank Details', 'Documents'].map((tab, index) => (
          <button
            key={index}
            className={`px-6 py-2 font-medium rounded-md ${activeAccount === tab.toLowerCase().replace(' ', '') ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'} hover:bg-blue-500 hover:text-white`}
            onClick={() => setActiveAccount(tab.toLowerCase().replace(' ', ''))}
          >
            {tab}
          </button>
        ))}
      </div>
      <div>{renderComponent()}</div>
    </div>
  );
};

export default DriverDetails;
