import React from 'react';
import {SafeAreaView, View, StyleSheet, Text} from 'react-native';
import {
  DrawerItem,
  DrawerItemList,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Octicons from 'react-native-vector-icons/Octicons';
import Colors from './colors';

const DrawerContents = (props) => {
  return (
    <SafeAreaView style={styles.drawerStyle}>
      <View style={styles.headerTxt}>
        <Octicons name="tasklist" size={24} color={Colors.pureWhite} />
        <Text
          style={{
            paddingTop: 20,
            paddingBottom: 20,
            fontWeight: 'bold',
            fontSize: 20,
            color: Colors.pureWhite,
          }}>
          Study Time Tracker
        </Text>
        <Octicons name="tasklist" size={24} color={Colors.pureWhite} />
      </View>
      <DrawerContentScrollView {...props} style={{paddingTop: 40}}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View style={styles.footerTxt}>
        <Text
          style={{paddingTop: 20, paddingBottom: 20, color: Colors.pureWhite}}>
          Made with React Native
        </Text>
        <Fontisto name="react" size={24} color={Colors.pureWhite} />
      </View>
    </SafeAreaView>
  );
};

export default DrawerContents;

const styles = StyleSheet.create({
  footerTxt: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginBottom: 30,
    borderTopWidth: 4,
    backgroundColor: Colors.pureLightBlue,
    borderRadius: 5,
  },
  headerTxt: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderBottomWidth: 4,
    backgroundColor: Colors.pureLightBlue,
    borderRadius: 5,
    marginTop: 30,
  },
  drawerStyle: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'flex-end',
    width: 280,
  },
});
