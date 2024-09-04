const axios = require('axios');

// Nominatim API base URL
const NOMINATIM_BASE_URL = 'https://nominatim.openstreetmap.org';

// OpenRouteService API configuration
const ORS_BASE_URL = 'https://api.openrouteservice.org/v2/directions/driving-car';
const ORS_API_KEY = '5b3ce3597851110001cf62481d76d1fb63974536a702d0763fb5c285'; // Your ORS API key

// Function to get geocode data using Nominatim
const getGeocodeData = async (query) => {
  try {
    const response = await axios.get(`${NOMINATIM_BASE_URL}/search`, {
      params: {
        q: query,
        format: 'json',
        addressdetails: 1,
        limit: 5, // Limit the number of suggestions
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching geocode data:', error);
    throw error;
  }
};

// Function to get route data using OpenRouteService
const getRouteData = async (start, end) => {
  try {
    const response = await axios.get(`${ORS_BASE_URL}/geojson`, {
      params: {
        start,
        end,
        api_key: ORS_API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching route data:', error);
    throw error;
  }
};

module.exports = { getGeocodeData, getRouteData };
