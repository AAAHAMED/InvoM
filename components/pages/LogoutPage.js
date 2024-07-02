import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { firebase } from '../../config';

const LogoutPage = ({ navigation }) => {
  const handleLogout = async () => {
    try {
      await firebase.auth().signOut();
      navigation.replace('Welcome');
    } catch (error) {
      console.error("Logout Error: ", error);
    }
  };

  useEffect(() => {
    handleLogout();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Logging out...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    color: '#333',
  },
});

export default LogoutPage;
