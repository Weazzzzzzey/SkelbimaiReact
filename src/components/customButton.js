import React from 'react';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';

const CustomButton = ({title, onPress, disabled}) => (
  <View style={styles.addButtonContainer}>
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <View style={styles.addButton}>
        <Text style={styles.addButtonText}>{title}</Text>
      </View>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  addButtonText: {
    fontSize: 22,
    lineHeight: 22,
  },
  addButton: {
    width: 120,
    height: 40,
    backgroundColor: '#e2e607',
    marginLeft: 10,
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
