import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#fff',
    height: 70,
    borderTopWidth: 0,
    elevation: 10,
    borderRadius: 20,
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    paddingBottom: 10,
  },
  icon: {
    marginBottom: -10,
    color:'black',
  },
  addIcon: {
    width: 80, // Increased size
    height: 80, // Increased size
    borderRadius: 40,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: -3,
  },
});

export default styles;
