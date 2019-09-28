import React, { Component } from 'react';
import {
  View,
  ActivityIndicator,
  Text,
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
} from 'react-native';
import { Actions } from 'react-native-router-flux'

import { Icon, IconTypes } from './../../Components';

import { Colors } from '../../Theme';

import styles from './Account.Styles';


const TouchableComponent = Platform.OS === 'ios' ?
      TouchableOpacity : TouchableNativeFeedback;

class Account extends Component {
  onShippingAddressesPress = () => {
    Actions.addressBook();
  }

  render() {
    const { isGettingUserInfo, userInfo = {} } = this.props;
    const { fullName } = userInfo || {};

    console.tron.error(this.props);
    return (
      <View style={styles.containerStyle}>
        {
          isGettingUserInfo
          ? (
            <View style={styles.activityIndicatorContainerStyle}>
              <ActivityIndicator color={Colors.brandColorHexCode} size='small' />
            </View>
          )
          : (
            <View style={styles.containerStyle}>
              <View style={styles.userNameContainerStyle}>
                <Text style={styles.userNameTextStyle}>{`${fullName.firstName} ${fullName.lastName}`}</Text>
              </View>

              <View style={styles.accountOptionsContainerStyle}>
                <TouchableComponent onPress={this.onShippingAddressesPress}>
                  <View style={styles.accountOptionButtonStyle}>
                    <Icon name='location-pin' type={IconTypes.entypo} color={Colors.brandColorHexCode} />
                    <Text style={styles.accountOptionButtonTextStyle}>Shipping Addresses</Text>
                  </View>
                </TouchableComponent>
              </View>  
            </View>
          )
        }
      </View>
    );
  }
}

export default Account;
