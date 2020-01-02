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

    // check if the user token expired or about to be expired if so start refreshing the token
    if (isLoggedIn && user && (!lastLoginTime || secondsSinceLastRefresh >= (user.expiresIn || 36000) - 1000)) {
      this.props.refreshToken(user);

      setTimeout(() => {
        this.props.getUserInfo(user);
      }, 1000);
    } else if (isLoggedIn && user) {
      // if the user is logged in then retrieve the user data
      this.props.getUserInfo(user);
    }

    setTimeout(() => {
      // check which screen should the user start on
      const initialScreen = this.rootScreenSelector(this.props);
      // navigate to the proper screen
      this.navigateToProperScreen(initialScreen);
      // hide the native splashscreen
      SplashScreen.hide();
    }, 0);

    if (isLoggedIn && user && !user.inActive) {
      // if the user is logged then initiate the notifications service
      this.handleUserNotification();
    }
  }

  componentDidUpdate(prevProps) {
    // get the current screen based on the props
    const { rootScreenSelector } = this;
    const currentRootScreen = rootScreenSelector(this.props);

    // console.tron.error(currentRootScreen)
    // console.tron.log(this.props)
    // console.tron.warn(rootScreenSelector(prevProps))

    // if the screen stack changed then navigate to the new stack
    if (currentRootScreen !== rootScreenSelector(prevProps)) {
      this.navigateToProperScreen(currentRootScreen);

      // set the active tab of the bottom bar to home if the app screen stack
      if (currentRootScreen === ScreenTypes.app) {
        // Actions.cart();
        this.props.setActiveTab('home');
      }
    } else if (!prevProps.isLoggedIn && this.props.isLoggedIn && this.props.user && !this.props.user.inActive) {
      // if the user just logged in then update the backend cart then get the user data and handle notifications
      this.props.uploadUserCart(this.props.cart, this.props.user);
      this.props.getUserInfo(this.props.user);
      this.handleUserNotification();
      // navigate the app stack then set the bottom bar tab to home
      this.navigateToProperScreen(ScreenTypes.app);
      // Actions.cart();
      this.props.setActiveTab('home');
    }
  }

  componentWillUnmount() {
    // remove all the notification listeners if the notification is enabled
    if (this.notificationEnabled) {
      this.removeNotificationDisplayedListener();
      this.removeNotificationListener();
      this.removeTokenChangeListener();
      this.removeNotificationOpenedListener();
    }
  }

  handleUserNotification = async () => {
    // check the notification permission
    const notificationEnabled = await handleNotificationsPermissions();

    this.notificationEnabled = notificationEnabled;

    if (notificationEnabled) {
      // get the firebase notification token
      const token = await getNotificationsToken();

      if (token) {
        this.handleNotificationToken(token);
        this.removeTokenChangeListener = onNotificationsTokenChange(this.handleNotificationToken);
      }
      this.removeNotificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notification) => {
        // console.tron.log(notification);
        // Process your notification as required
        // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
      });
      this.removeNotificationListener = firebase.notifications().onNotification((notification) => {
          // Process your notification as required
          // console.tron.warn(notification);
      });

      this.removeNotificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
        // Get the action triggered by the notification being opened
        const action = notificationOpen.action;
        // Get information about the notification that was opened
        const notification = notificationOpen.notification;
        // console.tron.error(notificationOpen.notification);
        // console.tron.error(notificationOpen.action);
    });
    }
  }

  handleNotificationToken = (token) => {
    // console.tron.warn(token);
    const { user, registerUserNotificationToken } = this.props;

    // register the user's notification token of the user
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
      // if the user is not in login or register screen then navigate to the auth stack 
      if (Actions.currentScene !== 'login' && Actions.currentScene !== 'register') {
        Actions[ScreenTypes.auth]();
      }

      // navigate to the verfication code screen
      Actions.verificationCode();
    } else if (!(screen === ScreenTypes.app && this.props.isLoggedIn && this.props.user && this.props.user.inActive)) {
      Actions.reset(screen);
    }
  }

  render() {
    return null;
  }
}

export default AuthSwitch;
