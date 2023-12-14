import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './style';

const QROptions = ({ navigation }) => {
  const CustomButton = ({ onPressOut = () => {}, title }) => {
    return (
      <TouchableOpacity
        onPressOut={onPressOut}
        style={{
          backgroundColor: '#3498db',
          padding: 10,
          margin: 10,
          borderRadius: 5,
        }}
      >
        <Text style={{ color: 'white' }}>{title}</Text>
      </TouchableOpacity>
    );
  };

  const navigateToGenScreen = () => {
    navigation.navigate('Gen'); // Navigate to the Gen screen
  };

  const navigateToScanScreen = () => {
    navigation.navigate('Scan'); // Navigate to the Scan screen
  };

  const navigateToFormScreen = () => {
    navigation.navigate('Form'); // Navigate to the Form screen
  };

  return (
    <View style={styles.container}>
      <CustomButton title="Scan a QR code" onPressOut={navigateToScanScreen} />
      <CustomButton title="Generate QR code" onPressOut={navigateToGenScreen} />
      <CustomButton title="Fill the forms" onPressOut={navigateToFormScreen} />
    </View>
  );
};

export default QROptions;
