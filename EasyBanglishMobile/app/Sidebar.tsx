// Sidebar.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons for icons
import AsyncStorage from '@react-native-async-storage/async-storage';

const Sidebar = ({ visible, onClose }) => {
  const router = useRouter();

  if (!visible) return null; // Don't render if not visible

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('data'); // Remove email from AsyncStorage
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
        <Ionicons name="home-outline" size={24} color="#FF6347" />
        <Text style={styles.menuText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLogout} style={styles.menuItem}>
        <Ionicons name="log-out-outline" size={24} color="#FF69B4" />
        <Text style={styles.menuText}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sidebar: {
    position: 'absolute',
    top: 0,
    right: 0,
    height: '100%',
    width: '75%',
    backgroundColor: 'white',
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  menuText: {
    fontSize: 18,
    paddingLeft: 10, // Space between icon and text
    color: 'gray',
  },
});

export default Sidebar;
