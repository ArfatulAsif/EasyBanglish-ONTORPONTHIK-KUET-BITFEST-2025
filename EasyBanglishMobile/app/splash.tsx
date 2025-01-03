import React, { useEffect } from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc'

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
      {/* <Image 
        source={require('../assets/images/iot_pic.jpg')} 
        style={tw`absolute inset-0 w-full h-full opacity-20`} 
      /> */}
      <Ionicons name="home-outline" size={80} color="#FF6347" style={styles.icon} />
      <Text style={styles.text}>KUET HACKATHON</Text>
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
