import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default class LikeBar extends React.Component {
  render() {
    return (
      <View style={styles.likeBarContainer}>
        <Text>108</Text>
        <FontAwesome name="star" size={20} style={{ color: "gray" }} />
        <Text> 3</Text>
        <FontAwesome name="comment" size={20} style={{ color: "gray" }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  likeBarContainer: {
    height: 50,
    flexDirection: "row",
    marginHorizontal: 10,
    alignItems: "center"
  }
});
