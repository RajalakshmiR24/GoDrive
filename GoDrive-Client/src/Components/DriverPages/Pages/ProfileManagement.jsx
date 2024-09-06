import React, { useState, useEffect } from 'react';
import api from '../../../Utils/axios'; // Import the configured axios instance
import { FaEdit, FaEye, FaDownload, FaArrowLeft } from 'react-icons/fa'; // Import icons
import jsPDF from 'jspdf'; // Import jsPDF
import { useRef } from 'react';

const ProfileManagement = ({ driverId, onBack }) => { // Add onBack prop for handling back action
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
    const { name, value, type, checked } = e.target;
    setProfile({ ...profile, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSave = async () => {
    try {
      const updatedProfile = {
        firstName: profile.name.split(' ')[0],
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

      await api.put(`/drivers/update/${driverId}`, updatedProfile);
      console.log('Profile updated:', updatedProfile);
      setIsEditMode(false);
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };



  const generatePDF = () => {
    const doc = new jsPDF();
    
    doc.setFontSize(12);
    doc.text('Profile Information', 10, 10);

    const profileData = `
      Name: ${profile.name}
      Contact: ${profile.contact}
      Email: ${profile.email}
      License Number: ${profile.licenseNumber}
      Vehicle Make: ${profile.vehicleMake}
      Vehicle Model: ${profile.vehicleModel}
      Vehicle Year: ${profile.vehicleYear}
      Vehicle Registration: ${profile.vehicleRegistration}
      Insurance Policy: ${profile.insurancePolicy}
      Driving Experience: ${profile.drivingExperience} years
      Accidents: ${profile.accidents}
      Traffic Violations: ${profile.trafficViolations}
      Verified: ${profile.verified ? 'Yes' : 'No'}
    `;
    
    doc.text(profileData, 10, 20);
    doc.save(`profile_${driverId}.pdf`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <button
          className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-500 text-white hover:bg-blue-600"
          onClick={onBack}
        >
          <FaArrowLeft />
        </button>
      </div>

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
              placeholder="Name"
            />
            <input
              type="text"
              name="contact"
              value={profile.contact}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Contact"
            />
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Email"
            />
           
            
            <label>
              <input
                type="checkbox"
                name="verified"
                checked={profile.verified}
                onChange={handleChange}
                className="mr-2"
              />
              Verified
            </label>
          </>
        )}
      </div>

      <div className="flex justify-end space-x-4 mt-4">
        <button
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md"
          onClick={() => setIsEditMode(!isEditMode)}
        >
          <FaEdit className="mr-2" />
          {isEditMode ? 'Cancel Edit' : 'Edit'}
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
          className="flex items-center px-4 py-2 bg-red-500 text-white rounded-md"
          onClick={generatePDF}
        >
          <FaDownload className="mr-2" /> Download PDF
        </button>
      </div>
    </div>
  );
};

export default ProfileManagement;
