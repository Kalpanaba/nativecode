import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { verifyOtp } from '../Server/Authentication';

const ValidationScreen = () => {
  const [otp, setOtp] = useState(Array(6).fill(''));
  const inputs = useRef([]);
  const navigation = useNavigation();
  const route = useRoute();
  const { userId } = route.params;

  const handleOtpChange = (value, index) => {
    if (/^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < 5) {
        inputs.current[index + 1].focus();
      }
    }
  };

  const handleOtpPaste = (event) => {
    const pastedOtp = event.nativeEvent.text.split('').slice(0, 6);
    setOtp(pastedOtp);
  };

//   const handleSubmit = async () => {
//     const otpCode = otp.join('');
//     try {
//       const verifyResponse = await verifyOtp(userId, otpCode);

//       // Check if OTP is valid
//       if (verifyResponse && verifyResponse.message === 'OTP is valid') {
//         Alert.alert('Success', 'OTP verified successfully!');
//         // Navigate to Home screen or wherever required
//         navigation.navigate('Home');
//       } else {
//         // Show error if OTP is invalid
//         Alert.alert('Error', 'Invalid OTP. Please try again.');
//       }
//     } catch (error) {
//       Alert.alert('Error', error.message || 'OTP verification failed');
//     }
//   };
  

const handleSubmit = async () => {
    const otpCode = otp.join('');
    try {
      const verifyResponse = await verifyOtp(userId, otpCode);
  
      if (verifyResponse && verifyResponse.success && verifyResponse.message === 'OTP is valid') {
        Alert.alert('Success', 'OTP verified successfully!');
        navigation.navigate('Home'); 
      } else {
        Alert.alert('Error', verifyResponse.message || 'Invalid OTP');
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'OTP verification failed');
    }
  };
  
  const resendOtp = () => {
    Alert.alert('OTP resent!', 'Please check your email for a new OTP.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Enter OTP</Text>
      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            style={styles.otpInput}
            value={digit}
            onChangeText={(value) => handleOtpChange(value, index)}
            maxLength={1}
            keyboardType="numeric"
            ref={(input) => (inputs.current[index] = input)}
          />
        ))}
      </View>
      <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Submit OTP</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={resendOtp} style={styles.resendButton}>
        <Text style={styles.resendButtonText}>Resend OTP</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  otpInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    width: 50,
    textAlign: 'center',
  },
  submitButton: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
  },
  resendButton: {
    alignItems: 'center',
    marginTop: 10,
  },
  resendButtonText: {
    color: 'blue',
    fontSize: 16,
  },
});

export default ValidationScreen;
