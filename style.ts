// style.ts
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
    alignSelf: 'center'
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
    margin: '5%'
  }
});
