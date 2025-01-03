import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // For Ionicons
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router'; // Navigation hook

const CustomHeader = ({ onMenuPress }) => {
  const router = useRouter(); // Hook for navigation

  const handleChatPress = () => {
    router.push('/chat'); // Navigate to the chat page
  };

  return (
    <SafeAreaView style={styles.header}>
      <Text style={styles.title}>EasyBanglish</Text>
      <View style={styles.iconsContainer}>
        <TouchableOpacity onPress={handleChatPress} style={styles.chatIcon}>
          {/* Robot icon */}
          <Ionicons name="logo-octocat" size={30} color="#4C6EF5" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onMenuPress} style={styles.menuIcon}>
          <Ionicons name="menu" size={30} color="#4C6EF5" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4c6ef5', // Orangy color for the title
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chatIcon: {
    padding: 5,
    marginRight: 20, // Space between chat and menu icon
  },
  menuIcon: {
    padding: 5,
  },
});

export default CustomHeader;
