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
  SafeAreaView,
  Image,
} from "react-native";
import "react-native-gesture-handler";
import { connect } from "react-redux";
//import { showAll } from "../../store/actions/actions";
import { showAll, showAllByUser} from "../../store/actions/advertisesAction";
import AsyncStorage from "@react-native-community/async-storage";
import CustomButton from "../components/customButton";

class showScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colorCheck: "dodgerblue",
      asyncStorageUserValue: "",
      rember: true,
    };
    this.getDate();
  }

  changeColorFun = () => {
    if (this.state.colorCheck == "dodgerblue") {
      this.setState({ colorCheck: "green" });
      this.setState({ rember: true });
      this.componentDidMount();
      console.log("Pakeista i zalia : true" + this.state.rember);
    } else {
      this.setState({ colorCheck: "dodgerblue" });
      this.setState({ rember: false });
      this.componentDidMount();
    }
  };

  componentDidMount() {
    if(this.state.rember == true){
      this.props.showAll();
    }
    else 
    {
      this.props.showAllByUser(this.state.asyncStorageUserValue);
    }
    
  }

  getDate = async () => {
    try {
      const value = await AsyncStorage.getItem("tempusername");
      if (value != null) {
        this.setState({ asyncStorageUserValue: value });
        console.log(value + "----------------SHow screen-----------------------");
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
    const { advertisesdb } = this.props;

    return (
      <SafeAreaView style= {{flex: 1}}>
      <Text style={styles.pertvara}></Text>
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

          <View style={styles.buttonViewFilter}>
            <Button title="Mano Skelbimai" 
            color={this.state.colorCheck}
            onPress={() => {this.changeColorFun()}}/>
          </View>

          <View style={styles.buttonView}>
            <Button title="Atsijungti" onPress={() => {
            this.logOut();
          }}/>
          </View>
        </View>
        <Text style={styles.title}>Skelbimai</Text>
        
        <ScrollView style={styles.advertiseContainer}>
          {advertisesdb.advertisesdb.map((advertise, index) => (
          
            <View style={styles.advertises} key={index}>
              <View style = {{flexDirection: 'row'}}>
              <View style = {{flex: 0.7}}>
              <Text style={styles.advert}>{advertise.title}</Text>
              <Text style={styles.text}>{advertise.advertisetext}</Text>
              <Text style={styles.text}>{ '€'+ advertise.price}</Text>
              </View>
              <View style = {styles.logoProps}>
              <Image
                  style={styles.tinyLogo}
                  source={{
                    uri: advertise.url,
                  }}
                />
                
              </View>
              
              </View>
              <Text style={styles.text, {fontWeight: "bold",}}>{advertise.username}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
      </SafeAreaView>
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
  tinyLogo: {
    width: 100,
    height: 100,
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
  logoProps: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: 'center',
  },
  buttonView: {
    backgroundColor: "darkblue",
    flex: 1,
    justifyContent: "center",
    alignItems: 'center',
  },
  buttonViewFilter: {
    backgroundColor: "darkblue",
    flex: 1.5,
    justifyContent: "center",
    alignItems: 'center',
  },
  userNameView: {
    backgroundColor: "darkblue",
    flex: 1,
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
    advertisesdb: state.advertisesdb,
  };
};
export default connect(mapStateToProps, { showAll, showAllByUser })(showScreen);
