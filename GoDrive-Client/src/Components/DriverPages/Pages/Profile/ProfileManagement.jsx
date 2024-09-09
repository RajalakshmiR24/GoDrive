import React, { useState, useEffect } from 'react';
import api from '../../../../Utils/axios'; // Import the configured axios instance
import { FaEdit, FaEye, FaDownload, FaSave } from 'react-icons/fa'; // Import icons
import jsPDF from 'jspdf'; // Import jsPDF
import BackButton from '../../Common/BackButton'; // Import BackButton component
import { useAuth } from '../../../../Context/AuthContext'; // Import useAuth hook

const ProfileManagement = () => {
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
  const { authState } = useAuth(); // Get authentication state
  const driverId = authState.id; // Extract driver ID from authentication state

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get(`/drivers/getdrivers/${driverId}`);
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

    if (driverId) {
      fetchProfile();
    }
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
      setIsEditMode(false);
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    
    // Add a logo in the top-left corner
    const logoURL = 'https://i.ibb.co/BZwkDCC/logo-dark.png';
    doc.addImage(logoURL, 'PNG', 10, 10, 20, 20);
    
    // Add a title on the same line as the logo
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('Driver Profile Certificate', pageWidth / 2, 20, null, null, 'center');
    
    // Add a placeholder for passport-size photo in the top-right corner
    doc.setLineWidth(0.5);
    doc.rect(160, 10, 30, 40);
    doc.setFontSize(10);
    doc.text('Photo', 165, 35);
    
    // Draw a border around the document
    doc.setLineWidth(0.5);
    doc.rect(5, 5, 200, 287);
    
    // Add the profile information with styling
    doc.setFontSize(12);
    doc.setFont('times', 'normal');
    doc.text(`Name: ${profile.name}`, 20, 50);
    doc.text(`Contact: ${profile.contact}`, 20, 60);
    doc.text(`Email: ${profile.email}`, 20, 70);
    doc.text(`License Number: ${profile.licenseNumber}`, 20, 80);
    doc.text(`Vehicle: ${profile.vehicleMake} ${profile.vehicleModel} (${profile.vehicleYear})`, 20, 90);
    doc.text(`Vehicle Registration: ${profile.vehicleRegistration}`, 20, 100);
    doc.text(`Insurance Policy: ${profile.insurancePolicy}`, 20, 110);
    doc.text(`Driving Experience: ${profile.drivingExperience}`, 20, 120);
    doc.text(`Accidents: ${profile.accidents}`, 20, 130);
    doc.text(`Traffic Violations: ${profile.trafficViolations}`, 20, 140);
    doc.text(`Verified: ${profile.verified ? 'Yes' : 'No'}`, 20, 150);

    // Add a logo or verified stamp
    const verifiedStamp = 'https://i.ibb.co/tmtDxYd/verified-stamp.png';
    const imageWidth = 30;
    const imageHeight = 30;
    const xPosition = (pageWidth - imageWidth) / 2;
    const yPosition = pageHeight - imageHeight - 10;
    doc.addImage(verifiedStamp, 'PNG', xPosition, yPosition, imageWidth, imageHeight);

    // Draw a horizontal line to separate sections
    doc.setLineWidth(0.1);
    doc.line(10, 160, 200, 160);
    
    // Add Terms and Conditions section
    doc.setFontSize(10);
    doc.setFont('times', 'italic');
    doc.text('Terms and Conditions:', 20, 170);
    doc.setFont('times', 'normal');
    const termsText =
      `1. This certificate is valid only when verified by the issuing authority. The authenticity of this certificate should be checked through proper channels, and any discrepancies should be reported immediately.\n\n` +
      `2. The driver is responsible for maintaining the accuracy of their profile details. All personal and vehicle information must be kept up-to-date to avoid legal issues or penalties.\n\n` +
      `3. Any changes in the driver's information, such as address, contact details, or vehicle status, must be reported to the issuing authority within 7 days of the change.\n\n` +
      `4. The issuing authority is not liable for any discrepancies or inaccuracies in the provided information. The certificate holder assumes full responsibility for the validity of the information.\n\n` +
      `5. This certificate does not guarantee employment, endorsement, or any benefits by the issuing authority. It is solely a document to verify the driver's credentials at the time of issuance.`;
    
    const termsLines = doc.splitTextToSize(termsText, 180);
    doc.text(termsLines, 20, 180);
  
    // Footer with date or signature
    doc.setFontSize(10);
    doc.text(`Date Issued: ${new Date().toLocaleDateString()}`, 20, 270);
    doc.text('Authorized Signature', 160, 270);
    doc.line(150, 272, 200, 272);
  
    // Save the PDF
    doc.save(`${profile.name}_profile_certificate.pdf`);
  };
  
  if (loading) {
    return <div>Loading profile...</div>;
  }

  return (
    <div className="p-6 min-h-screen w-full flex flex-col items-center">
      <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-md">
        <BackButton />
        <h2 className="text-2xl font-bold mb-6">Driver Profile</h2>

        <div className="grid grid-cols-1 gap-6">
          {/* Profile Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold">Name</label>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
                disabled={!isEditMode}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block font-semibold">Contact</label>
              <input
                type="text"
                name="contact"
                value={profile.contact}
                onChange={handleChange}
                disabled={!isEditMode}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block font-semibold">Email</label>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                disabled={!isEditMode}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block font-semibold">License Number</label>
              <input
                type="text"
                name="licenseNumber"
                value={profile.licenseNumber}
                onChange={handleChange}
                disabled={!isEditMode}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block font-semibold">Vehicle Make</label>
              <input
                type="text"
                name="vehicleMake"
                value={profile.vehicleMake}
                onChange={handleChange}
                disabled={!isEditMode}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block font-semibold">Vehicle Model</label>
              <input
                type="text"
                name="vehicleModel"
                value={profile.vehicleModel}
                onChange={handleChange}
                disabled={!isEditMode}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block font-semibold">Vehicle Year</label>
              <input
                type="text"
                name="vehicleYear"
                value={profile.vehicleYear}
                onChange={handleChange}
                disabled={!isEditMode}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block font-semibold">Vehicle Registration</label>
              <input
                type="text"
                name="vehicleRegistration"
                value={profile.vehicleRegistration}
                onChange={handleChange}
                disabled={!isEditMode}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>

          {/* Profile Actions */}
          <div className="mt-6 flex items-center justify-between">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
              onClick={generatePDF}
            >
              <FaDownload className="mr-2" /> Download PDF
            </button>
            {isEditMode ? (
              <button
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none"
                onClick={handleSave}
              >
                <FaSave className="mr-2" /> Save
              </button>
            ) : (
              <button
                className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 focus:outline-none"
                onClick={() => setIsEditMode(true)}
              >
                <FaEdit className="mr-2" /> Edit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileManagement;
