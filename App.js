import { StatusBar } from "expo-status-bar";
import React, { Component, useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import showScreen from "./src/screens/showScreen";
import deleteScreen from "./src/screens/deleteScreen";
import addScreen from "./src/screens/addScreen";
import databaseScreen from "./src/screens/dataBaseTest";
import { Provider } from "react-redux";
import { createStore } from "redux";
import combineReducers from "./store/reducers/index";
import {addAd} from './store/actions/actions';


const Tab = createBottomTabNavigator();
const store = createStore(combineReducers);

console.log('Before', store.getState());
store.dispatch(addAd('Sistema', 'Sveiki prisijungę prie Sistemos!', 0, 0));
store.dispatch(addAd('Taisyklės', 'Laikytis sistemos taisyklių!', 1, 0));

console.log('After', store.getState());

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Tab.Navigator
            initialRoute="showMainInformation"
            tabBarOptions={{ activeTintColor: "dodgerblue" }}
          >
            <Tab.Screen name="SHOW" component={showScreen} />
            <Tab.Screen name="ADD" component={addScreen} />
            <Tab.Screen name="DELETE" component={deleteScreen} />
            <Tab.Screen name="DATABASE" component={databaseScreen} />
          </Tab.Navigator>
          <StatusBar style="auto" />
        </NavigationContainer>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
