import React, { Component } from "react";
import {
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  AsyncStorage
} from "react-native";

import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { ApolloProvider } from "react-apollo";
import { WebSocketLink } from "apollo-link-ws";
import { split } from "apollo-link";
import { getMainDefinition } from "apollo-utilities";

import { AppLoading, Asset, Font, Icon } from "expo";
import AppNavigator from "./navigation/AppNavigator";

import { getToken } from "./auth";

// import SwitchNavigator from `Ω"../SwitchNavigator/SwitchNavigator";

// Create an http link:
const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql"
});

// Create a WebSocket link:
const wsLink = new WebSocketLink({
  uri: "ws://localhost:4000/graphql",
  options: {
    reconnect: true
  }
});

/// Authentication link:
const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = await getToken();
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  };
});

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  authLink.concat(httpLink)
);

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache()
});

const _retrieveData = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      // We have data!!
      console.log(value);
      return value;
    }
  } catch (error) {
    // Error retrieving data
  }
};

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        {Platform.OS === "ios" && <StatusBar barStyle="default" />}
        <ApolloProvider client={client}>
          <AppNavigator />
        </ApolloProvider>
      </View>
      // {/* <ApolloProvider client={client}> */}
      //   {/* <SwitchNavigator /> */}
      // </ApolloProvider>
    );
  }
}

// import React from 'react';
// import { Platform, StatusBar, StyleSheet, View } from 'react-native';
// import { AppLoading, Asset, Font, Icon } from 'expo';
// import AppNavigator from './navigation/AppNavigator';

// export default class App extends React.Component {
//   state = {
//     isLoadingComplete: false,
//   };

//   render() {
//     if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
//       return (
//         <AppLoading
//           startAsync={this._loadResourcesAsync}
//           onError={this._handleLoadingError}
//           onFinish={this._handleFinishLoading}
//         />
//       );
//     } else {
//       return (
//         <View style={styles.container}>
//           {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
//           <AppNavigator />
//         </View>
//       );
//     }
//   }

//   _loadResourcesAsync = async () => {
//     return Promise.all([
//       Asset.loadAsync([
//         require('./assets/images/robot-dev.png'),
//         require('./assets/images/robot-prod.png'),
//       ]),
//       Font.loadAsync({
//         // This is the font that we are using for our tab bar
//         ...Icon.Ionicons.font,
//         // We include SpaceMono because we use it in HomeScreen.js. Feel free
//         // to remove this if you are not using it in your app
//         'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
//       }),
//     ]);
//   };

//   _handleLoadingError = error => {
//     // In this case, you might want to report the error to your error
//     // reporting service, for example Sentry
//     console.warn(error);
//   };

//   _handleFinishLoading = () => {
//     this.setState({ isLoadingComplete: true });
//   };
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
