import React from "react";
import { View, Text, StyleSheet, FlatList, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const UserProfilePage = () => {
  const user = {
    name: "John Doe",
  };

  const savedPDFs = [
    "User Manual - EasyBanglish.pdf",
    "Bangla to Banglish Guide.pdf",
    "Introduction to React Native.pdf",
    "EasyBanglish Features Overview.pdf",
    "React Navigation Documentation.pdf",
    "Advanced React Native.pdf",
    "UI/UX Design Guide.pdf",
    "Mobile Development Best Practices.pdf",
    "App Security Guidelines.pdf",
  ];

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {/* User Icon and Name */}
      <View style={styles.profileContainer}>
        <View style={styles.iconContainer}>
          <Ionicons name="person-circle-outline" size={100} color="#4C6EF5" />
        </View>
        <Text style={styles.userName}>{user.name}</Text>
      </View>

      {/* Public Content Section */}
      <Text style={styles.sectionHeader}>Public Contents</Text>
      <View style={styles.pdfContainer}>
        {savedPDFs.map((pdf, index) => (
          <TouchableOpacity key={index} style={styles.pdfItem}>
            <Ionicons name="document-outline" size={40} color="#FF5733" />
            <Text style={styles.pdfText}>{pdf}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 20,
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
  pdfContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  pdfItem: {
    width: "48%",
    marginBottom: 20,
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  pdfText: {
    marginTop: 5,
    fontSize: 16,
    color: "#333",
  },
});

export default UserProfilePage;
