import React, {Component} from 'react';
import {View, Text, Alert, StyleSheet, TextInput} from 'react-native';
import CustomButton from '../components/customButton';
import {connect} from 'react-redux';
import {addUser} from '../../store/actions/usersActions';
const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
);

class userRegisterScreen extends Component {
    constructor(props) {
      super(props);
      this.state = {
        username: '',
        email: '',
        password: '',
        passwordConfirm: '',
        usernameError: '',
        emailError: '',
        passwordError: '',
        passwordConfirmError: '',
      };
    }
    usernameChange(username) {
      if (username.length < 3) {
        this.setState({username});
        this.usernameErrorChange('Vartotojo vardas turi būti netrupesnis nei 3 siboliai!');
      } else {
        this.setState({username});
        this.usernameErrorChange(false);
      }
    }
    emailChange(email) {
      if (email.length <= 0 || !emailRegex.test(this.state.email)) {
        this.setState({email});
        this.emailErrorChange('Negalimas Emailas');
      } else {
        this.setState({email});
        this.emailErrorChange(false);
      }
    }
    passwordChange(password) {
      if (password.length < 3) {
        this.setState({password});
        this.passwordErrorChange('Slaptažodis turi būti netrupesnis nei 3 siboliai!');
      } else {
        this.setState({password});
        this.passwordErrorChange(false);
      }
    }
    passwordConfirmChange(passwordConfirm) {
      if (this.state.password !== passwordConfirm) {
        this.setState({passwordConfirm});
        this.passwordConfirmErrorChange('Slaptažodis nesutampa!');
      } else {
        this.setState({passwordConfirm});
        this.passwordConfirmErrorChange(false);
      }
    }
    usernameErrorChange = (text) => {
      this.setState({usernameError: text});
    };
    emailErrorChange = (text) => {
      this.setState({emailError: text});
    };
    passwordErrorChange = (text) => {
      this.setState({passwordError: text});
    };
    passwordConfirmErrorChange = (text) => {
      this.setState({passwordConfirmError: text});
    };
    handleSubmit = () => {
      if (
        this.state.usernameError !== false ||
        this.state.emailError !== false ||
        this.state.passwordError !== false ||
        this.state.passwordConfirmError !== false ||
        this.state.username.length < 1 ||
        this.state.password.length < 1
      ) {
        Alert.alert('Registracija nepavyko');
      } else {
        this.props.addUser(
          this.state.username,
          this.state.email,
          this.state.password,
        );
        Alert.alert('Regsitracija sėkminga.');
        this.props.navigation.navigate("Login_page");
        this.setState({user: "", email: "" ,password: "", passwordConfirm: "" });
      }
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

        <Text style={styles.title1}>Registracija</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.title}>Vartotojo vardas</Text>
            <TextInput
              style={styles.input}
              value={this.state.username}
              placeholder="Įveskite vartotojo vardą"
              onChangeText={(text) => this.usernameChange(text)}
              secureTextEntry={false}
            />
          </View>
          {this.state.usernameError ? (
            <View>
              <Text>Vartotojo vardas turi būti netrupesnis nei 3 siboliai!</Text>
            </View>
          ) : null}
          <View style={styles.inputContainer}>
            <Text style={styles.title}>El. paštas</Text>
            <TextInput
              style={styles.input}
              value={this.state.email}
              placeholder="Įveskite el. paštą"
              onChangeText={(text) => this.emailChange(text)}
              secureTextEntry={false}
            />
          </View>
          {this.state.emailError ? (
            <View>
              <Text>El. paštas negalimas</Text>
            </View>
          ) : null}
          <View style={styles.inputContainer}>
            <Text style={styles.title}>Slaptažodis</Text>
            <TextInput
              style={styles.input}
              value={this.state.password}
              placeholder="Įveskite slaptažodį"
              onChangeText={(text) => this.passwordChange(text)}
              secureTextEntry={true}
            />
          </View>
          {this.state.passwordError ? (
            <View>
              <Text>Slaptažodis turi būti netrupesnis nei 3 siboliai!</Text>
            </View>
          ) : null}
          <View style={styles.inputContainer}>
            <Text style={styles.title}>Slaptažodžio pativirtinimas</Text>
            <TextInput
              style={styles.input}
              value={this.state.passwordConfirm}
              placeholder="Pakartokite slaptažodį"
              onChangeText={(text) => this.passwordConfirmChange(text)}
              secureTextEntry={true}
            />
          </View>
          {this.state.passwordConfirmError ? (
            <View>
              <Text>Slaptažodis turi sutapti</Text>
            </View>
          ) : null}
          
          <Text style={styles.pertvara}></Text>
          
          <CustomButton
            color="darkblue"
            title="Registruotis"
            onPress={() => this.handleSubmit()}
            disabled={false}
          />
          <CustomButton
            title="Grįžti"
            onPress={() => this.props.navigation.navigate("Login_page")}
            disabled={false}
          />
        </View>
      );
    }
  }
  const styles = StyleSheet.create({
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
    inputContainer: {
      flexDirection: 'column',
      height: 80,
    },
    title: {
      paddingTop: 10,
      paddingBottom: 5,
      fontSize: 16,
      textAlign: 'left',
      fontWeight: 'bold',
    },
    title1: {
        paddingTop: 10,
        paddingBottom: 10,
        fontSize: 20,
        textAlign: "center",
        fontWeight: "bold",
      },
      userNameView: {
        backgroundColor: "darkblue",
        flex: 0.5,
        justifyContent: "center",
        alignItems: "center",
      },
      usernamest: {
        paddingTop: 30,
        paddingBottom: 5,
        fontSize: 16,
        textAlign: "center",
        fontWeight: "bold",
        color: "white",
      },
      pradzia: {
        paddingTop: 1,
        paddingBottom: 70,
        fontSize: 5,
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
  });
  
  const mapStateToProps = (state) => {
    return {
      user: state.users,
    };
  };
  export default connect(mapStateToProps, {addUser})(userRegisterScreen);