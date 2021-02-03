import React from 'react';
import {View, StyleSheet} from 'react-native';
import {TextDisplay} from './InfoScreen/TextNarration';

const Info_Screen = () => {
  return (
    <View style={styles.container}>
      <TextDisplay />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});

export default Info_Screen;
