/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableHighlight

} from 'react-native';
import api from '../api';
import Video from 'react-native-video';

class DemoPage extends React.Component {
  constructor() {
    super()
    this.state = {
      list: []
    };
  }
  componentWillMount() {
    api.post('/video/list').then((res) => {
      //console.log(res.list)
      this.setState({ list: res.list });
    })
  }
  goDetail(video) {
    console.log(11)
    //this.props.navigation.navigate('login')
    this.props.navigation.navigate('video', { video })
  }
  render() {
    console.log(this.state.list)
    return (
      <View style={{width:"100%",height:"100%"}}>
        <Text>dfdffd133311f</Text>
        <Text>dfdffd111f</Text>
      </View >
    );
  }
}

const styles = StyleSheet.create({
  fullScreen: {
    height: 300,
    width: 500,
    backgroundColor: "#ccc"
  }
})

export default DemoPage;
