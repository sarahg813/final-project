import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default class Header extends React.Component {
  render() {
    return (
      <View style={styles.header}>
        <Text style={styles.header_text}>DIYe</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    width: 100 + "%",
    height: 60,
    paddingBottom: 5,
    backgroundColor: "#FFFBCD",
    display: "flex",
    justifyContent: "center"
  },
  header_text: {
    fontFamily: "Heiti TC",
    fontSize: 30,
    textAlign: "center"
  }
});
