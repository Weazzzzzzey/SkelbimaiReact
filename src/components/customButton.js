import React from 'react';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';

const CustomButton = ({title, onPress, disabled, color}) => (
  <View style={styles.addButtonContainer}>
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <View style={styles.addButton} backgroundColor= {color}>
        <Text style={styles.addButtonText}>{title}</Text>
      </View>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  addButtonText: {
    fontSize: 22,
    lineHeight: 22,
    color: "dodgerblue",
  },
  addButton: {
    width: 125,
    height: 40,
    backgroundColor: 'darkblue',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    
  },
  addButtonContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});

export default CustomButton;
