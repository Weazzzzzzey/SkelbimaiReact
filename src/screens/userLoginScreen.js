import React, { Component } from "react";
import { View, Text, Alert } from "react-native";
import CustomTextInput from "../components/textInput";
import CustomButton from "../components/customButton";
import { TouchableOpacity } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { loginUser } from "../../store/actions/userAuthActions";

class userLoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
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
        //Alert.alert("OK");
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
