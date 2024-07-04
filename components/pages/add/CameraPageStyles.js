import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  header: {
    backgroundColor: '#ffa500',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    paddingVertical: 20,
    paddingHorizontal: 40,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    width: '90%',
    marginTop: 20,
  },
  headerText: {
    color: '#ffffff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  imagePreview: {
    width: '90%',
    height: 300,
    marginBottom: 20,
    borderRadius: 20,
    marginTop: 20,
  },
  input: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    paddingLeft: 15,
    paddingRight: 15,
    width: '90%',
    borderRadius: 25, // Rounded corners
    borderColor: '#FFD700', // Yellow border color
    backgroundColor: '#fff', // White background color
    color: '#333', // Dark grey text color
    fontSize: 16, // Text size
    shadowColor: '#000', // Shadow color
    shadowOpacity: 0.1, // Shadow opacity
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowRadius: 5, // Shadow radius
    elevation: 3, // Elevation for Android

  },
  pickerContainer: {
    width: '90%',
    marginTop: 10,
    marginBottom: 10,
  },
  pickerButton: {
    height: 50,
    borderWidth: 1,
    borderColor: '#FFD700',
    borderRadius: 25,
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingLeft: 15,
    paddingRight: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  pickerButtonText: {
    fontSize: 16,
  },
  modalContent: {
    position: 'absolute',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 25,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 5,
    width: '90%', // Make the modal content the same width as the inputs and buttons
  },
  picker: {
    width: '100%',
    height: 50,
  },
  button: {
    backgroundColor: '#ffa500',
    padding: 10,
    borderRadius: 25,
    margin: 10,
    width: '90%', // Make buttons consistent width with inputs and pickers
    alignItems: 'center', // Center the text horizontally
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    height: 50,
  },
  buttonText: {
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'red',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
