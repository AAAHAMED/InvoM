import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

const LoginSuccessPage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Image
          source={{ uri: 'https://example.com/success-icon.png' }} // Replace with your success icon URL
          style={styles.icon}
        />
      </View>
      <Text style={styles.title}>Success</Text>
      <Text style={styles.message}>You have successfully logged in!</Text>
      <Text style={styles.subMessage}>Welcome to our platform. You can now explore all the features.</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f9f9f9',
    padding: 20,
  },
  iconContainer: {
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 10,
    elevation: 5,
    marginBottom: 20,
  },
  icon: {
    width: 50,
    height: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  subMessage: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 40,
    elevation: 5,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
  },
});

export default LoginSuccessPage;
