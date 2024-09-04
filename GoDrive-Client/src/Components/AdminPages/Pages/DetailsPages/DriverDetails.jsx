import React, { useState } from 'react';
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";

const AccountInfo = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <table className="min-w-full text-sm text-left text-gray-500">
        <thead className="bg-gray-100">
          <tr>
            {['Trip ID', 'Date', 'Time', 'Customer ID', 'Customer Name', 'Actions'].map((header) => (
              <th key={header} className="px-6 py-3 text-xs font-semibold text-gray-700 uppercase tracking-wider">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr className="hover:bg-gray-50">
            <td className='px-6 py-4'>#505524082</td>
            <td className='px-6 py-4'>7-5-24</td>
            <td className='px-6 py-4'>9:45pm</td>
            <td className='px-6 py-4'>#55995151</td>
            <td className='px-6 py-4'>Balaji</td>
            <td className='px-6 py-4'>
              <button className="text-white bg-green-600 px-3 py-1 rounded-md hover:bg-green-700">
                View
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const Security = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className='mb-6'>
        <h1 className='font-medium text-lg'>Indian Bank</h1>
        <div className='flex justify-between border-b pb-4'>
          <div className='text-sm'>
            <h1 className='font-semibold'>Parthiban</h1>
            <p>25, Annai Sathya Nagar</p>
            <p>Poodapet Main Road, Ramapuram</p>
            <p>Chennai 600 089</p>
          </div>
          <div>
            <table className='text-sm'>
              <tbody>
                <tr>
                  <td className='font-semibold pr-4'>Branch Name:</td>
                  <td>Ramapuram</td>
                </tr>
                <tr>
                  <td className='font-semibold pr-4'>Account Number:</td>
                  <td>8976534575</td>
                </tr>
                <tr>
                  <td className='font-semibold pr-4'>Routing Number:</td>
                  <td>47463433</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div>
        <table className='min-w-full text-sm text-left text-gray-500'>
          <thead className="bg-gray-100">
            <tr>
              {['Invoice ID', 'Date', 'Time', 'Amount', 'Account Number', 'Actions'].map((header) => (
                <th key={header} className="px-6 py-3 text-xs font-semibold text-gray-700 uppercase tracking-wider">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-gray-50">
              <td className='px-6 py-4'>#505524082</td>
              <td className='px-6 py-4'>02-97-2023</td>
              <td className='px-6 py-4'>10:28pm</td>
              <td className='px-6 py-4'>45,000</td>
              <td className='px-6 py-4'>234 4565 5787</td>
              <td className='px-6 py-4'>
                <button className="text-white bg-green-600 px-3 py-1 rounded-md hover:bg-green-700">
                  View
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Document = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            {['Document Type', 'Download', 'View'].map((header) => (
              <th key={header} className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {['ED-001', 'ED-002', 'ED-004'].map((doc) => (
            <tr key={doc} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{doc}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button className="text-white bg-blue-700 px-3 py-1 rounded-md hover:bg-blue-800">
                  Download
                </button>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button className="text-white bg-green-600 px-3 py-1 rounded-md hover:bg-green-700">
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const DriverDetails = () => {
  const [activeAccount, setActiveAccount] = useState('accountInfo');

  const renderComponent = () => {
    switch (activeAccount) {
      case 'accountInfo':
        return <AccountInfo />;
      case 'security':
        return <Security />;
      case 'privacyUser':
        return <Document />;
      default:
        return <AccountInfo />;
    }
  };

  return (
    <div className='p-6'>
      <div className='flex justify-between items-center mb-6'>
        <div>
          <h1 className='text-2xl font-semibold'>Driver Details</h1>
          <p className='text-gray-500'>Home &gt; Driver Details</p>
        </div>
        <div className='flex gap-3'>
          <button className='bg-blue-600 px-4 py-2 rounded-md text-white hover:bg-blue-700'>
            Edit <CiEdit className='inline-block ml-2' />
          </button>
          <button className='bg-red-600 px-4 py-2 rounded-md text-white hover:bg-red-700'>
            Delete <AiOutlineDelete className='inline-block ml-2' />
          </button>
        </div>
      </div>
      <div className="flex justify-center gap-4 mb-4">
        {['Driver Info', 'Bank Details', 'Documents'].map((tab, index) => (
          <button
            key={index}
            className={`px-6 py-2 font-medium rounded-md ${activeAccount === tab.toLowerCase().replace(' ', '') ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'} hover:bg-blue-500 hover:text-white`}
            onClick={() => setActiveAccount(tab.toLowerCase().replace(' ', ''))}
          >
            {tab}
          </button>
        ))}
      </div>
      <div>{renderComponent()}</div>
    </div>
  );
};

export default DriverDetails;
