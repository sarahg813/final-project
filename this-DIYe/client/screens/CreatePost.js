import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  View
} from "react-native";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

const CREATE_POST = gql`
  mutation CreatePost($caption: String!, $userID: Int!) {
    createPost(caption: $caption, userId: $userId) {
      _id
      author {
        _id
        name
      }
      caption
    }
  }
`;

const POST_QUERY = gql`
  query {
    post {
      _id
      caption
    }
  }
`;

export default class CreatePost extends React.Component {
  state = {
    caption: ""
  };

  render() {
    const caption = this.state;
    return (
      <Mutation mutation={CREATE_POST}>
        {(mutateFunc, { data }) => {
          return (
            <View>
              <Text>Caption</Text>
              <TextInput
                style={{ height: 40, backgroundColor: "white" }}
                value={caption}
                onChangeText={caption => this.setState({ caption })}
              />
              <Button
                onPress={e => {
                  e.preventDefault();
                  mutateFunc({
                    variables: { caption }
                  });
                }}
                title="Send Message"
              />
            </View>
          );
        }}
      </Mutation>
    );
  }
}
