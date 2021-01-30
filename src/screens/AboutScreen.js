import React, {Component} from 'react';
import {View, StyleSheet, ImageBackground} from 'react-native';
import {ScreenSize} from '../../services/config';
import Colors from '../../services/colors';
import {TextDisplay} from './AboutScreen/TextNarration';

// const background = require('../../assets/splashScreen/web_hi_res_512.png');

class About_Screen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <TextDisplay />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    // alignItems: 'center',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});

export default About_Screen;
