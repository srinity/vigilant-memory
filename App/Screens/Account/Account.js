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

import { Icon, IconTypes, ScreenTypes, LocalizedText, AccountCard } from './../../Components';

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

  onOrdersPress = () => {
    Actions.orders();
  }

  onUserInfoPress = () => {
    Actions.userInfo();
  }

  onLogoutPress = () => {
    this.props.logout();
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
    const { width } = this.props;

    const cardSize = (width - 80) / 2;

    return (
      <View style={styles.accountOptionsContainerStyle}>
        <View style={styles.cardsContainerStyle}>
          <AccountCard
            title='account_screen_user_info_action'
            iconName='account'
            iconType={IconTypes.materialCommunity}
            size={cardSize}
            onPress={this.onUserInfoPress}
          />

          <AccountCard
            title='account_screen_orders_action'
            iconName='shopping-cart'
            iconType={IconTypes.entypo}
            size={cardSize}
            onPress={this.onOrdersPress}
          />
        </View>

        <View style={styles.cardsContainerStyle}>
          <AccountCard
            title='account_screen_shipping_addresses_action'
            iconName='location-pin'
            iconType={IconTypes.entypo}
            size={cardSize}
            onPress={this.onShippingAddressesPress}
          />

          <AccountCard
            title='account_screen_logout_action'
            iconName='power-off'
            iconType={IconTypes.fontAwesome}
            size={cardSize}
            onPress={this.onLogoutPress}
          />
        </View>
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
          <LocalizedText>account_screen_error_message</LocalizedText>
          <TouchableComponent onPress={this.getUserInfo}>
            <View style={styles.retryButtonStyle}>
              <LocalizedText>account_screen_reload_button_text</LocalizedText>
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
          <View style={styles.userImageContainerStyle}>
            <Icon type={IconTypes.material} name='person-outline' color={Colors.getBlackColorRGBAValue(0.6)} size={35} />
          </View>
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
              <LocalizedText>account_screen_Login_now_button_text</LocalizedText>
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

    // console.tron.error(this.props);
    return (
      <View style={styles.containerStyle}>
        {this.renderContent(isLoggedIn)}
      </View>
    );
  }
}

export default Account;
