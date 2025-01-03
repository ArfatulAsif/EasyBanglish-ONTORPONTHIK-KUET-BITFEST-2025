import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Alert, StatusBar, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import tw from 'twrnc';

const SignupScreen = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    const body = {
      name,
      email,
      password,
    };

    setLoading(true);
    try {
      const response = await fetch('http://192.168.14.51/auth/reg', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (response.status === 201) {
        Alert.alert('Success', 'Account created successfully');
        router.replace('/login');
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Error creating account');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={tw`flex-1 justify-center bg-gray-100 p-5`}>
      <StatusBar hidden={true} />
      <View style={tw`bg-white p-5 rounded-lg shadow-lg`}>
        <Text style={tw`text-2xl font-bold mb-5 text-center text-green-700`}>Create a New Account</Text>
        <TextInput
          style={tw`h-12 border border-gray-300 p-3 mb-4 rounded-md`}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={tw`h-12 border border-gray-300 p-3 mb-4 rounded-md`}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        
        <TextInput
          style={tw`h-12 border border-gray-300 p-3 mb-4 rounded-md`}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        

        {errorMessage ? (
          <Text style={tw`text-red-600 mb-4 text-center`}>{errorMessage}</Text>
        ) : null}

        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <Button title="Create Account" onPress={handleSignup} />
        )}

        <TouchableOpacity onPress={() => router.push('/login')}>
          <Text style={tw`text-center mt-5 text-blue-500`}>Already have an account? Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignupScreen;
