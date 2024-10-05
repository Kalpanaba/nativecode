import React, { useState ,useContext } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Animated, Dimensions } from 'react-native';
import { Ionicons, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import CartScreen from '../Cart/CartScreen';  
import { CartContext } from '../Cart/CartContext'; 


 

const Header = () => {
  const { getCartCount } = useContext(CartContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(  false);
  
  const navigation = useNavigation();
  const slideAnim = useState(new Animated.Value(-300))[0];
  const cartSlideAnim = useState(new Animated.Value(-300))[0];  

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSlider = () => {
    if (isSliderOpen) {
      Animated.timing(slideAnim, {
        toValue: -300, 
        duration: 300,
        useNativeDriver: false,
      }).start(() => setIsSliderOpen(false));
    } else {
      setIsSliderOpen(true);
      Animated.timing(slideAnim, {
        toValue: 0, 
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  const toggleCartSlider = () => {
    if (isCartOpen) {
      Animated.timing(cartSlideAnim, {
        toValue: -300,  // Move cart off-screen
        duration: 300,
        useNativeDriver: false,
      }).start(() => setIsCartOpen(false));
    } else {
      setIsCartOpen(true);
      Animated.timing(cartSlideAnim, {
        toValue: 0,  // Bring cart into view
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  return (
    <View>
      {/* Header Section */}
      <View style={styles.headerContainer}>
        <View style={styles.leftContainer}>
          <TouchableOpacity style={styles.hamburgerIcon} onPress={toggleSlider}>
            <Ionicons name="menu" size={26} color="black" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.locationIcon}>
            <Ionicons name="location" size={26} color="black" />
          </TouchableOpacity>

          <Image
            source={require('../../assets/logo1-18fc0558.png')}
            style={styles.logo}
          />
        </View>

        <View style={styles.centerContainer}>
          <TouchableOpacity onPress={toggleMenu} style={styles.icon}>
            <Ionicons name="person" size={23} color="black" />
          </TouchableOpacity>
          {isMenuOpen && (
            <View style={styles.menu}>
              <TouchableOpacity>
                <Text style={styles.menuItem}>My Account</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.menuItem}>LogIn</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.menuItem}>Sign Up</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.menuItem}>Sign Out</Text>
              </TouchableOpacity>
            </View>
          )}

          <TouchableOpacity style={styles.icon}>
            <FontAwesome name="heart" size={24} color="black" />
          </TouchableOpacity>

          {/* Cart Icon with Cart Slider */}
          <TouchableOpacity style={[styles.icon, styles.cartIcon]} onPress={toggleCartSlider}>
          <Ionicons name="cart" size={30} color="black" />
          {getCartCount() > 0 && (
          <View style={styles.cartBadge}>
            <Text style={styles.cartBadgeText}>{getCartCount()}</Text>
          </View>
        )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Slider Menu */}
      {isSliderOpen && (
        <Animated.View style={[styles.sliderMenu, { left: slideAnim }]}>
          {/* Close Button */}
          <TouchableOpacity style={styles.closeButton} onPress={toggleSlider}>
            <Ionicons name="close" size={26} color="black" />
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={styles.sliderMenuItem}>About Us</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.sliderMenuItem}>Blog</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.sliderMenuItem}>Shop</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.sliderMenuItem}>Custom products</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.sliderMenuItem}>Your Orders</Text>
          </TouchableOpacity>
        </Animated.View>
      )}

      {/* Cart Slider */}
      {isCartOpen && (
        <CartScreen cartSlideAnim={cartSlideAnim} toggleCartSlider={toggleCartSlider} />
      )}
    </View>
  );
};



const { height } = Dimensions.get('window'); 

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8EBFF',
    paddingHorizontal: 20,
    paddingVertical: 27,
    zIndex: 10,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hamburgerIcon: {
    marginRight: 10,
  },
  cartIcon: {
    marginRight: 0,
  },
  cartIcon: {
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    right: -10,
    top: -10,
    backgroundColor: 'red',
    borderRadius: 10,
    padding: 5,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: '#fff',
    fontSize: 12,
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 40,
    resizeMode: 'contain',
  },
  centerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
  },
  icon: {
    marginHorizontal: 10,
  },
  cartIcon: {
    marginRight: 0,
  },
  menu: {
    position: 'absolute',
    top: 40,
    right: 0,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'lightgray',
    padding: 10,
    zIndex: 100,
    width: 150,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  menuItem: {
    padding: 10,
    fontSize: 16,
    color: 'black',
  },
  // Slider Menu Styles
  sliderMenu: {
    position: 'absolute',
    top: 0,
    left: -300, // Hidden off-screen initially
    width: 250,
    height: 850, 
    backgroundColor: '#F8EBFF',
    padding: 20,
    zIndex: 100,
    borderRightWidth: 1,
    borderRightColor: '#ccc',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 10,
  },
  sliderMenuItem: {
    padding: 15,
    fontSize: 18,
    color: 'black',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
});

export default Header;
