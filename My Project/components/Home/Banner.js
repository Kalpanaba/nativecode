import React, { useEffect, useState } from 'react';
import { fetchActiveBanners } from '../Server/Authentication'; // Make sure the path is correct
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const BannerCarousel = () => {
  const [banners, setBanners] = useState([]);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const autoplayInterval = 3000; 

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await fetchActiveBanners(); // Fetching banners from the API
        const activeBanners = response?.activeBanners || []; // Filtering active banners
        setBanners(activeBanners);
      } catch (error) {
        console.error('Error fetching banners:', error);
      }
    };

    fetchBanners();
  }, []); // Fetch only once when the component mounts

  // Autoplay effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerIndex((prevIndex) =>
        prevIndex === banners.length - 1 ? 0 : prevIndex + 1
      );
    }, autoplayInterval);

    return () => clearInterval(interval); // Clean up the interval on unmount or when banners change
  }, [banners]);

  const handlePrevBanner = () => {
    setCurrentBannerIndex((prevIndex) =>
      prevIndex === 0 ? banners.length - 1 : prevIndex - 1
    );
  };

  const handleNextBanner = () => {
    setCurrentBannerIndex((prevIndex) =>
      prevIndex === banners.length - 1 ? 0 : prevIndex + 1
    );
  };

  if (banners.length === 0) {
    return <Text>No active banners available</Text>;
  }

  return (
    <View style={styles.carouselContainer}>
      <Image
        source={{ uri: banners[currentBannerIndex]?.bannerImageUrl }}
        style={styles.bannerImage}
      />

      <TouchableOpacity onPress={handlePrevBanner} style={[styles.arrowButton, styles.arrowLeft]}>
        <Text style={styles.arrowText}>{"<"}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleNextBanner} style={[styles.arrowButton, styles.arrowRight]}>
        <Text style={styles.arrowText}>{">"}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    width: 360,
    height: 180, 
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  arrowButton: {
    position: 'absolute',
    top: '50%',
    transform: [{ translateY: -12 }],
    padding: 10,
    zIndex: 1, 
  },
  arrowLeft: {
    left: 10,
  },
  arrowRight: {
    right: 10,
  },
  arrowText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff', 
  },
});

export default BannerCarousel;
