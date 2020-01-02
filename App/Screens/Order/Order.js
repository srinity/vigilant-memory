import React, { Component } from 'react';
import { SafeAreaView, View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
import memoize from 'memoize-one';
import { get as _get, reduce as _reduce } from 'lodash';
import moment from 'moment';
import I18n from 'react-native-i18n';

import OrderStatusEnum from './../../Utils/OrderStatus';

import { Colors } from './../../Theme';

import styles from './Order.Styles';

class Order extends Component {
  getOrderStatusStyle = (status) => {
    const stylesArr = [styles.orderInfoTextStyle];

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

  renderOrderProduct = ({ item }) => {
    return (
      <View style={styles.orderItemContainerStyle}>
        <Text style={styles.orderItemNameTextStyle} numberOfLines={2}>{item.product.productName}</Text>
        <Text style={styles.orderItemPriceTextStyle}>{item.product.price} {I18n.t('cart_screen_currency_text')} X {item.quantity}</Text>
      </View>
    );
  }

  render() {
    // console.tron.error(this.props);
    const { order } = this.props;
    const { userAddress = {} } = order;

    const shopName = _get(order, 'shop.shopName', 'UNKNOWN');
    const status = _get(order, 'status', 'UNKNOWN');
    const subTotal = _reduce(order.productOrders, (sum, { quantity, product }) => sum + (quantity * product.price), 0);
    const streetName = _get(userAddress, 'addressDetails.streetName', undefined);
    const buildingNumber = _get(userAddress, 'addressDetails.buildingNumber', undefined);
    let address = `${userAddress.district}, ${userAddress.area}, ${userAddress.city}`;

    if (streetName) {
      address = `${buildingNumber || ''} ${streetName} ${userAddress.district}, ${userAddress.area}, ${userAddress.city}`;
    }

    return (
      <SafeAreaView style={styles.containerStyle}>
        <ScrollView>
          <View style={styles.orderInfoCardStyle}>
            <View style={styles.rawStyle}>
              <Text style={styles.orderInfoPropertyTextStyle}>Shop: </Text>
              <Text style={styles.orderInfoTextStyle}>{shopName}</Text>
            </View>

            <View style={styles.rawStyle}>
              <Text style={styles.orderInfoPropertyTextStyle}>Status: </Text>
              <Text style={this.getOrderStatusStyleMemoized(status)}>{status}</Text>
            </View>

            <View style={styles.rawStyle}>
              <Text style={styles.orderInfoPropertyTextStyle}>Order Time: </Text>
              <Text style={styles.orderInfoTextStyle}>{moment(order.createdAt).format('DD-MM-YYYY, HH:mm')}</Text>
            </View>

            <View style={styles.rawStyle}>
              <Text style={styles.orderInfoPropertyTextStyle}>Delivery Details: </Text>
              <Text style={styles.orderInfoTextStyle}>{address}</Text>
            </View>
          </View>

          <View style={styles.orderInfoCardStyle}>
            <Text style={styles.orderItemsTitleTextStyle}>Order Items</Text>

            <FlatList
              data={order.productOrders}
              renderItem={this.renderOrderProduct}
              keyExtractor={item => item.product._id}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
            />

            <View style={styles.orderTotalContainerStyle}>
              <Text style={styles.orderItemNameTextStyle}>Total: </Text>
              <Text style={styles.orderItemPriceTextStyle}>{subTotal} {I18n.t('cart_screen_currency_text')}</Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default Order;
