import React from 'react';
import {View, TextInput, StyleSheet, Text} from 'react-native';

const CustomTextInput = ({value, onChangeText, placeholder, title, secure}) => (
  <View style={styles.inputContainer}>
    <Text style={styles.title}>{title}:</Text>
    <TextInput
      style={styles.input}
      value={value}
      placeholder={placeholder}
      onChangeText={onChangeText}
      secureTextEntry={secure}
    />
  </View>
);

export default CustomTextInput;

const styles = StyleSheet.create({
  input: {
    height: 44,
    padding: 7,
    backgroundColor: '#ededed',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    flex: 1,
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: 'column',
    height: 80,
  },
  title: {
    paddingTop: 10,
    paddingBottom: 5,
    fontSize: 16,
    textAlign: 'left',
    fontWeight: 'bold',
  },
});
