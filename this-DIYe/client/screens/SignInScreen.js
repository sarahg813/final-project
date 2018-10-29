import React from "react";
import {
  ActivityIndicator,
  AsyncStorage,
  Button,
  StatusBar,
  StyleSheet,
  View
} from "react-native";

import Login from "./Login";

export default class SignInScreen extends React.Component {
  static navigationOptions = {
    header: null,
    title: "Please sign in"
  };

  render() {
    return (
      <View style={styles.container}>
        <Login onSucceed={this._signInAsync}/>
      </View>
    );
  }
  //  <Button title="Sign in!" onPress={this._signInAsync} />

  _signInAsync = async () => {
    await AsyncStorage.setItem("userToken", "token");
    this.props.navigation.navigate("Main");
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
