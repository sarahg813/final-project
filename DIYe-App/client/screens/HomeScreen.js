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
                    <View key={post._id}>
                      <Text>{post.author.name}</Text>
                      <Image
                        source={{
                          uri: post.imgUrl
                        }}
                        style={{ width: 350, height: 350 }}
                      />
                      <Text>{post.caption}</Text>
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
  developmentModeText: {
    marginBottom: 20,
    color: "rgba(0,0,0,0.4)",
    fontSize: 14,
    lineHeight: 19,
    textAlign: "center"
  },
  contentContainer: {
    paddingTop: 30
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20
  },
  search: {
    height: 40,
    borderColor: "black",
    borderWidth: 1
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: "contain",
    marginTop: 3,
    marginLeft: -10
  },
  getStartedContainer: {
    marginTop: 10,
    alignItems: "center",
    marginHorizontal: 50
  },
  homeScreenFilename: {
    marginVertical: 7
  },
  codeHighlightText: {
    color: "rgba(96,100,109, 0.8)"
  },
  codeHighlightContainer: {
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 3,
    paddingHorizontal: 4
  },
  getStartedText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    lineHeight: 24,
    textAlign: "center"
  },
  tabBarInfoContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      android: {
        elevation: 20
      }
    }),
    alignItems: "center",
    backgroundColor: "#fbfbfb",
    paddingVertical: 20
  },
  tabBarInfoText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    textAlign: "center"
  },
  navigationFilename: {
    marginTop: 5
  },
  helpContainer: {
    marginTop: 15,
    alignItems: "center"
  },
  helpLink: {
    paddingVertical: 15
  },
  helpLinkText: {
    fontSize: 14,
    color: "#2e78b7"
  }
});
