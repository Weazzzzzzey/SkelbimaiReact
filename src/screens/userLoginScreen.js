import React, { Component } from "react";
import { View, Text, Alert, Button } from "react-native";
import CustomTextInput from "../components/textInput";
import CustomButton from "../components/customButton";
import { TouchableOpacity } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { loginUser } from "../../store/actions/userAuthActions";
import AsyncStorage from "@react-native-community/async-storage";
class userLoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
    super();
    this.state = {
      asyncStorageUserValue: "",
      colorCheck: "dodgerblue",
      rember: false,
    };
  }

  changeColorFun = () => {
    if (this.state.colorCheck == "dodgerblue") {
      this.setState({ colorCheck: "green" });
      this.setState({ rember: true });
      console.log("Pakeista i zalia : true" + this.state.rember);
    } else {
      this.setState({ colorCheck: "dodgerblue" });
      this.setState({ rember: false });
    }
  };

  saveLogedIn = async () => {
    try {
      this.setState({ asyncStorageUserValue: this.state.username });
      await AsyncStorage.setItem("username", this.state.asyncStorageUserValue);
    } catch (err) {
      console.log(err);
    }
  };

  getDate = async () => {
      try {
        const value = await AsyncStorage.getItem('username');
        if (value != null){
            console.log(value + "---------------------------------------");
        }
      }
      catch(err){
        console.log(err);
      }
  }
  usernameChange(username) {
    this.setState({ username });
  }
  passwordChange(password) {
    this.setState({ password });
  }

  handleSubmit = () => {
    this.props.loginUser(this.state.username, this.state.password, () => {
      console.log("Login " + this.props.login.isLoggedIn);
      if (this.props.login.isLoggedIn === true) {
        if(this.state.rember === true){
            this.saveLogedIn();
        }
        //Alert.alert("OK");
        this.getDate();
        this.props.navigation.navigate("PrivatePage");
      } else {
        Alert.alert("Wrong credentials");
      }
    });
  };

  render() {
    return (
      <View>
        <CustomTextInput
          title="Username"
          value={this.state.username}
          placeholder="Enter your username"
          onChangeText={(text) => this.usernameChange(text)}
        />
        <CustomTextInput
          title="Password"
          value={this.state.password}
          placeholder="Enter your password"
          onChangeText={(text) => this.passwordChange(text)}
          secureTextEntry={true}
        />
        <CustomButton title="Login" onPress={() => this.handleSubmit()} />
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Register_page")}
        >
          <Text>No account? Create one !!!</Text>
        </TouchableOpacity>
        
        <Button
          title="Įsiminti"
          color={this.state.colorCheck}
          onPress={() => {
            this.changeColorFun();
          }}/>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.users,
    login: state.login,
  };
};
export default connect(mapStateToProps, { loginUser })(userLoginScreen);
