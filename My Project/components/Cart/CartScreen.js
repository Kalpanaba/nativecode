import React from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CartScreen = ({ cartSlideAnim, toggleCartSlider }) => {
  return (
    <Animated.View style={[styles.cartContainer, { right: cartSlideAnim }]}>
  
      <TouchableOpacity style={styles.closeButton} onPress={toggleCartSlider}>
        <Ionicons name="close" size={26} color="black" />
      </TouchableOpacity>
      <Text style={styles.cartTitle}>Your Cart</Text>
      <View style={styles.cartItems}>
        <Text>No items in the cart.</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  cartContainer: {
    position: 'absolute',
    top: 0,
    right: -300,  
    width: 300,
    height: Dimensions.get('window').height,
    backgroundColor: '#FFF',
    padding: 20,
    zIndex: 100,
    borderLeftWidth: 1,
    borderLeftColor: '#ccc',
    shadowColor: '#000',
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 10,
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  cartTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cartItems: {
    flex: 1,
  }, 
});

export default CartScreen;
