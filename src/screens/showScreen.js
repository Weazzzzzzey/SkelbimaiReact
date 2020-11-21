import { StatusBar } from "react-native";
import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Button,
} from "react-native";
import "react-native-gesture-handler";
import { connect } from "react-redux";
import { showAll } from "../../store/actions/actions";

import AsyncStorage from "@react-native-community/async-storage";

class showScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      asyncStorageUserValue: "",
    };
    this.getDate();
  }

  componentDidMount() {
    this.props.showAll();
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
      await AsyncStorage.removeItem('tempusername');
      await AsyncStorage.removeItem('username');
      this.setState({asyncStorageUserValue: ''});
      this.props.navigation.navigate("Login_page");
    } 
    catch (err) {
      console.log(err);
    }
  };

  render() {
    const { advertises } = this.props;

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
            <Button title="Atsijungti" onPress={() => {
            this.logOut();
          }}/>
          </View>
        </View>
        <Text style={styles.title}>Skelbimai</Text>
        <ScrollView style={styles.advertiseContainer}>
          {advertises.advertises.map((advertise, index) => (
            <View style={styles.advertises} key={index}>
              <Text style={styles.advert}>{advertise.title}</Text>
              <Text style={styles.text}>{advertise.text}</Text>
              <Text style={styles.text}>{advertise.adid}</Text>
              <Text style={styles.text}>{advertise.userid}</Text>
            </View>
          ))}
        </ScrollView>
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
  buttonView: {
    backgroundColor: "darkblue",
    flex: 0.3,
    justifyContent: "center",
    alignItems: 'center',
  },
  userNameView: {
    backgroundColor: "darkblue",
    flex: 0.7,
    justifyContent: "center",
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
    advertises: state.advertises,
  };
};
export default connect(mapStateToProps, { showAll })(showScreen);
