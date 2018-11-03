import React from "react";
import {
  Text,
  TextInput,
  Button,
  View,
  StyleSheet,
  TouchableOpacity,
  Image
} from "react-native";
import { Constants, ImagePicker, Permissions } from "expo";
import { createStackNavigator } from "react-navigation";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

const CREATE_POST = gql`
  mutation createPost($caption: String!, $imgUrl: String!) {
    createPost(caption: $caption, imgUrl: $imgUrl) {
      _id
      caption
      imgUrl
      author {
        name
      }
    }
  }
`;

export default class CreatePost extends React.Component {
  state = {
    caption: "",
    image: null,
    imgUrl: null
  };
  askPermissionsAsync = async () => {
    await Permissions.askAsync(Permissions.CAMERA);
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    // you would probably do something to verify that permissions
    // are actually granted, but I'm skipping that for brevity
  };

  pickImage = async cb => {
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
          let imgUrl = data.secure_url;
          cb(this.setState({ imgUrl }));
        })
        .catch(err => console.log(err));
    }
  };

  render() {
    const { caption, imgUrl } = this.state;
    return (
      <Mutation mutation={CREATE_POST}>
        {(mutateFunc, { data }) => {
          return (
            <View style={styles.container}>
              <View style={styles.imgContainer}>
                <TouchableOpacity
                  onPress={() => {
                    const url = this.pickImage(mutateFunc);
                    //mutateFunc({ variables: { imgUrl: "xxxx" } });
                    //console.log("end of mutatefunc");
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
                      variables: { caption, imgUrl }
                    }).then(this.props.navigation.navigate("Home"));
                  }}
                  title="Send Post"
                />
              </View>
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
    flexDirection: "column"
  },
  imgContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1"
  }
});
