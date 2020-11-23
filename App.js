import { StatusBar } from "expo-status-bar";
import React, { Component, useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {createStackNavigator} from '@react-navigation/stack';
import ReduxThunk from 'redux-thunk';
import showScreen from "./src/screens/showScreen";
import deleteScreen from "./src/screens/deleteScreen";
import addScreen from "./src/screens/addScreen";
import databaseScreen from "./src/screens/dataBaseTest";
import databaseUsersScreen from './src/screens/dataBaseTestUsers';
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import combineReducers from "./store/reducers/index";
import {addAd} from './store/actions/actions';
import loginScreen from './src/screens/userLoginScreen';
import loading from './src/screens/loading';
import registerScreen from './src/screens/userRegisterScreen';
import AsyncStorage from "@react-native-community/async-storage";
import { createUser } from "./db";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const store = createStore(combineReducers, applyMiddleware(ReduxThunk));

//console.log('Before', store.getState());
store.dispatch(addAd('Sistema', 'Sveiki prisijungę prie Sistemos!', 0, 0));
store.dispatch(addAd('Taisyklės', 'Laikytis sistemos taisyklių!', 1, 0));

//console.log('After', store.getState());


const PrivateContainer = () => {
    return (
          <Tab.Navigator
            initialRoute="showMainInformation"
            tabBarOptions={{ activeTintColor: "dodgerblue" }}
          >
            <Tab.Screen name="SHOW" component={showScreen} />
            <Tab.Screen name="ADD" component={addScreen} />
            <Tab.Screen name="DELETE" component={deleteScreen} />
            <Tab.Screen name="DATABASE" component={loading} />
          </Tab.Navigator>
    );
}


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Loading_Screen">
            <Stack.Screen
              name="Loading_Screen"
              component={loading}
              options={{title: 'Users Check Page', headerShown: false}}
            />
            <Stack.Screen
              name="Login_page"
              component={loginScreen}
              options={{title: 'Login page', headerShown: false}}
            />
            <Stack.Screen
              name="Register_page"
              component={registerScreen}
              options={{title: 'Register page', headerShown: false}}
            />
            <Stack.Screen
              name="PrivatePage"
              component={PrivateContainer}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
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
