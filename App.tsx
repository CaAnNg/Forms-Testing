// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import QROptions from './QROptions';
import GenScreen from './GenScreen';
import ScanScreen from './ScanScreen';
import { StyleSheet } from 'react-native';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="QRO" component={QROptions} />
        <Stack.Screen name="Gen" component={GenScreen} />
        <Stack.Screen name="Scan" component={ScanScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
