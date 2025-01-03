import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, FlatList, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FindUserPage = () => {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const router = useRouter();

  const handleSearch = async () => {
    if (searchText.trim() === "") {
      setSearchResults([]);
      return;
    }

    const data = await AsyncStorage.getItem("data");
    const token = JSON.parse(data)?.token;

    if (!token) return;

    try {
      const response = await fetch(`http://192.168.14.51:8000/auth/search?token=${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: searchText }), 
      });
      const result = await response.json();
      setSearchResults(result.users); // Assuming the response contains the 'users' array
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const navigateToUserProfile = (userId, userName, item) => {
    // Navigate to user profile page with both user id and user name
    router.push(`/userpage?id=${userId}&name=${userName}`);
  };

  const renderUser = ({ item }) => (
    <TouchableOpacity
      style={styles.userContainer}
      onPress={() => navigateToUserProfile(item.id, item.name, item)} // Pass both id and name
    >
      <Ionicons name="person-circle" size={24} color="#4C6EF5" style={styles.userIcon} />
      <Text style={styles.userName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for a user..."
          placeholderTextColor="#aaa"
          value={searchText}
          onChangeText={setSearchText}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Ionicons name="search" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={searchResults}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderUser}
        contentContainerStyle={styles.resultsContainer}
        ListEmptyComponent={
          searchText ? (
            <Text style={styles.noResultsText}>No users found.</Text>
          ) : (
            <Text style={styles.noResultsText}>Start typing to search...</Text>
          )
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "#f9f9f9",
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: "#333",
  },
  searchButton: {
    backgroundColor: "#4C6EF5",
    padding: 10,
    borderRadius: 8,
    marginLeft: 5,
  },
  resultsContainer: {
    paddingVertical: 10,
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  userIcon: {
    marginRight: 10,
  },
  userName: {
    fontSize: 16,
    color: "#333",
  },
  noResultsText: {
    textAlign: "center",
    fontSize: 16,
    color: "#aaa",
    marginTop: 20,
  },
});

export default FindUserPage;
