import React, { useState, useEffect } from 'react';
import { View, Image, Text, TextInput, TouchableOpacity, Alert, SafeAreaView, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import Ionicons
import styles from './CameraPageStyles.js'; // Import the separate stylesheet
import CustomPicker from './CustomPicker.js'; // Import the CustomPicker component

const CameraPage = () => {
  const [image, setImage] = useState(null);
  const [imageId, setImageId] = useState('');
  const [type, setType] = useState('input');
  const [company, setCompany] = useState('cbl');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera permissions to make this work!');
      }
    })();
  }, []);

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    } else {
      Alert.alert('No photo taken', 'You did not take any photo.');
    }
  };

  const uploadImage = async () => {
    if (!image) {
      Alert.alert('Upload Failed', 'No image URI to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('imageId', imageId);
    formData.append('type', type);
    formData.append('company', company);
    formData.append('date', date.toISOString());
    formData.append('image', {
      uri: image,
      type: 'image/jpeg',
      name: `${imageId}.jpg`,
    });

    fetch('https://invom.online/submit.php', {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(response => response.json())
      .then(responseData => {
        console.log('Response:', responseData);
        Alert.alert('Upload', responseData.message);
        resetForm();
      })
      .catch(error => {
        Alert.alert('Upload Failed', 'An error occurred while uploading data.');
        console.error('Upload error:', error);
      });
  };

  const resetForm = () => {
    setImage(null);
    setImageId('');
    setType('INVOICE TYPE');
    setCompany('COMPANY');
    setDate(new Date());
  };

  const typeItems = [
    { label: 'Input', value: 'input' },
    { label: 'Output', value: 'output' },
  ];

  const companyItems = [
    { label: 'CBL', value: 'CBL' },
    { label: 'Elephant House', value: 'Elephant House' },
    { label: 'Link', value: 'Link' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContentContainer}>
        <View style={styles.headerContainer}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Camera </Text>
          </View>
        </View>
        <View style={styles.contentContainer}>
          {!image && (
            <TouchableOpacity style={styles.iconButton} onPress={takePhoto}>
              <Ionicons name="camera-outline" size={50} color="#000" />
            </TouchableOpacity>
          )}

          {image && (
            <>
              <Image source={{ uri: image }} style={styles.imagePreview} />
              <TouchableOpacity
                style={styles.closeButton}
                onPress={takePhoto}
              >
                <Text style={styles.closeButtonText}>X</Text>
              </TouchableOpacity>
              <TextInput
                style={styles.input}
                placeholder="Enter Image ID"
                value={imageId}
                onChangeText={setImageId}
              />
              <CustomPicker selectedValue={type} onValueChange={setType} items={typeItems} />
              <CustomPicker selectedValue={company} onValueChange={setCompany} items={companyItems} />
              <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.button}>
                <Text style={styles.buttonText}>Set Date ({date.toDateString()})</Text>
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={date}
                  mode="date"
                  display="default"
                  onChange={(event, selectedDate) => {
                    setShowDatePicker(false);
                    setDate(selectedDate || date);
                  }}
                />
              )}
              <TouchableOpacity onPress={uploadImage} style={styles.button}>
                <Text style={styles.buttonText}>Upload</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CameraPage;
