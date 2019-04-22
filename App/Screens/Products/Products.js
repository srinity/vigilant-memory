import React, { Component } from 'react';
import {
    SafeAreaView,
    FlatList,
} from 'react-native';
import { find as _find, map as _map } from 'lodash';
import memoize from 'memoize-one';

import { ProductCard } from './../../Components';

import styles from './Products.Styles';


class Products extends Component {
    componentDidMount() {
        this.props.getCategoryProducts(this.props.title, this.props.products);
    }

    onAddToCartPress = (productInfo) => {
        console.tron.error(productInfo);
    }

    onDropDownValueChange = (value) => {
        this.props.getCategoryProducts(value, this.props.products);
    }

    constructProductCardStyle = (width, height) => {
        if (height > width) {
            return { flex: 0, height: height / 3, width: (width / 2) - 10 };
        }

        return { flex: 0, height: width / 3, width: (height / 2) - 10 };
    }

    constructDropDownData = (products) => {
        return _map(products, product => ({ value: product.category }));
    }

    constructProductCardStyleMemoized = memoize(this.constructProductCardStyle)
    constructDropDownDataMemoized = memoize(this.constructDropDownData)

    renderProduct = ({ item, index }) => {
        return (
            <ProductCard
                key={`${item.productName}${index}`}
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
        const dropDownData = this.constructDropDownDataMemoized(this.props.products);

        console.tron.warn(this.props);
        return (
            <SafeAreaView style={styles.constainerStyle}>
                <FlatList
                    data={this.props.displayProduct}
                    renderItem={this.renderProduct}
                    numColumns={2}
                />
            </SafeAreaView>
        );
    }
}

export default Products;
