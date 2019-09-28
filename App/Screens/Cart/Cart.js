import React, { Component } from 'react';
import { View, FlatList, SafeAreaView, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import memoize from 'memoize-one';
import CheckBox from 'react-native-check-box';
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

import { CartProduct, Button, ScreenTypes, CustomFlatList } from './../../Components';

import { ImageHostUrl } from '../../Config/APIConfig';

import { Colors } from '../../Theme';

import styles from './Cart.Styles';

const getCartAsArray = (cart = {}) => {
    return _map(cart, (val, key) => ({
            ...val,
            products: _map(val.products, value => ({ shopId: key, shopName: val.shopName, ...value }))
        }));
};

class Cart extends Component {
    static getDerivedStateFromProps(nextProps, prevState) {
        const newCart = getCartAsArray(nextProps.cart) || [];

        if (newCart.length !== prevState.cart.length) {
            const otherState = -_has(nextProps.cart, prevState.checkedShop)
                ? {} : { checkedShop: undefined };
    
            return { cart: newCart, ...otherState };
        }

        const result = _flatten(_zipWith(newCart, prevState.cart, (newShop, oldShop) => {
            if (newShop.products.length !== oldShop.products.length) {
                return [true];
            }

            const products = _zipWith(newShop.products, oldShop.products, (newProduct, oldProduct) => {
                return (newProduct._id !== oldProduct._id || newProduct.quantity !== oldProduct.quantity);
            });

            return _filter(products, prodShouldChange => prodShouldChange)
        }));

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
        console.tron.warn(newProduct)
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

    renderShop = ({ item }) => {
        const { shopId, shopName, products } = item;
        const onShopPress = this.onShopPress.bind(this, item); 

        return (
            <View style={styles.shopContainerStyle}>
                <CheckBox
                    style={styles.shopCheckBoxStyle}
                    onClick={onShopPress}
                    isChecked={this.state.checkedShop === shopId}
                    rightText={shopName}
                    rightTextStyle={styles.shopCheckBoxTextStyle}
                    checkedCheckBoxColor={Colors.brandColorHexCode}
                    uncheckedCheckBoxColor={Colors.blackColorHexCode}
                />
                <FlatList
                    data={products}
                    renderItem={this.renderCartProduct}
                    keyExtractor={product => product._id}
                    extraData={this.props.cartItemsIsLoadingObject}
                />
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
        console.tron.error(this.props);
        console.tron.error(this.state);
        const selectedShop = _find(this.state.cart, shop => shop.shopId === this.state.checkedShop) || {};
        const selectedShopItemsCount = _get(selectedShop, 'products.length', 0);
        const totalPrice = _reduce(selectedShop.products, (sum, product) => {
            return sum + ((product.quantity || 1) * product.price);
        }, 0);
        

        return (
            <SafeAreaView style={styles.containerStyle}>
                <CustomFlatList
                    data={this.state.cart}
                    renderItem={this.renderShop}
                    extraData={this.state.checkedShop}
                    keyExtractor={shop => shop.shopId}
                    isLoading={this.props.cartItemsAreLoading}
                    indicatorColor={Colors.brandColorHexCode}
                />

                {
                    this.state.checkedShop
                    ?
                    <View style={styles.purchaseInfoContainerStyle}>
                        <View style={styles.priceContainerStyle}>
                            <Text style={styles.totalTextStyle}>Total</Text>
                            <Text style={styles.priceTextStyle}> {totalPrice} EGP</Text>
                        </View>

                        <Button
                            title={`Check Out (${selectedShopItemsCount})`}
                            style={styles.buyButtonStyle}
                            textStyle={styles.buyButtonTextStyle}
                            isLoading={this.props.isLoading}
                            disabled={this.props.isLoading}
                            onPress={this.onCheckOutButtonPress}
                            disabledStyle={styles.buyButtonDisabledStyle}
                        />
                    </View>
                    :
                    null
                }
            </SafeAreaView>
        );
    }
}

export default Cart;
