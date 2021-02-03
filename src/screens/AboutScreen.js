import React, {useCallback} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Linking,
  Alert,
} from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Colors from '../../services/colors';

const socialMedia = {
  instagram: 'https://instagram.com/seanrileyhawkins',
  website: 'https://sourcehub.freetzi.com',
  github: 'https://github.com/rileyhawk1417',
};

const OpenURL = ({url, children, styleProp}) => {
  const handlePress = useCallback(async () => {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Cant open link ${url}`);
    }
  }, [url]);

  return (
    <TouchableOpacity
      children={children}
      onPress={handlePress}
      style={styles.iconLink}
    />
  );
};

const About_Screen = () => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.centerTxt}>
          Hi my name is Sean and I am a front end developer.
        </Text>
        <Text style={styles.centerTxt}>
          I love to make hybrid apps for fun on the side as a hobby.
        </Text>
        <Text style={styles.centerTxt}>
          If you liked this app you might like my other work.
        </Text>
        <Text style={styles.centerTxt}>
          You can check me out on social media
        </Text>
      </View>
      <View style={styles.links}>
        <View style={styles.linkContainer}>
          <OpenURL url={socialMedia.github}>
            <Octicons name="octoface" size={24} color={Colors.black} />
            <Text>GitHub</Text>
          </OpenURL>
          <OpenURL url={socialMedia.website}>
            <Fontisto name="world-o" size={24} color={Colors.pureLightBlue} />
            <Text>My Website</Text>
          </OpenURL>
          <OpenURL url={socialMedia.instagram}>
            <FontAwesome name="instagram" size={24} color={Colors.raspberry} />
            <Text>Instagram</Text>
          </OpenURL>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerTxt: {
    textAlign: 'center',
    fontSize: 16,
    width: 200,
    marginBottom: 10,
  },
  iconLink: {
    width: 120,
    height: 50,
    marginTop: 5,
    marginBottom: 5,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default About_Screen;
