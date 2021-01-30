import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Colors from '../../../../services/colors';
import {ScreenSize} from '../../../../services/config';

export const PresetTimes = ({preset_25, preset_30, preset_45}) => {
  return (
    <View>
      <Text style={[styles.textDisplay, {marginBottom: 20}]}>Presets</Text>
      <View style={styles.presetTimes}>
        <TouchableOpacity
          style={styles.lineSeparator}
          onPress={() => {
            preset_25();
          }}>
          <Text style={styles.touchable}>25 Mins</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.lineSeparator}
          onPress={() => {
            preset_30();
          }}>
          <Text style={styles.touchable}>30 Mins</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.lineSeparator}
          onPress={() => {
            preset_45();
          }}>
          <Text style={styles.touchable}>45 Mins</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  lineSeparator: {
    borderLeftColor: Colors.black,
    borderLeftWidth: 1,
    height: 50,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchable: {
    fontWeight: 'bold',
    color: Colors.pureWhite,
  },
  presetTimes: {
    width: ScreenSize.WIDTH,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 10,
    backgroundColor: Colors.turkishSea,
    height: 50,
  },
  textDisplay: {
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center',
    color: Colors.turkishSea,
    fontWeight: 'bold',
  },
});
