import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../shared/styles';

const WelcomePage = ({ navigation }) => {
    const slideAnim = useRef(new Animated.Value(500)).current; // Initial position for the animation

    useEffect(() => {
        Animated.timing(slideAnim, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, [slideAnim]);

    return (
        <ImageBackground 
            source={{ uri: 'https://img.freepik.com/free-photo/graphic-2d-colorful-wallpaper-with-grainy-gradients_23-2151001656.jpg?t=st=1719857949~exp=1719861549~hmac=724aab752a5792119f7d073923cacf9a9c76e5b24cc1c0730f77af428e0f0308&w=360' }} 
            style={styles.background}
        >
            <View style={styles.centeredContainer}>
                <Text style={styles.title}>Welcome to InvoM</Text>
            </View>
            <TouchableOpacity style={styles.arrowContainer} onPress={() => navigation.navigate('Login')}>
                <Animated.Text style={[styles.loginText, { transform: [{ translateX: slideAnim }] }]}>
                    Click to login
                </Animated.Text>
                <Ionicons name="arrow-forward-circle" size={64} color="#fff" />
            </TouchableOpacity>
        </ImageBackground>
    );
};

export default WelcomePage;
