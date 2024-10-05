import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Header from './components/Home/Header';
import BannerCarousel from './components/Home/Banner';
import ProductPage from './components/Home/Product';
import CategoryPage from './components/Home/CategoryPage';
import ProductDetail from './components/Common/ProductDetailScreen';
import RegisterScreen from './components/Home/SignUp';
import ValidationScreen from './components/Home/Validationscreen';
import LoginPage  from './components/Home/SignIn';
import { CartProvider } from './components/Cart/CartContext';





const Stack = createStackNavigator();

export default function App() {


  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <CartProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{ headerShown: false }} 
          />
            <Stack.Screen 
            name="Login" 
            component={LoginPage} 
            options={{ headerShown: false }} 
          />

          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="ValidationScreen" component={ValidationScreen} />
          <Stack.Screen name="Product" component={ProductPage} />
          <Stack.Screen 
            name="ProductDetail" 
            component={ProductDetail} 
            options={{ headerShown: false }} 
          />
          
        </Stack.Navigator>
      </NavigationContainer>
      </CartProvider>
    </SafeAreaProvider>
  );
}

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <CategoryPage />
        <BannerCarousel />
        <ProductPage />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    zIndex: 1,  
  },
});
