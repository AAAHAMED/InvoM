import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  calculatorContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 0, 
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  display: {
    fontSize: 48,
    color: '#333',
    marginBottom: 20,
    textAlign: 'right',
    width: '100%',
    height:'10%',
    backgroundColor: '#fff',
    paddingRight: 20,
    paddingVertical: 10,
    borderRadius: 10,
    elevation: 3,
  },
  buttonsContainer: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  button: {
    width: (Dimensions.get('window').width - 60) / 4,
    height: (Dimensions.get('window').width - 60) / 4,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: (Dimensions.get('window').width - 40) / 8, 
    shadowColor: '#000',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    margin: 5,
  },
  zeroButton: {
    width: (Dimensions.get('window').width - 40) / 2 + 10, 
    borderRadius: (Dimensions.get('window').width - 40) / 8,
  },
  operatorButton: {
    backgroundColor: '#ffa500',
  },
  buttonText: {
    fontSize: 40,
    color: '#333',
  },
});

export default styles;
