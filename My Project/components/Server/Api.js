import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const commonRequest = async (method, url, body, header = null) => {
  const config = {
    method: method,
    url: url,
    data: body,  
    headers: {
      "Content-Type": "application/json", 
    },
  };

  console.log("Sending request:", { method, url, body, header });
  if (header) {
    config.headers = {
      ...config.headers,
      ...header, 
    };
  }

  try {
    const response = await axios(config);
    if (response.status === 200 || response.status === 201) {
      console.log("Registration successful:", response.data);
      return response.data; 
    } else {
      throw new Error(response.data.message || 'Registration failed');
    }
  } catch (error) {
    console.error('Error during registration:', error.response?.data?.message || error.message);
    throw new Error(error.response?.data?.message || 'Something went wrong');
  }
};