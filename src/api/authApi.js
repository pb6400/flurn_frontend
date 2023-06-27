import axios from 'axios';

// API base URL
const API_BASE_URL = 'https://zsrzpuksbzimwhxqlddb.supabase.co';

// API key
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpzcnpwdWtzYnppbXdoeHFsZGRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODIzMzExNTUsImV4cCI6MTk5NzkwNzE1NX0._rMLleWycKDfDSj0P633reCR2j-_nlN-uTgLcO5MTsM';
// Function to set up the axios instance with the base URL and headers
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'apikey': `${API_KEY}`,
  },
});

// Function to make a login API call
export const login = async (email, password) => {
  try {
    const response = await axiosInstance.post('/auth/v1/token?grant_type=password', {
      email,
      password,
    });
    // console.log(response.data)
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to make a register API call
export const register = async (name, email, password) => {
  try {
    const response = await axiosInstance.post('/auth/v1/signup', {
      name,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

