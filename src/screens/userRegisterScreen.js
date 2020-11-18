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
        Alert.alert('Something wrong');
      } else {
        this.props.addUser(
          this.state.username,
          this.state.email,
          this.state.password,
        );
        Alert.alert('Regsitracija sėkminga.');
      }
    };
  
    render() {
      return (
        <View>
          <View style={styles.inputContainer}>
            <Text style={styles.title}>Username:</Text>
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
            <Text style={styles.title}>Email:</Text>
            <TextInput
              style={styles.input}
              value={this.state.email}
              placeholder="Įveskite emailą"
              onChangeText={(text) => this.emailChange(text)}
              secureTextEntry={false}
            />
          </View>
          {this.state.emailError ? (
            <View>
              <Text>Emailas negalimas</Text>
            </View>
          ) : null}
          <View style={styles.inputContainer}>
            <Text style={styles.title}>Password:</Text>
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
            <Text style={styles.title}>Confirm password:</Text>
            <TextInput
              style={styles.input}
              value={this.state.passwordConfirm}
              placeholder="Confirm your password"
              onChangeText={(text) => this.passwordConfirmChange(text)}
              secureTextEntry={true}
            />
          </View>
          {this.state.passwordConfirmError ? (
            <View>
              <Text>Password must match</Text>
            </View>
          ) : null}
          <CustomButton
            title="Register"
            onPress={() => this.handleSubmit()}
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
  });
  
  const mapStateToProps = (state) => {
    return {
      user: state.users,
    };
  };
  export default connect(mapStateToProps, {addUser})(userRegisterScreen);