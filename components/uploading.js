import * as ImagePicker from 'expo-image-picker';
import { firebase } from '../config';

export const openGallery = async (navigation) => {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== 'granted') {
    alert('Sorry, we need media library permissions to make this work!');
    return;
  }

  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: undefined, // Set aspect ratio to undefined for unrestricted cropping
    quality: 1,
  });

  console.log('Image Picker Result:', result); // Log the complete result object

  if (!result.canceled) {
    const imageUri = result.assets[0].uri;
    console.log('Image URI:', imageUri); // Log the image URI to verify
    navigation.navigate('GalleryPage', { image: imageUri });
  } else {
    console.log('Image picking was cancelled.');
  }
};

export const openCamera = async (navigation) => {
  const { status } = await ImagePicker.requestCameraPermissionsAsync();
  if (status !== 'granted') {
    alert('Sorry, we need camera permissions to make this work!');
    return;
  }

  let result = await ImagePicker.launchCameraAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [16, 9],
    quality: 1,
  });

  console.log('Camera Picker Result:', result); // Log the complete result object

  if (!result.canceled) {
    const imageUri = result.assets[0].uri;
    console.log('Image URI:', imageUri); // Log the image URI to verify
    navigation.navigate('CameraPage', { image: imageUri });
  } else {
    console.log('Image picking was cancelled.');
  }
};

export const uploadInvoice = async (invoiceData, imageUri) => {
  const { invoiceId, invoiceType, invoiceDirection, date } = invoiceData;

  try {
    console.log('Starting upload process...');
    console.log('Invoice Data:', invoiceData);
    console.log('Image URI:', imageUri);

    // Upload image to Firebase Storage
    const response = await fetch(imageUri);
    const blob = await response.blob();
    const storageRef = firebase.storage().ref().child(`invoices/${invoiceId}`);
    await storageRef.put(blob);

    // Get the image URL
    const imageUrl = await storageRef.getDownloadURL();
    console.log('Image uploaded to:', imageUrl);

    // Save invoice data to Firestore
    await firebase.firestore().collection('invoices').add({
      invoiceId,
      invoiceType,
      invoiceDirection,
      date,
      imageUrl,
    });

    alert('Invoice uploaded successfully!');
  } catch (error) {
    console.error('Error uploading invoice:', error);
    alert('Failed to upload invoice: ' + error.message);
  }
};
