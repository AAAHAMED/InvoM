import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CustomPicker = ({ selectedValue, onValueChange, items }) => {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef(null);

  const showDropdown = () => {
    buttonRef.current.measure((fx, fy, width, height, px, py) => {
      setPosition({ top: py + height, left: px });
      setVisible(true);
    });
  };

  const hideDropdown = () => {
    setVisible(false);
  };

  const handleItemPress = (value) => {
    onValueChange(value);
    hideDropdown();
  };

  return (
    <View style={styles.pickerContainer}>
      <TouchableOpacity ref={buttonRef} style={styles.pickerButton} onPress={showDropdown}>
        <Text style={styles.pickerButtonText}>{selectedValue}</Text>
        <Ionicons name="chevron-down" size={20} color="#000" style={styles.pickerIcon} />
      </TouchableOpacity>

      <Modal transparent visible={visible} animationType="none">
        <TouchableOpacity style={styles.modalOverlay} onPress={hideDropdown}>
          <View style={[styles.modalContent, { top: position.top, left: position.left }]}>
            <FlatList
              data={items}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleItemPress(item.value)} style={styles.dropdownItem}>
                  <Text style={styles.dropdownItemText}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  pickerContainer: {
    width: '90%',
    marginTop: 10,
    marginBottom: 10,
  },
  pickerButton: {
    height: 50,
    borderWidth: 1,
    borderColor: '#FFD700',
    borderRadius: 25,
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingLeft: 15,
    paddingRight: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pickerButtonText: {
    fontSize: 16,
  },
  pickerIcon: {
    marginLeft: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    position: 'absolute',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 25,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 5,
    width: '90%',
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  dropdownItemText: {
    fontSize: 16,
  },
});

export default CustomPicker;
