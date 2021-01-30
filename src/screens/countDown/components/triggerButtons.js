import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Colors from '../../../../services/colors';
import {ScreenSize} from '../../../../services/config';

export class TriggerButtons extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.triggers}>
        {this.props.pauseCount ? (
          <TouchableOpacity
            style={[styles.buttons_widthIcons, styles.pause]}
            onPress={() => {
              this.props.pauseTimer();
            }}>
            <Text style={styles.touchable}>Pause Timer</Text>
            <AntDesign name="pausecircleo" size={30} color={Colors.pureWhite} />
          </TouchableOpacity>
        ) : (
          <Text />
        )}
        {this.props.pauseCount ? (
          <Text />
        ) : (
          <TouchableOpacity
            onPress={() => {
              this.props.pauseTimer();
              this.props.submit_Converted_Time();
            }}
            style={[styles.buttons_widthIcons, styles.start]}>
            <Text style={styles.touchable}>Start</Text>
            <AntDesign name="playcircleo" size={30} color={Colors.pureWhite} />
          </TouchableOpacity>
        )}
        {this.props.pauseCount ? (
          <TouchableOpacity
            style={[styles.buttons_widthIcons, styles.clear]}
            onPress={() => {
              this.props.clearTimeInput();
              this.props.reset_water_Drank();
              this.props.cancelNotifications();
            }}>
            <Text style={styles.touchable}>Stop Timer</Text>
            <FontAwesome5
              name="stop-circle"
              size={30}
              color={Colors.pureWhite}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.buttons_widthIcons, styles.clear]}
            onPress={() => {
              this.props.clearTimeInput();
              this.props.reset_water_Drank();
            }}>
            <Text style={styles.touchable}>Clear Time</Text>
            <FontAwesome5
              name="times-circle"
              size={30}
              color={Colors.pureWhite}
            />
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  triggers: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
    width: ScreenSize.WIDTH,
    marginTop: 100,
  },
  textDisplay: {
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center',
    color: Colors.turkishSea,
    fontWeight: 'bold',
  },
  touchable: {
    fontWeight: 'bold',
    color: Colors.pureWhite,
  },
  buttons_widthIcons: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
    width: 100,
    height: 50,
  },
  clear: {
    backgroundColor: Colors.raspberry,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderTopStartRadius: 20,
    borderBottomLeftRadius: 20,
    width: 150,
  },
  start: {
    borderTopRightRadius: 20,
    borderTopStartRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: Colors.turkishSea,
    width: 150,
  },
  pause: {
    borderTopRightRadius: 20,
    borderTopStartRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: Colors.blueSky,
    width: 150,
  },
});
