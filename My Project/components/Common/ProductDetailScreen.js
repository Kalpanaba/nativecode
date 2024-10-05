import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, FlatList, Alert } from 'react-native';
import { fetchProductDetails } from '../Server/Authentication';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'https://pooja-store-backend-awkb.onrender.com';

const ProductDetail = ({ route, navigation }) => {
  const { productId ,userId} = route.params; 
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  useEffect(() => {
    const loadProductDetails = async () => {
      const productData = await fetchProductDetails(productId);
      setProduct(productData);
    };
    loadProductDetails();
  }, [productId]);

  // useEffect(() => {
  //   const loadProductDetails = async () => {
  //     const productData = await fetchProductDetails(productId);
  //     setProduct(productData);
  //   };
    
  //   const loadUserId = async () => {
  //     const id = await AsyncStorage.getItem('userId');
  //     setUserId(id);
  //   };

  //   loadProductDetails();
  //   loadUserId();
  // }, [productId]);
  const handleIncreaseQuantity = () => setQuantity(prev => prev + 1);
  const handleDecreaseQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  // const handleAddToCart = async () => {
  //   try {
  //     const response = await axios.post(`${BASE_URL}/cart/add`, {
  //       userId,
  //       product: {
  //         productId: product.product._id,
  //         quantity,
  //       },
  //     });
  //     if (response.data.success) {
  //       console.log('response is :',response);
  //       setIsAddedToCart(true);
  //       Alert.alert('Success', 'Product added to cart!');
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     Alert.alert('Error', 'Failed to add product to cart.');
  //   }
  // };


  const handleAddToCart = async () => {
    try {
      console.log('Adding product to cart...');
      console.log('User ID:', userId);
      console.log('Product ID:', product.product._id);
      console.log('Quantity:', quantity);
      const authToken = await AsyncStorage.getItem("adminToken"); 
      const response = await axios.post(`${BASE_URL}/cart/add`, {
        userId,
        product: {
          productId: product.product._id,
          quantity,
        },
      });
  
      console.log('Response:', response.data.userId); 
  
      if (response.data.success) {
        console.log('Product added to cart successfully:', response);
        setIsAddedToCart(true);
        Alert.alert('Success', 'Product added to cart!');
      } else {
        console.error('Failed to add product to cart:', response.data);
        Alert.alert('Error', 'Failed to add product to cart.');
      }
    } catch (error) {
      console.error('Error adding product to cart:', error.response ? error.response.data : error.message);
      Alert.alert('Error', 'Failed to add product to cart.');
    }
  };

  

  // const handleAddToCart = async () => {
  //   try {
  //     console.log('Adding product to cart...');
  //     console.log('User ID:', userId);
  //     console.log('Product ID:', product.product._id);
  //     console.log('Quantity:', quantity);
      
  //     // Ensure authToken is fetched correctly
  //     const authToken = await AsyncStorage.getItem("adminToken"); 
  //     const response = await axios.post(`${BASE_URL}/cart/add`, {
  //       userId,
  //       product: {
  //         productId: product.product._id,
  //         quantity,
  //       },
  //     });

  //     if (response.data.success) {
  //       console.log('Product added to cart successfully:', response);
  //       setIsAddedToCart(true);
  //       Alert.alert('Success', 'Product added to cart!');
  //     } else {
  //       console.error('Failed to add product to cart:', response.data);
  //       Alert.alert('Error', 'Failed to add product to cart.');
  //     }
  //   } catch (error) {
  //     console.error('Error adding product to cart:', error.response ? error.response.data : error.message);
  //     Alert.alert('Error', 'Failed to add product to cart.');
  //   }
  // };


  const handleGoToCart = () => {
    navigation.navigate('CartScreen'); // Navigate to Cart screen
  };

  if (!product) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: product.product.category.categoryImageUrl }} style={styles.mainImage} />
      <FlatList
        data={product?.product?.gallery} // Array of gallery images
        horizontal
        renderItem={({ item }) => (
          <Image source={{ uri: item.imageUrl }} style={styles.galleryImage} />
        )}
        keyExtractor={(item, index) => item._id || index.toString()} // Use _id if available, else fallback to index
        style={styles.galleryContainer}
      />
      <Text style={styles.productName}>{product.product.name}</Text>
      <Text style={styles.price}>Price: ₹{product.product.price}</Text>
      <View style={styles.stockContainer}>
        <Text style={styles.inStock}>IN STOCK</Text>
      </View>
      <Text style={styles.hurryUp}>ONLY ONE SMALL KIT LEFT, HURRY UP</Text>
      <Text style={styles.label}>Category:</Text>
      <Text style={styles.value}>{product.category}</Text>
      <Text style={styles.label}>Weight:</Text>
      <Text style={styles.value}>{product.product.weight}</Text>
      <Text style={styles.label}>Shipping Weight:</Text>
      <Text style={styles.value}>{product.product.shippingWeight}</Text>

      <View style={styles.quantityContainer}>
        <Text style={styles.quantityText}>QUANTITY</Text>
        <TouchableOpacity style={styles.quantityButton} onPress={handleDecreaseQuantity}>
          <Text style={styles.quantityButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantityValue}>{quantity}</Text>
        <TouchableOpacity style={styles.quantityButton} onPress={handleIncreaseQuantity}>
          <Text style={styles.quantityButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.goToBagButton}
          onPress={isAddedToCart ? handleGoToCart : handleAddToCart} // Call appropriate function based on state
        >
          <Text style={styles.goToBagButtonText}>
            {isAddedToCart ? 'Go to Cart' : 'Add to Cart'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.wishlistButton}>
          <FontAwesome name="heart" size={20} color="black" />
          <Text style={styles.wishlistButtonText}>Add to Wishlist</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionHeader}>PRODUCT DESCRIPTION</Text>
      <Text style={styles.productDescription}>{product.product.description}</Text>
      <Text style={styles.sectionHeader}>Product Information</Text>

      <View style={styles.infoTable}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Color:</Text>
          <Text style={styles.infoValue}>{product.product.color}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Primary Material:</Text>
          <Text style={styles.infoValue}>{product.product.primaryMaterial}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Is Assembled:</Text>
          <Text style={styles.infoValue}>{product.isAssembled ? 'Yes' : 'No'}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>What’s in the box:</Text>
          <Text style={styles.infoValue}>{product.product.boxContent}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Manufacture:</Text>
          <Text style={styles.infoValue}>{product.product.manufacturer}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Country of Origin:</Text>
          <Text style={styles.infoValue}>{product.product.countryOfOrigin}</Text>
        </View>
      </View>

      <Text style={styles.noReviews}>No Customer Reviews</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#FFF',
  },
  mainImage: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
  },
  galleryContainer: {
    marginVertical: 10,
  },
  galleryImage: {
    width: 60,
    height: 60,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  productName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'orange',
    marginBottom: 10,
  },
  stockContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  inStock: {
    fontSize: 16,
    color: 'green',
    textTransform: 'uppercase',
    marginRight: 10,
  },
  hurryUp: {
    fontSize: 14,
    color: 'orange',
    textTransform: 'uppercase',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    marginBottom: 5,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  quantityText: {
    fontSize: 16,
    marginRight: 10,
  },
  quantityButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f0f0f0',
  },
  quantityButtonText: {
    fontSize: 18,
  },
  quantityValue: {
    fontSize: 18,
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  goToBagButton: {
    backgroundColor: 'orange',
    padding: 10,
    marginRight: 10,
  },
  goToBagButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  wishlistButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  wishlistButtonText: {
    marginLeft: 5,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'orange',
    marginTop: 20,
    marginBottom: 10,
  },
  productDescription: {
    fontSize: 16,
    color: 'black',
  },
  infoTable: {
    marginTop: 10,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  infoLabel: {
    width: 150,
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoValue: {
    fontSize: 16,
  },
  noReviews: {
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 16,
  },
});

export default ProductDetail;
