import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // To fetch user data from AsyncStorage
import { Ionicons } from '@expo/vector-icons'; // For the profile icon

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const data = await AsyncStorage.getItem('data');
        if (data) {
          setUserData(JSON.parse(data)); // Parse the user data from AsyncStorage
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    getUserData();
  }, []);

  if (!userData) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.iconContainer}>
          <Ionicons name="person-circle-outline" size={100} color="#4C6EF5" />
        </View>
        <Text style={styles.welcomeText}>Welcome, {userData.user.name}!</Text>
        <View style={styles.userDetails}>
          <Text style={styles.sectionTitle}>User Details:</Text>
          <Text style={styles.userInfo}>ID: {userData.user.id}</Text>
          <Text style={styles.userInfo}>Name: {userData.user.name}</Text>
          <Text style={styles.userInfo}>Email: {userData.user.email}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  profileContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  iconContainer: {
    alignItems: 'center', // Centers the profile icon horizontally
    marginBottom: 20, // Space between icon and the text
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center', // Center align the welcome text
  },
  userDetails: {
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4C6EF5',
    marginBottom: 8,
  },
  userInfo: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default ProfilePage;
