import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import WalletScreen from './src/screens/WalletScreen';
import ServiceList from './src/components/ServiceList';
import BookingScreen from './src/components/BookingScreen';
import Chat from './src/components/Chat';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { ThemeProvider } from './src/utils/theme'; // Import your custom theme if you have one

const Stack = createStackNavigator();

const App = () => {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <ThemeProvider>
          <NavigationContainer>
            <StatusBar barStyle="dark-content" />
            <Stack.Navigator initialRouteName="Home">
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Register" component={RegisterScreen} />
              <Stack.Screen name="Wallet" component={WalletScreen} />
              <Stack.Screen name="Services" component={ServiceList} />
              <Stack.Screen name="Booking" component={BookingScreen} />
              <Stack.Screen name="Chat" component={Chat} />
            </Stack.Navigator>
          </NavigationContainer>
        </ThemeProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
};

export default App;
