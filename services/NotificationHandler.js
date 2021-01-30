import PushNotification from 'react-native-push-notification';

class NotificationHandler {
  onNotification(notification) {
    console.log('NotificationHandler:', notification);

    if (typeof this._onNotification === 'function') {
      this._onNotification(notification);
    }
  }

  onRegister(token) {
    console.log('NotificationHandler:', token);

    if (typeof this.onRegister === 'function') {
      this._onRegister(token);
    }
  }

  onAction(notification) {
    console.log('Notification Action Received');
    console.log(notification.action);
    console.log(notification);

    if (notification.action === 'Yes') {
      PushNotification.invokeApp(notification);
    }
  }

  onRegistrationError(err) {
    console.log(err);
  }

  attachRegister(handler) {
    this._onRegister = handler;
  }

  attachNotification(handler) {
    this._onNotification = handler;
  }
}

const handler = new NotificationHandler();

PushNotification.configure({
  //optional called when token is generated (IOS and Android)
  onRegister: handler.onRegister.bind(handler),
  //required when remote or local notification is opened or received
  onNotification: handler.onNotification.bind(handler),
  //optional called when action is pressed (Android)
  onAction: handler.onAction.bind(handler),
  /*called when user fails to register for remote
    notifications occurs when API is having issues*/
  onRegistrationError: handler.onRegistrationError.bind(handler),

  /*
        IOS only (optional):
         * default: all - permissions to register
    */
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

  /*
        Should the initial notification be popped automatically
         * default: true
    */
  popInitialNotification: true,

  /*
   * (optional) default: true
   * - Specified if permissions (ios) and token (android and ios) will requested or not,
   * - if not, you must call PushNotificationsHandler.requestPermissions() later
   */
  requestPermissions: true,
});

export default handler;
