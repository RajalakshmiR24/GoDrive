import React, { useState, useEffect } from 'react';
import api from '../../../../Utils/axios';
import { InputField } from './InputField';
import { PhotoIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../Context/AuthContext';

const DriverApplicationForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',  // Ensuring email is controlled from the start
    phone: '',
    dob: '',
    licenseNumber: '',
    licenseExpiry: '',
    vehicleMake: '',
    vehicleModel: '',
    vehicleYear: '',
    vehicleRegistration: '',
    insurancePolicy: '',
    drivingExperience: 0,
    accidents: 0,
    trafficViolations: 0,
    profilePicture: null, // Files are typically `null` to start
  });
  
  const navigate = useNavigate();
  const { authState } = useAuth(); // Get authState from context

  useEffect(() => {
    if (authState.email) {
      setFormData((prevData) => ({ ...prevData, email: authState.email }));
    }
  }, [authState.email]);

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleFileChange = (event) => {
    setFormData((prevData) => ({ ...prevData, profilePicture: event.target.files[0] }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      const value = formData[key];
      if (value !== null && value !== undefined) {
        if (value instanceof File) {
          data.append(key, value);
        } else {
          data.append(key, value);
        }
      }
    });

    try {
      const response = await api.post('/drivers/createDriver', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${authState.token}`, // Use token from authState
        },
      });

      if (response.status === 201) {
        const driverId = response.data.driverId; // Assuming the API returns the driverId
        localStorage.setItem('driverId', driverId); // Store the driverId in localStorage
        navigate('/driver/success');
      }
    } catch (error) {
      console.error('Error submitting the form:', error.response || error.message);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-md">
      <h2 className="text-xl font-semibold mb-4">Driver Application Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <InputField id="firstName" label="First Name" value={formData.firstName} onChange={handleInputChange} />
            <InputField id="lastName" label="Last Name (optional)" value={formData.lastName} onChange={handleInputChange} />
            <InputField id="email" label="Email Address" type="email" value={formData.email || ''} onChange={handleInputChange} />
            <InputField id="phone" label="Phone Number" type="tel" value={formData.phone} onChange={handleInputChange} />
            <InputField id="dob" label="Date of Birth" type="date" value={formData.dob} onChange={handleInputChange} />
            <InputField id="licenseNumber" label="Driver's License Number" value={formData.licenseNumber} onChange={handleInputChange} />
            <InputField id="licenseExpiry" label="License Expiry Date" type="date" value={formData.licenseExpiry} onChange={handleInputChange} />
            <InputField id="vehicleMake" label="Vehicle Make" value={formData.vehicleMake} onChange={handleInputChange} />
            <InputField id="vehicleModel" label="Vehicle Model" value={formData.vehicleModel} onChange={handleInputChange} />
            <InputField id="vehicleYear" label="Vehicle Year" type="number" value={formData.vehicleYear} onChange={handleInputChange} />
            <InputField id="vehicleRegistration" label="Vehicle Registration Number" value={formData.vehicleRegistration} onChange={handleInputChange} />
            <InputField id="insurancePolicy" label="Insurance Policy Number" value={formData.insurancePolicy} onChange={handleInputChange} />

            <div className="col-span-full">
              <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700">
                Upload Photo ID
              </label>
              <div className="mt-2 flex items-center justify-center rounded-lg border border-dashed border-gray-300 p-6">
                <div className="text-center">
                  <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" />
                  <div className="mt-2">
                    <label
                      htmlFor="file-upload"
                      className="block text-sm font-medium text-indigo-600 cursor-pointer"
                    >
                      <span>Upload a file</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} />
                    </label>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Background Information</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <InputField id="drivingExperience" label="Years of Driving Experience" type="number" value={formData.drivingExperience} onChange={handleInputChange} />
              <InputField id="accidents" label="Accidents in the Last 5 Years" type="number" value={formData.accidents} onChange={handleInputChange} />
              <InputField id="trafficViolations" label="Traffic Violations in the Last 5 Years" type="number" value={formData.trafficViolations} onChange={handleInputChange} />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Notifications</h3>
            <fieldset>
              <legend className="text-sm font-semibold text-gray-700">Notification Preferences</legend>
              <div className="mt-2 space-y-2">
                <div className="flex items-center">
                  <input
                    id="email-notifications"
                    name="notifications"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  />
                  <label htmlFor="email-notifications" className="ml-2 text-sm text-gray-700">
                    Email Notifications
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="sms-notifications"
                    name="notifications"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  />
                  <label htmlFor="sms-notifications" className="ml-2 text-sm text-gray-700">
                    SMS Notifications
                  </label>
                </div>
              </div>
            </fieldset>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold text-gray-700"
            onClick={() => navigate('/')}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-indigo-600 text-white rounded-md px-4 py-2 text-sm font-semibold hover:bg-indigo-500"
          >
            Submit Application
          </button>
        </div>
      </form>
    </div>
  );
}

export default DriverApplicationForm;
