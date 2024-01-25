// HomeScreen.tsx
import React from 'react';
import { View, Text, Button } from 'react-native';
import { styles } from './style';

const HomeScreen = ({ navigation }) => {
  const navigateToQRScreen = () => {
    navigation.navigate('QRO'); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>
      <Button title="Go to QR Screen" onPress={navigateToQRScreen} />
    </View>
  );
};

export default HomeScreen;
