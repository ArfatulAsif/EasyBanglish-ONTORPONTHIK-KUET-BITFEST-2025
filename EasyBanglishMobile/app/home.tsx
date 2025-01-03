import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const HomeScreen = () => {
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const recentActivities = [
    { title: 'Exploring Nature', id: 1 },
    { title: 'A Day in the Life', id: 2 },
    { title: 'Understanding AI', id: 3 },
    { title: 'The Beauty of Rain', id: 4 },
    { title: 'A Journey to the Stars', id: 5 },
  ];

  const savedPDFs = [
    'Nature_Exploration.pdf',
    'Life_Journey.pdf',
    'AI_Tutorial.pdf',
    'Rain_Stories.pdf',
    'Star_Journey.pdf',
    'Random_Writings.pdf',
  ];

  const fetchUserData = async () => {
    try {
      const storedData = await AsyncStorage.getItem('data');
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
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Loading user data...</Text>
      </View>
    );
  }

  if (!userData) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorText}>No user data found. Please log in again.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.welcomeText}>Welcome, {userData.user.name}!</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => router.push('/finduser')}>
          <Ionicons name="people-circle-outline" size={24} color="#fff" />
          <Text style={styles.buttonText}>Find User</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => router.push('/findpdf')}>
          <Ionicons name="reader-outline" size={24} color="#fff" />
          <Text style={styles.buttonText}>Find PDFs</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionHeader}>Recent Activities</Text>
      <View style={styles.activitiesContainer}>
        {recentActivities.map((activity) => (
          <TouchableOpacity
            key={activity.id}
            style={styles.activityItem}
            onPress={() => router.push(`/write/${activity.id}`)}
          >
            <Ionicons name="document-text-outline" size={20} color="#4C6EF5" />
            <Text style={styles.activityText}>{activity.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.sectionHeader}>Saved Contents</Text>
      <View style={styles.pdfContainer}>
        {savedPDFs.map((pdf, index) => (
          <View key={index} style={styles.pdfItem}>
            <Ionicons name="document-outline" size={40} color="#FF5733" />
            <Text style={styles.pdfText}>{pdf}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = {
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 10,
    color: '#555',
  },
  errorText: {
    color: 'red',
  },
  scrollContainer: {
    padding: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#4C6EF5',
    padding: 15,
    borderRadius: 10,
    width: '48%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: '600',
    marginVertical: 10,
    textAlign: 'center',
  },
  activitiesContainer: {
    marginBottom: 30,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  activityText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#333',
  },
  pdfContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  pdfItem: {
    width: '48%',
    marginBottom: 20,
    alignItems: 'center',
  },
  pdfText: {
    textAlign: 'center',
    marginTop: 5,
    fontSize: 14,
  },
};

export default HomeScreen;
