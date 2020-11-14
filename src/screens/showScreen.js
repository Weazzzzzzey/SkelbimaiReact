import React, {Component} from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity,} from 'react-native';
import 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {showAll} from '../../store/actions/actions';

class showScreen extends Component{
    componentDidMount() {
        this.props.showAll();
      }
    render() {
        const {advertises} = this.props;
        return (
        <View style={styles.container}>
            <Text style = {styles.title}>Peržiūrėkite skelbimus!</Text>
            <ScrollView style={styles.advertiseContainer}>
          {advertises.advertises.map((advertise, index) => (
            <View style={styles.advertises} key={index}>
              <Text style={styles.advert}>
                {advertise.title}
              </Text>
              <Text style={styles.text}>
                {advertise.text}
              </Text>
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
      borderTopColor: '#ddd',
      flex: 1,
    },
    advertises: {
      padding: 20,
      backgroundColor: '#ededed',
      borderColor: '#ddd',
      borderWidth: 1,
      borderRadius: 10,
      marginBottom: 5,
    },
    advert: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    text: {
      fontSize: 14,
      color: '#999',
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
  export default connect(mapStateToProps, {showAll})(showScreen);