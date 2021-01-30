import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import Colors from '../../../services/colors';
import {ScreenSize} from '../../../services/config';

export const TextDisplay = () => {
  return (
    <ScrollView>
      <View>
        <View style={styles.rowView}>
          <Feather name="info" size={60} color={Colors.turkishSea} />
          <Text>This is the about screen</Text>
        </View>
      </View>
      <View style={styles.txtContainer}>
        <Text style={[styles.txtAlign, styles.txtWidth]}>
          The App was mainly designed to help in monitoring Study Time, but can
          be used for other things.
        </Text>
        <Text style={[styles.txtAlign, styles.txtWidth]}>
          This App reminds you to refresh when the timer ends or take a break
          and then get back to the tasks at hand.
        </Text>
        <View style={styles.rowView}>
          <Entypo name="bell" color={Colors.golden} size={60} />
          <Text style={[styles.txtAlign, styles.txtWidth]}>
            It uses the default notification sound for your phone and alerts you
            when the timer ends.
          </Text>
        </View>
        <View style={styles.rowView}>
          <FontAwesome name="check-square" color={Colors.blueSky} size={60} />
          <Text style={[styles.txtAlign, styles.txtWidth]}>
            There is a checklist section of the app that allows you to tick off
            tasks completed within that time limit.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  txtContainer: {
    width: ScreenSize.WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  txtAlign: {
    textAlign: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
  rowView: {
    paddingTop: 20,
    paddingBottom: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopColor: Colors.black,
    borderTopWidth: 1,
  },
  txtWidth: {
    width: 290,
  },
});
