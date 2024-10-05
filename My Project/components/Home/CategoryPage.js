import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { fetchCategories } from '../Server/Authentication';


const { width: screenWidth } = Dimensions.get('window');

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const loadCategories = async () => {
      const categoryNames = await fetchCategories();
      setCategories(categoryNames);
    };

    loadCategories();
  }, []);

 
  const renderCategoryItem = ({ item }) => (
    <View style={styles.carouselItem}>
      <Text style={styles.categoryText}>{item}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {categories.length > 0 && (
        <Carousel
          data={categories}
          renderItem={renderCategoryItem}
          sliderWidth={screenWidth}
          itemWidth={screenWidth * 0.4}  
          loop={true}
          autoplay={true}
          autoplayInterval={3000} 
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    backgroundColor: 'black',
    height: 60, 
  },
  carouselItem: {
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 5,
  },
  categoryText: {
    color: '#fff',  
    fontSize: 18,
  },
});

export default CategoryPage;
