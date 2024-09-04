import React from "react";
import constants from '../../../../Utils/constant';
import { FaSquareFull } from "react-icons/fa";

const HowGodriveWorks = () => {
  return (
    <div className="ml-16 mr-16 mt-10 mb-10">
      <h1 className="text-5xl font-bold py-10">How to use the GoDrive app</h1>
      <p>
        Our core service is developing technology that connects drivers and
        riders on demand. Here’s how <br />
        the app works, step by step:
      </p>

      <div className="grid grid-cols-12 pt-20">
        <img className="w-full h-60 col-span-5 mb-8" src={constants.img_1} alt="Step 1" />
        <div className="col-span-2 flex flex-col justify-center items-center">
          <FaSquareFull />
          <div className="border-l-2 h-full border-black"></div>
        </div>
        <div className="col-span-5">
          <h2 className="font-bold text-gray-400">Step 1</h2>
          <h1 className="font-bold text-xl py-3">A rider opens the app</h1>
          <p>
            A rider opens the app. The rider enters their destination into the
            “Where to?” box; reviews each ride option for vehicle size, price,
            and estimated dropoff time; chooses the desired option; then
            confirms the pickup.
          </p>
        </div>

        <img className="w-full h-60 col-span-5 mb-8" src={constants.img_2} alt="Step 2" />
        <div className="col-span-2 flex flex-col justify-center items-center">
          <FaSquareFull />
          <div className="border-l-2 h-full border-black"></div>
        </div>
        <div className="col-span-5">
          <h2 className="font-bold text-gray-400">Step 2</h2>
          <h1 className="font-bold text-xl py-3">
            The rider is matched with a driver
          </h1>
          <p>
            The rider is matched with a driver. A nearby driver sees and chooses
            to accept the rider’s ride request. The rider is automatically
            notified when the driver’s vehicle is about a minute away.
          </p>
        </div>

        <img className="w-full h-60 col-span-5 mb-8" src={constants.img_3} alt="Step 3" />
        <div className="col-span-2 flex flex-col justify-center items-center">
          <FaSquareFull />
          <div className="border-l-2 h-full border-black"></div>
        </div>
        <div className="col-span-5">
          <h2 className="font-bold text-gray-400">Step 3</h2>
          <h1 className="font-bold text-xl py-3">
            The driver picks up the rider
          </h1>
          <p>
            The driver arrives at the pickup location. The rider receives a
            notification when the driver is arriving, and can contact the driver
            if needed.
          </p>
        </div>

        <img className="w-full h-60 col-span-5 mb-8" src={constants.img_4} alt="Step 4" />
        <div className="col-span-2 flex flex-col justify-center items-center">
          <FaSquareFull />
          <div className="border-l-2 h-full border-black"></div>
        </div>
        <div className="col-span-5">
          <h2 className="font-bold text-gray-400">Step 4</h2>
          <h1 className="font-bold text-xl py-3">
            The driver takes the rider to the destination
          </h1>
          <p>
            The rider and driver complete the trip. The rider can rate the
            driver and leave feedback to help improve the experience.
          </p>
        </div>

        <img className="w-full h-60 col-span-5 mb-8" src={constants.img_5} alt="Step 5" />
        <div className="col-span-2 flex justify-center">
          <FaSquareFull />
        </div>
        <div className="col-span-5">
          <h2 className="font-bold text-gray-400">Step 5</h2>
          <h1 className="font-bold text-xl py-3">
            The driver and rider leave ratings and reviews
          </h1>
          <p>
            The payment is processed automatically through the app. The rider
            receives a receipt via email or in the app.
          </p>
        </div>
        <div className="bg-gray-100 flex justify-center items-center col-span-12 mt-10">
          <div className="max-w-5xl w-full flex">
            <div className="w-1/2 bg-gray-100 flex justify-center mb-0 mt-0 items-center">
              <img src={constants.Women_img} alt="img6" className="h-full object-contain" />
            </div>
            <div className="p-10 w-1/2 flex flex-col justify-center">
              <h1 className="text-4xl font-bold mb-7">
                Ways people move around the world
              </h1>
              <p className="text-gray-700 mb-10 leading-7">
                The Uber app gives you the power to get where you want to go
                with access to different types of rides across more than 10,000
                cities.
              </p>
              <button className="bg-black text-white w-52 rounded-md p-3">
                View ride options
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowGodriveWorks;
