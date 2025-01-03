import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ChatPage = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello! How can I assist you today?', sender: 'bot' },
    { id: 2, text: 'I am looking for help with my account.', sender: 'user' },
    { id: 3, text: 'Sure! I can help you with that. What exactly do you need assistance with?', sender: 'bot' },
    { id: 4, text: 'I forgot my password. Can you help me reset it?', sender: 'user' },
    { id: 5, text: 'I can assist with that. Please follow the instructions sent to your email.', sender: 'bot' },
  ]);
  const [inputText, setInputText] = useState('');
  const [isVoiceInput, setIsVoiceInput] = useState(false);  // State to handle voice input mode

  const handleSendMessage = () => {
    if (inputText.trim()) {
      const newMessage = { id: messages.length + 1, text: inputText, sender: 'user' };
      setMessages([...messages, newMessage]);
      setInputText('');
      
      // Simulate a bot response after user input
      setTimeout(() => {
        const botMessage = { id: messages.length + 2, text: 'I am a chatbot! How can I help you?', sender: 'bot' };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      }, 1000); // Simulate bot delay
    }
  };

  const handleVoiceInput = () => {
    setIsVoiceInput(!isVoiceInput); // Toggle voice input mode
    if (isVoiceInput) {
      setInputText(''); // Clear text input when switching back from voice input
    }
  };

  const clearChats = () => {
    // Add the chat clearing functionality later
    console.log("Chats cleared");
    setMessages([]);  // Clear all messages
  };

  const renderItem = ({ item }) => {
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
        {/* Circular Button to Clear Chats */}
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
            onChangeText={setInputText}
            placeholder="Type a message..."
            placeholderTextColor="#999"
          />
        

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.voiceButton} onPress={handleVoiceInput}>
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
    justifyContent: 'space-between',  // This will ensure the button is positioned to the right
  },
  headerText: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
  },
  clearButton: {
    backgroundColor: '#FF4D4D', // You can adjust the color as needed
    padding: 10,
    borderRadius: 25, // Circular button
  },
  chatList: {
    paddingHorizontal: 10,
    paddingBottom: 80, // Give space for the input field
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
  voiceButton: {
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
