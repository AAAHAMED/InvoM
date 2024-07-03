import React, { useState, useEffect } from 'react';
import { View, Image, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useIsFocused } from '@react-navigation/native';

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
  console.log(pickerResult); // Continue logging to debug
  if (!pickerResult.cancelled && pickerResult.assets && pickerResult.assets.length > 0) {
    const pickedImageUri = pickerResult.assets[0].uri;
    if (pickedImageUri) {
      setImage(pickedImageUri);
    } else {
      Alert.alert('Error', 'Failed to get image URI.');
    }
  } else {
    Alert.alert('No image selected', 'You did not select any image.');
  }
};


  const uploadImage = () => {
    if (!image) {
      Alert.alert('Upload Failed', 'No image URI to upload.');
      return;
    }
    Alert.alert('Upload', `Image ID: ${imageId}\nType: ${type}\nCompany: ${company}\nDate: ${date.toDateString()}\nImage URI: ${image}`);
  };

  return (
    <View style={styles.container}>
      {image ? (
        <Image source={{ uri: image }} style={styles.imagePreview} />
      ) : (
        <Text>No image selected</Text>
      )}
      <TextInput
        style={styles.input}
        placeholder="Enter Image ID"
        value={imageId}
        onChangeText={setImageId}
      />
      <Picker
        selectedValue={type}
        style={styles.picker}
        onValueChange={(itemValue) => setType(itemValue)}
      >
        <Picker.Item label="Input" value="input" />
        <Picker.Item label="Output" value="output" />
      </Picker>
      <Picker
        selectedValue={company}
        style={styles.picker}
        onValueChange={(itemValue) => setCompany(itemValue)}
      >
        <Picker.Item label="CBL" value="cbl" />
        <Picker.Item label="Elephant House" value="elephanthouse" />
        <Picker.Item label="Link" value="link" />
      </Picker>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  imagePreview: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: '80%',
  },
  picker: {
    width: '80%',
    height: 50,
  },
  button: {
    backgroundColor: '#ffa500',
    padding: 10,
    borderRadius: 5,
    margin: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  }
});

export default GalleryPage;
