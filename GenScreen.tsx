import React, { useState, useEffect } from 'react';
import { View, Button, ScrollView, TouchableOpacity, Text } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { Table, Row, Rows } from 'react-native-table-component';
import * as FileSystem from 'expo-file-system';
import { styles } from './style';

const GenScreen = () => {
  const [generatedQRCode, setGeneratedQRCode] = useState(null);// useState: data that can change, generatedQRCode: will old value of generated QR code, setGeneratedQRCode function to change generatedQRCode
  const [tableData, setTableData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  const handleGenerateQRCode = () => {
    // Combine data from the updated tableData
    let combinedInput = '';
    for (const rowData of tableData) {
      combinedInput += rowData.join(',') + '\n'; //rowData: array, .join: literally what it means, \n: new line, +=: adds on?
    }
    // Generate QR code from combined data

    setGeneratedQRCode(combinedInput.trim()); // .trim: removes spaces, tabs, linebreaks
  };
  

  const handleRemoveRows = () => {
    // Filter out selected rows
    const filteredRows = tableData.filter((_, index) => !selectedRows.includes(index)); // selected rows is a new array?
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
      <ScrollView> //scrolls if doesn't fit
        <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
          <Row data={['Column 1', 'Column 2', 'Column 3']} style={styles.head} textStyle={styles.text} /> //header row with labels
          {tableData.map((rowData, rowIndex) => (
            <TouchableOpacity
              key={rowIndex}
              onPress={() => handleRowPress(rowIndex)}
              style={
                selectedRows.includes(rowIndex) //weird style things I don't get
                  ? styles.selectedRow
                  : rowIndex % 2 === 0
                  ? styles.evenRow
                  : styles.oddRow
              }
            >
              <Rows data={[rowData]} textStyle={styles.text} />
            </TouchableOpacity>
          ))}
        </Table>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.removeButton}
          onPress={handleRemoveRows}
          disabled={selectedRows.length === 0} //disables if no row is selected
        >
          <Text style={styles.buttonText}>Remove Selected Rows</Text>
        </TouchableOpacity>
        <Button title="Generate QR Code" onPress={handleGenerateQRCode} />
      </View>

      {generatedQRCode && (
        <View style={styles.QRCode}>
          <QRCode value={generatedQRCode} size={200} /> //renders qr code using generatedQRCode
        </View>
      )}
    </View>
  );
};

export default GenScreen;
