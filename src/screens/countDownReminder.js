import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
  Alert,
  Keyboard,
  Modal,
} from 'react-native';
import CountDown from 'react-native-countdown-component';
import Entypo from 'react-native-vector-icons/Entypo';
import Colors from '../../services/colors';
import HeaderTextDisplay from './countDown/components/mainHeader';
import {TimerEnd} from './countDown/components/timerEnd';
import {PresetTimes} from './countDown/components/presetTimes';
import {TriggerButtons} from './countDown/components/triggerButtons';
import NotifyService from '../../services/NotificationService';

let parseTxtAsNumber, multipliedTime;

export class StopWatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: '',
      pauseCountDown: false,
      waterDrank: 0,
      waterToDrink: 8,
      showEndMessage: false,
      hideKeyboard: false,
      showPresets: false,
      savedTime: 0,
      computedTime: 0,
    };

    this.notify = new NotifyService(
      this.onRegister.bind(this),
      this.onNotif.bind(this),
    );
  }

  onRegister(token) {
    this.setState({registerToken: token.token, fcmRegistered: true});
  }

  onNotif(notif) {
    Alert.alert(notif.title, notif.message);
  }

  handlePerm(perms) {
    Alert.alert('Permissions', JSON.stringify(perms));
  }

  parseKeyboardInput = (userInput) => {
    parseTxtAsNumber = parseInt(userInput, 10);
    multipliedTime = parseTxtAsNumber * 60;
    this.setState({
      time: multipliedTime,
      savedTime: multipliedTime,
    });
    console.log(multipliedTime);
  };

  submit_Converted_Time = () => {
    this.setState({
      time: 0,
      /*
       * This is to set the current value to 0.
       * It will clear the current entry,
       * but maintain the previous entry
       */
    });
    this.notify.scheduleNotification('', this.state.savedTime);
    this.textInput.clear();
    Keyboard.dismiss();
  };

  preset_25 = () => {
    this.setState({
      time: 1500,
    });
    this.notify.scheduleNotification('', 25);
  };

  preset_30 = () => {
    this.setState({
      time: 1800,
    });
    this.notify.scheduleNotification('', 30);
  };

  preset_45 = () => {
    this.setState({
      time: 2700,
    });
    this.notify.scheduleNotification('', 45);
  };

  pauseTimer = () => {
    if (this.state.pauseCountDown === false) {
      this.setState({
        pauseCountDown: true,
      });
    } else {
      this.setState({
        pauseCountDown: false,
      });
    }
  };

  clearTimeInput = () => {
    this.setState({
      time: '',
    });
    Keyboard.dismiss();
    this.textInput.clear();
    /*
     * An error occurs saying this.textInput.clear()
     * is not a function but it will still clear the previous entry.
     * This does not break the app.
     */
  };

  reduce_water_ToDrink = () => {
    this.setState({
      waterDrank: this.state.waterDrank + 1,
      waterToDrink: this.state.waterToDrink - 1,
      pauseCountDown: false,
      showEndMessage: true,
    });
    this.notifyEnd();
  };

  reset_water_Drank = () => {
    Alert.alert('you have cleared the water drinker');
    this.setState({
      showEndMessage: false,
      pauseCountDown: false,
      waterDrank: 0,
      waterToDrink: 8,
    });
  };

  notifyEnd = () => {
    this.notify.localNotify();
    Alert.alert('The timer has ended');
  };

  cancelNotification = () => {
    this.notify.cancelAll();
    this.notify.cancelNotification();
    this.notify.getScheduledLocalNotifications();
    this.setState({
      savedTime: 0,
    });
    Alert.alert('All Notifications are cancelled');
  };

  closeModal = () => {
    this.setState({showEndMessage: !this.state.showEndMessage});
  };

  hideKeyboard = () => {
    this.setState({hideKeyboard: !this.state.hideKeyboard});
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <Modal
            animationType="fade"
            visible={this.state.showEndMessage}
            onRequestClose={() => this.closeModal()}>
            <TimerEnd
              waterLeft={this.state.waterDrank}
              closeModal={() => this.closeModal()}
            />
          </Modal>
          <HeaderTextDisplay />
          <View>
            <TouchableOpacity onPress={() => this.closeModal()}>
              <Text style={styles.textDisplay}>
                How much Water did I drink?{' '}
                <Entypo name="cup" size={24} color={Colors.turkishSea} />
              </Text>
            </TouchableOpacity>
            <Text style={styles.textDisplay}>
              You are left with {this.state.waterToDrink} Cups to drink
            </Text>
            <View>
              <CountDown
                until={this.state.time}
                running={this.state.pauseCountDown}
                onFinish={() => {
                  this.reduce_water_ToDrink();
                }}
                onPress={() => {
                  this.hideKeyboard();
                }}
                digitStyle={styles.Clock}
                digitTxtStyle={styles.ClockText}
              />
              {this.state.hideKeyboard ? (
                <TextInput
                  style={styles.time_Input}
                  ref={(input) => {
                    this.textInput = input;
                  }}
                  placeholder="Enter The minutes for the Count Down"
                  onChangeText={this.parseKeyboardInput}
                  keyboardType="numeric"
                  onSubmitEditing={() => {
                    this.hideKeyboard();
                  }}
                />
              ) : (
                <Text />
              )}
            </View>
            <PresetTimes
              preset_25={() => this.preset_25()}
              preset_30={() => this.preset_30()}
              preset_45={() => this.preset_45()}
            />
            <TriggerButtons
              pauseCount={this.state.pauseCountDown}
              pauseTimer={() => this.pauseTimer()}
              submit_Converted_Time={() => this.submit_Converted_Time()}
              clearTimeInput={() => this.clearTimeInput()}
              cancelNotifications={() => this.cancelNotification()}
              reset_water_Drank={() => this.reset_water_Drank()}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    fontSize: 40,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  textDisplay: {
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center',
    color: Colors.turkishSea,
    fontWeight: 'bold',
  },
  time_Input: {
    alignSelf: 'center',
    borderBottomColor: Colors.black,
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  Clock: {
    backgroundColor: Colors.iceFlow,
  },
  ClockText: {
    color: Colors.turkishSea,
  },
});
