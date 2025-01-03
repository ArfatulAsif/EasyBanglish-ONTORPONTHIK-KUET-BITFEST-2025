import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, FlatList, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const FindUserPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeUserId, setActiveUserId] = useState(null);  // State for tracking active user
  const router = useRouter();

  const users = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "James Bond" },
    { id: 4, name: "Emily Davis" },
  ];

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = () => {
    // Perform any search logic if needed
  };

  const navigateToUserProfile = (userId) => {
    router.push(`/userProfile/${userId}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.input}
          placeholder="Search Users"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
          <Ionicons name="search" size={20} color="white" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredUsers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.userItem,
              item.id === activeUserId && styles.activeUserItem,  // Add active style when clicked
            ]}
            onPress={() => {
              setActiveUserId(item.id);  // Set active user ID when clicked
              navigateToUserProfile(item.id);
            }}
            activeOpacity={0.6}  // Change opacity when pressed
          >
            <Ionicons name="person-circle" size={30} color="#000" />
            <Text style={styles.userName}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF",
    padding: 10,
  },
  searchBar: {
    flexDirection: "row",
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
  },
  searchButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#007bff",
    borderRadius: 5,
    marginLeft: 10,
    padding: 10,
  },
  userItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    backgroundColor: "#fff",  // Default background color
  },
  activeUserItem: {
    backgroundColor: "#dcdcdc",  // Light background color when clicked (active state)
  },
  userName: {
    marginLeft: 10,
    fontSize: 16,
    color: "#333",
  },
});

export default FindUserPage;
