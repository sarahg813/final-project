import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  Button,
  View,
  Image,
  TouchableOpacity
} from "react-native";
import { ImagePicker, Permissions } from "expo";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { ReactNativeFile } from "apollo-upload-client";

export const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!) {
    singleUpload(file: $file) {
      filename
    }
  }
`;

export default class UploadFile extends React.Component {
  state = {
    image: null
  };

  askPermissionsAsync = async () => {
    await Permissions.askAsync(Permissions.CAMERA);
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    // you would probably do something to verify that permissions
    // are actually granted, but I'm skipping that for brevity
  };
  render() {
    let { file, image } = this.state;

    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Button
          title="Pick an image from camera roll"
          onPress={this._pickImage}
        />
        {image && (
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        )}
        <Mutation mutation={UPLOAD_FILE}>
          {uploadFile => (
            <Button
              title="Send"
              onPress={() => {
                uploadFile({ variables: { file } });
              }}
            />
          )}
        </Mutation>
      </View>
    );
  }
  _pickImage = async () => {
    await this.askPermissionsAsync();
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3]
    });

    console.log(result);

    if (!result.cancelled) {
      const file = new ReactNativeFile({
        uri: result.uri,
        name: "a.jpg",
        type: "image/jpeg"
      });
      this.setState({ file, image: result.uri });
    }
  };
}
