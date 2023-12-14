// FormScreen.tsx
import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { styles } from './style';
import * as FileSystem from 'expo-file-system';

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

const FormScreen = () => {
  const [formData, setFormData] = useState({
    field1: '',
    field2: '',
    field3: '',
  });

  const handleInputChange = (name, text) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: text,
    }));
  };

  const handleSaveData = async () => {
    const combinedInput = `${formData.field1},${formData.field2},${formData.field3}`;
    const csvFilePath = `${FileSystem.documentDirectory}formData_${Date.now()}.csv`;
    alert(`Data saved!`);

    await FileSystem.writeAsStringAsync(csvFilePath, combinedInput, { encoding: FileSystem.EncodingType.UTF8 });
  };

  return (
    <View style={styles.textField}>
      <CustomTextInput name="field1" value={formData.field1} placeholder="Input field 1" onChange={handleInputChange} />
      <CustomTextInput name="field2" value={formData.field2} placeholder="Input field 2" onChange={handleInputChange} />
      <CustomTextInput name="field3" value={formData.field3} placeholder="Input field 3" onChange={handleInputChange} />
      <Button title="Save Data" onPress={handleSaveData} />
    </View>
  );
};

export default FormScreen;
