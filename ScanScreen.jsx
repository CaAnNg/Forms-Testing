// ScanScreen.tsx

import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { styles } from './style';
import * as FileSystem from 'expo-file-system';

const ScanScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  //function on barcode scam
  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);

    // Check if the scanned data is a CSV file
    if (data.includes('formData_') && data.endsWith('.csv')) {
      const csvData = await FileSystem.readAsStringAsync(data);
      const fileName = data.replace('formData_', '').replace('.csv', '');
      
      // Save the CSV file to the 'forms' folder
      const formsDirectory = `${FileSystem.documentDirectory}forms/`;
      await FileSystem.makeDirectoryAsync(formsDirectory, { intermediates: true });
      const formsFilePath = `${formsDirectory}${fileName}.csv`;
      await FileSystem.writeAsStringAsync(formsFilePath, csvData);

      alert(`CSV file "${fileName}" saved to "forms" folder!`);
    } else {
      alert(`Scanned data is not a valid CSV file.`);
    }
  };

  if (hasPermission === null) { //if permission, render
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) { //if no permission, render this instead
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
    </View>
  );
};

export default ScanScreen;
