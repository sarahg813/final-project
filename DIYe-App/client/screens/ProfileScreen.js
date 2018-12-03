import React from "react";
import { View } from "react-native";
import { Container, Text, Button, Content } from "native-base";
import Header from "../components/Header";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import { removeToken } from "../auth";
import { Query } from "react-apollo";

const USER_QUERY = gql`
  query {
    currentUser {
      name
      email
    }
  }
`;

class ProfileScreen extends React.Component {
  // handleLogout = () => {
  //   return this.props.screenProps.changeLoginState(false);
  // };
  _signOutAsync = async token => {
    await removeToken(token);
    this.props.navigation.navigate("Auth");
  };

  render() {
    return (
      <Query query={USER_QUERY}>
        {({ loading, data }) => {
          if (loading) return "Loading...";
          console.log(data.currentUser.name);

          return (
            <View>
              <Header />
              <Text>{data.currentUser.name}</Text>
              <Text>{data.currentUser.email}</Text>
              <Button full onPress={this._signOutAsync}>
                <Text>Log Out</Text>
              </Button>
            </View>
          );
        }}
      </Query>
    );
  }
}

export default ProfileScreen;
