import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import { init, addAdvertise } from "./../../db";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("advertises.db");
init()
  .then(() => {
    console.log("Initialized database");
  })
  .catch((err) => {
    console.log("Initializing db failed.");
    console.log(err);
  });
class DataBaseTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      advertisetext: "",
      username: "",
      userid: "",
      advertiseData: [],
    };
  }
  componentDidMount() {
    db.transaction((tx) => {
      tx.executeSql("SELECT * FROM advertises", [], (_, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i) {
          console.log(results.rows.item(i));
          temp.push(results.rows.item(i));
        }
        this.setState({ advertiseData: temp });
      });
    });
  }
  titleChange(title) {
    this.setState({ title });
    console.log(title);
  }
  advertiseTextChange(advertisetext) {
    this.setState({ advertisetext });
  }
  userNameChange(username) {
    this.setState({ username });
  }

  handleSubmit = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO advertises (title, advertisetext, username) VALUES (?, ?, ?);",
        [
          this.state.title,
          this.state.advertisetext,
          this.state.username,
        ],
        (_, results) => {
          console.log("Added", results.rowsAffected);
        }
      );
    });
  };
  render() {
    const renderItem = (itemData) => {
      return (
        <ScrollView style={styles.carsContainer}>
          <View style={styles.cars}>
            <Text style={styles.make}>
              {itemData.item.title} {itemData.item.advertisetext}
            </Text>
            <Text style={styles.make}>
              {itemData.item.username} {itemData.item.userid}
            </Text>
          </View>
        </ScrollView>
      );
    };
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Prideti skelbima i baze</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            value={this.state.title}
            placeholder="Antraste"
            onChangeText={(text) => this.titleChange(text)}
          />
          <TextInput
            style={styles.input}
            value={this.state.advertisetext}
            placeholder="Skelbimas"
            onChangeText={(text) => this.advertiseTextChange(text)}
          />
          <TextInput
            style={styles.input}
            value={this.state.username}
            placeholder="Vardas"
            onChangeText={(text) => this.userNameChange(text)}
          />
        </View>
        <View style={styles.addButtonContainer}>
          <TouchableOpacity onPress={this.handleSubmit}>
            <View style={styles.addButton}>
              <Text style={styles.addButtonText}>Prideti</Text>
            </View>
          </TouchableOpacity>
        </View>
        <FlatList
          data={this.state.advertiseData}
          renderItem={renderItem}
          keyExtractor={(item, index) => item.id.toString()}
          refreshing={true}
        />
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
  buttonView: {
    backgroundColor: "darkblue",
    flex: 0.3,
    justifyContent: "center",
  },
  userNameView: {
    backgroundColor: "darkblue",
    flex: 0.7,
    justifyContent: "center",
  },
  inputWrapper: {
    flex: 2,
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
  addButton: {
    width: 120,
    height: 60,
    backgroundColor: "#6cc900",
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  addButtonContainer: {
    flex: 2,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  title: {
    paddingTop: 30,
    paddingBottom: 20,
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  carsContainer: {
    borderTopWidth: 3,
    borderTopColor: "#ddd",
    flex: 1,
  },
  cars: {
    padding: 20,
    backgroundColor: "#ededed",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 5,
  },
  make: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default DataBaseTest;
