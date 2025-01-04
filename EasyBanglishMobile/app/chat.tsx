import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseUrl = "http://192.168.14.51:8000"; // Your base API URL

// Define the message type
interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

const ChatPage = () => {
  // Initialize the messages state with the correct type
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch chats on component mount
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          const response = await axios.get(`${baseUrl}/chat/chats?token=${token}`);
          setMessages(response?.data?.chats?.reverse() || []);
        }
      } catch (error) {
        console.error('Error fetching chats:', error);
      }
    };
    fetchChats();
  }, []);

  // Handle sending a new message
  const handleSendMessage = async () => {
    if (inputText.trim() === '') return; // Prevent sending empty messages
    setLoading(true);
    const token = await AsyncStorage.getItem('token');
    if (token) {
      try {
        // Send the user's message to the server
        const response = await axios.post(`${baseUrl}/chat/message?token=${token}`, {
          text: inputText,
        });

        // Check if the server returns messages properly
        if (response.data?.messages) {
          // Assuming response.data.messages contains the updated chat
          setMessages((prevMessages) => [
            ...prevMessages,
            { id: prevMessages.length + 1, text: inputText, sender: 'user' },
            ...response.data.messages,
          ]);
        } else {
          // In case the response doesn't contain messages, log it for debugging
          console.log('Error: Response does not contain messages', response.data);
        }

        setInputText(''); // Clear input field after sending
      } catch (error) {
        console.error('Error sending message:', error.response || error);
      } finally {
        setLoading(false);
      }
    }
  };

  // Clear the chat
  const clearChats = () => {
    setMessages([]);
  };

  const renderItem = ({ item }: { item: Message }) => {
    return (
      <View
        style={[
          styles.messageContainer,
          item.sender === 'user' ? styles.userMessage : styles.botMessage,
        ]}
      >
        <Text
          style={[
            styles.messageText,
            item.sender === 'user' ? styles.userText : styles.botText,
          ]}
        >
          {item.text}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="logo-reddit" size={35} color="#FFFFFF" />
        <Text style={styles.headerText}>Chat with Bot</Text>
        <TouchableOpacity style={styles.clearButton} onPress={clearChats}>
          <Ionicons name="close-circle" size={30} color="#fff" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.chatList}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.inputContainer}
      >
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText} // Ensure this is correctly updating the state
          placeholder="Type a message..."
          placeholderTextColor="#999"
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.pdfButton} onPress={() => {}}>
            <Ionicons name="receipt-outline" size={24} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
            <Ionicons name="send" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#4C6EF5',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
  },
  clearButton: {
    backgroundColor: '#FF4D4D',
    padding: 10,
    borderRadius: 25,
  },
  chatList: {
    paddingHorizontal: 10,
    paddingBottom: 80,
  },
  messageContainer: {
    marginBottom: 15,
    maxWidth: '80%',
    borderRadius: 15,
    padding: 10,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#4C6EF5',
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#f0f0f0',
  },
  messageText: {
    fontSize: 16,
    color: '#333',
  },
  userText: {
    color: '#fff',
  },
  botText: {
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  input: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 15,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pdfButton: {
    backgroundColor: '#4C6EF5',
    padding: 10,
    borderRadius: 20,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#4C6EF5',
    padding: 10,
    borderRadius: 20,
  },
});

export default ChatPage;
