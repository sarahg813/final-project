import React from "react";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import UserBar from "./UserBar";
import LikeBar from "./LikeBar";

export default class Body extends React.Component {
  render() {
    const imageUri =
      "https://images.pexels.com/photos/1436134/pexels-photo-1436134.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=412";
    return (
      <View style={styles.body}>
        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.contentContainer}
        >
          <Image
            style={{ height: 412 }}
            source={{
              uri: imageUri
            }}
          />
          <View style={styles.userAndLike}>
            <UserBar />
            <LikeBar />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: "stretch",
    flexDirection: "column",
    justifyContent: "center"
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: "#fff"
  },
  userAndLike: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  }
});
