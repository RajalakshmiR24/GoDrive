import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegCircle, FaRegSquare } from "react-icons/fa";
import { IoNewspaper } from "react-icons/io5"; // Added missing import for IoNewspaper
import { RiHomeOfficeFill } from "react-icons/ri"; // Added missing import for RiHomeOfficeFill
import constants from "../../../Utils/constant";
import { getGeocodeData } from '../../../Service/api';

const HERE_API_KEY = "1GAoVaOcX3MUdbsw4qhCqJp6MnKlEPzVP-db90XTZDg";

const Home = () => {
  const [pickupLocation, setPickupLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const navigate = useNavigate();
  const mapRef = useRef(null);
  const platformRef = useRef(null);

  const handleRequestClick = () => {
    navigate("/signup");
  };

  useEffect(() => {
    if (!mapRef.current) return;

    if (!platformRef.current) {
      platformRef.current = new H.service.Platform({
        apikey: HERE_API_KEY,
      });
    }

    const defaultLayers = platformRef.current.createDefaultLayers();
    const map = new H.Map(mapRef.current, defaultLayers.vector.normal.map, {
      zoom: 13,
      center: { lat: 13.0303, lng: 80.1696 },
    });

    new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
    H.ui.UI.createDefault(map, defaultLayers);

    const handleResize = () => map.getViewPort().resize();
    window.addEventListener('resize', handleResize);

    return () => {
      map.dispose();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleLocationChange = async (e, setter, setSuggestions) => {
    const value = e.target.value;
    setter(value);

    if (value.length > 2) {
      try {
        const data = await getGeocodeData(value);
        setSuggestions(data);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionSelect = (suggestion, setter, setSuggestions) => {
    setter(suggestion.display_name);
    setSuggestions([]);
  };

  return (
    <>
      <div
        className="relative min-h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${constants.home_img_2})` }}
      >
        <div className="absolute top-1/2 left-5 md:left-10 lg:left-20 xl:left-40 transform -translate-y-1/2 bg-opacity-20 backdrop-blur-md border border-black border-opacity-30 shadow-md rounded-lg p-6 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg w-96 h-72">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-black mb-6 text-center border-b-2 border-b-black">
            Book Your Trip
          </h2>
          <div className="flex flex-col space-y-4">
            {/* Pickup Location Input */}
            <div className="relative">
              <FaRegCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black" />
              <input
                id="pickup-location"
                type="text"
                className="w-full pl-10 pr-3 py-2 bg-transparent border-opacity-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-white placeholder-gray-100"
                placeholder="Enter pickup location"
                value={pickupLocation}
                onChange={(e) =>
                  handleLocationChange(e, setPickupLocation, setPickupSuggestions)
                }
              />
              {pickupSuggestions.length > 0 && (
                <ul
                  className="absolute z-10 w-full bg-black bg-opacity-70 backdrop-blur-md text-white rounded-lg shadow-lg max-h-40 overflow-y-auto"
                >
                  {pickupSuggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-200 hover:bg-opacity-30"
                      onClick={() =>
                        handleSuggestionSelect(suggestion, setPickupLocation, setPickupSuggestions)
                      }
                    >
                      {suggestion.display_name}
                    </li>
                  ))}
                </ul>
              )}

            </div>
            {/* Divider */}
            <div className="relative h-0">
              <div className="absolute left-5 top-0 bottom-0 transform -translate-y-1/2 border-l-2 border-smokewhite h-12" />
            </div>
            {/* Destination Input */}
            <div className="relative">
              <FaRegSquare className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black" />
              <input
                id="destination"
                type="text"
                className="w-full pl-10 pr-3 py-2 bg-transparent border-opacity-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-white placeholder-gray-100"
                placeholder="Enter destination"
                value={destination}
                onChange={(e) =>
                  handleLocationChange(e, setDestination, setDestinationSuggestions)
                }
              />
              {destinationSuggestions.length > 0 && (
  <ul
    className="absolute z-10 w-full bg-black bg-opacity-50 backdrop-blur-md text-white rounded-lg shadow-lg max-h-40 overflow-y-auto"
  >
    {destinationSuggestions.map((suggestion, index) => (
      <li
        key={index}
        className="px-4 py-2 cursor-pointer hover:bg-gray-200 hover:bg-opacity-30"
        onClick={() =>
          handleSuggestionSelect(suggestion, setDestination, setDestinationSuggestions)
        }
      >
        {suggestion.display_name}
      </li>
    ))}
  </ul>
)}

            </div>
            {/* Request Button */}
            <div className="flex justify-center">
              <button
                className="bg-black text-white rounded py-2 px-4 mt-3"
                onClick={handleRequestClick}
              >
                Request now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="bg-gray-50 w-full py-8 shadow-md rounded-lg p-4 flex justify-center items-center">
        <div className="w-full max-w-7xl">
          <h1 className="text-2xl font-bold mb-8 text-center md:text-left">
            Ride with GoDrive
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {[
              {
                title: "GoDrive Auto",
                description:
                  "Get affordable bike rides at your doorsteps. Skip the crowd and zip through traffic with Uber Moto.",
                image: constants.image_7,
              },
              {
                title: "GoDrive Biketaxi",
                description:
                  "Get affordable bike rides at your doorsteps. Skip the crowd and zip through traffic with Uber Moto.",
                image: constants.image_10,
              },
              {
                title: "GoDrive Rentals",
                description:
                  "Book Rentals to save time with one car and driver for your multi-stop trips.",
                image: constants.image_8,
              },
              {
                title: "GoDrive Intercity",
                description:
                  "Book Intercity to head outstation anytime in convenient and affordable cars.",
                image: constants.image_9,
              },
            ].map((service, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-lg"
              >
                <img
                  className="rounded-lg w-full md:w-1/3"
                  src={service.image}
                  alt={service.title}
                />
                <div>
                  <h2 className="text-lg font-semibold">{service.title}</h2>
                  <p className="text-gray-600 mt-2">{service.description}</p>
                  <a href="#" className="text-blue-500 mt-2 inline-block">
                    Read more
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Safety Instructions Section */}
      <div className="w-full bg-gray-50 flex justify-center items-center py-12">
        <div className="w-full max-w-7xl">
          <h1 className="text-2xl font-bold text-center mb-8">
            Focused on safety, wherever you go
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col items-center">
              <img
                className="w-full h-auto rounded-lg"
                src={constants.image_4}
                alt="Safety"
              />
              <h3 className="font-bold text-lg pt-3 text-center">
                Our commitment to your safety
              </h3>
              <p className="text-center pt-2">
                With every safety feature and every standard in our Community
                Guidelines, we're committed to helping to create a safe
                environment for our users.
              </p>
              <div className="pt-4 flex justify-center space-x-4">
                <a className="border-b-2 border-gray-300 pb-1" href="#">
                  Read about our Community Guidelines
                </a>
                <a className="border-b-2 border-gray-300 pb-1" href="#">
                  See all safety measures
                </a>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <img
                className="w-full h-auto rounded-lg"
                src={constants.image_5}
                alt="Cities"
              />
              <h3 className="font-bold text-lg pt-3 text-center">
                Setting 10,000+ cities in motion
              </h3>
              <p className="text-center pt-2">
                The app is available in thousands of cities worldwide, so you
                can request a ride even when you’re far from home.
              </p>
              <div className="pt-4 flex justify-center">
                <a className="border-b-2 border-gray-300 pb-1" href="#">
                  View all cities
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About us navigation page */}
      <div className="w-full py-12 bg-gray-50 flex justify-center items-center gap-8">
        <div className="w-full max-w-7xl flex flex-col md:flex-row gap-8 justify-center items-center">
          <div className="bg-white p-4 rounded-lg text-center flex flex-col items-center">
            <img className="w-8 h-8" src={constants.image_11} alt="About Us" />
            <h4 className="font-bold pt-2">About us</h4>
            <p className="text-center pt-2">
              Find out how we started, what drives us, and how we’re
              reimagining how the world moves.
            </p>
            <a
              href="#"
              className="mt-4 inline-block text-blue-500 border-b-2 border-gray-300 pb-1"
            >
              Learn more about GoDrive
            </a>
          </div>
          <div className="bg-white p-4 rounded-lg text-center flex flex-col items-center">
            <IoNewspaper className="text-4xl text-black" />
            <h4 className="font-bold pt-2">Newsroom</h4>
            <p className="text-center pt-2">
              See announcements about our latest releases, initiatives, and
              partnerships.
            </p>
            <a
              href="#"
              className="mt-4 inline-block text-blue-500 border-b-2 border-gray-300 pb-1"
            >
              Go to Newsroom
            </a>
          </div>
          <div className="bg-white p-4 rounded-lg text-center flex flex-col items-center">
            <RiHomeOfficeFill className="text-4xl text-black" />
            <h4 className="font-bold pt-2">Global citizenship</h4>
            <p className="text-center pt-2">
              Read about our commitment to making a positive impact in the
              cities we serve.
            </p>
            <a
              href="#"
              className="mt-4 inline-block text-blue-500 border-b-2 border-gray-300 pb-1"
            >
              Learn more about our initiatives
            </a>
          </div>
        </div>
        </div>
    </>
  );
};

export default Home;
