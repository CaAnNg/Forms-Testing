import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: '5%', // Use percentage for margin
    alignSelf: 'center',
  },
  button: {
    marginBottom: '5%', // Use percentage for margin
    alignSelf: 'center',
  },
  textField: {
    height: '40%', // Use percentage for height
    fontSize: 20,
    borderWidth: 0,
    borderColor: 'gray',
    marginBottom: '5%', // Use percentage for margin
    paddingHorizontal: 10,
    width: '80%',
  },
  QRCode: {
    alignSelf: 'center',
    alignContent: 'center',
    flex: 1,
    marginHorizontal: '20%',
  },
  head: {
    height: 40,
    backgroundColor: '#f1f8ff',
  },
  text: {
    margin: 6,
    textAlign: 'center',
  },
  evenRow: {
    backgroundColor: '#edf6ff',
  },
  oddRow: {
    backgroundColor: '#ffffff',
  },
  selectedRow: {
    backgroundColor: '#ffcccb',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: '5%', // Adjust the margin as needed
  },
  removeButton: {
    backgroundColor: '#ff6961',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#ffffff',
  },
});
