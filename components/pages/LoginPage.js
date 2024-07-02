import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert, Image, ImageBackground, Modal, StyleSheet } from 'react-native';
import { firebase } from '../../config';
import styles from '../styles/LoginPageStyles';

const LoginPage = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            setError('Please fill in both fields.');
            return;
        }
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password);
            setEmail('');
            setPassword('');
            setModalVisible(true);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleContinue = () => {
        setModalVisible(false);
        navigation.navigate('Home');
    };

    return (
        <ImageBackground 
            source={{ uri: 'https://img.freepik.com/free-photo/graphic-2d-colorful-wallpaper-with-grainy-gradients_23-2151001634.jpg?t=st=1719858268~exp=1719861868~hmac=f3bc2d883ebd12a880ac473850b6e31d13682149e9f842822e4d166391035409&w=360' }} 
            style={styles.background}
        >
            <View style={styles.container}>
                <Image 
                    source={{ uri: 'https://www.freepnglogos.com/uploads/google-logo-png/google-logo-dwglogo-19.png' }} 
                    style={styles.logo} 
                />
                <Text style={styles.title}>Welcome Back!</Text>
                {error ? <Text style={styles.errorText}>{error}</Text> : null}
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    onChangeText={setEmail}
                    value={email}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    placeholderTextColor="#999"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry
                    onChangeText={setPassword}
                    value={password}
                    placeholderTextColor="#999"
                />
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={modalStyles.centeredView}>
                    <View style={modalStyles.modalView}>
                        <View style={modalStyles.iconContainer}>
                            <Image
                                source={{ uri: 'https://png.pngtree.com/png-vector/20191113/ourmid/pngtree-green-check-mark-icon-flat-style-png-image_1986021.jpg' }} // Replace with your success icon URL
                                style={modalStyles.icon}
                            />
                        </View>
                        <Text style={modalStyles.title}>Success</Text>
                        <Text style={modalStyles.message}>You have successfully logged in!</Text>
                        <Text style={modalStyles.subMessage}>Welcome to our platform. You can now explore all the features.</Text>
                        <TouchableOpacity style={modalStyles.button} onPress={handleContinue}>
                            <Text style={modalStyles.buttonText}>Continue</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </ImageBackground>
    );
};

const modalStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
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

export default LoginPage;
