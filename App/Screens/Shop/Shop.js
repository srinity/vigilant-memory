import React, { Component } from 'react';
import {
    View,
    SafeAreaView,
    FlatList,
    Text,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { isArray as _isArray, findIndex as _findIndex } from 'lodash';
import memoize from 'memoize-one';

import { ProductCard, ShopHeader, IconTypes } from './../../Components';

import styles from './Shop.Styles';
import { Colors } from '../../Theme';

class Shop extends Component {
    componentDidMount() {
        this.props.getProducts();
    }

    onAddToCartPress = (productInfo) => {
        console.tron.error(productInfo);
        const product = { ...productInfo, quantity: 1 };
        this.props.addToCart(this.props.shopName, product, this.props.cart);
    }

    onRemoveFromCartPress = (productInfo) => {
        console.tron.error(productInfo);
        this.props.removeFromCart(this.props.shopName, productInfo, this.props.cart);
    }

    onShowMorePress = (category) => {
        Actions.products({ category, shop: this.props.shopName });
    }

    checkIfIProductsInCart = (product) => {
        const { cart, shopName } = this.props;

        return _findIndex(cart[shopName], item =>
            item.productName === product.productName && item.category === product.category) !== -1;
    }

    constructShopHeaderStyle = (width, height) => {
        if (height > width) {
            return { height: height / 3 };
        }

        return { height: width / 3 };
    }

    constructProductCardStyle = (width, height) => {
        if (height > width) {
            return { height: height / 4, width: (width / 2) - 20 };
        }

        return { height: width / 4, width: (height / 2) - 20 };
    }

    constructProductCardStyleMemoized = memoize(this.constructProductCardStyle)
    constructShopHeaderStyleMemoized = memoize(this.constructShopHeaderStyle)

    calculateSnapInterval = (width, height) => {
        return width > height ? height - 20 : width - 20;
    }

    renderProductsCategory = ({ item }) => {
        if (!_isArray(item.products) || item.products.length === 0) {
            return null;
        }

        return (
            <View style={styles.categoryContainerStyle}>
                <Text style={styles.categoryTextStyle}>{item.category}</Text>
                <FlatList
                    horizontal
                    data={item.products}
                    renderItem={this.renderProduct}
                    showsHorizontalScrollIndicator={false}
                    snapToInterval={this.calculateSnapInterval(this.props.width, this.props.height)}
                    extraData={this.props.cart}
                />
            </View>
        );
    }

    renderProduct = ({ item, index }) => {
        if (index > 10) {
            return null;
        } else if (index === 10) {
            return (
                <TouchableOpacity
                    style={[
                        this.constructProductCardStyleMemoized(this.props.width, this.props.height),
                        styles.showMoreContainerStyle
                    ]}
                    onPress={() => this.onShowMorePress(item.category)}
                >
                    <Text style={styles.showMoreTextStyle}>Show more</Text>
                </TouchableOpacity>
            );
        }

        const isInCart = this.checkIfIProductsInCart(item);
        const buttonTitle = isInCart ? 'Remove From Cart' : 'Add To Cart';
        const iconName = isInCart ? 'trash-can' : 'cart-plus';
        const iconColor = isInCart ? Colors.dangerColorHexCode : Colors.brandColorHexCode;
        const onPress = isInCart ? () => this.onRemoveFromCartPress(item) : () => this.onAddToCartPress(item);

        return (
            <ProductCard
                key={item.productName}
                image={item.imgUrl}
                name={item.productName}
                price={item.price}
                buttonTitle={buttonTitle}
                containerStyle={this.constructProductCardStyleMemoized(this.props.width, this.props.height)}
                onPress={onPress}
                icon={iconName}
                iconType={IconTypes.materialCommunity}
                iconColor={iconColor}
            />
        );
    }

    render() {
        console.tron.log(this.props);

        return (
            <SafeAreaView style={styles.containerStyle}>
                <ScrollView style={styles.containerStyle}>
                    <ShopHeader
                        image={this.props.shopImage}
                        name={this.props.shopName}
                        address={this.props.address}
                        icon='location-pin'
                        containerStyle={this.constructShopHeaderStyleMemoized(this.props.width, this.props.height)}
                    />

                    <FlatList
                        style={styles.categoriesContainerStyle}
                        data={this.props.products}
                        renderItem={this.renderProductsCategory}
                        showsVerticalScrollIndicator={false}
                        extraData={this.props.cart}
                    />
                </ScrollView>
            </SafeAreaView>
        );
    }
}

export default Shop;
