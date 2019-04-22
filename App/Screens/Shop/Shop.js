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
import { isArray as _isArray } from 'lodash';
import memoize from 'memoize-one';

import { ProductCard, ShopHeader } from './../../Components';

import styles from './Shop.Styles';

class Shop extends Component {
    componentDidMount() {
        this.props.getProducts();
    }

    onAddToCartPress = (productInfo) => {
        console.tron.error(productInfo);
    }

    onShowMorePress = (category) => {
        Actions.products({ title: category });
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

        return (
            <ProductCard
                key={item.productName}
                image={item.imgUrl}
                name={item.productName}
                price={item.price}
                buttonTitle='Add To Cart'
                containerStyle={this.constructProductCardStyleMemoized(this.props.width, this.props.height)}
                onPress={() => this.onAddToCartPress(item)}
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
                    />
                </ScrollView>
            </SafeAreaView>
        );
    }
}

export default Shop;
