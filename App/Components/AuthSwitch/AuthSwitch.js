import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import moment from 'moment';
import SplashScreen from 'react-native-splash-screen';
import firebase from 'react-native-firebase';

import { handleNotificationsPermissions, getNotificationsToken, onNotificationsTokenChange } from './../../Modules/Firebase';

export const ScreenTypes = {
    auth: 'authScenes',
    app: 'appScenes'
};

class AuthSwitch extends Component {
  componentDidMount() {
    const { user, isLoggedIn, lastLoginTime } = this.props;
    const currentTime = moment(new Date());
    const secondsSinceLastRefresh = moment.duration(currentTime.diff(lastLoginTime)).asSeconds();

    if (isLoggedIn && user && (!lastLoginTime || secondsSinceLastRefresh >= (user.expiresIn || 36000) - 1000)) {
      this.props.refreshToken(user);

      setTimeout(() => {
        this.props.getUserInfo(user);
      }, 1000);
    } else if (isLoggedIn && user) {
      this.props.getUserInfo(user);
    }

    setTimeout(() => {
      const initialScreen = this.rootScreenSelector(this.props);
      this.navigateToProperScreen(initialScreen);
      SplashScreen.hide();
    }, 0);

    if (isLoggedIn && user && !user.inActive) {
      this.handleUserNotification();
    }
  }

  componentDidUpdate(prevProps) {
    const { rootScreenSelector } = this;
    const currentRootScreen = rootScreenSelector(this.props);

    if (currentRootScreen !== rootScreenSelector(prevProps)) {
      this.navigateToProperScreen(currentRootScreen);

      if (currentRootScreen === ScreenTypes.app) {
        // Actions.cart();
        this.props.setActiveTab('home');
      }
    } else if (!prevProps.isLoggedIn && this.props.isLoggedIn) {
      this.props.uploadUserCart(this.props.cart, this.props.user);
      this.props.getUserInfo(this.props.user);
      this.handleUserNotification();
      this.navigateToProperScreen(ScreenTypes.app);
      // Actions.cart();
      this.props.setActiveTab('home');
    }
  }

  componentWillUnmount() {
    if (this.notificationEnabled) {
      this.removeNotificationDisplayedListener();
      this.removeNotificationListener();
      this.removeTokenChangeListener();
      this.removeNotificationOpenedListener();
    }
  }

  handleUserNotification = async () => {
    const notificationEnabled = await handleNotificationsPermissions();

    this.notificationEnabled = notificationEnabled;

    if (notificationEnabled) {
      const token = await getNotificationsToken();

      if (token) {
        this.handleNotificationToken(token);
        this.removeTokenChangeListener = onNotificationsTokenChange(this.handleNotificationToken);
      }
      this.removeNotificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notification) => {
        console.tron.log(notification);
        // Process your notification as required
        // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
      });
      this.removeNotificationListener = firebase.notifications().onNotification((notification) => {
          // Process your notification as required
          console.tron.warn(notification);
      });

      this.removeNotificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
        // Get the action triggered by the notification being opened
        const action = notificationOpen.action;
        // Get information about the notification that was opened
        const notification = notificationOpen.notification;
        console.tron.error(notificationOpen.notification);
        console.tron.error(notificationOpen.action);
    });
    }
  }

  handleNotificationToken = (token) => {
    console.tron.warn(token);
    const { user, registerUserNotificationToken } = this.props;

    registerUserNotificationToken(token, user);
  }

  rootScreenSelector = (props) => {
    const { isLoggedIn, user = {} } = props;

    if (!isLoggedIn) {
      return ScreenTypes.app;
    } else if (isLoggedIn && user.inActive) {
      return ScreenTypes.auth;
    }
    
    return ScreenTypes.app;
  }

  navigateToProperScreen = (screen) => {
    if (screen === ScreenTypes.auth) {
      if (Actions.currentScene !== 'login' && Actions.currentScene !== 'register') {
        Actions[ScreenTypes.auth]();
      }

      Actions.verificationCode();
    } else {
      Actions.reset(screen);
    }
  }

  render() {
    return null;
  }
}

export default AuthSwitch;
