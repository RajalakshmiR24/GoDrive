import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../Context/AuthContext'; // Adjust the import path accordingly

const Profile = () => {
  const navigate = useNavigate();
  const { removeAuth } = useAuth();

  const handleLogout = () => {
    removeAuth(); // Use the logout method from AuthContext
    setTimeout(() => {
      navigate('/signin');
    }, 1300);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="border-t border-gray-200">
            <dl>
              {/* Location Section */}
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Location</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <select
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    defaultValue="India"
                  >
                    <option>India</option>
                    <option>USA</option>
                    <option>UK</option>
                  </select>
                </dd>
              </div>

              {/* Language Section */}
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Language</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <select
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    defaultValue="English (India)"
                  >
                    <option>English (India)</option>
                    <option>English (USA)</option>
                    <option>Tamil</option>
                  </select>
                </dd>
              </div>

              {/* Save Changes Button (Disabled) */}
              <div className="bg-gray-50 px-4 py-5 sm:px-6">
                <button className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md" disabled>
                  Save changes
                </button>
              </div>

              {/* Privacy Button */}
              <div className="bg-white px-4 py-5 sm:px-6">
                <button className="text-indigo-600 hover:text-indigo-900">Privacy</button>
              </div>

              {/* Authorized Applications Section */}
              <div className="bg-gray-50 px-4 py-5 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Authorized applications</dt>
                <dd className="mt-1 text-sm text-gray-900">You do not have any authorized applications</dd>
              </div>

              {/* Logout Button */}
              <div className="bg-white px-4 py-5 sm:px-6">
                <button className="bg-red-600 text-white py-2 px-4 rounded-md" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </dl>
          </div>
        </div>
      </main>
    </div>
  );
};

const TaxProfile = () => {
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4">
        <div className="flex">
          <div className="w-3/4 pl-4">
            <div className="flex mb-4 border-b border-gray-300">
              <button className="pb-2 border-b-2 border-black">
                Personal Tax Info
              </button>
            </div>
            <h1>
              <b>Personal tax info</b>
            </h1>
            <br />
            <form className="space-y-4">
              <div>
                <label className="block text-gray-700">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-1/2 mt-1 p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-gray-700">PAN</label>
                <input
                  type="text"
                  className="w-1/2 mt-1 p-2 border border-gray-300 rounded"
                  placeholder="AAAAA9999A"
                />
                <small className="text-gray-500 block mt-1">e.g. AAAAA9999A</small>
              </div>
              <div>
                <label className="block text-gray-700">Street address</label>
                <input
                  type="text"
                  className="w-1/2 mt-1 p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-gray-700">City</label>
                <input
                  type="text"
                  className="w-1/2 mt-1 p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-gray-700">State</label>
                <input
                  type="text"
                  className="w-1/2 mt-1 p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-gray-700">PIN code</label>
                <input
                  type="number"
                  className="w-1/2 mt-1 p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-gray-700">Country</label>
                <input
                  type="text"
                  className="w-1/2 mt-1 p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="flex items-center">
                <input
                  id="tax-declaration"
                  type="checkbox"
                  className={`h-4 w-4 focus:ring-indigo-500 border-gray-300 rounded ${
                    !isCheckboxChecked && "text-red-500"
                  }`}
                  checked={isCheckboxChecked}
                  onChange={() => setIsCheckboxChecked(!isCheckboxChecked)}
                />
                <label
                  htmlFor="tax-declaration"
                  className={`ml-2 block ${
                    !isCheckboxChecked ? "text-red-500" : "text-gray-700"
                  }`}
                >
                  <b>Disclaimer</b>
                </label>
              </div>
              {!isCheckboxChecked && (
                <div className="text-red-500 flex items-center mt-2">
                  <span>Disclaimer is not selected</span>
                </div>
              )}
            </form>
            <ol className="list-decimal list-inside mt-4 text-gray-700 w-1/2">
              <li>
                I confirm that the information I have provided to Uber regarding
                my local address, State and PAN is correct. I consent expressly
                to Uber to issue GST compliant invoice on my behalf, for the
                services I provides through Uber Platform.
              </li>
              <li>
                I understand and agree that in case there is any change in
                information I have provided to Godrive, it is my obligation and
                responsibility to inform such changes to Uber. I understand that
                I shall be liable to any tax liability arising on account of
                furnishing incorrect information and / or not informing any
                change in information to Godrive.
              </li>
              <li>
                I acknowledge and agree that Godrive does not undertake any
                responsibility if I provide false information, including but not
                limited to information related to my local address & PAN.
              </li>
            </ol>
            <div className="mt-4">
              <button
                type="submit"
                className="bg-black text-white px-4 py-2 w-1/2 rounded"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Settings = () => {
  const [activeComponent, setActiveComponent] = useState('profile');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'profile':
        return <Profile />;
      case 'taxProfile':
        return <TaxProfile />;
      default:
        return <Profile />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <button
            className={`bg-gray-200 text-black px-4 py-2 ${activeComponent === 'profile' ? 'border-b-2 border-black' : ''}`}
            onClick={() => setActiveComponent('profile')}
          >
            Profile
          </button>
          <button
            className={`bg-gray-200 text-black px-4 py-2 ${activeComponent === 'taxProfile' ? 'border-b-2 border-black' : ''}`}
            onClick={() => setActiveComponent('taxProfile')}
          >
            Tax profile
          </button>
        </div>
        {renderComponent()}
      </div>
    </div>
  );
};

export default Settings;
