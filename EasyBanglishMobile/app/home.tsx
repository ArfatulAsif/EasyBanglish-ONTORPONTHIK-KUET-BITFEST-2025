import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import tw from 'twrnc';

const HomeScreen = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Retrieve data from AsyncStorage
  const fetchUserData = async () => {
    try {
      const storedData = await AsyncStorage.getItem('data'); // 'data' contains the stored JSON
      if (storedData) {
        setUserData(JSON.parse(storedData));
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  if (loading) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={tw`mt-4 text-gray-500`}>Loading user data...</Text>
      </View>
    );
  }

  if (!userData) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <Text style={tw`text-red-500`}>No user data found. Please log in again.</Text>
      </View>
    );
  }

  return (
    <View style={tw`flex-1 p-6`}>
      <Text style={tw`text-2xl font-bold mb-4`}>Welcome, {userData.user.name}!</Text>
      <View style={tw`bg-white p-4 rounded-lg shadow`}>
        <Text style={tw`text-lg font-semibold mb-2`}>User Details:</Text>
        <Text style={tw`text-gray-700`}>ID: {userData.user.id}</Text>
        <Text style={tw`text-gray-700`}>Name: {userData.user.name}</Text>
        <Text style={tw`text-gray-700`}>Email: {userData.user.email}</Text>
      </View>
    </View>
  );
};

export default HomeScreen;
