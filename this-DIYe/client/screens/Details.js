import React from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';


export default class DetailScreen extends React.Component {
  static navigationOptions = {
    title: 'Detail',
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text>test</Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
