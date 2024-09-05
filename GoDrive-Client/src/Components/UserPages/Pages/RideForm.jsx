import React, { useEffect, useState, useRef } from "react";
import { getGeocodeData } from "../../../Service/api";
import api from "../../../Utils/axios";
import FormField from "./FormComponent/FormField";
import { FaClock,FaGooglePay,FaRupeeSign } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { RiUserAddFill, RiMapPinLine, RiPinDistanceFill,RiArrowDropDownLine } from "react-icons/ri";

import { BiSolidCalendarHeart } from "react-icons/bi";
import { GiSandsOfTime } from "react-icons/gi";
import { TiCancel } from "react-icons/ti";
import { BsCashCoin } from "react-icons/bs";
import { SiPhonepe } from "react-icons/si";

import constants from '../../../Utils/constant';

// const HERE_API_KEY = "1GAoVaOcX3MUdbsw4qhCqJp6MnKlEPzVP-db90XTZDg";

const GOOGLE_MAPS_API_KEY = "AIzaSyCVQw0r3rQJRv4Y9y8FZDwz7tWUM3_D2Q4";

const RideForm = () => {
  const [name, setName] = useState("");
  const [userEmail,setUserEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropLocation, setDropLocation] = useState("");
  const [pickupTime, setPickupTime] = useState("Pickup now");
  const [forWhom, setForWhom] = useState("For me");
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [dropSuggestions, setDropSuggestions] = useState([]);
  const [pickupCoords, setPickupCoords] = useState(null);
  const [dropCoords, setDropCoords] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isSecondPopupOpen, setIsSecondPopupOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [thirdPopupOpen,setThirdPopupOpen]=useState(false)
  const [paymentMethod, setPaymentMethod] = useState(false);
  const [location, setLocation] = useState({ lat: 13.0303, lng: 80.1696 });


  const [isForm1Visible, setIsForm1Visible] = useState(true); // Default to true
  const [isForm2Visible, setIsForm2Visible] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const mapRef = useRef(null);
  const directionsService = useRef(null);
  const directionsRenderer = useRef(null);

  const togglePopup = () => setIsPopupOpen((prev) => !prev);
  const closePopup = () => setIsPopupOpen(false);
  const toggleSecondPopup = () => setIsSecondPopupOpen((prev) => !prev);
  const closeSecondPopup = () => setIsSecondPopupOpen(false);
  const handleThirdPopup = () => { setThirdPopupOpen((prev) => !prev);};
  const closethirdPopup = () => setThirdPopupOpen(false);
  const closefourthPopup = () => setfourthPopupOpen(false);
  


  const [countryCode, setCountryCode] = useState("+91");
  const [phoneNumber, setPhoneNumber] = useState("");

  const isButtonDisabled =
    !firstName || !lastName || !phoneNumber || !countryCode;

  const handleCountryCodeChange = (e) => {
    setCountryCode(e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handlePickup = () => {
    setIsForm1Visible(false);
    setIsForm2Visible(true);
  };

  useEffect(() => {
    const fetchUserDetails = () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const name = localStorage.getItem("name");
          const userEmail = localStorage.getItem("userEmail");
          const decodedToken = JSON.parse(atob(token.split(".")[1]));

          setName(name || "");
          setUserEmail(userEmail || "");
          setUserId(decodedToken.id);
        } catch (error) {
          console.error(
            "Error fetching user details from localStorage:",
            error
          );
        }
      }
    };

    fetchUserDetails();
  }, []);

  // useEffect(() => {
  //   if (!mapRef.current) {
  //     const platform = new H.service.Platform({ apikey: HERE_API_KEY });
  //     const defaultLayers = platform.createDefaultLayers();

  //     const mapElement = document.getElementById("map");
  //     mapElement.style.width = "800px";
  //     mapElement.style.height = "500px";
  //     mapElement.style.position = "relative";
  //     mapElement.style.overflow = "hidden";

  //     mapRef.current = new H.Map(mapElement, defaultLayers.vector.normal.map, {
  //       zoom: 12,
  //       center: { lat: 13.0303, lng: 80.1696 },
  //     });

  //     const behavior = new H.mapevents.Behavior(
  //       new H.mapevents.MapEvents(mapRef.current)
  //     );
  //     const ui = H.ui.UI.createDefault(mapRef.current, defaultLayers);

  //     window.addEventListener("resize", () =>
  //       mapRef.current.getViewPort().resize()
  //     );
  //   }
  // }, []);
  useEffect(() => {
    const initializeMap = () => {
      if (window.google && window.google.maps) {
        const map = new window.google.maps.Map(document.getElementById('map'), {
          center: location,
          zoom: 12,
        });
        mapRef.current = map;
      }
    };

    if (!window.google || !window.google.maps) {
      const interval = setInterval(() => {
        if (window.google && window.google.maps) {
          initializeMap();
          clearInterval(interval);
        }
      }, 500);
    } else {
      initializeMap();
    }
  }, [location]);

  useEffect(() => {
    if (!mapRef.current) {
      const map = new window.google.maps.Map(document.getElementById("map"), {
        center: { lat: 13.0303, lng: 80.1696 },
        zoom: 12,
      });

      mapRef.current = map;
      directionsService.current = new window.google.maps.DirectionsService();
      directionsRenderer.current = new window.google.maps.DirectionsRenderer();

      directionsRenderer.current.setMap(mapRef.current);
    }
  }, []);


  // useEffect(() => {
  //   if (pickupCoords && dropCoords && mapRef.current) {
  //     if (routingRef.current) {
  //       mapRef.current.removeObject(routingRef.current);
  //     }

  //     const platform = new H.service.Platform({ apikey: HERE_API_KEY });
  //     const router = platform.getRoutingService();
  //     const routeRequestParams = {
  //       mode: "fastest;car",
  //       representation: "display",
  //       routeattributes: "summary",
  //       maneuverattributes: "all",
  //       waypoint0: `geo!${pickupCoords.lat},${pickupCoords.lng}`,
  //       waypoint1: `geo!${dropCoords.lat},${dropCoords.lng}`,
  //     };

  //     router.calculateRoute(
  //       routeRequestParams,
  //       (result) => {
  //         if (result.routes.length) {
  //           const route = result.routes[0];
  //           const routeLine = new H.map.Polyline(
  //             new H.geo.LineString(route.sections[0].polyline),
  //             { style: { strokeColor: "black", lineWidth: 5 } }
  //           );

  //           mapRef.current.addObject(routeLine);
  //           mapRef.current
  //             .getViewModel()
  //             .setLookAtData({ bounds: routeLine.getBoundingBox() });
  //           routingRef.current = routeLine;
  //         }
  //       },
  //       (error) => {
  //         console.error("Routing error:", error);
  //       }
  //     );
  //   }
  // }, [pickupCoords, dropCoords]);

  useEffect(() => {
    if (pickupCoords && dropCoords && mapRef.current) {
      const request = {
        origin: new window.google.maps.LatLng(pickupCoords.lat, pickupCoords.lng),
        destination: new window.google.maps.LatLng(dropCoords.lat, dropCoords.lng),
        travelMode: window.google.maps.TravelMode.DRIVING,
      };

      directionsService.current.route(request, (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          directionsRenderer.current.setDirections(result);
        } else {
          console.error("Error in routing:", status);
        }
      });
    }
  }, [pickupCoords, dropCoords]);

  const handleLocationChange = async (e, setter, setSuggestions) => {
    const value = e.target.value;
    setter(value);

    if (value.length > 2) {
      try {
        const data = await getGeocodeData(value);
        setSuggestions(data);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionSelect = async (suggestion, setter, setSuggestions) => {
    setter(suggestion.display_name);
    setSuggestions([]);

    // const coords = {
    //   lat: suggestion.lat,
    //   lng: suggestion.lon,
    // };
    const coords = {
      lat: parseFloat(suggestion.lat),
      lng: parseFloat(suggestion.lon),
    };

    if (setter === setPickupLocation) {
      setPickupCoords(coords);
    } else {
      setDropCoords(coords);
    }
  };

  const handleSearch = () => {
    setShowForm(true); // Show the form when the search button is clicked
    setLocation({ lat: 13.0827, lng: 80.2707 }); 
  };
  const handlePaymentMethod = () => {
    setPaymentMethod((prev) => !prev);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const tripData = {
      pickupLocation,
      dropLocation,
      pickupTime,
      forWhom,
      userId,
      name,
      firstName,
      lastName,
    };

    try {
      const response = await api.post("/trips/newtrip", tripData);
      console.log("Trip created successfully:", response.data);
    } catch (error) {
      console.error(
        "Error creating trip:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div className="relative h-full">
      {/* Background that gets blurred */}
      <div
        className={`grid grid-cols-1 lg:grid-cols-3 lg:h-full mt-1 mx-2 gap-3 overflow-hidden ${
          isPopupOpen || isSecondPopupOpen ? "opacity-50 blur-sm" : ""
        } `}
      >
        <div
          id="map"
          className={`lg:h-full w-full sm:order-1 mt-7 bg-gray-200 rounded-lg ${
            showForm ? "lg:col-span-1 lg:order-3" : "lg:col-span-2 lg:order-2"
          }`}
        ></div>

        <div
          id="Vehicle choosing card"
          className={`${
            showForm
              ? "lg:grid-cols-2 w-[420px] mt-7  lg:h-[495px] p-3  lg:order-2  overflow-y-scroll sm:order-1 bg-white shadow-lg rounded-lg"
              : "lg:hidden"
          }`}
        >
          <h2 className="text-2xl text-black font-bold  ">Recommended</h2>
          <div className="border border-black rounded-lg hover:shadow-lg mt-3  p-2  ">
            <div className=" flex gap-2 ">
              <div className="w-28">
                <img src={constants.car5} alt="hgfhjj" />
              </div>
              <div>
                <h3 className=" font-bold ml-2 text-black mr-2">
                  Godrive Swift
                </h3>
                <h4 className="ml-2">Affordable compact rides</h4>
              </div>
              <h1 className="flex mt-5   text-black font-bold">
                <FaRupeeSign className="mt-1" />
                656
              </h1>
            </div>
          </div>
          <div className="border border-black rounded-lg hover:shadow-lg mt-3 p-2  ">
            <div className=" flex gap-2 ">
              <div className="w-28">
                <img src={constants.car5} alt="hgfhjj" />
              </div>
              <div>
                <h3 className=" font-bold ml-2 text-black ">Godrive Premier</h3>
                <h4 className="ml-2">Comfortable Sedans</h4>
              </div>
              <h1 className="flex mt-5 ml-9  text-black  font-bold">
                <FaRupeeSign className="mt-1" />
                756
              </h1>
            </div>
          </div>
          <div className="border border-black rounded-lg hover:shadow-lg mt-3 p-2  ">
            <div className=" flex gap-2 ">
              <div className="w-28">
                <img src={constants.car5} alt="hgfhjj" />
              </div>
              <div>
                <h3 className=" font-bold ml-2 text-black mr-2">Godrive XL</h3>
                <h4 className="ml-2">Comfortable SUVs</h4>
              </div>
              <h1 className="flex mt-5 ml-12  text-black font-bold ">
                <FaRupeeSign className="mt-1" />
                656
              </h1>
            </div>
          </div>
          <h2 className="text-2xl text-black mt-3 font-bold">Economy</h2>
          <div className="border border-black rounded-lg hover:shadow-lg mt-3 p-2  ">
            <div className=" flex gap-2 ">
              <div className="w-28 ">
                <img src={constants.carimg1} alt="hgfhjj" />
              </div>
              <div>
                <h3 className=" font-bold ml-2 text-black mr-2">Godrive Mini</h3>
                <h4 className="ml-2">Comfortable Mini Cabs</h4>
              </div>
              <h1 className="flex mt-5 ml-4  text-black font-bold ">
                <FaRupeeSign className="mt-1" />
                430
              </h1>
            </div>
          </div> <div className="border border-black rounded-lg hover:shadow-lg mt-3 p-2  ">
            <div className=" flex gap-2 ">
              <div className="w-24 ">
                <img src={constants.auto6} alt="hgfhjj" />
              </div>
              <div>
                <h3 className=" font-bold ml-6 text-black mr-2">Godrive Auto</h3>
                <h4 className="ml-6">Comfortable Drive auto</h4>
              </div>
              <h1 className="flex mt-5 ml-3 text-black font-bold ">
                <FaRupeeSign className="mt-1" />
                345
              </h1>
            </div>
          </div> <div className="border border-black rounded-lg hover:shadow-lg mt-3 p-2  ">
            <div className=" flex gap-2 ">
              <div className="w-28">
                <img src={constants.bike7} alt="hgfhjj" />
              </div>
              <div>
                <h3 className=" font-bold ml-2 text-black mr-2">Godrive BikeTaxi</h3>
                <h4 className="ml-2">Comfortable BikeTaxi</h4>
              </div>
              <h1 className="flex mt-5 ml-7  text-black font-bold ">
                <FaRupeeSign className="mt-1" />
                220
              </h1>
            </div>
          </div>


          <div className=" flex sticky bottom-0 p-3 hover:bg-white hover:shadow-lg border rounded-lg bg-gray-50">
            <div className="">
              <button 
              onClick={() => handleThirdPopup()} 
              className="flex mt-3 ml-3 "> <BsCashCoin className="text-green-600 mt-1 mr-2" size={24} /> Cash<RiArrowDropDownLine className="" size={28} /></button>
            </div>
            <div><button className="text-white bg-black ml-24  rounded-lg px-10 py-3 font-semibold">Request</button></div>
          </div>



        </div>
  {isForm1Visible && (

        <form
          className={`lg:col-span-1 bg-white p-5 mt-6 h-96  w-[350px] lg:order-1  rounded-lg sm:order-2 shadow-lg sticky top-5 min-h-fit ${
            showForm ? "ml-10" : "ml-16"
          }`}
          onSubmit={handleSubmit}
        >
          <h2 className="text-xl font-bold mb-4 text-gray-700">Find a Trip</h2>
          <FormField
            label="Pickup location"
            value={pickupLocation}
            onChange={(e) =>
              handleLocationChange(e, setPickupLocation, setPickupSuggestions)
            }
            suggestions={pickupSuggestions}
            onSuggestionSelect={(suggestion) =>
              handleSuggestionSelect(
                suggestion,
                setPickupLocation,
                setPickupSuggestions
              )
            }
            icon={<RiMapPinLine className="text-black" />}
          />
          <FormField
            label="Drop off location"
            value={dropLocation}
            onChange={(e) =>
              handleLocationChange(e, setDropLocation, setDropSuggestions)
            }
            suggestions={dropSuggestions}
            onSuggestionSelect={(suggestion) =>
              handleSuggestionSelect(
                suggestion,
                setDropLocation,
                setDropSuggestions
              )
            }
            icon={<RiPinDistanceFill className="text-black" />}
          />

<div className="flex flex-col gap-4">
  <button
    onClick={handlePickup}
    className="w-full pl-3 pr-3 py-2 flex items-center gap-2 rounded-lg bg-gray-100 hover:bg-gray-200 shadow-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black text-gray-700 text-sm transition-all duration-200 ease-in-out"
  >
    <FaClock className="text-black" />
    <span>{pickupTime}</span>
  </button>

  <button
    onClick={togglePopup}
    className="bg-gray-100 hover:bg-gray-200 shadow-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black flex items-center gap-4 rounded-lg pl-2 pr-2 py-2 text-gray-700 text-sm transition-all duration-200 ease-in-out"
  >
    <RiUserAddFill className="text-black" />
    <span>For me</span>
    <RiArrowDropDownLine size={28} className="text-black" />
  </button>
</div>


          <button
            onClick={handleSearch}
            className="bg-black text-white p-3 rounded-lg mt-4 w-full"
          >
            Search
          </button>
        </form>
        )}
{isForm2Visible && (
            <form
              onSubmit={handleSubmit}
              className="lg:col-span-1 bg-white p-5 h-96 w-90 lg:order-1 ml-16 rounded-lg sm:order-2 shadow-lg sticky top-5 min-h-fit"
            >
                      
         
            <IoClose 
              className="text-xl cursor-pointer"
              onClick={closefourthPopup}
            />
          
          <h2 className="text-xl font-bold mb-4 text-gray-700">
            When do you want to be picked up?
          </h2>
          <div>
            <label className="block text-gray-700">Date</label>
            <input
              type="date"
              value={pickupTime.date || ""}
              onChange={(e) =>
                setPickupTime({ ...pickupTime, date: e.target.value })
              }
              className="border border-gray-300 p-2 rounded w-full"
            />
          </div>
          <div>
            <label className="block text-gray-700">Time</label>
            <input
              type="time"
              value={pickupTime.time || ""}
              onChange={(e) =>
                setPickupTime({ ...pickupTime, time: e.target.value })
              }
              className="border border-gray-300 p-2 rounded w-full"
            />
          </div>
          <h1 className="border">
            <BiSolidCalendarHeart className="inline-block " />
            Choose your pickup time up to 90 days in advance
          </h1>
          <h1 className="border">
            <GiSandsOfTime className="inline-block" />
            Extra wait time included to meet your ride
          </h1>
          <h1 className="border">
            <TiCancel className="inline-block" />
            Cancel at no charge up to 60 minutes in advance
          </h1>
          <button
             // Close the popup
            className="bg-black text-white text-s p-2 rounded mt-4 w-full"
          >
            Done
          </button>
        
            </form>
          )}

      </div>

      {/* Popup for "For Me" */}
      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg w-80 relative">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-lg font-semibold">Trip Options</h4>
              <IoClose
                className="text-xl cursor-pointer"
                onClick={closePopup}
              />
            </div>
            <div className="mb-4">
              <div className="flex flex-col space-y-2">
                <label className="flex items-center cursor-pointer hover:bg-gray-200 p-2 rounded">
                  <input
                    type="radio"
                    name="tripType"
                    value="For me"
                    checked={"Me"}
                    onChange={() => {
                      setForWhom("Me");
                      closePopup();
                    }}
                    className="mr-2"
                  />
                  Me
                </label>

                <label
                  onClick={() => {
                    setForWhom("");
                    toggleSecondPopup();
                  }}
                  className="flex items-center cursor-pointer hover:bg-gray-200 p-2 rounded"
                >
                  <RiUserAddFill className="mr-2 text-lg" />
                  Order a Trip for someone else
                </label>
              </div>
              <button
                onClick={closePopup}
                className="bg-black text-white p-3 rounded-lg mt-4 w-full"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Popup for "Order a Trip for someone else" */}
      {isSecondPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg w-96 relative">
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-md font-semibold">New rider</h4>
              <IoClose
                className="text-xl cursor-pointer"
                onClick={closeSecondPopup}
              />
            </div>
            <h6 className="text-lg font-semibold mb-2">
              Driver will see this name
            </h6>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                First Name
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 p-2 rounded"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Last Name
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 p-2 rounded"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden mb-4">
              <select
                value={countryCode}
                onChange={handleCountryCodeChange}
                className="bg-gray-100 border-r border-gray-300 p-2 rounded-l-lg"
              >
                <option value="+1">+1 (USA)</option>
                <option value="+44">+44 (UK)</option>
                <option value="+91">+91 (IN)</option>
              </select>
              <input
                type="tel"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                placeholder="Enter phone number"
                className="flex-1 p-2"
              />
            </div>
            <span className="text-sm font-semibold">
              GoDrive won't share this phone number with drivers
            </span>
            <button
              onClick={closeSecondPopup}
              disabled={isButtonDisabled}
              className={`bg-black text-white p-3 rounded-lg mt-4 w-full ${
                isButtonDisabled ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Add Rider
            </button>
          </div>
        </div>
      )}

      {/*popup for cash payment */}
      {thirdPopupOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center  shadow-lg  bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 shadow-lg w-[400px]  h-[400px] ml-10 hover:bg-gray-50 relative">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-lg font-semibold">Payment Options</h4>
              <IoClose
                className="text-xl cursor-pointer"
                onClick={closethirdPopup}
              />
            </div>
            <label className="flex items-center">
              <div
                for="Googlepay"
                className="flex justify-between  hover:bg-gray-100 w-full items-center border shadow-lg rounded-lg p-4"
              >
                <FaGooglePay className="text-red-600 mt-1 mr-2" size={28} />
                <span className="mr-40"> Google Pay</span>

                <input
                  id="Googlepay"
                  type="radio"
                  name="paymentMethod"
                  value="cash"
                  className="ml-4"
                />
              </div>
            </label>
            <label className="flex items-center">
              <div className="flex justify-between mt-3 hover:bg-gray- w-full items-center border shadow-lg rounded-lg p-4">
                <SiPhonepe className="text-violet-800 mt-1 mr-2" size={24} />
                <span className="mr-40">Phone Pay</span>

                <input
                  type="radio"
                  name="paymentMethod"
                  value="cash"
                  className="ml-4"
                />
              </div>
            </label>
            <label className="flex items-center">
              <div className="flex justify-between mt-3 hover:bg-gray-100 w-full items-center border shadow-lg rounded-lg p-4">
                <BsCashCoin className="text-green-600 mt-1 mr-2" size={24} />
                <span className="mr-[200px]  ">Cash</span>

                <input
                  type="radio"
                  name="paymentMethod"
                  value="cash"
                  className="ml-4"
                />
              </div>
            </label>
            <div className="w-full flex justify-center">
              <button
                onSubmit={handlePaymentMethod}
                className="rounded-lg p-2 px-8 mt-10  shadow-lg text-white bg-black"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
};

export default RideForm;
