import axios from 'axios';

// Backend API configuration
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Replace with your server's base URL
  headers: {
    'Content-Type': 'application/json',
  },
});
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log(token);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default api;

// Nominatim API base URL
const NOMINATIM_BASE_URL = 'https://nominatim.openstreetmap.org';

// Function to get geocode data using Nominatim
export const getGeocodeData = async (query) => {
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
