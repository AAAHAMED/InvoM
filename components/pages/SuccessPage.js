import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../shared/styles';

const SuccessPage = ({ navigation }) => (
    <View style={styles.container}>
        <Text style={styles.title}>Photo Uploaded Successfully!</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
            <Text style={styles.buttonText}>Go to Home</Text>
        </TouchableOpacity>
    </View>
);

export default SuccessPage;
