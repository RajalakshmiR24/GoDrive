import React, { useEffect, useState, useRef } from "react";
import { getGeocodeData } from "../../../Service/api";
import api from "../../../Utils/axios";
import FormField from "./FormComponent/FormField";
import { FaClock } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { RiUserAddFill, RiMapPinLine, RiPinDistanceFill } from "react-icons/ri";
import { BiSolidCalendarHeart } from "react-icons/bi";
import { GiSandsOfTime } from "react-icons/gi";
import { TiCancel } from "react-icons/ti";

const HERE_API_KEY = "1GAoVaOcX3MUdbsw4qhCqJp6MnKlEPzVP-db90XTZDg";

const RideForm = () => {
  const [name, setName] = useState("");
  const [userEmail, setUserEmail] = useState("");
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
  const [isForm1Visible, setIsForm1Visible] = useState(true); // Default to true
  const [isForm2Visible, setIsForm2Visible] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const mapRef = useRef(null);
  const routingRef = useRef(null);

  const togglePopup = () => setIsPopupOpen((prev) => !prev);
  const closePopup = () => setIsPopupOpen(false);
  const toggleSecondPopup = () => setIsSecondPopupOpen((prev) => !prev);
  const closeSecondPopup = () => setIsSecondPopupOpen(false);

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

  useEffect(() => {
    if (!mapRef.current) {
      const platform = new H.service.Platform({ apikey: HERE_API_KEY });
      const defaultLayers = platform.createDefaultLayers();

      const mapElement = document.getElementById("map");
      mapElement.style.width = "800px";
      mapElement.style.height = "500px";
      mapElement.style.position = "relative";
      mapElement.style.overflow = "hidden";

      mapRef.current = new H.Map(mapElement, defaultLayers.vector.normal.map, {
        zoom: 12,
        center: { lat: 13.0303, lng: 80.1696 },
      });

      const behavior = new H.mapevents.Behavior(
        new H.mapevents.MapEvents(mapRef.current)
      );
      const ui = H.ui.UI.createDefault(mapRef.current, defaultLayers);

      window.addEventListener("resize", () =>
        mapRef.current.getViewPort().resize()
      );
    }
  }, []);

  useEffect(() => {
    if (pickupCoords && dropCoords && mapRef.current) {
      if (routingRef.current) {
        mapRef.current.removeObject(routingRef.current);
      }

      const platform = new H.service.Platform({ apikey: HERE_API_KEY });
      const router = platform.getRoutingService();
      const routeRequestParams = {
        mode: "fastest;car",
        representation: "display",
        routeattributes: "summary",
        maneuverattributes: "all",
        waypoint0: `geo!${pickupCoords.lat},${pickupCoords.lng}`,
        waypoint1: `geo!${dropCoords.lat},${dropCoords.lng}`,
      };

      router.calculateRoute(
        routeRequestParams,
        (result) => {
          if (result.routes.length) {
            const route = result.routes[0];
            const routeLine = new H.map.Polyline(
              new H.geo.LineString(route.sections[0].polyline),
              { style: { strokeColor: "black", lineWidth: 5 } }
            );

            mapRef.current.addObject(routeLine);
            mapRef.current
              .getViewModel()
              .setLookAtData({ bounds: routeLine.getBoundingBox() });
            routingRef.current = routeLine;
          }
        },
        (error) => {
          console.error("Routing error:", error);
        }
      );
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

    const coords = {
      lat: suggestion.lat,
      lng: suggestion.lon,
    };

    if (setter === setPickupLocation) {
      setPickupCoords(coords);
    } else {
      setDropCoords(coords);
    }
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
    <div className="relative">
      <div
        className={`grid grid-cols-1 lg:grid-cols-3 mt-1 gap-10 bg-white p-5 rounded-lg shadow-lg overflow-auto ${
          isPopupOpen || isSecondPopupOpen ? "opacity-50 blur-sm" : ""
        }`}
      >
        <div
          id="map"
          className="lg:col-span-2 w-full lg:h-full h-96 lg:order-2 sm:order-1 bg-gray-200 rounded-lg"
        ></div>
        <div>
          {isForm1Visible && (
            <form
              onSubmit={handleSubmit}
              className="lg:col-span-1 bg-white p-5 h-96 w-90 lg:order-1 ml-16 rounded-lg sm:order-2 shadow-lg sticky top-5 min-h-fit"
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

              <button
                onClick={handlePickup}
                className="flex items-center text-gray-700 justify-between text-lg"
              >
                <FaClock className="mr-2" />
                {pickupTime}
              </button>
              <button
                onClick={togglePopup}
                className="flex items-center mt-2 text-lg text-gray-700"
              >
                <RiUserAddFill className="mr-2" />
                {forWhom}
              </button>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-700 transition duration-200 ease-in-out"
                >
                  Book Ride
                </button>
              </div>
            </form>
          )}

          {isForm2Visible && (
            <form
              onSubmit={handleSubmit}
              className="lg:col-span-1 bg-white p-5 h-96 w-90 lg:order-1 ml-16 rounded-lg sm:order-2 shadow-lg sticky top-5 min-h-fit"
            >
                      
          <button
             // Close the popup
            className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
          >
            <IoClose />
          </button>
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
      </div>

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
    </div>
  );
};

export default RideForm;
