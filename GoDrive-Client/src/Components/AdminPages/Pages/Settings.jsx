import React, { useState } from 'react';

function Settings() {
  // State variables for different settings
  const [websiteName, setWebsiteName] = useState('');
  const [supportEmail, setSupportEmail] = useState('');
  const [autoApproveDrivers, setAutoApproveDrivers] = useState(false);
  const [minimumDriverRating, setMinimumDriverRating] = useState(4.5);
  const [commissionRate, setCommissionRate] = useState(10);
  const [apiKey, setApiKey] = useState('');

  const handleSaveSettings = () => {
    // Handle saving settings logic here, such as sending to an API or saving locally
    console.log('Settings saved:', {
      websiteName,
      supportEmail,
      autoApproveDrivers,
      minimumDriverRating,
      commissionRate,
      apiKey,
    });
    alert('Settings saved successfully!');
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">General Settings</h2>
        <div className="mb-4">
          <label className="block font-medium text-gray-700">Website Name:</label>
          <input
            type="text"
            value={websiteName}
            onChange={(e) => setWebsiteName(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium text-gray-700">Support Email:</label>
          <input
            type="email"
            value={supportEmail}
            onChange={(e) => setSupportEmail(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Driver Management</h2>
        <div className="mb-4">
          <label className="block font-medium text-gray-700">Auto-Approve Drivers:</label>
          <input
            type="checkbox"
            checked={autoApproveDrivers}
            onChange={(e) => setAutoApproveDrivers(e.target.checked)}
            className="mt-1"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium text-gray-700">Minimum Driver Rating:</label>
          <input
            type="number"
            value={minimumDriverRating}
            onChange={(e) => setMinimumDriverRating(e.target.value)}
            min="0"
            max="5"
            step="0.1"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">User Roles & Permissions</h2>
        {/* Add controls for managing user roles */}
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Notification Settings</h2>
        {/* Add controls for notification settings */}
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Payment Settings</h2>
        <div className="mb-4">
          <label className="block font-medium text-gray-700">Commission Rate (%):</label>
          <input
            type="number"
            value={commissionRate}
            onChange={(e) => setCommissionRate(e.target.value)}
            min="0"
            max="100"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Ride Settings</h2>
        {/* Add controls for ride settings */}
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Security Settings</h2>
        {/* Add controls for security settings */}
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">API Settings</h2>
        <div className="mb-4">
          <label className="block font-medium text-gray-700">API Key:</label>
          <input
            type="text"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">System Logs</h2>
        {/* Add sections for viewing system logs */}
      </div>

      <button
        onClick={handleSaveSettings}
        className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
      >
        Save Settings
      </button>
    </div>
  );
}

export default Settings;
