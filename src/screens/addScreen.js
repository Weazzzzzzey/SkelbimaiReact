import React, { Component } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity,} from "react-native";
import "react-native-gesture-handler";
import * as Random from "expo-random";
import { addAd } from "../../store/actions/actions";
import { connect } from "react-redux";

class addScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
          title: '',
          text: '',
        };
      }
      
      handleSubmit = () => {
        this.props.addAd(this.state.title, this.state.text, Random.getRandomBytes(1), 1);
        this.setState({title: '', text: ''});
      };
      titleChange(title) {
        this.setState({title});
      }
      textChange(text) {
        this.setState({text});
      }

  
    render() {
    return (
      <View style={styles.container}>
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
      backgroundColor: 'dodgerblue',
      marginLeft: 10,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
    },
    addButtonContainer: {
      flex: 4,
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
  });

const mapStateToProps = (state) => {
  return {
    advertises: state.advertises,
  };
};
export default connect(mapStateToProps, { addAd })(addScreen);
