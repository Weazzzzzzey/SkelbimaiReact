import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//import {Provider} from 'react-redux';
//import {createStore} from 'redux';
//import * as Random from 'expo-random';

const Tab = createBottomTabNavigator();

class App extends Component {
  render(){
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working done!</Text>
        <StatusBar style="auto" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;