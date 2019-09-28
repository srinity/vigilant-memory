import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import moment from 'moment';

export const ScreenTypes = {
    auth: 'authScenes',
    app: 'appScenes'
};

class AuthSwitch extends Component {
  componentDidMount() {
    const { user, isLoggedIn, lastLoginTime } = this.props;
    const currentTime = moment(new Date());
    const secondsSinceLastRefresh = moment.duration(currentTime.diff(lastLoginTime)).asSeconds();
    console.tron.error(currentTime);
    console.tron.error(user);
    console.tron.error(lastLoginTime);
    console.tron.error(secondsSinceLastRefresh);

    if (isLoggedIn && user && (!lastLoginTime || secondsSinceLastRefresh >= (user.expiresIn || 36000) - 1000)) {
      this.props.refreshToken(user);
    } else if (isLoggedIn && user) {
      this.props.getUserInfo(user);
    }

    setTimeout(() => {
      const initialScreen = this.rootScreenSelector(this.props);
      this.navigateToProperScreen(initialScreen);
    }, 0);
  }

  componentDidUpdate(prevProps) {
    const { rootScreenSelector } = this;
    const currentRootScreen = rootScreenSelector(this.props);

    if (currentRootScreen !== rootScreenSelector(prevProps)) {
      this.navigateToProperScreen(currentRootScreen);

      if (currentRootScreen === ScreenTypes.app) {
        Actions.cart();
      }
    } else if (!prevProps.isLoggedIn && this.props.isLoggedIn) {
      this.props.uploadUserCart(this.props.cart, this.props.user);
      this.navigateToProperScreen(ScreenTypes.app);
      Actions.cart();
    }
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
