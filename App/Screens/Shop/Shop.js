import React, { Component } from 'react';
import {
    View,
    SafeAreaView,
    FlatList,
    Text,
    ScrollView,
    TouchableNativeFeedback,
    TouchableWithoutFeedback,
    Platform,
    ActivityIndicator
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { isArray as _isArray, map as _map } from 'lodash';
import memoize from 'memoize-one';

import { ProductCard, ShopHeader, CustomFlatList } from './../../Components';

import { CartActions } from './../../Store/Actions';

import { ImageHostUrl } from '../../Config/APIConfig';

import { Colors } from '../../Theme';

import styles from './Shop.Styles';

class Shop extends Component {
    componentDidMount() {
        this.fetchProducts();
    }

    componentWillUnmount() {
        this.props.cleanProductsData();
    }

    onAddToCartPress = (productInfo, quantity) => {
        const { _id: shopId, shopName, addToCart, cart, user } = this.props;
        console.tron.error(productInfo);
        const product = { ...productInfo, quantity };
        addToCart(shopId, shopName, product, cart, user);
    }

    onRemoveFromCartPress = (productInfo) => {
        const { _id: shopId, shopName, removeFromCart, cart, user } = this.props;
        console.tron.error(productInfo);
        removeFromCart(shopId, shopName, productInfo, cart, user);
    }

    onCartProductQuantityChange = (productInfo, quantity) => {
        const { _id: shopId, shopName, changeCartProductQuantity, cart, user } = this.props;
        console.tron.error(productInfo);
        const product = { ...productInfo, quantity };
        changeCartProductQuantity(shopId, shopName, product, cart, user);
    }

    onProductQuantityChange = (productInfo, quantity) => {
        const { cart, _id: shopId } = this.props;
        const isInCart = CartActions.checkIfIProductsInCart(productInfo, shopId, cart);

        if (!isInCart) {
            this.onAddToCartPress(productInfo, quantity);
        } else if (isInCart && quantity === 0) {
            this.onRemoveFromCartPress(productInfo);
        } else if (isInCart) {
            // quantity added to cart changed changed
            this.onCartProductQuantityChange(productInfo, quantity);
        }
    }

    onShowMorePress = (category) => {
        const { _id, shopName, shopImage, products } = this.props;

        const categories = _map(products, categoryProducts => ({
            label: categoryProducts.category,
            value: categoryProducts.category
        }));

        categories.splice(0, 0, { label: 'All Products', value: null });

        console.tron.error(categories);

        Actions.products({ category, categories, _id, shopName, shopImage });
    }

    fetchProducts = () => {
        const {
            _id: shopId,
            allProductsCount,
            currentOffset, currentLimit,
            getProducts,
            products,
            noMoreProducts,
            areExtraProductsLoading
        } = this.props;

        if (!noMoreProducts && !areExtraProductsLoading) {
            getProducts(shopId, products, currentLimit, currentOffset, allProductsCount);
        }
    }

    constructShopHeaderStyle = (width, height) => {
        if (height > width) {
            return { height: height / 3 };
        }

        return { height: width / 3 };
    }

    constructProductCardStyle = (width, height) => {
        if (height > width) {
            return { height: height / 3.5, width: (width / 2) - 20 };
        }

        return { height: width / 4, width: (height / 2) - 20 };
    }

    constructProductCardStyleMemoized = memoize(this.constructProductCardStyle)
    constructShopHeaderStyleMemoized = memoize(this.constructShopHeaderStyle)

    calculateSnapInterval = (width, height) => {
        return width > height ? height - 20 : width - 20;
    }

    renderProductsFooter = () => {
        const { areExtraProductsLoading, noMoreProducts } = this.props;

        return (
            areExtraProductsLoading && !noMoreProducts
            ? (
                <View
                    style={[
                        this.constructProductCardStyleMemoized(this.props.width, this.props.height),
                        styles.activityIndicatorContainerStyle
                    ]}
                >
                    <ActivityIndicator color={Colors.brandColorHexCode} size='large' />
                </View>
            ) :
            null
        );
    }

    renderProductsCategory = ({ item }) => {
        if (!_isArray(item.shopProducts) || item.shopProducts.length === 0) {
            return null;
        }

        const TouchableComponent = Platform.OS === 'ios' ?
            TouchableWithoutFeedback : TouchableNativeFeedback;

        return (
            <View style={styles.categoryContainerStyle}>
                <View style={styles.categoryHeaderContainerStyle}>
                    <Text style={styles.categoryTextStyle}>{item.category}</Text>

                    <TouchableComponent onPress={() => this.onShowMorePress(item.category)}>
                        <Text style={styles.showMoreTextStyle}>Show more</Text>
                    </TouchableComponent>
                </View>

                <FlatList
                    horizontal
                    data={item.shopProducts}
                    renderItem={this.renderProduct}
                    showsHorizontalScrollIndicator={false}
                    snapToInterval={this.calculateSnapInterval(this.props.width, this.props.height)}
                    keyExtractor={product => product._id}
                    ListFooterComponent={this.renderProductsFooter()}
                    onEndReached={this.fetchProducts}
                    onEndReachedThreshold={0.5}
                    style={{ width: this.props.width }}
                    // extraData={this.props.cart}
                />
            </View>
        );
    }

    renderProduct = ({ item }) => {
        const { cart, _id: shopId } = this.props;
        const initialQuantity = CartActions.getProductQuantityInCart(item, shopId, cart);

        return (
            <ProductCard
                image={`${ImageHostUrl}${item.imgUrl}`}
                name={item.productName}
                price={item.price}
                containerStyle={this.constructProductCardStyleMemoized(this.props.width, this.props.height)}
                onQuantityChange={(quantity) => this.onProductQuantityChange(item, quantity)}
                initialQuantity={initialQuantity}
            />
        );
    }

    render() {
        console.tron.log(this.props);
        const {
            shopImage,
            shopName,
            address,
            products,
            cart,
            areProductsLoading,
            width,
            height
        } = this.props;

        return (
            <SafeAreaView style={styles.containerStyle}>
                <ScrollView style={styles.containerStyle}>
                    <ShopHeader
                        image={`${ImageHostUrl}${shopImage}`}
                        name={shopName}
                        address={address ? `${address.district}, ${address.area}, ${address.city}` : ''}
                        icon='location-pin'
                        containerStyle={this.constructShopHeaderStyleMemoized(width, height)}
                    />

                    <CustomFlatList
                        indicatorSize='large'
                        indicatorColor={Colors.brandColorHexCode}
                        isLoading={areProductsLoading}
                        emptyText='No Products Available'
                        style={styles.categoriesContainerStyle}
                        data={products}
                        renderItem={this.renderProductsCategory}
                        showsVerticalScrollIndicator={false}
                        extraData={cart}
                        keyExtractor={category => category.category}
                    />
                </ScrollView>
            </SafeAreaView>
        );
    }
}

export default Shop;
