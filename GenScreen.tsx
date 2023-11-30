import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { styles } from './style';

const CustomTextInput = ({ name, placeholder, value, onChange }) => {
  return (
    <TextInput
      style={styles.textField}
      onChangeText={(text) => onChange(name, text)}
      value={value}
      placeholder={placeholder}
    />
  );
};


const GenScreen = () => {
  const [inputValues, setInputValues] = useState({
    data1: '',
    data2: '',
    data3: '',
  });

  const [generatedQRCode, setGeneratedQRCode] = useState(null); // Declare generatedQRCode

  const handleInputChange = (name, text) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      [name]: text,
    }));
  };

  const handleGenerateQRCode = () => {
    const combinedInput = `${inputValues.data1} ${inputValues.data2} ${inputValues.data3}`;
    setGeneratedQRCode(combinedInput);
  };

  return (
    <View style={styles.textField}>
      <CustomTextInput
        name="data1"
        value={inputValues.data1}
        placeholder="Input data 1"
        onChange={handleInputChange}
      />
      <CustomTextInput
        name="data2"
        value={inputValues.data2}
        placeholder="Input data 2"
        onChange={handleInputChange}
      />
      <CustomTextInput
        name="data3"
        value={inputValues.data3}
        placeholder="Input data 3"
        onChange={handleInputChange}
      />
      <Button title="Generate QR Code" onPress={handleGenerateQRCode} />

      {generatedQRCode && (
        <View style={styles.QRCode}>
          <QRCode value={generatedQRCode} size={200}/>
        </View>
      )}
    </View>
  );
};

export default GenScreen;
