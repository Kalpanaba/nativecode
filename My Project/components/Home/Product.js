import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { postProductData } from '../Server/Authentication'; 

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await postProductData(); 
        if (response?.activeProducts && Array.isArray(response.activeProducts)) {
          setProducts(response.activeProducts); 
        } else {
          console.error('No active products found or invalid product data format');
        }
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchProducts(); 
  }, []);

  const handleViewProduct = (productId) => {
    navigation.navigate('ProductDetail', { productId });  
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.headerText}>NEW PRODUCTS</Text>

      {products.length === 0 ? (
        <Text>No products available</Text>
      ) : (
        <View style={styles.productGrid}>
          {products.map((product, index) => (
            <View key={index} style={styles.productCard}>
              <TouchableOpacity onPress={() => handleViewProduct(product._id)}>
                <Image source={{ uri: product.thumbnailImageUrl }} style={styles.productImage} />
              </TouchableOpacity>
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productPrice}>₹{product.price}</Text>

              <TouchableOpacity 
                style={styles.viewProductButton} 
                onPress={() => handleViewProduct(product._id)}>
                <Text style={styles.buttonText}>View Product</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f8f9fa', 
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    width: '48%', 
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
    alignItems: 'center',
  },
  productImage: {
    width: 150,
    height: 150,
    resizeMode: 'cover',
    borderRadius: 10,
    marginBottom: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  productPrice: {
    fontSize: 16,
    color: '#28a745',
    marginBottom: 10,
    textAlign: 'center',
  },
  viewProductButton: {
    backgroundColor: '#fabc74',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ProductPage;
