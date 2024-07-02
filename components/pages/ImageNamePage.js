import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import { firebase } from '../../config';
import * as FileSystem from 'expo-file-system';
import styles from '../shared/styles';

const ImageNamePage = ({ route, navigation }) => {
    const [imageName, setImageName] = useState('');
    const { image } = route.params;

    const uploadMedia = async () => {
        if (!imageName.trim()) {
            Alert.alert('Please enter a name for the image.');
            return;
        }

        try {
            const { uri } = await FileSystem.getInfoAsync(image);
            const blob = await new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.onload = () => {
                    resolve(xhr.response);
                };
                xhr.onerror = (e) => {
                    reject(new TypeError('Network request failed'));
                };
                xhr.responseType = 'blob';
                xhr.open('GET', uri, true);
                xhr.send(null);
            });

            const ref = firebase.storage().ref().child(imageName);
            await ref.put(blob);
            Alert.alert('Photo Uploaded!!!');
            navigation.navigate('Success');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.textInput}
                placeholder="Enter image name"
                placeholderTextColor="#999"
                value={imageName}
                onChangeText={setImageName}
            />
            <TouchableOpacity style={styles.button} onPress={uploadMedia}>
                <Text style={styles.buttonText}>Upload Image</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ImageNamePage;
