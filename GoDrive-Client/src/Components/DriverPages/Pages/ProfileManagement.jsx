import React, { useState } from 'react';

const ProfileManagement = () => {
  const [profile, setProfile] = useState({
    name: 'John Doe',
    contact: '1234567890',
    vehicle: 'Toyota Prius',
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // Logic to save profile changes
    console.log('Profile saved:', profile);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold">Profile Management</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-gray-700">Name</label>
          <input type="text" name="name" value={profile.name} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md" />
        </div>
        <div>
          <label className="block text-gray-700">Contact</label>
          <input type="text" name="contact" value={profile.contact} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md" />
        </div>
        <div>
          <label className="block text-gray-700">Vehicle</label>
          <input type="text" name="vehicle" value={profile.vehicle} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md" />
        </div>
        <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded-md">Save Changes</button>
      </div>
    </div>
  );
};

export default ProfileManagement;
