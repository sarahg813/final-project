import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Header from "./components/Header";
import Body from "./components/Body";

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Header />
        <Body />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "stretch",
    backgroundColor: "#fff"
  }
});
