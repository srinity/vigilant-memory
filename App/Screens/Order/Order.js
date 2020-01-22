import React, { Component } from 'react';
import { SafeAreaView, View, Text, StyleSheet, FlatList, ScrollView, Image } from 'react-native';
import memoize from 'memoize-one';
import { get as _get, reduce as _reduce } from 'lodash';
import moment from 'moment';
import I18n from 'react-native-i18n';

import { ShopHeader, Tag, LocalizedText } from './../../Components';

import { ImageHostUrl } from '../../Config/APIConfig';
import OrderStatusEnum from './../../Utils/OrderStatus';

import { Colors } from './../../Theme';

import styles from './Order.Styles';

class Order extends Component {
  getOrderStatusStyle = (status) => {
    const stylesArr = [styles.tagStyle];

    if (status === OrderStatusEnum.PENDING) {
      stylesArr.push({ backgroundColor: Colors.warningColorHexCode });
    } else if (status === OrderStatusEnum.DELIVERED || status === OrderStatusEnum.ACCEPTED) {
      stylesArr.push({ backgroundColor: Colors.successColorHexCode });
    } else {
      stylesArr.push({ backgroundColor: '#aaaaaa' });
    }

    return StyleSheet.flatten(stylesArr);
  }

  getOrderStatusStyleMemoized = memoize(this.getOrderStatusStyle)

  renderOrderProduct = ({ item }) => {
    const { product, quantity } = item;

    return (
      <View style={styles.orderItemContainerStyle}>
        <Image
          source={`${ImageHostUrl}${product.imgUrl}`}
          style={styles.orderItemImageStyle}
        />

        <View style={styles.orderItemInfoContainerStyle}>
          <Text style={styles.orderItemNameTextStyle} numberOfLines={1}>{product.productName}</Text>

          <LocalizedText
            style={styles.orderItemPriceTextStyle}
            numberOfLines={1}
            localizationOptions={{ quantity }}
          >order_screen_order_item_quantity_text</LocalizedText>

          <LocalizedText
            style={styles.orderItemPriceTextStyle}
            localizationOptions={{ price: product.price }}
          >order_screen_order_item_price_text</LocalizedText>
        </View>
      </View>
    );
  }

  render() {
    // console.tron.error(this.props);
    const { order } = this.props;
    const { userAddress = {} } = order;

    const shopName = _get(order, 'shop.shopName', 'UNKNOWN');
    const shopImage = _get(order, 'shop.shopImage', undefined);
    const shopAddress = _get(order, 'shop.address', undefined);
    const deliveryCost = _get(order, 'shop.deliveryCost', 0);
    const status = _get(order, 'status', 'UNKNOWN');
    const subTotal = _reduce(order.productOrders, (sum, { quantity, product }) => sum + (quantity * product.price), 0);
    const buildingNumber = _get(userAddress, 'addressDetails.buildingNumber', undefined);
    const buildingNumberText = buildingNumber ? I18n.t('order_screen_order_delivery_address_building_text', { building: buildingNumber }) : '';
    const floor = _get(userAddress, 'addressDetails.floor', undefined);
    const floorText = buildingNumber ? I18n.t('order_screen_order_delivery_address_floor_text', { floor }) : '';
    const apartmentNumber = _get(userAddress, 'addressDetails.apartmentNumber', undefined);
    const apartmentNumberText = buildingNumber ? I18n.t('order_screen_order_delivery_address_apartment_text', { apartment: apartmentNumber }) : '';
    const address = `${userAddress.city}-${userAddress.area}-${userAddress.district}${buildingNumberText}${floorText}${apartmentNumberText}`;
    const orderTime = moment(order.createdAt);
    let time = moment(order.createdAt).format('HH:mm');

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
    }

    return (
      <SafeAreaView style={styles.containerStyle}>
        <ScrollView>
          <ShopHeader
            image={`${ImageHostUrl}${shopImage}`}
            name={shopName}
            address={shopAddress ? `${shopAddress.city}-${shopAddress.area}-${shopAddress.district}` : ''}
            icon='location-pin'
          />

          <View style={styles.orderInfoCardStyle}>
            <View style={styles.rawStyle}>
              <LocalizedText style={styles.orderInfoPropertyTextStyle}>order_screen_order_status_text</LocalizedText>
              <Tag
                title={I18n.t(`orders_screen_order_status_${status}_text`)}
                isActive
                activeStyle={this.getOrderStatusStyleMemoized(status)}
                textStyle={styles.textStyle}
              />
            </View>

            <View style={styles.rawStyle}>
              <LocalizedText style={styles.orderInfoPropertyTextStyle}>order_screen_order_date_text</LocalizedText>
              <Text style={styles.orderInfoTextStyle}>{moment(order.createdAt).format('D-MM-YYYY')}</Text>
            </View>

            <View style={styles.rawStyle}>
              <LocalizedText style={styles.orderInfoPropertyTextStyle}>order_screen_order_time_text</LocalizedText>
              <Text style={styles.orderInfoTextStyle}>{time}</Text>
            </View>

            <View style={styles.deliveryAddressContainerStyle}>
              <LocalizedText style={styles.orderInfoPropertyTextStyle}>order_screen_order_delivery_address_text</LocalizedText>
              <Text style={styles.orderInfoTextStyle}>{address}</Text>
            </View>
          </View>

          <View style={styles.orderDetailsCardStyle}>
            <LocalizedText style={styles.orderItemsTitleTextStyle}>order_screen_order_items_text</LocalizedText>

            <FlatList
              data={order.productOrders}
              renderItem={this.renderOrderProduct}
              keyExtractor={item => item.product._id}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
            />
          </View>

          <View style={styles.orderDetailsCardStyle}>
            <LocalizedText style={styles.orderItemsTitleTextStyle}>order_screen_order_cost_details_text</LocalizedText>

            <View style={styles.orderCostDetailsContainerStyle}>
              <View style={[styles.orderPriceDetailsRowStyle, styles.orderItemsCostContainerStyle]}>
                <LocalizedText style={styles.orderPriceDetailsTitleTextStyle}>order_screen_order_cost_text</LocalizedText>
                <Text style={styles.orderPriceDetailsValueTextStyle}>{subTotal} {I18n.t('order_screen_order_cost_currency_text')}</Text>
              </View>

              <View style={styles.orderPriceDetailsRowStyle}>
                <LocalizedText style={styles.orderPriceDetailsTitleTextStyle}>order_screen_order_delivery_cost_text</LocalizedText>
                <Text style={styles.orderPriceDetailsValueTextStyle}>{deliveryCost} {I18n.t('order_screen_order_cost_currency_text')}</Text>
              </View>
            </View>

            <View style={[styles.orderPriceDetailsRowStyle, styles.orderTotalCostContainerStyle]}>
              <LocalizedText style={styles.orderPriceDetailsTitleTextStyle}>order_screen_order_total_cost_text</LocalizedText>
              <Text style={styles.orderPriceDetailsValueTextStyle}>{subTotal + deliveryCost} {I18n.t('order_screen_order_cost_currency_text')}</Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default Order;
