import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList
} from 'react-native';
import {initUsers, addUser} from '../../db';
import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabase('advertises.db');
initUsers()
  .then(() => {
    console.log('Initialized database');
  })
  .catch(err => {
    console.log('Initializing db failed.');
    console.log(err);
  });
class DataBaseTestUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      advertiseData: [],
    };
  }
  componentDidMount() {
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM users', 
      [],
      (_,results) => {
        var temp=[];
        for (let i = 0; i < results.rows.length; ++i){
          console.log(results.rows.item(i));
          temp.push(results.rows.item(i));
        }
        this.setState({advertiseData: temp})
      }
      )
    })
  }
  userNameChange(username) {
    this.setState({username});
  }
  passwordChange(password) {
    this.setState({password});
  }



 handleSubmit = () => {
  db.transaction((tx) => {
    tx.executeSql('INSERT INTO users (username, password) VALUES (?, ?);', 
    [this.state.username, this.state.password],
    (_,results) => {
      console.log('Added', results.rowsAffected);
    }
    )
  })
 }
  render() {
    const renderItem = (itemData) => {
      return (
        <ScrollView style={styles.carsContainer}>
          <View style={styles.cars}>
            <Text style={styles.make}>
              {itemData.item.username} {itemData.item.password}
            </Text>
          </View>
        </ScrollView>
      )
    }
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Prideti skelbima i baze</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            value={this.state.username}
            placeholder="Userio Vardas"
            onChangeText={(text) => this.userNameChange(text)}
          />
          <TextInput
            style={styles.input}
            value={this.state.password}
            placeholder="Slaptazodis"
            onChangeText={(text) => this.passwordChange(text)}
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
    backgroundColor: '#ffffff',
    borderTopColor: '#ededed',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 40,
    width: 60,
  },
  inputWrapper: {
    flex: 2,
  },
  input: {
    height: 44,
    padding: 7,
    backgroundColor: '#ededed',
    borderColor: '#ddd',
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
    backgroundColor: '#6cc900',
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  addButtonContainer: {
    flex: 2,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  title: {
    paddingTop: 30,
    paddingBottom: 20,
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  carsContainer: {
    borderTopWidth: 3,
    borderTopColor: '#ddd',
    flex: 1,
  },
  cars: {
    padding: 20,
    backgroundColor: '#ededed',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 5,
  },
  make: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default DataBaseTestUsers;