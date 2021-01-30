import React from 'react';
import {StyleSheet} from 'react-native';
import {StopWatch} from './screens/countDownReminder';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../services/colors';
import About_Screen from './screens/AboutScreen';
import TasksToDo from './screens/realmTaskList';
const Stack = createStackNavigator();
const BottomTabs = createBottomTabNavigator();

export const CountDownReminderTab = ({navigation}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Count Down Clock"
        component={StopWatch}
        options={{
          headerRight: () => (
            <FontAwesome
              name="bars"
              size={30}
              onPress={() => navigation.toggleDrawer()}
              style={styles.drawerIcon}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export const TasksScreen = ({navigation}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Task Checklist"
        component={TasksToDo}
        options={{
          headerRight: () => (
            <FontAwesome
              name="bars"
              size={30}
              onPress={() => navigation.toggleDrawer()}
              style={styles.drawerIcon}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export const AboutScreen = ({navigation}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="About Screen"
        component={About_Screen}
        options={{
          headerRight: () => (
            <FontAwesome
              name="bars"
              size={30}
              onPress={() => navigation.toggleDrawer()}
              style={styles.drawerIcon}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export const CounterTabs = () => {
  return (
    <BottomTabs.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Count Down Clock') {
            iconName = focused ? 'stopwatch-outline' : 'stopwatch';
          } else if (route.name === 'Task Checklist') {
            iconName = focused
              ? 'checkmark-done-circle-outline'
              : 'checkmark-done-circle';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: Colors.pureLightBlue,
        inactiveTintColor: Colors.black,
      }}>
      <BottomTabs.Screen
        name="Count Down Clock"
        component={CountDownReminderTab}
      />
      <BottomTabs.Screen name="Task Checklist" component={TasksScreen} />
    </BottomTabs.Navigator>
  );
};

const styles = StyleSheet.create({
  drawerIcon: {
    marginRight: 20,
  },
});
