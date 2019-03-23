import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';

export const ScreenTypes = {
    auth: 'authScenes',
    app: 'appScenes'
};

class AuthSwitch extends Component {
  // eslint-disable-next-line camelcase
  UNSAFE_componentWillMount() {
    const initialScreen = this.rootScreenSelector(this.props);
    Actions.reset(initialScreen);
  }

  componentDidUpdate(prevProps) {
    const rootSelector = this.rootScreenSelector;

    if (rootSelector(this.props) !== rootSelector(prevProps)) {
      Actions.reset(rootSelector(this.props));
    }
  }

  rootScreenSelector = (props) => {
      return (props.user && props.user) ? ScreenTypes.app : ScreenTypes.auth;
  }

  render() {
    return null;
  }
}

export default AuthSwitch;
