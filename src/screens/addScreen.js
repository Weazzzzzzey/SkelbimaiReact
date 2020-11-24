import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Button,
} from "react-native";
import "react-native-gesture-handler";
import * as Random from "expo-random";
//import { addAd } from "../../store/actions/actions";
import { addAd } from "../../store/actions/advertisesAction";
import { connect } from "react-redux";
import AsyncStorage from "@react-native-community/async-storage";

class addScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      text: "",
      url: "",
      price: "",
      user: "",
      asyncStorageUserValue: "",
    };
    this.getDate();
  }

  handleSubmit = () => {
    this.props.addAd(
      this.state.title,
      this.state.text,
      this.state.url,
      this.state.price,
      this.state.asyncStorageUserValue
    );
    this.setState({ title: "", text: "", url: "", price: "" });
  };
  titleChange(title) {
    this.setState({ title });
  }
  textChange(text) {
    this.setState({ text });
  }
  urlChange(url) {
    this.setState({ url });
  }
  priceChange(price) {
    this.setState({ price });
  }

  getDate = async () => {
    try {
      const value = await AsyncStorage.getItem("tempusername");
      if (value != null) {
        this.setState({ asyncStorageUserValue: value });
        console.log(value + "---------------------------------------");
      }
    } catch (err) {
      console.log(err);
    }
  };

  logOut = async () => {
    try {
      await AsyncStorage.removeItem("tempusername");
      await AsyncStorage.removeItem("username");
      this.setState({ asyncStorageUserValue: "" });
      this.props.navigation.navigate("Login_page");
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <View style={styles.userNameView}>
            <Text style={styles.usernamest}>
              {this.state.asyncStorageUserValue}
            </Text>
          </View>
          <View style={styles.buttonView}>
            <Button
              style={{ borderRadius: 10 }}
              title="Atsijungti"
              onPress={() => {
                this.logOut();
              }}
            />
          </View>
        </View>

        <Text style={styles.title}>Pridėkite skelbimą!</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            value={this.state.title}
            placeholder="Antraštė"
            onChangeText={(text) => this.titleChange(text)}
          />
          <TextInput
            style={styles.input}
            value={this.state.text}
            placeholder="Skelbimas"
            onChangeText={(text) => this.textChange(text)}
          />
          <TextInput
            style={styles.input}
            value={this.state.url}
            placeholder="Nuoroda į nuotrauką"
            onChangeText={(text) => this.urlChange(text)}
          />
          <TextInput
            style={styles.input}
            value={this.state.price}
            placeholder="Kaina"
            onChangeText={(text) => this.priceChange(text)}
          />
        </View>
        <View style={styles.addButtonContainer}>
          <TouchableOpacity onPress={this.handleSubmit}>
            <View style={styles.addButton}>
              <Text style={styles.addButtonText}>Prideti</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
  },
  inputContainer: {
    backgroundColor: "#ffffff",
    borderTopColor: "#ededed",
    borderTopWidth: 1,
    flexDirection: "row",
    height: 40,
    width: 60,
  },
  buttonStyle: {
    borderRadius: 10,
  },
  inputWrapper: {
    flex: 5,
  },
  buttonView: {
    backgroundColor: "darkblue",
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center",
  },
  userNameView: {
    backgroundColor: "darkblue",
    flex: 0.7,
    justifyContent: "center",
  },
  input: {
    height: 44,
    padding: 7,
    backgroundColor: "#ededed",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 10,
    flex: 1,
    marginBottom: 5,
  },
  addButtonText: {
    fontSize: 24,
    lineHeight: 24,
  },
  usernamest: {
    paddingTop: 30,
    paddingBottom: 5,
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
  },
  addButton: {
    width: 120,
    height: 60,
    backgroundColor: "dodgerblue",
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  addButtonContainer: {
    flex: 4,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  title: {
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
});

const mapStateToProps = (state) => {
  return {
    advertisesdb: state.advertisesdb,
  };
};
export default connect(mapStateToProps, { addAd })(addScreen);
