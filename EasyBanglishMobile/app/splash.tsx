import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const SplashScreen = () => {
  const router = useRouter();

  useEffect(() => {
    const navigateAfterDelay = async () => {
      await new Promise(resolve => setTimeout(resolve, 3000)); // 3-second delay
      const email = await AsyncStorage.getItem('data');
      if (email) {
        router.replace('/home'); // Redirect to home if email is available
      } else {
        router.replace('/login'); // Redirect to signup if email is not available
      }
    };

    navigateAfterDelay();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.backgroundDots}>
        {/* Render multiple dots */}
        {Array.from({ length: 200 }).map((_, index) => (
          <View key={index} style={styles.dot} />
        ))}
      </View>
      <Ionicons name="clipboard-outline" size={80} color="#FF6347" style={styles.icon} />
      <Text style={styles.text}>EasyBanglish</Text>
      <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    position: 'relative',
  },
  backgroundDots: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dot: {
    width: 5,  // Smaller dot size
    height: 5, // Smaller dot size
    backgroundColor: '#FF6347',
    borderRadius: 2.5, // Half of the width and height to make it round
    margin: 5, // Adjust spacing between dots
  },
  icon: {
    marginBottom: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  loader: {
    marginTop: 10,
  },
});
