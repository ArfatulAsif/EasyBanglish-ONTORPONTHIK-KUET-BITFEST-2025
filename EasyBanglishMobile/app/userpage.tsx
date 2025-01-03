import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native"; // Use useRoute from react-navigation
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Linking } from 'react-native';

const UserProfilePage = () => {
  const [pdfs, setPdfs] = useState([]);
  const [userName, setUserName] = useState(''); 
  const route = useRoute(); // Access the route params

  const { id, name } = route.params || {}; // Extract id and name from route params

  const nid = parseInt(id) 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataFromStorage = await AsyncStorage.getItem('data');
        const data = JSON.parse(dataFromStorage);

        if (!data || !nid) {
          console.log("No data found or no user ID passed");
          return;
        }

        const token = data.token;
        const userName = name || 'John Doe'; // Use 'name' from query params or fallback
        setUserName(userName);

        if (!token) {
          console.log("No token found");
          return;
        }

        const response = await fetch(`http://192.168.14.51:8000/pdf/users?userId=${nid}`);
        const responseData = await response.json();
        console.log(responseData)
        const publicPdfs = responseData.userPDFs?.filter(pdf => pdf.visibility === 'public') || [];
        
        setPdfs(publicPdfs);
      } catch (error) {
        console.error("Error fetching PDFs:", error);
      }
    };

    fetchData();
  }, [id, name]);

  const navigateToPdfView = (pdfId, titleBangla) => {
    const pdfLink = `http://192.168.14.51:8000/pdfs/${pdfId}-${titleBangla}.pdf`;
    // Navigate to the PDF link
    Linking.openURL(pdfLink).catch(err => console.error('Failed to open PDF link:', err));
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.iconContainer}>
          <Ionicons name="person-circle-outline" size={100} color="#4C6EF5" />
        </View>
        <Text style={styles.userName}>{userName ? userName : 'John Doe'}</Text>
      </View>

      <Text style={styles.sectionHeader}>Public Contents</Text>
      <FlatList
        data={pdfs}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.pdfItem}
            onPress={() => navigateToPdfView(item.id, item.titleBangla)}
          >
            <Ionicons name="document-outline" size={40} color="#FF5733" />
            <Text style={styles.pdfText}>
              {item.id}-{item.titleBangla}.pdf
            </Text>
          </TouchableOpacity>
        )}
        numColumns={2}
        contentContainerStyle={styles.pdfList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  iconContainer: {
    backgroundColor: "#E4E8F1",
    padding: 20,
    borderRadius: 50,
    marginBottom: 10,
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: "600",
    marginVertical: 10,
    textAlign: "center",
  },
  pdfList: {
    marginTop: 10,
    alignItems: "center",
  },
  pdfItem: {
        width: "90%", // Utilize more screen space
        marginBottom: 20,
        alignItems: "center",
        backgroundColor: "#fdfdfd",
        padding: 15, // Increase padding for better readability
        borderRadius: 8, // Slightly more rounded corners
        borderWidth: 0, // Remove borders for a cleaner look
        elevation: 3, // Adds shadow for Android
        shadowColor: "#000", // Adds shadow for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      pdfText: {
        marginTop: 5,
        fontSize: 18, // Slightly larger font for better visibility
        color: "#333",
        textAlign: "center", // Align text to center
        flexWrap: "wrap", // Ensure text wraps to new lines
        lineHeight: 22, // Improve readability
      },
      
});

export default UserProfilePage;
