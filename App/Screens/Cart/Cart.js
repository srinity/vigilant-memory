import React, { Component } from 'react';
import { View, FlatList, SafeAreaView, Text } from 'react-native';
import memoize from 'memoize-one';
import CheckBox from 'react-native-check-box';
import {
    map as _map,
    find as _find,
    get as _get,
    reduce as _reduce,
    has as _has
} from 'lodash';

import { CartProduct, Button } from './../../Components';

import { Colors } from '../../Theme';

import styles from './Cart.Styles';

const getCartAsArray = (cart = {}) => {
    return _map(cart, (val, key) => ({
            shopName: key,
            products: _map(val, value => ({ shopName: key, ...value }))
        }));
};

class Cart extends Component {
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.cart && Object.keys(nextProps.cart).length !== prevState.cart.length) {
            const otherState = -_has(nextProps.cart, prevState.checkedShop) 
                ? {} : { checkedShop: undefined };

            return { cart: getCartAsArray(nextProps.cart), ...otherState };
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

    onShopPress = ({ shopName }) => {
        let newValue = shopName;

        if (shopName === this.state.checkedShop) {
            newValue = undefined;
        }

        this.setState({ checkedShop: newValue });
    }

    onCartProductQuantityChange = (product, newQuantity) => {
        const { cart } = this.state;
        // console.tron.log(product, newQuantity);
        const newCart = _map(cart, shop => {
            if (shop.shopName !== product.shopName) {
                return shop;
            }

            const productsWithNewQuantity = _map(shop.products, shopProduct => {
                if (shopProduct.productName !== product.productName || shopProduct.category !== product.category) {
                    return shopProduct;
                }

                return { ...shopProduct, quantity: newQuantity };
            });

            return {
                ...shop,
                products: productsWithNewQuantity
            };
        });

        this.setState({ cart: newCart });
    }

    onBuyButtonPress = () => {
        const { buyShopProducts, cart, user } = this.props;

        const productsToBuy = _find(this.state.cart,
            shop => shop.shopName === this.state.checkedShop);

        console.tron.error(productsToBuy);
        buyShopProducts(user, productsToBuy, cart);
    }

    renderShop = ({ item }) => {
        const { shopName, products } = item;
        const onShopPress = this.onShopPress.bind(this, item); 

        return (
            <View style={styles.shopContainerStyle}>
                <CheckBox
                    style={styles.shopCheckBoxStyle}
                    onClick={onShopPress}
                    isChecked={this.state.checkedShop === shopName}
                    rightText={shopName}
                    rightTextStyle={styles.shopCheckBoxTextStyle}
                    checkedCheckBoxColor={Colors.brandColorHexCode}
                    uncheckedCheckBoxColor={Colors.blackColorHexCode}
                />
                <FlatList
                    data={products}
                    renderItem={this.renderCartProduct}
                />
            </View>
        );
    }

    renderCartProduct = ({ item, index }) => {
        const onQuantityChange = this.onCartProductQuantityChange.bind(this, item);

        return (
            <CartProduct
                key={index}
                image={item.imgUrl}
                name={item.productName}
                price={item.price}
                quantity={item.quantity}
                onQuantityChange={onQuantityChange}
            />
        );
    }

    render() {
        // console.tron.error(this.props);
        // console.tron.error(this.state);
        const selectedShop = _find(this.state.cart, shop => shop.shopName === this.state.checkedShop) || {};
        const selectedShopItemsCount = _get(selectedShop, 'products.length', 0);
        const totalPrice = _reduce(selectedShop.products, (sum, product) => {
            return sum + ((product.quantity || 1) * product.price);
        }, 0);
        

        return (
            <SafeAreaView style={styles.containerStyle}>
                <FlatList
                    data={this.state.cart}
                    renderItem={this.renderShop}
                    extraData={this.state.checkedShop}
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
                            title={`Buy (${selectedShopItemsCount})`}
                            style={styles.buyButtonStyle}
                            textStyle={styles.buyButtonTextStyle}
                            isLoading={this.props.isLoading}
                            disabled={this.props.isLoading}
                            onPress={this.onBuyButtonPress}
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
