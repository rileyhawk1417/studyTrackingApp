/**
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {LogBox} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DrawerContents from './services/DrawerItems';
import AnimatedSplash from 'react-native-animated-splash-screen';

import {AboutScreen, CounterTabs, InfoScreen} from './src/screens';
import Colors from './services/colors';
import {ScreenSize} from './services/config';

const Drawer = createDrawerNavigator();

const DrawerContainer = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Study & Track"
        drawerContentOptions={{
          activeTintColor: Colors.pureLightBlue,
          inactiveTintColor: Colors.black,
          itemStyle: {borderRadius: 15},
        }}
        drawerContent={(props) => <DrawerContents {...props} />}>
        <Drawer.Screen
          name="Study & Track"
          component={CounterTabs}
          options={{
            drawerIcon: () => (
              <Fontisto
                name="stopwatch"
                size={24}
                color={Colors.pureLightBlue}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="About The Developer"
          component={AboutScreen}
          options={{
            drawerIcon: () => (
              <MaterialIcons
                name="face"
                size={24}
                color={Colors.pureLightBlue}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Info"
          component={InfoScreen}
          options={{
            drawerIcon: () => (
              <Feather name="info" size={24} color={Colors.pureLightBlue} />
            ),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

class App extends React.Component {
  state = {
    loaded: false,
    bgImage: false,
  };

  enableSplash = () => {
    this.setState({loaded: true, bgImage: false});
  };

  disableSplash = () => {
    this.setState({loaded: false, bgImage: true});
  };

  loadSplash = () => {
    setTimeout(() => {
      this.enableSplash();
    }, 3000);
    this.disableSplash();
  };

  componentDidMount() {
    this.loadSplash();
    LogBox.ignoreAllLogs();
  }

  render() {
    return (
      <AnimatedSplash
        translucent={true}
        isLoaded={this.state.loaded}
        logoImage={require('./assets/splashScreen/logo.png')}
        disableBackgroundImage={this.state.bgImage}
        logoHeight={400}
        logoWidth={400}>
        <DrawerContainer />
      </AnimatedSplash>
    );
  }
}

export default App;
