// CustomHeader.js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc'; // Optional: Use Tailwind CSS for styling
import { SafeAreaView } from 'react-native-safe-area-context';

const CustomHeader = ({ onMenuPress }) => {
  return (
    <SafeAreaView style={tw`p-4 bg-gray-300 shadow-md flex-row justify-between items-center`}>
      <Text style={tw`text-lg font-bold text-gray-800`}>KUET Hackathon mobile app</Text>
      <TouchableOpacity onPress={onMenuPress}>
        <Ionicons name="menu" size={24} color="gray" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default CustomHeader;
