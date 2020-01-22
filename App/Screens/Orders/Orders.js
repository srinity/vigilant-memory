import React, { Component } from 'react';
import { View, TouchableNativeFeedback, TouchableOpacity, Platform, SafeAreaView, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { get as _get, isNil as _isNil, reduce as _reduce } from 'lodash';
import moment from 'moment';
import I18n from 'react-native-i18n';

import { CustomFlatList, LocalizedText, OrderCard } from './../../Components';

import { ImageHostUrl } from './../../Config/APIConfig';

import { Colors } from '../../Theme';

import styles from './Orders.Styles';

const TouchableComponent = Platform.OS === 'ios' ?
      TouchableOpacity : TouchableNativeFeedback;

class Orders extends Component {
  componentDidMount() {
    this.getOrders(true);
  }

  getAdditionalOrders = () => {
    this.getOrders(false)
  }

  getOrders = (shouldClean = false) => {
    const { user, getOrders, ordersCount, ordersCurrentOffset, ordersCurrentLimit, orders } = this.props;

    getOrders(shouldClean, shouldClean ? 20 : ordersCurrentLimit, ordersCurrentOffset, ordersCount, orders, user);
  }

  onOrderPress = (order) => {
    Actions.order({ order });
  }

  renderOrderItem = ({ item, index }) => {
    const shopName = _get(item, 'shop.shopName', 'UNKNOWN');
    const shopImage = _get(item, 'shop.shopImage', undefined);
    const status = _get(item, 'status', 'UNKNOWN');
    const subTotal = _reduce(item.productOrders, (sum, { quantity, product }) => sum + (quantity * product.price), 0);
    let time = '';

    if (!_isNil(item.createdAt)) {
      const orderTime = moment(item.createdAt);
      
      if (orderTime.isSame(moment(), 'day')) {
        const secondsDifference = moment().diff(orderTime, 'seconds');
        const minutesDifference = secondsDifference / 60;
        const hoursDifference = minutesDifference / 60;

        let localizeString = 'orders_screen_order_time_hours_text';
        let localizeVariable = Math.floor(hoursDifference);

        if (hoursDifference < 1 && minutesDifference < 2) {
          localizeString = 'orders_screen_order_time_minute_text';
          localizeVariable = Math.floor(minutesDifference);
        } else if (hoursDifference < 1 && minutesDifference >= 2) {
          localizeString = 'orders_screen_order_time_minutes_text';
          localizeVariable = Math.floor(minutesDifference);
        } else if (hoursDifference < 2) {
          localizeString = 'orders_screen_order_time_hour_text';
        }

        time = I18n.t(localizeString, { time: localizeVariable });
      } else {
        time = orderTime.format('HH:mm, DD/MM/YYYY');
      }
    }

    return (
      <OrderCard
        key={item._id}
        onPress={() => this.onOrderPress(item)}
        time={time}
        title={shopName}
        containerStyle={index === 0 ? styles.firstOrderContainerStyle : undefined}
        cost={subTotal}
        image={`${ImageHostUrl}${shopImage}`}
        status={status}
      />
    );
  }

  render() {
    const { orders, isLoadingOrders, getOrdersError } = this.props;
    // console.tron.warn(this.props);
    return (
      <SafeAreaView style={styles.containerStyle}>
        {
          getOrdersError ?
            (
              <View style={styles.retryButtonContainerStyle}>
                <LocalizedText>orders_screen_error_message</LocalizedText>
                <TouchableComponent onPress={this.getOrders}>
                  <View style={styles.retryButtonStyle}>
                    <LocalizedText>orders_screen_reload_button_text</LocalizedText>
                  </View>
                </TouchableComponent>
              </View>
            ) : (
              <CustomFlatList
                data={orders}
                emptyText='No Orders'
                isLoading={isLoadingOrders}
                indicatorColor={Colors.brandColorHexCode}
                indicatorSize='small'
                renderItem={this.renderOrderItem}
                onEndReached={this.getAdditionalOrders}
                onEndReachedThreshold={0.5}
              />
            )
        }
      </SafeAreaView>
    );
  }
}

export default Orders;
