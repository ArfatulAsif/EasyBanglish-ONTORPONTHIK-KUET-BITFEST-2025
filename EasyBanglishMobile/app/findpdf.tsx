import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, FlatList, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const FindPDFPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPDFs, setFilteredPDFs] = useState([]);
  
  const savedPDFs = [
    "User Manual - EasyBanglish.pdf",
    "Bangla to Banglish Guide.pdf",
    "Introduction to React Native.pdf",
    "EasyBanglish Features Overview.pdf",
    "React Navigation Documentation.pdf",
  ];

  const handleSearch = () => {
    const results = savedPDFs.filter(pdf =>
      pdf.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPDFs(results);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.input}
          placeholder="Search PDFs"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
          <Ionicons name="search" size={20} color="white" />
        </TouchableOpacity>
      </View>

      {filteredPDFs.length === 0 && searchQuery !== "" ? (
        <Text style={styles.noResults}>No PDFs found</Text>
      ) : (
        <>
          <Text style={styles.sectionHeader}>Public Contents Search</Text>
          <View style={styles.pdfContainer}>
            {filteredPDFs.map((pdf, index) => (
              <View key={index} style={styles.pdfItem}>
                <Ionicons name="document-outline" size={40} color="#FF5733" />
                <Text style={styles.pdfText}>{pdf}</Text>
              </View>
            ))}
          </View>
        </>
      )}
    </ScrollView>
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
    marginBottom: 20,
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
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  noResults: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
    marginTop: 20,
  },
  pdfContainer: {
    flexDirection: "column",
  },
  pdfItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    backgroundColor: "#fff",
  },
  pdfText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#333",
  },
});

export default FindPDFPage;
