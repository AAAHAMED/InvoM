import React, { useState, useEffect } from 'react';
import { View, Image, Text, TextInput, TouchableOpacity, Alert, SafeAreaView, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useIsFocused } from '@react-navigation/native';
import styles from './GalleryPageStyles.js'; // Import the separate stylesheet
import CustomPicker from './CustomPicker.js'; // Import the CustomPicker component

const GalleryPage = () => {
  const [image, setImage] = useState(null);
  const [imageId, setImageId] = useState('');
  const [type, setType] = useState('input');
  const [company, setCompany] = useState('cbl');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      openGallery();
    }
  }, [isFocused]);

  const openGallery = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('Permissions required', 'This app needs gallery permissions to work.');
      return;
    }
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1
    });
    if (!pickerResult.canceled && pickerResult.assets && pickerResult.assets.length > 0) {
      setImage(pickerResult.assets[0].uri);
    } else {
      Alert.alert('No image selected', 'You did not select any image.');
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
      name: `${imageId}.jpg` // Renaming the image file using the imageId
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
    })
    .catch(error => {
      Alert.alert('Upload Failed', 'An error occurred while uploading data.');
      console.error('Upload error:', error);
    });
  };
  
  const typeItems = [
    { label: 'Input', value: 'Input' },
    { label: 'Output', value: 'Output' },
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
            <Text style={styles.headerText}>Gallery</Text>
          </View>
        </View>
        <View style={styles.contentContainer}>
          {image ? (
            <>
              <Image source={{ uri: image }} style={styles.imagePreview} />
              <TouchableOpacity
                style={styles.closeButton}
                onPress={openGallery}
              >
                <Text style={styles.closeButtonText}>X</Text>
              </TouchableOpacity>
            </>
          ) : (
            <Text>No image selected</Text>
          )}
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
                setDate(selectedDate || date); // Keep old date if not changed
              }}
            />
          )}
          <TouchableOpacity onPress={uploadImage} style={styles.button}>
            <Text style={styles.buttonText}>Upload</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default GalleryPage;
