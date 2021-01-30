import PushNotification from 'react-native-push-notification';
import NotificationHandler from './NotificationHandler';

class NotifyService {
  constructor(onRegister, onNotification) {
    this.lastId = 0;
    this.lastChannelCounter = 0;

    this.createDefaultChannels();

    NotificationHandler.attachRegister(onRegister);
    NotificationHandler.attachNotification(onNotification);

    //Clear badge number at beginning
    PushNotification.getApplicationIconBadgeNumber(function (number) {
      if (number > 0) {
        PushNotification.setApplicationIconBadgeNumber(0);
      }
    });

    PushNotification.getChannels(function (channels) {
      console.log(channels);
    });
  }

  createDefaultChannels() {
    PushNotification.createChannel(
      {
        channelId: 'default-channel-id',
        channelName: 'Default Channel',
        channelDescription: 'The Default Channel',
        soundName: 'default',
        importance: 4,
        vibrate: true,
      },
      (created) =>
        console.log(`createChannel 'default-channel-id' returned '${created}'`),
    );
    PushNotification.createChannel(
      {
        channelId: 'Sound-channel-id',
        channelName: 'Sound Channel',
        channelDescription: 'The sound Channel',
        soundName: 'sample.mp3',
        importance: 4,
        vibrate: true,
      },
      (created) =>
        console.log(`createChannel 'sound-channel-id' returned '${created}'`),
    );
  }

  createOrUpdateChannel() {
    this.lastChannelCounter++;
    PushNotification.createChannel(
      {
        channelId: 'custom-channel-id',
        channelName: `Custom Channel - Counter: ${this.lastChannelCounter}`,
        channelDescription: `A custom channel to categorize your custom notifications. Updated at: ${Date.now()}`,
        soundName: 'default',
        importance: 4,
        vibrate: true,
      },
      (created) => console.log(`createChannel returned '${created}'`),
    );
  }

  popInitialNotification() {
    PushNotification.popInitialNotification((notification) =>
      console.log('InitialNotification:', notification),
    );
  }

  localNotify(soundName) {
    this.lastId++;
    PushNotification.localNotification({
      channelId: soundName ? 'sound-channel-id' : 'default-channel-id',
      ticker: 'Study Time',
      bigText: 'Timer Has Ended',
      subText: 'The Timer has ended check out your checklist!',
      color: 'red',
      vibrate: true,
      vibration: 300,
      invokeApp: true,

      id: this.lastId,
      title: 'Time to take a break',
      message: 'The Timer Has ended',
      playSound: !!soundName,
      number: 10,
    });
  }

  scheduleNotification(soundName, duration) {
    this.lastId++;
    PushNotification.localNotificationSchedule({
      date: new Date(Date.now() + duration * 1000),

      channelId: soundName ? 'sound-channel-id' : 'default-channel-id',
      ticker: 'Study Time',
      bigText: 'Timer Has Ended',
      subText: 'The Timer has ended check out your checklist!',
      color: 'red',
      vibrate: true,
      vibration: 300,
      invokeApp: true,

      id: this.lastId,
      title: 'Time to take a break and check your list',
      message: 'The Timer Has ended',
      playSound: !!soundName,
      number: 10,
    });
  }

  checkPermission(cbk) {
    return PushNotification.checkPermissions(cbk);
  }

  requestPermissions() {
    return PushNotification.requestPermissions();
  }

  cancelNotification() {
    PushNotification.cancelLocalNotifications({id: '' + this.lastId});
  }

  cancelAll() {
    PushNotification.cancelAllLocalNotifications();
  }
  getScheduledLocalNotifications(callback) {
    PushNotification.getScheduledLocalNotifications(callback);
  }
}

export default NotifyService;
