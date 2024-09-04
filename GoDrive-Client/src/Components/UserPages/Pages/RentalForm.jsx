import { useEffect, useState, useRef } from "react";
import { getGeocodeData } from "../../../Service/api";
import api from "../../../Service/api";
import FormField from "./FormComponent/FormField";
import { useNavigate } from "react-router-dom";
import { RiMapPinLine, RiPinDistanceFill } from 'react-icons/ri';
import { FaClock, FaUser } from 'react-icons/fa';


const HERE_API_KEY = "1GAoVaOcX3MUdbsw4qhCqJp6MnKlEPzVP-db90XTZDg";

const RideForm = () => {
  const [userName, setUserName] = useState("");
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
  const [rentalDuration, setRentalDuration] = useState("4 hours"); // Default value can be set to any option you prefer


  const mapRef = useRef(null);
  const routingRef = useRef(null);

  useEffect(() => {
    const fetchUserDetails = () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const userName = localStorage.getItem("userName");
          const userEmail = localStorage.getItem("userEmail");
          const decodedToken = JSON.parse(atob(token.split(".")[1]));

          setUserName(userName || "");
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
      const platform = new H.service.Platform({
        apikey: HERE_API_KEY,
      });
      const defaultLayers = platform.createDefaultLayers();

      mapRef.current = new H.Map(
        document.getElementById("map"),
        defaultLayers.vector.normal.map,
        {
          zoom: 13,
          center: { lat: 13.0303, lng: 80.1696 }, // Default center (Chennai)
        }
      );

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

      const platform = new H.service.Platform({
        apikey: HERE_API_KEY,
      });

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
              { style: { strokeColor: "blue", lineWidth: 5 } }
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
  
    if (
      !pickupLocation ||
      !dropLocation ||
      !pickupTime ||
      !forWhom ||
      !userId ||
      !rentalDuration // Check if rental duration is selected
    ) {
      console.error("Missing required fields");
      return;
    }
  
    const tripData = {
      pickupLocation,
      dropLocation,
      pickupTime,
      forWhom,
      userId,
      userName,
      rentalDuration, // Include rental duration in the data sent to the server
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
  
    const navigate = useNavigate();
  
    const handleSubmit = () => {
      navigate("/payment");
    };
  };
  
  
  

  return (
<div className="grid grid-cols-1 lg:grid-cols-3 mt-1 gap-4 bg-white p-5 rounded-lg shadow-lg overflow-auto">
  <form
    className="lg:col-span-1 bg-white p-5 h-96 w-80 ml-16 rounded-lg sm:order-2 shadow-lg sticky top-5 min-h-fit"
    onSubmit={handleSubmit}
  >
    <h2 className="text-xl font-bold mb-4 text-gray-700">Find a Trip</h2>
    <FormField
      label="Pickup location"
      value={pickupLocation}
      onChange={(e) => handleLocationChange(e, setPickupLocation, setPickupSuggestions)}
      suggestions={pickupSuggestions}
      onSuggestionSelect={(suggestion) => handleSuggestionSelect(suggestion, setPickupLocation, setPickupSuggestions)}
      icon={<RiMapPinLine className="text-black" />} // Use the new location pin icon
    />
    <FormField
      label="Drop off location"
      value={dropLocation}
      onChange={(e) => handleLocationChange(e, setDropLocation, setDropSuggestions)}
      suggestions={dropSuggestions}
      onSuggestionSelect={(suggestion) => handleSuggestionSelect(suggestion, setDropLocation, setDropSuggestions)}
      icon={<RiPinDistanceFill className="text-black" />} // Use the destination icon
    />
    <FormField
      label="Pickup time"
      type="select"
      options={["Pickup now", "Schedule for later"]}
      value={pickupTime}
      onChange={(e) => setPickupTime(e.target.value)}
      icon={<FaClock className="text-black" />} // Use clock icon
    />
    <div className="flex items-center mt-2 relative">
      <FaUser className="text-black mr-2 absolute left-2 top-1/2 transform -translate-y-1/2" />
      <select
        id="Forwhom"
        value={forWhom}
        onChange={(e) => setForWhom(e.target.value)}
        className="p-1 rounded-full border-solid bg-gray-100 pl-8" // Add padding-left for icon space
      >
        <option value="For me">For me</option>
        <option value="For someone else">For someone else</option>
      </select>
    </div>

    <button
      type="submit"
      className="w-full p-3 bg-black text-white font-semibold rounded-md mt-4 border-black transition duration-200"
    >
      Book Ride
    </button>
  </form>
  <div className="lg:col-span-2 h-96 lg:h-[80vh] p-4 lg:order-2 sm:order-1">
    <div id="map" className="w-full h-full rounded-lg shadow-md"></div>
  </div>
</div>

  );
};

export default RideForm;
