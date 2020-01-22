import React, { Component } from 'react';
import { View, FlatList, SafeAreaView, Text, Platform, TouchableOpacity, TouchableNativeFeedback } from 'react-native';
import { Actions } from 'react-native-router-flux';
import CheckBox from 'react-native-check-box';
import I18n from 'react-native-i18n';
import {
  map as _map,
  find as _find,
  get as _get,
  reduce as _reduce,
  has as _has,
  zipWith as _zipWith,
  filter as _filter,
  flatten as _flatten,
  isNil as _isNil
} from 'lodash';

import { CartProduct, Button, ScreenTypes, CustomFlatList, LocalizedText, ShopHeader, Icon, IconTypes } from './../../Components';

import { ImageHostUrl } from '../../Config/APIConfig';

import { Colors } from '../../Theme';

import styles from './Cart.Styles';

const TouchableComponent = Platform.OS === 'ios' ? TouchableOpacity : TouchableNativeFeedback;

const getCartAsArray = (cart = {}) => {
  return _map(cart, (val, key) => ({
    ...val,
    products: _map(val.products, value => ({ shopId: key, shopName: val.shopName, ...value }))
  }));
};

class Cart extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    const newCart = getCartAsArray(nextProps.cart) || [];

    // if the new cart provided has changed than the current cart
    if (newCart.length !== prevState.cart.length) {
      const otherState = -_has(nextProps.cart, prevState.checkedShop)
        ? {} : { checkedShop: undefined };

      return { cart: newCart, ...otherState };
    }

    // create an array indicating that some product/quantity have changed
    const result = _flatten(_zipWith(newCart, prevState.cart, (newShop, oldShop) => {
      if (newShop.products.length !== oldShop.products.length) {
        return [true];
      }

      const products = _zipWith(newShop.products, oldShop.products, (newProduct, oldProduct) => {
        return (newProduct._id !== oldProduct._id || newProduct.quantity !== oldProduct.quantity);
      });

      return _filter(products, prodShouldChange => prodShouldChange)
    }));

    // if the cart changed then use the newly created cart from props
    if (result.length !== 0) {
      return { cart: newCart };
    }


    return null;
  }

  constructor(props) {
    super(props);

    this.state = {
      checkedShop: undefined,
      cart: getCartAsArray(props.cart) || []
    };
  }

  componentDidMount() {
    const { getUserCart, user } = this.props;

    if (!_isNil(user)) {
      getUserCart(user);
    }
  }

  onShopPress = ({ shopId }) => {
    let newValue = shopId;

    if (shopId === this.state.checkedShop) {
      newValue = undefined;
    }

    this.setState({ checkedShop: newValue });
  }

  onCartProductQuantityChange = (product, newQuantity) => {
    const { changeCartProductQuantity, cart, user } = this.props;
    const { shopId, shopName, ...productInfo } = product;

    const newProduct = { ...productInfo, quantity: newQuantity };
    changeCartProductQuantity(shopId, shopName, newProduct, cart, user);
  }

  onCheckOutButtonPress = () => {
    // const { buyShopProducts, cart, user } = this.props;

    // const productsToBuy = _find(this.state.cart,
    //     shop => shop.shopId === this.state.checkedShop);

    // console.tron.error(productsToBuy);
    // buyShopProducts(user, productsToBuy, cart);

    const { isLoggedIn, user, cart } = this.props;
    const { checkedShop } = this.state

    if (isLoggedIn && !user.inActive) {
      Actions.checkOut({ shopId: checkedShop, title: cart[checkedShop].shopName });
    } else {
      Actions[ScreenTypes.auth]();
    }
  }

  onRemoveFromCartPress = (item) => {
    const { cart, removeFromCart, user } = this.props;
    const { shopId, shopName, ...product } = item;

    removeFromCart(shopId, shopName, product, cart, user);
  }

  onEditAddressPress = () => {
    Actions.addressBook();
  }

  onBuyButtonPress = () => {
    const { user, buyShopProducts, cart, lastSelectedAddress, addresses, isLoggedIn } = this.props;
    const { checkedShop } = this.state;
    const deliveryAddress = _find(addresses, address => address._id === lastSelectedAddress);

    if (isLoggedIn && !user.inActive) {
      buyShopProducts(user, checkedShop, cart[checkedShop].products, deliveryAddress, cart, this.onBuySuccessful);
    } else {
      Actions[ScreenTypes.auth]();
    }
  }

  onBuySuccessful = () => {
    // this.props.setActiveTab('home');
    // Actions.popTo('home');
    Actions.orderSuccess();
  }

  renderOrderSummaryRow = (title, value) => {
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 }}>
        <Text>{I18n.t(title)}</Text>
        <Text style={{ color: Colors.brandColorHexCode }}>{value} {I18n.t('cart_screen_price_currency_text')}</Text>
      </View>
    );
  }

  renderShop = ({ item }) => {
    const { shopId, shopName, shopImage, shopAddress, products, deliveryCost = 0 } = item;
    const onShopPress = this.onShopPress.bind(this, item);
    const isChecked = this.state.checkedShop === shopId;
    const iconType = isChecked ? IconTypes.ant : IconTypes.entypo;
    const iconName = isChecked ? 'checkcircle' : 'circle';
    const shopCartTotalPrice = _reduce(products, (sum, product) => {
      return sum + ((product.quantity || 1) * product.price);
    }, 0);

    return (
      <View style={styles.shopContainerStyle}>
        <TouchableComponent onPress={onShopPress}>
          <View style={styles.shopHeaderStyle}>
            <ShopHeader
              image={`${ImageHostUrl}${shopImage}`}
              name={shopName}
              address={shopAddress ? `${shopAddress.city}-${shopAddress.area}-${shopAddress.district}` : ''}
              icon='location-pin'
            />

            <Icon type={iconType} name={iconName} color={Colors.brandColorHexCode} size={20} style={styles.shopHeaderIconStyle} />
          </View>
        </TouchableComponent>

        <FlatList
          data={products}
          renderItem={this.renderCartProduct}
          keyExtractor={product => product._id}
          extraData={this.props.cartItemsIsLoadingObject}
        />

        <View style={{ marginTop: 20, paddingHorizontal: 20, paddingBottom: 20 }}>
          {this.renderOrderSummaryRow('cart_screen_total_order_cost_text', shopCartTotalPrice)}
          {this.renderOrderSummaryRow('cart_screen_delivery_cost_text', deliveryCost)}
          <View style={{ height: 1, backgroundColor: Colors.blackColorHexCode, width: '100%' }} />
          {this.renderOrderSummaryRow('cart_screen_total_text', deliveryCost + shopCartTotalPrice)}
        </View>
      </View>
    );
  }

  renderCartProduct = ({ item, index }) => {
    const { cartItemsIsLoadingObject } = this.props;
    const onQuantityChange = this.onCartProductQuantityChange.bind(this, item);

    return (
      <CartProduct
        image={`${ImageHostUrl}${item.imgUrl}`}
        name={item.productName}
        price={item.price}
        quantity={item.quantity}
        onQuantityChange={onQuantityChange}
        onRemovePress={() => this.onRemoveFromCartPress(item)}
        isLoading={cartItemsIsLoadingObject[item._id]}
        indicatorColor={Colors.brandColorHexCode}
      />
    );
  }

  render() {
    const { lastSelectedAddress, addresses, isBuyingLoading } = this.props;
    const selectedAddress = _find(addresses, address => address._id === lastSelectedAddress);
    const selectedShop = _find(this.state.cart, shop => shop.shopId === this.state.checkedShop) || {};
    // const selectedShopItemsCount = _get(selectedShop, 'products.length', 0);
    // const totalPrice = _reduce(selectedShop.products, (sum, product) => {
    //   return sum + ((product.quantity || 1) * product.price);
    // }, 0);

    return (
      <SafeAreaView style={styles.containerStyle}>
        <View style={styles.deliveryInfoContainerStyle}>
          <LocalizedText>cart_screen_address_header_text</LocalizedText>
          <View style={styles.addressContainerStyle}>
            {
              selectedAddress ? (
                <View style={styles.addressDetailsContainerStyle}>
                  <Icon
                    type={IconTypes.entypo}
                    name='location-pin'
                    color='#d21706'
                    size={14}
                  />
                  <Text style={styles.addressTextStyle}>{selectedAddress.city}-{selectedAddress.area}-{selectedAddress.district}</Text>
                </View>
              ) : (
                  <LocalizedText style={styles.noAddressAvailableTextStyle}>cart_screen_no_address_available_text</LocalizedText>
                )
            }


            <TouchableComponent onPress={this.onEditAddressPress}>
              <View style={styles.editDeliveryAddressButtonStyle}>
                <LocalizedText style={styles.editDeliveryAddressButtonTextStyle}>cart_screen_edit_address_button_text</LocalizedText>
              </View>
            </TouchableComponent>
          </View>
        </View>
        <CustomFlatList
          data={this.state.cart}
          renderItem={this.renderShop}
          extraData={this.state.checkedShop}
          keyExtractor={shop => shop.shopId}
          isLoading={this.props.cartItemsAreLoading}
          indicatorColor={Colors.brandColorHexCode}
          emptyText='cart_screen_empty_text'
        />

        {
          this.state.checkedShop
            ? (
              <Button
                title='cart_screen_checkout_button_title'
                style={styles.buyButtonStyle}
                textStyle={styles.buyButtonTextStyle}
                isLoading={isBuyingLoading}
                disabled={!this.state.checkedShop || !lastSelectedAddress}
                onPress={this.onBuyButtonPress}
                disabledStyle={styles.buyButtonDisabledStyle}
                indicatorSize='small'
              />
            ) :
            null
        }
      </SafeAreaView>
    );
  }
}

export default Cart;
