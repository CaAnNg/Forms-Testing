import React, { useState, useEffect } from 'react';
import { View, Button, ScrollView, TouchableOpacity, Text } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { Table, Row, Rows } from 'react-native-table-component';
import * as FileSystem from 'expo-file-system';
import { useNavigation } from '@react-navigation/native';
import { styles } from './style';

const GenScreen = () => {
  const [generatedQRCode, setGeneratedQRCode] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const navigation = useNavigation();

  const handleGenerateQRCode = () => {
    // Combine data from the updated tableData
    let combinedInput = '';
    for (const rowData of tableData) {
      combinedInput += rowData.join(',') + '\n';
    }

    // Generate QR code from combined data
    setGeneratedQRCode(combinedInput.trim());
  };

  const handleRemoveRows = () => {
    // Filter out selected rows
    const filteredRows = tableData.filter((_, index) => !selectedRows.includes(index));
    setTableData(filteredRows);
    setSelectedRows([]);
  };

  const handleRowPress = rowIndex => {
    // Toggle selection of the row
    const updatedSelection = [...selectedRows];
    const index = updatedSelection.indexOf(rowIndex);

    if (index === -1) {
      // Add the row index to selection
      updatedSelection.push(rowIndex);
    } else {
      // Remove the row index from selection
      updatedSelection.splice(index, 1);
    }

    setSelectedRows(updatedSelection);
  };

  // Load table data on component mount
  useEffect(() => {
    const fetchData = async () => {
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

        // Set table data from combined input
        const rows = combinedInput.split('\n').map(row => row.split(','));
        setTableData(rows);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.textField}>
      <ScrollView>
        <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
          <Row data={['Column 1', 'Column 2', 'Column 3']} style={styles.head} textStyle={styles.text} />
          {tableData.map((rowData, rowIndex) => (
            <TouchableOpacity
              key={rowIndex}
              onPress={() => handleRowPress(rowIndex)}
              style={
                selectedRows.includes(rowIndex)
                  ? styles.selectedRow
                  : rowIndex % 2 === 0
                  ? styles.evenRow
                  : styles.oddRow
              }
            >
              <Rows data={[rowData]} textStyle={{}} />
            </TouchableOpacity>
          ))}
        </Table>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.removeButton}
          onPress={handleRemoveRows}
          disabled={selectedRows.length === 0}
        >
          <Text style={styles.buttonText}>Remove Selected Rows</Text>
        </TouchableOpacity>
        <Button title="Generate QR Code" onPress={handleGenerateQRCode} />
      </View>

      {generatedQRCode && (
        <View style={styles.QRCode}>
          <QRCode value={generatedQRCode} size={200} />
        </View>
      )}
    </View>
  );
};

export default GenScreen;
