import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet, ScrollView, ActivityIndicator, Linking } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const FindPDFPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPDFs, setFilteredPDFs] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    setFilteredPDFs([]); // Clear previous results
    try {
      const response = await fetch("http://192.168.14.51:8000/pdf/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: searchQuery }),
      });

      const responseData = await response.json();
      if (response.ok && responseData) {
        setFilteredPDFs(responseData);
      } else {
        console.error("Error fetching PDFs:", responseData.message || "Unknown error");
        setFilteredPDFs([]);
      }
    } catch (error) {
      console.error("Error during API call:", error);
      setFilteredPDFs([]);
    } finally {
      setLoading(false);
    }
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

      {loading ? (
        <ActivityIndicator size="large" color="#007bff" style={{ marginTop: 20 }} />
      ) : filteredPDFs.length === 0 && searchQuery !== "" ? (
        <Text style={styles.noResults}>No PDFs found</Text>
      ) : (
        <>
          <Text style={styles.sectionHeader}>Search Results</Text>
          <View style={styles.pdfContainer}>
            {filteredPDFs.map((pdf, index) => (
              <TouchableOpacity
                key={index}
                style={styles.pdfItem}
                onPress={() => {
                  const pdfLink = `http://192.168.14.51:8000/pdfs/${pdf.id}-${pdf.titleBangla}.pdf`;
                    Linking.openURL().catch((err) =>
                      console.error("Failed to open link:", err)
                    );
                  
                }}
              >
                <Ionicons name="document-outline" size={40} color="#FF5733" />
                <Text style={styles.pdfText}>{pdf.id} - {pdf.titleBangla}.pdf</Text>
              </TouchableOpacity>
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
    marginBottom: 10,
    borderRadius: 5,
    elevation: 2,
  },
  pdfText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#333",
    flexWrap: "wrap",
    flex: 1,
  },
});

export default FindPDFPage;
