import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

export default class ImageFeed extends React.Component {
  render() {
    const userImageUri =
      "https://images.pexels.com/photos/1006227/pexels-photo-1006227.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350";
    return (
      <View style={styles.userBar}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image style={styles.userImage} source={{ uri: userImageUri }} />
          <Text style={{ marginLeft: 10 }}> UserOne23 </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  userBar: {
    height: 50,
    flexDirection: "row",
    marginHorizontal: 10
  },
  userImage: {
    height: 35,
    width: 35,
    borderRadius: 20
  }
});
