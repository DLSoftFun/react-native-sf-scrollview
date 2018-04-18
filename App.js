/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import SFScrollView from "react-native-sf-scrollview";

export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
          <SFScrollView onLoadData={this.onLoad} onRefresh={this.onRefresh}/>
      </View>
    );
  }
  onLoad=()=>{

  }
  onRefresh=()=>{

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
