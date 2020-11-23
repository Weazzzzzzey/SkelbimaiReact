import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import {StyleSheet, Text, Image, View, Button, Dimensions, Animated, Easing, ImageBackground} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

const { width, height } = Dimensions.get("window");
const cloudWidth = 60;
const backgroundImage = {
  uri:
    "https://ths-onlineacademy.com/wp-content/uploads/2019/06/communication-small.jpg",
};

class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = {
      asyncStorageUserValue: "",
      fadeUsers: new Animated.Value(0),
      animatedValue: new Animated.Value(0),
    };
    this.handleSubmit();
  }

  fadeUsersIN = () => {
    Animated.timing(this.state.fadeUsers, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: false,
    }).start();
  };

  startAnimation = () => {
    this.state.animatedValue.setValue(0);
    Animated.timing(this.state.animatedValue, {
      toValue: 1,
      duration: 4000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(() => this.startAnimation());
  };

  handleSubmit = () => {
      this.fadeUsersIN();
      this.startAnimation();
      this.getDate();
      if(this.asyncStorageUserValue === ""){
        this.props.navigation.navigate("Login_page");
      } else {
        this.props.navigation.navigate("PrivatePage");
      }
    }

  getDate = async () => {
    try {
      const value = await AsyncStorage.getItem('username');
      if (value != null) {
        this.setState({ asyncStorageUserValue: value });
        console.log(value + "loading--++++-----------");
      }
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const toTheLeft = this.state.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [-cloudWidth * 3, width + cloudWidth * 3],
    });

    return (
      <ImageBackground source={backgroundImage} style={styles.image}>
        <View style ={styles.Alighn}>
          <Animated.Image
            style={[styles.shadow, { opacity: this.state.fadeUsers }]}
            source={require("../images/shadow.png")}
          />
          
        </View>
        <Button title="Animation" onPress={this.getDate} />
        <View style ={styles.Alighn}>
          <Animated.Image
            style={[styles.logo, { left: toTheLeft }]}
            source={require("../images/logo.png")}
          />
        </View>
      </ImageBackground>
    );
  }
}

export default Loading;

const styles = StyleSheet.create({
  logo: {
    width: 75,
    height: 75,
  },
  plane: {
    position: "absolute",
    width: cloudWidth * 1.3,
    height: cloudWidth * 1.3,
    top: height / 2 - cloudWidth,
    left: width / 2 - cloudWidth / 2,
  },
  shadow: {
    width: 300,
    height: 300,
  },
  image: {
    height: "100%",
    width: "100%",
    resizeMode: "cover",
  },
  Alighn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
