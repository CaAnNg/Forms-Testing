// GenScreen.tsx
import React, { useState } from 'react';
import { View, Button } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { styles } from './style';
import * as FileSystem from 'expo-file-system';

const GenScreen = () => {
  const [generatedQRCode, setGeneratedQRCode] = useState(null);

  const handleGenerateQRCode = async () => {
    // Read all CSV files in the document directory
    const documentDirectory = `${FileSystem.documentDirectory}`;
    const files = await FileSystem.readDirectoryAsync(documentDirectory);

    if (files.length > 0) {
      let combinedInput = '';
      for (const file of files) {
        if (file.startsWith('formData_') && file.endsWith('.csv')) {
          const filePath = `${documentDirectory}${file}`;
          const content = await FileSystem.readAsStringAsync(filePath);
          combinedInput += content + '\n';
        }
      }

      // Generate QR code from combined data
      setGeneratedQRCode(combinedInput.trim());
    }
  };

  return (
    <View style={styles.textField}>
      <Button title="Generate QR Code" onPress={handleGenerateQRCode} />

      {generatedQRCode && (
        <View style={styles.QRCode}>
          <QRCode value={generatedQRCode} size={200} />
        </View>
      )}
    </View>
  );
};

export default GenScreen;
