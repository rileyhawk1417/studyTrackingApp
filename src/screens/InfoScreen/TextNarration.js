import React from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../../../services/colors';
import {ScreenSize} from '../../../services/config';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export const TextDisplay = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.txtContainer}>
        <Text style={[styles.txtAlign, styles.txtWidth]}>
          The App was mainly designed to help monitor the number of things
          completed while studying, but the app can be used for other things.
        </Text>
        <Text style={[styles.txtAlign, styles.txtWidth]}>
          When the timer ends it will let you know that you have to take a
          break.
        </Text>
        <View style={styles.rowView}>
          <MaterialCommunityIcons
            name="alarm-note"
            color={Colors.golden}
            size={45}
          />
          <Text style={[styles.txtAlign, styles.txtWidth]}>
            It uses the default notification sound for your phone and alerts you
            when the timer ends.
          </Text>
        </View>
        <View style={styles.rowView}>
          <Ionicons
            name="checkmark-circle-outline"
            color={Colors.blueSky}
            size={45}
          />
          <Text style={[styles.txtAlign, styles.txtWidth]}>
            There is a checklist section of the app that allows you to tick off
            tasks completed within that time limit. Even if you dont use the
            timer the checklist can still be used as a todo list.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopColor: Colors.pureLightBlue,
    borderTopWidth: 1,
  },
  txtWidth: {
    width: 210,
    fontSize: 18,
  },
});
