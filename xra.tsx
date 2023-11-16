import { StyleSheet, Text, View, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import React, { useState, useEffect } from 'react';

export default function App() {
//  return (
//    <View style={styles.container}>
//      <Text style={{color: '#fff'}}>Open up App.js to start working on your app!</Text>
//      <StatusBar style="auto" />
//    </View>
//  );
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getBarcodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };
    getBarcodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert('Bar code with type ${type} and ${data} has been scanned!')
  };

  if (hasPermission === null) {
    return <text>Requesting for camera permission</text>;
  }
  if (hasPermission === false) {
    return <text>No access to camera</text>
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
      onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
      style={StyleSheet.absoluteFillObject}/>
      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  }
});