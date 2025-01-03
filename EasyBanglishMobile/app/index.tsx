import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Stack, Redirect } from 'expo-router';

export default function Layout() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 3000)); // Splash delay
        const storedData = await AsyncStorage.getItem('data'); // Retrieve data from storage

        if (storedData) {
          const parsedData = JSON.parse(storedData); // Parse JSON
          setIsAuthenticated(!!parsedData.token); // Check for a valid token
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        setIsAuthenticated(false);
      }
    };

    checkAuthStatus();
  }, []);

  if (isAuthenticated === null) {
    return <Redirect href="/splash" />; // Show splash initially
  }

  return (
    <Stack>
      {isAuthenticated ? (
        <Redirect href="/home" /> // Redirect to home if authenticated
      ) : (
        <Redirect href="/login" /> // Redirect to login if not authenticated
      )}
    </Stack>
  );
}
