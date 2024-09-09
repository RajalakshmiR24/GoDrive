import React from 'react';
import constants from '../../../../Utils/constant'
import { GoPerson } from "react-icons/go";
import { IoCarSport } from "react-icons/io5";
import { IoCaretForwardCircle } from "react-icons/io5";
import { ImNotification } from "react-icons/im";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { AiOutlineJava } from "react-icons/ai";
import { Link } from 'react-router-dom';



 // Ensure the relative path is correct

const RideHistory = () => {
  return (
    <div>
      
      <div className='w-full rounded h-96 mb-4  p-4'>
  <div className='flex justify-evenly items-start'>
    {/* Left Section */}
    <div className='w-1/3'>
      <img src={constants.driver} alt='profile' className='rounded mb-4' />
      <div>
        <table className=''>
          <thead>
            <tr>
              <td className='text-blue-500'>Name</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Partha</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    {/* Middle Section */}
    <div className='w-1/3'>
      <h1 className='font-bold text-lg mb-2'>Takdia Talha</h1>
      <div className='mb-4 flex'>
        <h1><GoPerson className='inline-block' />
        CTO1</h1>
        <h1><IoCarSport className='inline-block ' />
        LC72YKK</h1>
      </div>
      <table className='w-full '>
        <thead className='text-left '>
          <tr className='border'>
            <td>Date Of Birth</td>
            <td>12 December, 2000</td>
          </tr>
          <tr className='border'>
            <td>National ID</td>
            <td>12794638638354</td>
          </tr>
          <tr className='border'>
            <td>Phone Number</td>
            <td>+919047663804</td>
          </tr>
          <tr className='border'>
            <td>Email Address</td>
            <td>partha@gmail.com</td>
          </tr>
          <tr className='border'>
            <td>Join Date</td>
            <td>08 October 2024</td>
          </tr>
          <tr className='border'>
            <td>License Info1</td>
            <td>Temp info</td>
          </tr>
          <tr className='border'>
            <td>License Info2</td>
            <td>Temp info</td>
          </tr>
          <tr className='border'>
            <td>License Info3</td>
            <td>Temp info</td>
          </tr>
          <tr className='border'>
            <td>License Info4</td>
            <td>Temp info</td>
          </tr>
          <tr className='border'>
            <td>License Info5</td>
            <td>Temp info</td>
          </tr>
        </thead>
      </table>
    </div>

    {/* Right Section */}
    <div className='w-1/6 flex flex-col py-16 space-y-4'>
      <button className='rounded bg-gray-200 text-black px-4 py-2'><AiOutlineJava className='inline-block' />
      150</button>
      <button className='rounded bg-gray-200 text-orange-300 px-4 py-2'><ImNotification className='inline-block' />
      141</button>
      <button className='rounded bg-gray-200 text-green-500 px-4 py-2'><FaLocationCrosshairs className='inline-block' />
      66</button>
    </div>
  </div>
</div>


      <div>
        <h1 className='font-bold'>Trips History</h1>
      <table className='min-w-full bg-white rounded shadow'>
          <thead>
            <tr className='bg-gray-100 text-black  text-sm leading-normal'>
              <th className='py-3 px-6 text-left'>#INCIDENTS TYPE</th>
              <th className='py-3 px-6 text-left'>#INCIDENTS DATE</th>
              <th className='py-3 px-6 text-left'>TIME</th>
              <th className='py-3 px-6 text-left'>INCIDENTS</th>
              <th className='py-3 px-6 text-left'>DISTANCE(KM)</th>
              <th className='py-3 px-6 text-left'>DURATION</th>
              <th className='py-3 px-6 text-left'>ACTION</th>
              <th className='py-3 px-6 text-left'></th>
            </tr>
          </thead>
          <tbody className='text-gray-600 text-sm'>
            <tr className='border-b border-gray-200 hover:bg-gray-100'>
              <td className='py-3 px-6 text-left'>Distracted Driving</td>
              <td className='py-3 px-6 text-left'>10-09-2024</td>
              <td className='py-3 px-6 text-left'>18:13:44</td>
              <td className='py-3 px-6  text-center'>3</td>
              <td className='py-3 px-6 text-left'>43:00</td>
              <td className='py-3 px-6 text-left'>01h:20m</td>
              <td className='py-3 px-6 text-left'>
                <Link to="/tripList"><button
                  className='rounded bg-orange-600 text-white  px-3 py-1 hover:bg-orange-600'
                  
                >
                  Trip Detailes
                </button></Link>
                
              </td>
              <td  className='py-3 px-6 text-left'><IoCaretForwardCircle className='text-orange-600 size-7' />
              </td>
            </tr>
            {/* Additional rows can go here */}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RideHistory;