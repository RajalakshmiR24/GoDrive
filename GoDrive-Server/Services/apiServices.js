
const axios = require('axios');

// Google Maps API base URLs
const GOOGLE_MAPS_GEOCODING_URL = 'https://maps.googleapis.com/maps/api/geocode/json';
const GOOGLE_MAPS_DIRECTIONS_URL = 'https://maps.googleapis.com/maps/api/directions/json';
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY; // Using environment variable for API key

// Function to get geocode data using Google Maps Geocoding API
const getGeocodeData = async (address) => {
  try {
    const response = await axios.get(GOOGLE_MAPS_GEOCODING_URL, {
      params: {
        address,
        key: GOOGLE_API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching geocode data:', error);
    throw new Error('Failed to fetch geocode data');
  }
};

// Function to get route data using Google Maps Directions API
const getRouteData = async (origin, destination) => {
  try {
    const response = await axios.get(GOOGLE_MAPS_DIRECTIONS_URL, {
      params: {
        origin,
        destination,
        key: GOOGLE_API_KEY,
        mode: 'driving', // You can change this to 'walking', 'bicycling', etc.
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching route data:', error);
    throw new Error('Failed to fetch route data');
  }
};

module.exports = { getGeocodeData, getRouteData };
