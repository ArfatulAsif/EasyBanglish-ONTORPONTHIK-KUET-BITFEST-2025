import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // Use Ionicons for icons
import AsyncStorage from '@react-native-async-storage/async-storage';

const Sidebar = ({ visible, onClose }) => {
  const router = useRouter();

  if (!visible) return null; // Don't render if not visible

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('data'); // Remove user data from AsyncStorage
      onClose(); // Close the sidebar before navigating
      router.push('/login'); // Navigate to the login screen
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <SafeAreaView style={styles.sidebar}>
      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <Text style={styles.closeButtonText}>Close</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => { router.push('/home'); onClose(); }} style={styles.menuItem}>
        <Ionicons name="home-outline" size={24} color="#4C6EF5" />
        <Text style={styles.menuText}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => { router.push('/profile'); onClose(); }} style={styles.menuItem}>
        <Ionicons name="home-outline" size={24} color="#4C6EF5" />
        <Text style={styles.menuText}>Profile</Text>
      </TouchableOpacity>

      {/* <TouchableOpacity onPress={() => { router.push('/chat'); onClose(); }} style={styles.menuItem}>
        <Ionicons name="logo-octocat" size={24} color="#4C6EF5" />
        <Text style={styles.menuText}>ChatBot</Text>
      </TouchableOpacity> */}
      
      <TouchableOpacity onPress={handleLogout} style={styles.menuItem}>
        <Ionicons name="log-out-outline" size={24} color="#FF5733" />
        <Text style={styles.menuText}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sidebar: {
    position: 'absolute',
    top: 0,
    right: 0, // This aligns the sidebar to the right of the screen
    height: '100%',
    width: '70%', // Adjusted width for a more balanced look
    backgroundColor: '#fff',
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    zIndex: 999, // Ensure sidebar appears above other content
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4C6EF5',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    marginBottom: 10, // Space between items
    borderRadius: 8,
    backgroundColor: '#f4f4f4',
  },
  menuText: {
    fontSize: 18,
    paddingLeft: 15, // Space between icon and text
    color: '#333',
  },
});

export default Sidebar;
