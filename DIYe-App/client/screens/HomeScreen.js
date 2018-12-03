import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import Header from "../components/Header";
import { createStackNavigator } from "react-navigation";
import { WebBrowser } from "expo";
import { MonoText } from "../components/StyledText";
import gql from "graphql-tag";
import { Query } from "react-apollo";

const POSTS_QUERY = gql`
  query {
    posts {
      _id
      caption
      imgUrl
      author {
        name
      }
    }
  }
`;

const userImageUri =
  "https://powerpoint.crystalgraphics.com/template/cbxgbbffz_largest.jpg";

export default class HomeScreen extends React.Component {
  render() {
    return (
      <Query query={POSTS_QUERY}>
        {({ loading, data }) => {
          if (loading) return "Loading...";
          console.log(data.posts[0]);
          return (
            <View style={styles.container}>
              <Header />
              <ScrollView
                style={styles.scrollContainer}
                contentContainerStyle={styles.contentContainer}
              >
                {data.posts.map(post => {
                  return (
                    <View key={post._id} style={styles.postContainer}>
                      <View style={styles.userBar}>
                        <Image
                          style={styles.userImage}
                          source={{ uri: userImageUri }}
                        />
                        <Text style={{ fontWeight: "bold" }}>
                          {post.author.name}
                        </Text>
                      </View>
                      <Image
                        source={{
                          uri: post.imgUrl
                        }}
                        style={{ width: 405, height: 350 }}
                      />
                      <Text style={{ paddingTop: 5 }}>{post.caption}</Text>
                    </View>
                  );
                })}
              </ScrollView>
            </View>
          );
        }}
      </Query>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    flexDirection: "column",
    justifyContent: "center"
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: "#fff"
  },
  postContainer: {
    padding: 5
  },
  contentContainer: {
    justifyContent: "center"
  },
  userBar: {
    height: 50,
    flexDirection: "row",
    alignItems: "center"
  },
  userImage: {
    height: 35,
    width: 35,
    borderRadius: 20,
    marginRight: 5
  }
});
