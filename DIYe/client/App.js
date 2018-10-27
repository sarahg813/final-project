import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { ApolloProvider } from "react-apollo";
import { WebSocketLink } from "apollo-link-ws";
import { split } from "apollo-link";
import { getMainDefinition } from "apollo-utilities";
import { createUploadLink } from "apollo-upload-client";
import Header from "./components/Header";
import Body from "./components/Body";
import Login from "./components/Login/Login";
import UploadFile from "./components/UploadFile/UploadFile";

// Create an http link:
//const httpLink = new HttpLink({ uri: "http://localhost:4000/graphql" });
// don't need HttpLink if using createUploadLink
// https://stackoverflow.com/questions/49507035/how-to-use-apollo-link-http-with-apollo-upload-client
const httpLink = createUploadLink({ uri: "http://localhost:4000/graphql" });

// Create a WebSocket link:
const wsLink = new WebSocketLink({
  uri: "ws://localhost:4000/graphql",
  options: {
    reconnect: true
  }
});

// Authentication link:
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = _retrieveData("token");
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

export default class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <View style={styles.container}>
          <Login />
          <UploadFile />
          <Header />
          <Body />
        </View>
      </ApolloProvider>
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
