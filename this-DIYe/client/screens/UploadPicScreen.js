import React, { Component } from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Constants, ImagePicker, Permissions } from "expo";

import gql from "graphql-tag";
import { Mutation } from "react-apollo";

const CREATE_POSTIMG = gql`
  mutation createPostImg($imgUrl: String!) {
    CreatePostImg(imgUrl: $imgUrl) {
      _id
      imgUrl
    }
  }
`;

export default class App extends Component {
  state = {
    image: null
  };

  askPermissionsAsync = async () => {
    await Permissions.askAsync(Permissions.CAMERA);
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    // you would probably do something to verify that permissions
    // are actually granted, but I'm skipping that for brevity
  };

  pickImage = async () => {
    await this.askPermissionsAsync();
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: true
    });

    if (!result.cancelled) {
      this.setState({ image: result.uri });

      let base64Img = `data:image/jpg;base64,${result.base64}`;

      //Add your cloud name
      let apiUrl = "https://api.cloudinary.com/v1_1/duuyxqnfi/image/upload";

      let data = {
        file: base64Img,
        upload_preset: "lhqpcomz"
      };

      fetch(apiUrl, {
        body: JSON.stringify(data),
        headers: {
          "content-type": "application/json"
        },
        method: "POST"
      })
        .then(async r => {
          let data = await r.json();
          console.log(data.secure_url);
          return data.secure_url;
        })
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Mutation mutation={CREATE_POSTIMG}>
        {(mutateFunc, { data }) => {
          return (
            <View style={styles.container}>
              <TouchableOpacity
                onPress={() => {
                  const url = this.pickImage();
                  mutateFunc({ variable: { url: url } });
                }}
                style={{ width: 200, alignSelf: "center" }}
              >
                <View style={{ backgroundColor: "transparent" }}>
                  {this.state.image ? (
                    <Image
                      source={{ uri: this.state.image }}
                      style={{
                        width: 200,
                        height: 200,
                        borderRadius: 100,
                        alignSelf: "center"
                      }}
                    />
                  ) : (
                    <View
                      style={{
                        backgroundColor: "grey",
                        width: 200,
                        height: 200,
                        borderRadius: 100
                      }}
                    />
                  )}
                </View>
              </TouchableOpacity>
            </View>
          );
        }}
      </Mutation>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1"
  }
});
