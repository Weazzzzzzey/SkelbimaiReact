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
//import { showAll, deleteAd } from "../../store/actions/actions";
import { showAll, removeAdvertise} from "../../store/actions/advertisesAction";
import AsyncStorage from "@react-native-community/async-storage";

class deleteScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      asyncStorageUserValue: "",
    };
    this.getDate();
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

  componentDidMount() {
    this.props.showAll();
  }

  render() {
    const { advertisesdb } = this.props;
    return (
      
      <View style={styles.container}>
        <Text style={styles.pertvara}></Text>
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
        <Text style={styles.title}>Skelbimų redagavimas</Text>
        <ScrollView style={styles.advertiseContainer}>
          {advertisesdb.advertisesdb.map((advertise, index) => (
            <View style={styles.advertises} key={index}>
              <View style={{ flex: 1, justifyContent: "center" }}>
                <Text style={styles.advert}>{advertise.title}</Text>
                
                <Text style={styles.advert}>{advertise.username}</Text>
              </View>
              <View style={styles.deleteButton}>
                <TouchableOpacity
                  onPress={() => this.props.removeAdvertise(advertise.id)}
                
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
  pertvara: {
    paddingTop: 2,
    paddingBottom: 3,
    
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
    advertisesdb: state.advertisesdb,
  };
};
export default connect(mapStateToProps, { showAll, removeAdvertise })(deleteScreen);
