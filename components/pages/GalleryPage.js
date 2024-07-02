import React, { useState, useEffect } from 'react';
import { View, Image, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import CustomDropdown from '../components/CustomDropdown';
import { uploadInvoice } from '../uploading';

const GalleryPage = () => {
  const route = useRoute();
  const [image, setImage] = useState(null);
  const [invoiceId, setInvoiceId] = useState('');
  const [invoiceType, setInvoiceType] = useState('Type1');
  const [invoiceDirection, setInvoiceDirection] = useState('Incoming');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    if (route.params?.image) {
      console.log('Received image URI:', route.params.image); // Log to verify
      setImage(route.params.image);
    }
  }, [route.params?.image]);

  const onUpload = () => {
    const invoiceData = {
      invoiceId,
      invoiceType,
      invoiceDirection,
      date: date.toISOString(),
    };
    uploadInvoice(invoiceData, image);
  };

  const invoiceTypeItems = [
    { label: 'Type1', value: 'Type1' },
    { label: 'Type2', value: 'Type2' },
    // Add more options as needed
  ];

  const invoiceDirectionItems = [
    { label: 'Incoming', value: 'Incoming' },
    { label: 'Outgoing', value: 'Outgoing' },
  ];

  return (
    <View style={styles.container}>
      {image ? (
        <Image source={{ uri: image }} style={styles.imagePreview} />
      ) : (
        <Text>No image selected</Text>
      )}
      <TextInput
        style={styles.input}
        placeholder="Invoice ID"
        value={invoiceId}
        onChangeText={setInvoiceId}
      />
      <CustomDropdown
        selectedValue={invoiceType}
        onValueChange={setInvoiceType}
        items={invoiceTypeItems}
      />
      <CustomDropdown
        selectedValue={invoiceDirection}
        onValueChange={setInvoiceDirection}
        items={invoiceDirectionItems}
      />
      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateButton}>
        <Text style={styles.buttonText}>{date.toDateString()}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) {
              setDate(selectedDate);
            }
          }}
        />
      )}
      <TouchableOpacity onPress={onUpload} style={styles.button}>
        <Text style={styles.buttonText}>Upload</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  imagePreview: {
    width: '100%',
    height: 200,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  dateButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#ffa500',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default GalleryPage;
