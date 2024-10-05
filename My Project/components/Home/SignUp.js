import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet ,Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { registerUser } from '../Server/Authentication';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleRegister = async () => {
    const userData = {
      name: name,
      email: email,
      password: password,
    };
  
    try {
      const registerResponse = await registerUser(userData);
      if (registerResponse && registerResponse.userID) {
        Alert.alert('Success', 'Registration successful. Please check your email for OTP.');
        console.log("registerResponse:", registerResponse);
        navigation.navigate('ValidationScreen', { userId: registerResponse.userID }); 
      } else {
        console.log("Error: userID not found", registerResponse);
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'An error occurred during the registration process');
    }
  };
  
  

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.backButton}>
        <Text style={styles.backText}><FontAwesome name="arrow-left" size={16} /> Back</Text>
      </TouchableOpacity>

      <Text style={styles.header}>Create Your Account</Text>

      <Text style={styles.label}>Name</Text>
      <TextInput 
        style={styles.input} 
        value={name} 
        onChangeText={setName} 
        placeholder="Enter your name" 
      />

      <Text style={styles.label}>Email</Text>
      <TextInput 
        style={styles.input} 
        value={email} 
        onChangeText={setEmail} 
        placeholder="Enter your email" 
      />

      <Text style={styles.label}>Password</Text>
      <TextInput 
        style={styles.input} 
        value={password} 
        onChangeText={setPassword} 
        placeholder="Enter your password" 
        secureTextEntry
      />

      <TouchableOpacity onPress={handleRegister} style={styles.createButton}>
        <Text style={styles.createButtonText}>Create</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.googleButton}>
        <FontAwesome name="google" size={20} color="black" />
        <Text style={styles.googleButtonText}> Continue with Google</Text>
      </TouchableOpacity>

      <View style={styles.loginContainer}>
        <Text>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: 'white',
  },
  backButton: {
    marginBottom: 20,
  },
  backText: {
    fontSize: 16,
    color: 'blue',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  createButton: {
    backgroundColor: 'orange',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  createButtonText: {
    color: 'white',
    fontSize: 18,
  },
  googleButton: {
    flexDirection: 'row',
    backgroundColor: '#DB4437',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleButtonText: {
    color: 'white',
    fontSize: 18,
    marginLeft: 10,
  },
  loginContainer: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'center',
  },
  loginText: {
    color: 'blue',
    marginLeft: 5,
  },
});

export default RegisterScreen;
