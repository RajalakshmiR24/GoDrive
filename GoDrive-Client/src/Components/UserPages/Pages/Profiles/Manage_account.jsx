import React, { useState } from 'react';
import { FaGoogle, FaChevronRight } from 'react-icons/fa';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
        <button
          onClick={onClose}
          className="ml-auto bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};
const AccountInfo = () => {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [popupContent, setPopupContent] = useState("");

  const handleArrowClick = (content) => {
    setPopupContent(content);
    setPopupVisible(true);
  };

  return (
    <div className="flex flex-col bg-gray-100 sticky ">
      <div className=" bg-white rounded-lg shadow-md">
        <div className="p-4">
          <div className="border-b border-gray-200 pb-4">
            <h2 className="text-xl font-semibold">Account Info</h2>
          </div>
          <div className="py-4">
            <h3 className="text-lg font-medium">Basic Info</h3>
            <div className="flex items-center mt-4">
              <div className="h-12 w-12 bg-gray-200 rounded-full flex justify-center items-center">
                <svg className="h-6 w-6 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 24H0C0 18.939 2.217 15 6.024 15H17.975C21.783 15 24 18.939 24 24zM12 12C9.243 12 7 9.757 7 7C7 4.243 9.243 2 12 2C14.757 2 17 4.243 17 7C17 9.757 14.757 12 12 12z"></path>
                </svg>
              </div>
              <div className="ml-4 flex-grow">
                <p className="font-medium">R Rajalakshmi</p>
              </div>
              <FaChevronRight
                className="text-gray-500 cursor-pointer"
                onClick={() => handleArrowClick("Edit Name")}
              />
            </div>
            <div className="flex items-center mt-4">
              <div className="flex-grow">
                <label className="block text-sm font-medium text-gray-700">Phone number</label>
                <p className="mt-1 text-gray-900">+918382809217</p>
              </div>
              <FaChevronRight
                className="text-gray-500 cursor-pointer"
                onClick={() => handleArrowClick("Edit Phone Number")}
              />
            </div>
            <div className="flex items-center mt-4">
              <div className="flex-grow">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <p className="mt-1 text-gray-900">Not Provided</p>
              </div>
              <FaChevronRight
                className="text-gray-500 cursor-pointer"
                onClick={() => handleArrowClick("Edit Email")}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Popup Card */}
      {isPopupVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-4">{popupContent}</h3>
            <p>Here you can edit your account information.</p>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
              onClick={() => setPopupVisible(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}


const Security = () => {
  const [isPopupVisible, setPopupVisible] = useState(false);

  const handleArrowClick = () => {
    setPopupVisible(!isPopupVisible);
  };

  return (
    <div className="h-screen w-full flex flex-col bg-gray-100 p-auto">
      <div className="h-full bg-white w-full shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-semibold mb-6">Security</h1>
        <div>
          <h2 className="text-lg font-medium mb-2">Logging in to Uber</h2>
          <div className="mb-4">
            <div className="flex justify-between border-b items-center mb-2">
              <span>Password</span>
              <FaChevronRight className="text-gray-500 cursor-pointer" onClick={handleArrowClick} />
            </div>
          </div>
          <div className="mb-4">
            <div className="flex justify-between items-center gap-3 mb-2">
              <span>Passkeys</span>
              <FaChevronRight className="text-gray-500 cursor-pointer" onClick={handleArrowClick} />
            </div>
            <div className="text-gray-500 border-b">Passkeys are easier and more secure than passwords.</div>
          </div>
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span>Authenticator app</span>
              <FaChevronRight className="text-gray-500 cursor-pointer" onClick={handleArrowClick} />
            </div>
            <div className="text-gray-500 border-b">Set up your authenticator app to add an extra layer of security.</div>
          </div>
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span>2-step verification</span>
              <FaChevronRight className="text-gray-500 cursor-pointer" onClick={handleArrowClick} />
            </div>
            <div className="text-gray-500 border-b">Add additional security to your account with 2-step verification.</div>
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-lg font-medium mb-2">Connected social apps</h2>
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-3">
              <FaGoogle />
              <span>Google</span>
            </div>
            <button className="text-black rounded-full bg-gray-200 px-3 py-1">Disconnect</button>
          </div>
        </div>
      </div>

      {/* Popup Card */}
      {isPopupVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Security Settings</h3>
            <p>Here you can manage your security settings.</p>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
              onClick={() => setPopupVisible(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const PrivacyUser = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLearnMoreClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="h-screen flex flex-col items-center bg-gray-100 p-auto">
      <div className="w-full h-full max-w-auto bg-white shadow-md rounded-lg p-6 md:flex md:space-x-6">
        <main className="md:w-3/4">
          <h2 className="text-xl font-bold mb-4">Privacy & Data</h2>
          <section className="mb-6">
            <h3 className="text-lg font-bold">Privacy</h3>
            <p className="text-gray-600">Privacy Center</p>
            <p className="text-gray-600">Take control of your privacy and learn how we protect it.</p>
          </section>
          <section>
            <h3 className="text-lg font-bold">Third-party apps with account access</h3>
            <p className="text-gray-600">
              Once you allow access to third-party apps, you'll see them here.
            </p>
            <a href="#" className="text-blue-500" onClick={handleLearnMoreClick}>
              Learn more
            </a>
          </section>
        </main>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h3 className="text-lg font-bold">Third-Party Applications</h3>
        <p className="text-gray-600 mt-2">
          You can connect third-party applications to your Uber account to enable additional features.
          This most commonly happens when you:
        </p>
        <ul className="list-disc list-inside text-gray-600 mt-2">
          <li>Explore benefits and discounts provided by third parties</li>
          <li>Sign in to other apps with your Uber account</li>
        </ul>
        <p className="text-gray-600 mt-2">
          Third-party applications will request permission to access your Uber account and data before enabling these features.
        </p>
        <p className="text-gray-600 mt-2">
          If you remove access for a third-party application, they won’t be able to access your data, and you won’t have access to their services.
        </p>
      </Modal>
    </div>
  );
};


const ManageAccount = () => {
  const [activeAccount, setActiveAccount] = useState('accountInfo');

  const renderComponent = () => {
    switch (activeAccount) {
      case 'accountInfo':
        return <AccountInfo />;
      case 'security':
        return <Security />;
      case 'privacyUser':
        return <PrivacyUser />;
      default:
        return <AccountInfo />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4">
        <div className="grid grid-cols-3 gap-4 mb-4">
          <button
            className={`bg-gray-200 text-black px-4 py-2 ${activeAccount === 'accountInfo' ? 'border-b-2 border-black' : ''}`}
            onClick={() => setActiveAccount('accountInfo')}
          >
            Account Info
          </button>
          <button
            className={`bg-gray-200 text-black px-4 py-2 ${activeAccount === 'security' ? 'border-b-2 border-black' : ''}`}
            onClick={() => setActiveAccount('security')}
          >
            Security
          </button>
          <button
            className={`bg-gray-200 text-black px-4 py-2 ${activeAccount === 'privacyUser' ? 'border-b-2 border-black' : ''}`}
            onClick={() => setActiveAccount('privacyUser')}
          >
            Privacy & Data
          </button>
        </div>
        {renderComponent()}
      </div>
    </div>
  );
};

export default ManageAccount;
