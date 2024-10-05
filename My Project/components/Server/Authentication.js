import { commonRequest } from './Api';
 import axios from 'axios';
 import AsyncStorage from '@react-native-async-storage/async-storage';

 
const BASE_URL = 'https://pooja-store-backend-awkb.onrender.com';



// get banners
export const fetchActiveBanners = async (header) => {
  return await commonRequest("GET", `${BASE_URL}/banner/get`, null, header);
};
  
  

//  GET product 
// export const postProductData = async (data, header) => {
//     console.log(data);
//   return await commonRequest("GET", `${BASE_URL}/product/get`, data, header);
// };



export const postProductData = async (header) => {
  return await commonRequest("GET", `${BASE_URL}/product/get`, null, header);
};




  // Fetch Categories Function
// export const fetchCategories = async (header) => {
//   return await commonRequest("GET", `${BASE_URL}/category/get`, null, header);
// };

  

// Fetch Categories Function
export const fetchCategories = async (header) => {
    try {
      const response = await commonRequest("GET", `${BASE_URL}/category/get`, null, header)
      if (response && response.activeCategories) {
        const activeCategoryNames = response.activeCategories
          .filter(category => category.categoryStatus === "Active")  
          .map(category => category.categoryName);                   
       // console.log("Active Category Names: ", activeCategoryNames);
        return activeCategoryNames;
      } else {
        console.error("Error: No activeCategories found in response");
        return [];
      }
    } catch (error) {
      console.error("Error fetching categories: ", error);
      return [];
    }
  };
  



  // Fetch product details by ID
export const fetchProductDetails = async (productId) => {
    try {
      const response = await axios.get(`${BASE_URL}/product/get/${productId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching product details:', error);
      return null;
    }
  };



// //   // Register Function
// export const registerUser = async (data, header) => {
//   return await commonRequest("POST", `${BASE_URL}/register`, data, header);
// };

// // OTP Verification Function
// export const verifyOtp = async (userId,otpCode, header) => {
//   const response = await commonRequest("POST", `${BASE_URL}/verify/${userId}`, { otp: otpCode }, header);
//   return response.data;
// };



// Register User Function
export const registerUser = async (data, header) => {
  try {
    const response = await commonRequest("POST", `${BASE_URL}/register`, data);
    console.log("test",data);
    const authToken = await AsyncStorage.getItem("adminToken");  
     //console.log("inside cr2" ,response);
    if (response && (response.success === true) && response.userID) {
      console.log('API response:', response);
      return response; 
    } else if (response && response.message) {
      throw new Error(response.message);
    } else {
      throw new Error('Unexpected response structure');
    }
  } catch (error) {
    console.error('Error during registration:', error.message || error);
    throw error;  
  }
};


// Register User Function
// export const registerUser = async (data, header) => {
//   try {
//     const response = await commonRequest("POST", `${BASE_URL}/register`, data);
//     console.log("test", data);
//     const authToken = await AsyncStorage.getItem("adminToken");

//     if (response && (response.success === true)) {
//       console.log('API response:', response);
//       // Return userID along with success status
//       return { success: true, userId: response.userID };
//     } else if (response && response.message) {
//       throw new Error(response.message);
//     } else {
//       throw new Error('Unexpected response structure');
//     }
//   } catch (error) {
//     console.error('Error during registration:', error.message || error);
//     throw error;
//   }
// };






export const loginUser = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, data);
    if (response.status === 200) {
      const authToken = response.data.token;  
      await AsyncStorage.setItem('userToken', authToken);

      return response.data;
    } else {
      return { error: 'Login failed. Please check your credentials.' };
    }
  } catch (error) {
    console.error('Login error:', error);
    return { error: 'Something went wrong. Please try again later.' };
  }
};



// OTP Verification Function
export const verifyOtp = async (userId, otpCode, header) => {
  try {
    console.log("OTP validation request:", userId, otpCode, header);
    const response = await commonRequest("POST", `${BASE_URL}/verify/${userId}`, { otp: otpCode }, header);
    console.log("Response received:", response);
    if (response && response.success === true && response.result && response.result.token) {
      const token = response.result.token;
      console.log("Token:", token);
      await AsyncStorage.setItem('authToken', token);
      return response;
    } else {
      console.error("Unexpected response structure:", response);
      throw new Error('Unexpected response structure or missing token');
    }
  } catch (error) {
    
       throw new Error(error.response.message || 'Unknown error occurred');
    }
};


//  //add to cart logic
// export const addToCart = async (productId, quantity) => {
//   try {
//     const response = await axios.post(`${BASE_URL}/cart/add`, {
//       productId,
//       quantity,
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error adding to cart:", error);
//     throw error;
//   }
// };





// Add to Cart API
export const addToCart = async (userId, productId, quantity) => {
  try {
    const response = await axios.post(`${BASE_URL}/cart/add`, {
      userId,
      product: {
        productId,
        quantity,
      },
    });
    console.log('userId :', userId);
    return response.data;
  } catch (error) {
    console.error('Error adding to cart:', error);
    return null;
  }
};

// Get Cart Details by User ID
export const getCartDetails = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/cart/get/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching cart details:', error);
    return null;
  }
};




