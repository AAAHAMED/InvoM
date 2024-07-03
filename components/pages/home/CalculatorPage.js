import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import styles from '../../styles/CalculatorPageStyles';

const buttons = [
  ['AC', '±', '%', '÷'],
  ['7', '8', '9', '×'],
  ['4', '5', '6', '-'],
  ['1', '2', '3', '+'],
  ['0', '.', '=']
];

const CalculatorPage = () => {
  const [display, setDisplay] = useState('');

  const handlePress = (button) => {
    if (button === 'AC') {
      setDisplay('');
    } else if (button === '=') {
      try {
        const result = eval(display.replace('×', '*').replace('÷', '/'));
        setDisplay(result.toString());
      } catch (error) {
        setDisplay('Error');
      }
    } else {
      setDisplay(display + button);
    }
  };

  return (
    <ImageBackground
      source={{ uri: 'https://img.freepik.com/free-vector/abstract-background-gradient-modern-design_677411-3112.jpg?t=st=1719899035~exp=1719902635~hmac=9870ed7e4e618acb0e1a9789bf6cc3cfb85d74f71672d814ff85b20f8bcd78ba&w=360' }} // Replace with your background image URL
      style={styles.background}
    >
      <View style={styles.calculatorContainer}>
        <Text style={styles.display}>{display}</Text>
        <View style={styles.buttonsContainer}>
          {buttons.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {row.map((button) => (
                <TouchableOpacity
                  key={button}
                  style={[
                    styles.button,
                    button === '0' ? styles.zeroButton : null,
                    ['÷', '×', '-', '+', '='].includes(button) ? styles.operatorButton : null
                  ]}
                  onPress={() => handlePress(button)}
                >
                  <Text style={styles.buttonText}>{button}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>
      </View>
    </ImageBackground>
  );
};

export default CalculatorPage;
