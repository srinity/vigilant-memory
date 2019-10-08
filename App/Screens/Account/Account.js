import React, { Component } from 'react';
import {
  View,
  ActivityIndicator,
  Text,
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
} from 'react-native';
import { Actions } from 'react-native-router-flux';

import { Icon, IconTypes, ScreenTypes } from './../../Components';

import { Colors } from '../../Theme';

import styles from './Account.Styles';

const TouchableComponent = Platform.OS === 'ios' ?
      TouchableOpacity : TouchableNativeFeedback;

class Account extends Component {
  componentDidMount() {
    const { isLoggedIn } = this.props;

    if (isLoggedIn) {
      this.getUserInfo();
    }
  }

  onShippingAddressesPress = () => {
    Actions.addressBook();
  }

  onChangePasswordPress = () => {
    Actions.changePassword();
  }

  onLoginPress = () => {
    // Actions.reset(ScreenTypes.auth);
    Actions[ScreenTypes.auth]();
  }

  getUserInfo = () => {
    const { user, getUserInfo } = this.props;
    getUserInfo(user);
  }

  renderAccountActions = () => {
    return (
      <View style={styles.accountOptionsContainerStyle}>
        <TouchableComponent onPress={this.onShippingAddressesPress}>
          <View style={styles.accountOptionButtonStyle}>
            <Icon name='location-pin' type={IconTypes.entypo} color={Colors.brandColorHexCode} />
            <Text style={styles.accountOptionButtonTextStyle}>Shipping Addresses</Text>
          </View>
        </TouchableComponent>

        <TouchableComponent onPress={this.onChangePasswordPress}>
          <View style={styles.accountOptionButtonStyle}>
            <Icon name='key-variant' type={IconTypes.materialCommunity} color={Colors.brandColorHexCode} />
            <Text style={styles.accountOptionButtonTextStyle}>Change Password</Text>
          </View>
        </TouchableComponent>
      </View>  
    );
  }

  renderLoading = (isGettingUserInfo) => {
    if (isGettingUserInfo) {
      return (
        <View style={styles.activityIndicatorContainerStyle}>
          <ActivityIndicator color={Colors.brandColorHexCode} size='small' />
        </View>
      );
    }

    const { gettingUserInfoFailed } = this.props;

    if (gettingUserInfoFailed) {
      return (
        <View style={styles.retryButtonContainerStyle}>
          <Text>Something went wrong!</Text>
          <TouchableComponent onPress={this.getUserInfo}>
            <View style={styles.retryButtonStyle}>
              <Text>Reload</Text>
            </View>
          </TouchableComponent>
        </View>
      );
    }

    const { userInfo = {} } = this.props;
    const { fullName = {} } = userInfo || {};

    return (
      <View style={styles.containerStyle}>
        <View style={styles.userNameContainerStyle}>
          <Text style={styles.userNameTextStyle}>{`${fullName.firstName} ${fullName.lastName}`}</Text>
        </View>

        {this.renderAccountActions()}
      </View>
    );
  }

  renderContent = (isLoggedIn) => {
    if (!isLoggedIn) {
      return (
        <View style={styles.loginButtonContainerStyle}>
          <TouchableComponent onPress={this.onLoginPress}>
            <View style={styles.loginButtonStyle}>
              <Text>Login now</Text>
            </View>
          </TouchableComponent>
        </View>
      );
    }

    const { isGettingUserInfo } = this.props;

    return (this.renderLoading(isGettingUserInfo));
  }

  render() {
    const { isLoggedIn } = this.props;

    console.tron.error(this.props);
    return (
      <View style={styles.containerStyle}>
        {this.renderContent(isLoggedIn)}
      </View>
    );
  }
}

export default Account;
