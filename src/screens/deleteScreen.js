import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Button,
} from "react-native";
import "react-native-gesture-handler";
import { connect } from "react-redux";
import { showAll, deleteAd } from "../../store/actions/actions";
import AsyncStorage from "@react-native-community/async-storage";

class deleteScreen extends Component {
  constructor() {
    super();
    this.state = {
      asyncStorageUserValue: "",
    };
    this.getDate();
  }

  getDate = async () => {
    try {
      const value = await AsyncStorage.getItem("username");
      if (value != null) {
        this.setState({ asyncStorageUserValue: value });
        console.log(value + "---------------------------------------");
      }
    } catch (err) {
      console.log(err);
    }
  };

  componentDidMount() {
    this.props.showAll();
  }

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
            <Button title="Atsijungti" />
          </View>
        </View>
        <Text style={styles.title}>Skelbimų trinimas</Text>
        <ScrollView style={styles.advertiseContainer}>
          {advertises.advertises.map((advertise, index) => (
            <View style={styles.advertises} key={index}>
              <View style={{ flex: 1, justifyContent: "center" }}>
                <Text style={styles.advert}>{advertise.title}</Text>
                <Text style={styles.advert}>{advertise.text}</Text>
              </View>
              <View style={styles.deleteButton}>
                <TouchableOpacity
                  onPress={() => this.props.deleteAd(advertise.adid)}
                >
                  <View style={styles.addButtonContainer}>
                    <Text style={styles.addButton}>Naikinti</Text>
                  </View>
                </TouchableOpacity>
              </View>
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
  advertiseContainer: {
    borderTopWidth: 3,
    borderTopColor: "#ddd",
  },
  advertises: {
    padding: 20,
    flexDirection: "row",
    backgroundColor: "#ededed",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 5,
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
  deleteButton: {
    flex: 1,
    alignItems: "flex-end",
  },
  addButton: {
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
  addButtonContainer: {
    width: 100,
    height: 50,
    backgroundColor: "tomato",
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
});

const mapStateToProps = (state) => {
  return {
    advertises: state.advertises,
  };
};
export default connect(mapStateToProps, { showAll, deleteAd })(deleteScreen);
