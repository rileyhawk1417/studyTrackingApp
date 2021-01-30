import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Colors from '../../../../services/colors';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export class TimerEnd extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.close}>
          <TouchableOpacity onPress={this.props.closeModal}>
            <FontAwesome5 name="times" size={32} color={Colors.cherryTomato} />
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'column'}}>
          <Text style={styles.text}>You drank</Text>
          <Text style={styles.text}>{this.props.waterLeft}</Text>
          <Text style={[styles.text, {marginBottom: 50}]}>Cups Of Water</Text>
          <Text style={styles.subText}>Why not take a 5 Minute</Text>
          <Text style={[styles.subText, {marginBottom: 20}]}>
            break and walk around :)
          </Text>
          <Text style={styles.subText}>Check your todo list as well</Text>
          <Text style={styles.subText}>nows a good times to see</Text>
          <Text style={styles.subText}>what you have done :)</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: Colors.turkishSea,
    fontSize: 35,
    textAlign: 'center',
  },
  subText: {
    textAlign: 'center',
    // marginTop: ,
    fontSize: 20,
  },
  close: {
    color: Colors.cherryTomato,
    alignSelf: 'flex-end',
    marginTop: 80,
    marginBottom: 90,
    paddingRight: 50,
  },
});
