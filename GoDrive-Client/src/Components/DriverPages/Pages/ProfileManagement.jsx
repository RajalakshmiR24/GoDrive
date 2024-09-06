import React, { useState, useEffect } from 'react';
import api from '../../../Utils/axios'; // Import the configured axios instance
import { FaEdit, FaEye, FaDownload } from 'react-icons/fa'; // Import icons

const ProfileManagement = ({ driverId }) => {
  const [profile, setProfile] = useState({
    name: '',
    contact: '',
    vehicle: '',
    email: '',
    licenseNumber: '',
    vehicleMake: '',
    vehicleModel: '',
    vehicleYear: '',
    vehicleRegistration: '',
    insurancePolicy: '',
    drivingExperience: '',
    accidents: '',
    trafficViolations: '',
    verified: false,
  });

  const [loading, setLoading] = useState(true);

  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get(`/drivers/getdrivers/${driverId}`); // Use the configured API instance
        const data = response.data;
        setProfile({
          name: `${data.firstName} ${data.lastName}`,
          contact: data.phone,
          email: data.email,
          licenseNumber: data.licenseNumber,
          vehicleMake: data.vehicleMake,
          vehicleModel: data.vehicleModel,
          vehicleYear: data.vehicleYear,
          vehicleRegistration: data.vehicleRegistration,
          insurancePolicy: data.insurancePolicy,
          drivingExperience: data.drivingExperience,
          accidents: data.accidents,
          trafficViolations: data.trafficViolations,
          verified: data.verified,
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setLoading(false);
      }
    };

    fetchProfile();
  }, [driverId]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      // Update profile logic
      const updatedProfile = {
        name: profile.name.split(' ')[0],
        lastName: profile.name.split(' ')[1] || '',
        phone: profile.contact,
        email: profile.email,
        licenseNumber: profile.licenseNumber,
        vehicleMake: profile.vehicleMake,
        vehicleModel: profile.vehicleModel,
        vehicleYear: profile.vehicleYear,
        vehicleRegistration: profile.vehicleRegistration,
        insurancePolicy: profile.insurancePolicy,
        drivingExperience: profile.drivingExperience,
        accidents: profile.accidents,
        trafficViolations: profile.trafficViolations,
        verified: profile.verified,
      };

      await api.put(`/drivers/update/${driverId}`, updatedProfile); // Update profile via PUT request
      console.log('Profile updated:', updatedProfile);
      setIsEditMode(false); // Exit edit mode after saving
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  const handleDownload = () => {
    const fileData = JSON.stringify(profile, null, 2);
    const blob = new Blob([fileData], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `profile_${driverId}.json`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold">Profile Management</h2>
      
      {/* Display all fields in text format */}
      <div className="space-y-2">
        {!isEditMode ? (
          <>
            <p><strong>Name:</strong> {profile.name}</p>
            <p><strong>Contact:</strong> {profile.contact}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>License Number:</strong> {profile.licenseNumber}</p>
            <p><strong>Vehicle:</strong> {profile.vehicleMake} {profile.vehicleModel} ({profile.vehicleYear})</p>
            <p><strong>Vehicle Registration:</strong> {profile.vehicleRegistration}</p>
            <p><strong>Insurance Policy:</strong> {profile.insurancePolicy}</p>
            <p><strong>Driving Experience:</strong> {profile.drivingExperience} years</p>
            <p><strong>Accidents:</strong> {profile.accidents}</p>
            <p><strong>Traffic Violations:</strong> {profile.trafficViolations}</p>
            <p><strong>Verified:</strong> {profile.verified ? 'Yes' : 'No'}</p>
          </>
        ) : (
          <>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            <input
              type="text"
              name="contact"
              value={profile.contact}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {/* Add similar input fields for the rest */}
          </>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-4 mt-4">
        <button
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md"
          onClick={() => setIsEditMode(!isEditMode)}
        >
          <FaEdit className="mr-2" /> {isEditMode ? 'Cancel Edit' : 'Edit'}
        </button>
        {isEditMode && (
          <button
            className="flex items-center px-4 py-2 bg-green-500 text-white rounded-md"
            onClick={handleSave}
          >
            <FaEye className="mr-2" /> Save Changes
          </button>
        )}
        <button
          className="flex items-center px-4 py-2 bg-gray-500 text-white rounded-md"
          onClick={handleDownload}
        >
          <FaDownload className="mr-2" /> Download
        </button>
      </div>
    </div>
  );
};

export default ProfileManagement;
