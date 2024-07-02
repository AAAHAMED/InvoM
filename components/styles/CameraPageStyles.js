import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { Camera } from 'expo-camera';
import * as FileSystem from 'expo-file-system';
import { storage } from '../../firebaseConfig';

const CameraPage = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (camera) {
      const photo = await camera.takePictureAsync();
      setPhoto(photo.uri);
      uploadImage(photo.uri);
    }
  };

  const uploadImage = async (uri) => {
    setUploading(true);
    const response = await fetch(uri);
    const blob = await response.blob();
    const ref = storage.ref().child(new Date().toISOString());
    ref.put(blob)
      .then(() => {
        setUploading(false);
        Alert.alert('Photo Uploaded', 'Your photo has been uploaded to Firebase');
      })
      .catch((error) => {
        setUploading(false);
        Alert.alert('Upload Error', error.message);
      });
  };

  if (hasPermission === null) {
    return <View style={styles.loadingContainer}><Text>Requesting Camera Permission...</Text></View>;
  }
  if (hasPermission === false) {
    return <View style={styles.errorContainer}><Text>No access to camera</Text></View>;
  }

  return (
    <View style={styles.container}>
      {uploading && (
        <View style={styles.uploadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Uploading...</Text>
        </View>
      )}
      {!uploading && (
        <>
          <Camera
            style={styles.camera}
            type={Camera.Constants.Type.back}
            ref={(ref) => setCamera(ref)}
          />
          <TouchableOpacity style={styles.button} onPress={takePicture}>
            <Text style={styles.buttonText}>Take Picture</Text>
          </TouchableOpacity>
          {photo && (
            <Text style={styles.photoText}>Photo saved at: {photo}</Text>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  button: {
    position: 'absolute',
    bottom: 20,
    backgroundColor: 'blue',
    padding: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  photoText: {
    position: 'absolute',
    bottom: 80,
    color: 'white',
    fontSize: 14,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CameraPage;
