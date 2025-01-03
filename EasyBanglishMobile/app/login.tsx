import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, TouchableOpacity, Alert, StatusBar, ActivityIndicator, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import tw from 'twrnc';

const LoginScreen = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://192.168.14.51:8000/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.status === 200) {
        const data = await response.json();
        await AsyncStorage.setItem('data', JSON.stringify(data));
        Alert.alert('Success', 'Logged in successfully');
        console.log(data);
        router.replace('/home');
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Invalid login credentials');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage(error.message || 'An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={tw`flex-1 bg-gray-200`}>
      <StatusBar hidden={false} />
      <View style={tw`flex-1 justify-center items-center px-6`}>
        <Text style={tw`text-3xl font-bold text-gray-800 mb-6`}>EasyBanglish</Text>
        
        
        <TextInput
          style={tw`w-full h-12 border border-gray-300 rounded-lg px-4 bg-white mb-4`}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={tw`w-full h-12 border border-gray-300 rounded-lg px-4 bg-white mb-4`}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        
        {errorMessage ? (
          <Text style={tw`text-red-500 text-sm mb-4`}>{errorMessage}</Text>
        ) : null}

        <TouchableOpacity
          style={tw`w-full h-12 bg-blue-500 rounded-lg justify-center items-center mb-4`}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={tw`text-white text-lg font-semibold`}>Login</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/signup')}>
          <Text style={tw`text-gray-800`}>
            Don't have an account?{' '}
            <Text style={tw`text-blue-600 font-semibold`}>Create</Text>
          </Text>
        </TouchableOpacity>

        {/* Add an option for language change if needed */}
        <TouchableOpacity onPress={() => {/* Add language toggle functionality */}}>
          <Text style={tw`text-gray-600 mt-4`}>
            <Text style={tw`text-blue-600 font-semibold`}>Switch to Bangla</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
