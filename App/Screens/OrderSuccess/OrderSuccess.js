import React, { Component } from 'react';
import { SafeAreaView, View } from 'react-native';
import { Actions } from 'react-native-router-flux';

import { LocalizedText, Button, Icon, IconTypes } from './../../Components';

import styles from './OrderSuccess.Styles';
import { Colors } from '../../Theme';

class OrderSuccess extends Component {
  onKeepShoppingPress = () => {
    Actions.popTo('cart');
    this.props.setActiveTab('cart');
  }

  onBackToMainPress = () => {
    Actions.popTo('home');
    this.props.setActiveTab('home');
  }

  render() {
    return (
      <SafeAreaView style={styles.containerStyle}>
          <Icon
            type={IconTypes.ant}
            name='checkcircle'
            color={Colors.successColorHexCode}
            size={200}
          />

          <LocalizedText style={styles.orderSuccessTitle}>order_success_screen_title</LocalizedText>
          <LocalizedText style={styles.orderSuccessDescription}>order_success_screen_description</LocalizedText>

          <View style={styles.orderActionsContainerStyle}>
            <Button
              title='order_success_screen_keep_shopping'
              style={styles.keepShoppingButtonStyle}
              textStyle={styles.keepShoppingButtonTextStyle}
              onPress={this.onKeepShoppingPress}
            />

            <Button
              title='order_success_screen_back_to_main'
              style={styles.backToMainButtonStyle}
              textStyle={styles.backToMainButtonTextStyle}
              onPress={this.onBackToMainPress}
            />
          </View>
      </SafeAreaView>
    );
  }
}

export default OrderSuccess;
