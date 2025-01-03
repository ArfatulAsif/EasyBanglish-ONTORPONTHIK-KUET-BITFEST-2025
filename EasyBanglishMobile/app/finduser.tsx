import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, FlatList, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const FindUserPage = () => {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const router = useRouter();

  const dummyUsers = [
    "John Doe",
    "Jane Smith",
    "Alice Johnson",
    "Bob Brown",
    "Charlie Davis",
  ];

  const handleSearch = () => {
    if (searchText.trim() === "") {
      setSearchResults([]);
      return;
    }
    const filteredResults = dummyUsers.filter((user) =>
      user.toLowerCase().includes(searchText.toLowerCase())
    );
    setSearchResults(filteredResults);
  };

  const navigateToUserProfile = (userName) => {
    // Navigate to user profile page with the user's name (or id if you prefer)
    router.push(`/userpage`);
  };

  const renderUser = ({ item }) => (
    <TouchableOpacity
      style={styles.userContainer}
      onPress={() => navigateToUserProfile(item)}
    >
      <Ionicons name="person-circle" size={24} color="#4C6EF5" style={styles.userIcon} />
      <Text style={styles.userName}>{item}</Text>
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

      {/* FlatList handles the scrolling */}
      <FlatList
        data={searchResults}
        keyExtractor={(item, index) => index.toString()}
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
