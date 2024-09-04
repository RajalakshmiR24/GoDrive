import React from 'react';
import { useNavigate } from 'react-router-dom';
import constants from '../../../Utils/constant'

const MyTrips = () => {
  const navigate = useNavigate();

  const handleBookNow = () => {
    navigate('/user');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Past</h2>
          <div className="flex space-x-2">
            <button className="border rounded px-4 py-2">Personal</button>
            <button className="border rounded px-4 py-2">All trips</button>
          </div>
        </div>
        <div className="mt-4 p-4 bg-gray-100 rounded-md shadow">
          <img src={constants.img_car} alt="Car illustration" className="w-full h-48 object-cover rounded-md"/>
          <p className="mt-4 text-center">You have not taken any trips yet, take your first trip</p>
          <button className="mt-2 mx-auto block bg-black text-white px-4 py-2 rounded" onClick={handleBookNow}>Book now</button>
        </div>
      </div>
    </div>
  );
};

export default MyTrips;
