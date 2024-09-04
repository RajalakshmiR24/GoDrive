import React, { useState, useEffect } from 'react';

const ProfileSettings = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    // Load the driver's details from localStorage or API
    const storedName = localStorage.getItem('name');
    const storedEmail = localStorage.getItem('email');
    const storedProfilePicture = localStorage.getItem('profilePicture');

    if (storedName) setName(storedName);
    if (storedEmail) setEmail(storedEmail);
    if (storedProfilePicture) setProfilePicture(storedProfilePicture);
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSave = () => {
    // Save the updated details to localStorage or send to API
    localStorage.setItem('name', name);
    localStorage.setItem('email', email);
    if (profilePicture) {
      localStorage.setItem('profilePicture', preview); // Save the preview URL as a string
    }

    alert('Profile updated successfully!');
  };

  return (
    <div className="container mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-6">Profile Settings</h2>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg"
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 mb-2">Profile Picture</label>
        {preview ? (
          <img
            src={preview}
            alt="Profile Preview"
            className="mb-4 w-24 h-24 rounded-full object-cover"
          />
        ) : (
          <p>No profile picture selected.</p>
        )}
        <input type="file" onChange={handleFileChange} className="w-full px-3 py-2" />
      </div>

      <button
        onClick={handleSave}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
      >
        Save Changes
      </button>
    </div>
  );
};

export default ProfileSettings;
