import { Stack } from "expo-router";
import { SafeAreaView } from "react-native";
import CustomHeader from './CustomHeader'; // Import the custom header
import { useState } from 'react';
import Sidebar from './Sidebar'; // Import the sidebar

export default function RootLayout() {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="signup" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        {/* <Stack.Screen name="home" options={{ headerShown: true }} /> */}
        <Stack.Screen name="splash" options={{ headerShown: false }} />
        {/* <Stack.Screen name="forgot" options={{ headerShown: false }} />
        <Stack.Screen name="validate" options={{ headerShown: false }} /> */}
        <Stack.Screen
          name="home"
          options={{
            header: () => (
              <CustomHeader onMenuPress={() => setSidebarVisible(true)} />
            ),
          }}
        />

        <Stack.Screen
          name="profile"
          options={{
            header: () => (
              <CustomHeader onMenuPress={() => setSidebarVisible(true)} />
            ),
          }}
        />

        <Stack.Screen
          name="chat"
          options={{
            header: () => (
              <CustomHeader onMenuPress={() => setSidebarVisible(true)} />
            ),
          }}
        />

        <Stack.Screen
          name="finduser"
          options={{
            header: () => (
              <CustomHeader onMenuPress={() => setSidebarVisible(true)} />
            ),
          }}
        />

      <Stack.Screen
          name="findpdf"
          options={{
            header: () => (
              <CustomHeader onMenuPress={() => setSidebarVisible(true)} />
            ),
          }}
        />

        <Stack.Screen
          name="userpage"
          options={{
            header: () => (
              <CustomHeader onMenuPress={() => setSidebarVisible(true)} />
            ),
          }}
        />

        {/* <Stack.Screen
          name="humidity"
          options={{
            header: () => (
              <CustomHeader onMenuPress={() => setSidebarVisible(true)} />
            ),
          }}
        />
        <Stack.Screen
          name="temperature"
          options={{
            header: () => (
              <CustomHeader onMenuPress={() => setSidebarVisible(true)} />
            ),
          }}
        />
        <Stack.Screen
          name="waterlevel"
          options={{
            header: () => (
              <CustomHeader onMenuPress={() => setSidebarVisible(true)} />
            ),
          }}
        />
        <Stack.Screen
          name="nutrition"
          options={{
            header: () => (
              <CustomHeader onMenuPress={() => setSidebarVisible(true)} />
            ),
          }}
        />
        <Stack.Screen
          name="ai"
          options={{
            header: () => (
              <CustomHeader onMenuPress={() => setSidebarVisible(true)} />
            ),
          }}
        />
        <Stack.Screen
          name="manage"
          options={{
            header: () => (
              <CustomHeader onMenuPress={() => setSidebarVisible(true)} />
            ),
          }}
        />
        <Stack.Screen
          name="profile"
          options={{
            header: () => (
              <CustomHeader onMenuPress={() => setSidebarVisible(true)} />
            ),
          }}
        /> */}
      </Stack>
      
      <Sidebar visible={sidebarVisible} onClose={() => setSidebarVisible(false)} />
    </SafeAreaView>
  );
}
