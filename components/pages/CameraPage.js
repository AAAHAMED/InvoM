import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Camera } from 'expo-camera';

const CameraPage = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);

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
      Alert.alert('Photo Taken', `Photo saved at ${photo.uri}`);
    }
  };

  if (hasPermission === null) {
    return <View style={styles.loadingContainer}><Text>Requesting Camera Permission...</Text></View>;
  }
  if (hasPermission === false) {
    return <View style={styles.errorContainer}><Text>No access to camera</Text></View>;
  }

  return (
    <View style={styles.container}>
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
});

export default CameraPage;
