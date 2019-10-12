import React, { Component } from 'react';
import {
  View,
  ScrollView,
  FlatList,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform
} from 'react-native';
import { map as _map, reduce as _reduce, find as _find } from 'lodash';
import memoize from 'memoize-one';
import I18n from 'react-native-i18n';
import { Actions } from 'react-native-router-flux';

import { Icon, IconTypes, AddressModal, Card, Button, LocalizedText } from './../../Components';

import { Colors } from '../../Theme';

import styles from './CheckOut.Styles';

const TouchableComponent = Platform.OS === 'ios' ?
      TouchableOpacity : TouchableNativeFeedback;

class CheckOut extends Component {
  state = {
    isAddressModalVisible: false
  }

  onSelectAddressPress = (addressId) => {
    const { selectShippingAddress } = this.props;
    selectShippingAddress(addressId);
  }

  onAddAddressRequest = (address) => {
    const { user, addAddress } = this.props;
    addAddress(user, address);
  }

  onAddAddressPress = () => {
    this.setState({ isAddressModalVisible: true });
  }

  onAddAddressClose = () => {
    this.setState({ isAddressModalVisible: false });
  }

  onBuyButtonPress = () => {
    const { user, buyShopProducts, cart, lastSelectedAddress, shopId, addresses } = this.props;
    const deliveryAddress = _find(addresses, address => address._id === lastSelectedAddress);

    buyShopProducts(user, shopId, cart[shopId].products, deliveryAddress, cart, this.onBuySuccessful);
  }

  onBuySuccessful = () => {
    this.props.setActiveTab('home');
    Actions.popTo('home');
  }

  calculateOrderTotalAmount = (products) => {
    return _reduce(products, (sum, { quantity, price }) => sum + (quantity * price), 0);
  }

  getAddressContainerStyle = (width, height) => {
    const size = (width > height) ? height / 2.5 : width / 2.5;

    return { height: size - 10, width: size - 10 };
  }

  getAddressContainerStyleMemoized = memoize(this.getAddressContainerStyle);

  renderOrderProducts = (products) => (
    _map(products, ({ productId, productName, quantity, price }) => (
      <View style={styles.orderItemContainerStyle} key={productId}>
        <Text style={styles.orderItemsTextStyle}>{quantity} x {productName}</Text>
        <Text style={styles.orderItemPriceTextStyle}>{price * quantity}</Text>
      </View>
    ))
  )

  renderTotalAmount = (products) => {
    return (
      <View style={styles.orderTotalAmountContainerStyle}>
        <LocalizedText style={styles.orderTotalAmountTextStyle}>check_out_screen_total_amount</LocalizedText>
        <Text style={styles.orderTotalAmountPriceTextStyle}>{this.calculateOrderTotalAmount(products)}</Text>
      </View>
    );
  }

  renderAddress = ({ item }) => {
    const { lastSelectedAddress, width, height } = this.props
    const { district, area, city, addressDetails = {} } = item;
    const { streetName, apartmentNumber, floor, buildingNumber } = addressDetails || {};

    const streetNameString = streetName ? `${streetName}` : '';
    //   const apartmentNumberString = `${apartmentNumber}`;
    //   const floorString = `${floor}th floor, `;
    const buildingNumberString = buildingNumber ? `${buildingNumber} ` : '';

    const isSelectedAddress = lastSelectedAddress === item._id;

    return (
      <TouchableComponent onPress={() => this.onSelectAddressPress(item._id)}>
        <View
          style={[
            styles.addressItemContainerStyle,
            this.getAddressContainerStyleMemoized(width, height),
            isSelectedAddress ? styles.selectedAddressItemContainerStyle : undefined
          ]}
        >
            {
              streetNameString
                ? (
                  <Text style={styles.addressDetailTextStyle}>{buildingNumberString}{streetNameString}</Text>
                )
                : null
            }
            <Text>{`${district}, ${area}, ${city}`}</Text>
        </View>
      </TouchableComponent>
    );
  }

  renderAddresses = (addresses, selectedAddress) => {
    if (!addresses || !addresses.length || addresses.length === 0) {
      return (
        <View style={styles.addressDetailsContainerStyles}>
          <LocalizedText style={styles.noAvailableAddressTextStyle}>check_out_screen_no_address_available</LocalizedText>

          <TouchableComponent onPress={this.onAddAddressPress}>
            <LocalizedText style={styles.addAddressTextStyle}>check_out_screen_add_address</LocalizedText>
          </TouchableComponent>
        </View>
      );
    }

    return (
      <FlatList
        horizontal
        data={addresses}
        renderItem={this.renderAddress}
        extraData={selectedAddress}
        keyExtractor={address => address._id}
        showsHorizontalScrollIndicator={false}
      />
    );
  }

  render() {
    const { isAddingAddress, cities, addAddressError, cart, shopId, lastSelectedAddress, addresses, isBuyingLoading } = this.props;

    return (
      <View style={styles.containerStyle}>
        <ScrollView style={styles.containerStyle} contentContainerStyle={styles.scrollContentContainerStyle}>
          <View style={styles.addressContainerStyle}>
            <View style={styles.addressHeaderContainerStyle}>
              <Icon type={IconTypes.entypo} name='address' color={Colors.brandColorHexCode} size={20} />
              <LocalizedText style={styles.addressHeaderTextStyle}>check_out_screen_address_header</LocalizedText>
            </View>
            {this.renderAddresses(addresses, lastSelectedAddress)}
          </View>

          <Card style={styles.cardStyle}>
            <LocalizedText style={styles.orderSummaryHeaderStyle}>check_out_screen_order_summary</LocalizedText>

            {this.renderOrderProducts(cart[shopId].products)}
            {this.renderTotalAmount(cart[shopId].products)}
          </Card>

          <Card style={styles.cardStyle}>
            <View style={styles.paymentMethodContainerStyle}>
              <LocalizedText style={styles.paymentMethodHeaderStyle}>check_out_screen_payment_method</LocalizedText>
              <Text style={styles.paymentMethodTotalAmountHeaderStyle}>{this.calculateOrderTotalAmount((cart[shopId].products))} {I18n.t('check_out_screen_payment_currency')}</Text>
            </View>

            <View style={styles.paymentOptionContainerStyle}>
              <View style={styles.paymentOptionInfoContainerStyle}>
                <Icon type={IconTypes.ant} name='checkcircle' color={Colors.successColorHexCode} size={20} />
                <LocalizedText style={styles.paymentOptionInfoTextStyle}>check_out_screen_cash_payment</LocalizedText>
              </View>

              <Icon type={IconTypes.materialCommunity} name='cash-multiple' color={Colors.notAvailableColorHexCode} size={20} />
            </View>
          </Card>

          <View style={styles.buyButtonContainerStyle}>
            <Button
              title='check_out_screen_buy_button_text'
              disabled={!lastSelectedAddress}
              style={styles.buyButtonStyle}
              disabledStyle={styles.buyButtonDisabledStyle}
              onPress={this.onBuyButtonPress}
              isLoading={isBuyingLoading}
              indicatorSize='small'
            />
          </View>
        </ScrollView>

        <AddressModal
          isVisible={this.state.isAddressModalVisible}
          onClose={this.onAddAddressClose}
          onPress={(address) => this.onAddAddressRequest(address)}
          buttonText='check_out_screen_address_add_button_text'
          isLoading={isAddingAddress}
          cities={cities}
          error={addAddressError}
        />
      </View>
    );
  }
}

export default CheckOut;
