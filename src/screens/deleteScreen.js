import React, { Component } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, } from "react-native";
import "react-native-gesture-handler";
import { connect } from "react-redux";
import { showAll, deleteAd } from "../../store/actions/actions";

class deleteScreen extends Component {
    componentDidMount() {
        this.props.showAll();
      }
    render() {
        const {advertises} = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Ištrinkite skelbimą!</Text>
        <ScrollView style={styles.advertiseContainer}>
          {advertises.advertises.map((advertise, index) => (
            <View style={styles.advertises} key={index}>
              <View style={{flex: 1, justifyContent: 'center'}}>
                <Text style={styles.advert}>
                  {advertise.title}
                </Text>
                <Text style={styles.advert}>
                  {advertise.text}
                </Text>
              </View>
              <View style={styles.deleteButton}>
                <TouchableOpacity onPress={() => this.props.deleteAd(advertise.adid)}>
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
