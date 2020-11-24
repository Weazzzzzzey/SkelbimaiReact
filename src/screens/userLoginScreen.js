import React, { Component } from "react";
import { View, Text, Alert, Button, StyleSheet } from "react-native";
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
      tempAsyncStorageUserValue: "",
      colorCheck: "darkblue",
      rember: false,
    };
  }

  changeColorFun = () => {
    if (this.state.colorCheck == "darkblue") {
      this.setState({ colorCheck: "green" });
      this.setState({ rember: true });
      console.log("Pakeista i zalia : true" + this.state.rember);
    } else {
      this.setState({ colorCheck: "darkblue" });
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

  tempLogedIn = async () => {
    try {
      this.setState({ tempAsyncStorageUserValue: this.state.username });
      await AsyncStorage.setItem(
        "tempusername",
        this.state.tempAsyncStorageUserValue,
        console.log('Prideta temp value' + this.tempAsyncStorageUserValue)
        );
    } catch (err) {
      console.log(err);
    }
  };

  getDate = async () => {
    try {
      const value = await AsyncStorage.getItem("tempusername");
      if (value != null) {
        console.log(value + "--------------------------Login-------------");
      }
    } catch (err) {
      console.log(err);
    }
  };
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
        this.tempLogedIn();
        if (this.state.rember === true) {
          this.saveLogedIn();
        }
        //Alert.alert("OK");
        this.getDate();
        this.props.navigation.navigate("PrivatePage");
        this.setState({username: "", password: ""});
      } else {
        Alert.alert("Neteisingi duomenys");
      }
    });
    
  };

  render() {
    return (
      <View>
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <View style={styles.userNameView}>
            <Text style={styles.usernamest}>
              
            </Text>
          </View>
          <View style={styles.userNameView}></View>
        </View>
        
        <Text style={styles.pradzia}></Text>

        <Text style={styles.title}>Prisijungimas</Text>
          
        <CustomTextInput
          title="Vartotojo vardas"
          value={this.state.username}
          placeholder="Įveskite vartotojo vardą"
          onChangeText={(text) => this.usernameChange(text)}
          secureTextEntry={false}
        />
        <CustomTextInput
          
          title="Slaptažodis"
          value={this.state.password}
          placeholder="Įveskite slaptažodį"
          underlineColorAndroid="transparent"
          secure={true}
          onChangeText={(text) => this.passwordChange(text)}
          
        />
        <Text style={styles.pertvara}></Text>

        <View
          style={{
            flexDirection: "row",
          }}
        >
          <View style={styles.buttonView}>
            <CustomButton color='darkblue' title="Prisijungti" onPress={() => this.handleSubmit()} />
          </View>

          <View style={styles.buttonView}>
            <CustomButton
              style={{color: 'black'}}
              title="Įsiminti"
              color={this.state.colorCheck}
              onPress={() => {
                this.changeColorFun();
              }}
            />
          </View>
        
          <View style={styles.buttonView}>
            <CustomButton color='darkblue' title="Registruotis" onPress={() => this.props.navigation.navigate("Register_page")} />
          </View>

        </View>
        <Text style={styles.pertvara}></Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container1: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  advertiseContainer: {
    borderTopWidth: 3,
    borderTopColor: "#ddd",
    flex: 1,
  },
  buttonContainer: {
    fontSize: 14,
    width: "90%",
    alignItems: 'baseline',
    marginVertical: 30,
  },
  buttonView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  userNameView: {
    backgroundColor: "darkblue",
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
  },
  advertises: {
    padding: 20,
    backgroundColor: "#ededed",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 5,
  },
  advert: {
    fontSize: 20,
    fontWeight: "bold",
  },
  text: {
    fontSize: 14,
    color: "#999",
  },
  title: {
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  pertvara: {
    paddingTop: 1,
    paddingBottom: 1,
    fontSize: 5,
    textAlign: "center",
    fontWeight: "bold",
  },
  pradzia: {
    paddingTop: 1,
    paddingBottom: 140,
    fontSize: 5,
    textAlign: "center",
    fontWeight: "bold",
  },
  usernamest: {
    paddingTop: 30,
    paddingBottom: 5,
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
  },
});

const mapStateToProps = (state) => {
  return {
    user: state.users,
    login: state.login,
  };
};
export default connect(mapStateToProps, { loginUser })(userLoginScreen);
