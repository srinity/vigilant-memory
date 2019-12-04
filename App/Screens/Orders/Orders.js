import React, { Component } from 'react';
import { View, TouchableNativeFeedback, TouchableOpacity, Platform, Text, SafeAreaView, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import memoize from 'memoize-one';
import { capitalize as _capitalize, get as _get, isNil as _isNil } from 'lodash';
import moment from 'moment';

import { CustomFlatList, LocalizedText } from './../../Components';

import OrderStatusEnum from './../../Utils/OrderStatus';

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

  getOrderStatusStyle = (status) => {
    const stylesArr = [styles.orderStatusTextStyle];

    if (status === OrderStatusEnum.PENDING) {
      stylesArr.push({ color: Colors.warningColorHexCode });
    } else if (status === OrderStatusEnum.DELIVERED || status === OrderStatusEnum.ACCEPTED) {
      stylesArr.push({ color: Colors.successColorHexCode });
    } else {
      stylesArr.push({ color: Colors.dangerColorHexCode });
    }

    return StyleSheet.flatten(stylesArr);
  }

  getOrderStatusStyleMemoized = memoize(this.getOrderStatusStyle)

  onOrderPress = (order) => {
    Actions.order({ order });
  }

  renderOrderItem = ({ item }) => {
    const shopName = _get(item, 'shop.shopName', 'UNKNOWN');
    const status = _get(item, 'status', 'UNKNOWN');

    return (
      <TouchableComponent key={item._id} onPress={() => this.onOrderPress(item)}>
        <View style={styles.orderContainerStyle}>
          <View style={styles.orderStoreContainerStyle}>
            <Text style={styles.orderStoreTextStyle}>{shopName}</Text>
            <Text style={this.getOrderStatusStyleMemoized(status)}>{_capitalize(status)}</Text>
          </View>

          {
            _isNil(item.createdAt) ?
            null : (
              <Text style={styles.orderTimeTextStyle}>{moment(item.createdAt).format('MMMM Do YYYY, HH:mm')}</Text>
            )
          }
        </View>
      </TouchableComponent>
    )
  }

  render() {
    const { orders, isLoadingOrders, getOrdersError } = this.props;
    console.tron.warn(this.props);
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
