import React, { Component } from 'react';
import {
    View,
    SafeAreaView,
    FlatList,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { map as _map, findIndex as _findIndex } from 'lodash';
import memoize from 'memoize-one';
import { Dropdown } from 'react-native-material-dropdown';

import { ProductCard, Icon, IconTypes } from './../../Components';

import styles from './Products.Styles';
import { Colors } from '../../Theme';


class Products extends Component {
    constructor(props) {
        super(props);

        this.viewModes = [
            {
                mode: 'grid',
                type: IconTypes.entypo,
                name: 'grid'
            },
            {
                mode: 'list',
                type: IconTypes.entypo,
                name: 'list'
            }
        ];

        this.state = {
            viewMode: this.viewModes[0].mode,
            activeCategory: props.category
        };
    }

    componentDidMount() {
        this.props.getCategoryProducts(this.state.activeCategory, this.props.products);
    }

    onViewModeChange = (newViewMode) => {
        this.setState({ viewMode: newViewMode });
    }

    onAddToCartPress = (productInfo) => {
        console.tron.error(productInfo);
        const product = { ...productInfo, quantity: 1 };
        this.props.addToCart(this.props.shop, product, this.props.cart);
    }

    onRemoveFromCartPress = (productInfo) => {
        console.tron.error(productInfo);
        this.props.removeFromCart(this.props.shop, productInfo, this.props.cart);
    }

    onDropDownValueChange = (value) => {
        if (value !== this.state.activeCategory) {
            this.setState({ activeCategory: value });
            this.props.getCategoryProducts(value, this.props.products);
        }
    }

    checkIfIProductsInCart = (product) => {
        const { cart, shop } = this.props;

        return _findIndex(cart[shop], item =>
            item.productName === product.productName && item.category === product.category) !== -1;
    }

    constructProductCardStyle = (width, height, horizontal) => {
        if (horizontal) {
            if (height > width) {
                return { flex: 0, height: height / 6, width: width - 20 };
            }
    
            return { flex: 0, height: width / 6, width: height - 20 };
        }

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

    renderViewingOption = (viewOption = {}, viewMode) => {
        const isDisabled = viewMode === viewOption.mode;
        const color = isDisabled ? Colors.whiteColorHexCode : Colors.blackColorHexCode;
        const style = isDisabled ? 
            StyleSheet.flatten([styles.viewingOptionStyle, styles.activeViewingOptionStyle])
            : styles.viewingOptionStyle;

        return (
            <TouchableOpacity
                onPress={() => this.onViewModeChange(viewOption.mode)}
                disabled={isDisabled}
                style={style}
            >
                <Icon type={viewOption.type} name={viewOption.name} size={25} color={color} />
            </TouchableOpacity>
        );
    }

    renderProduct = ({ item, index }) => {
        const { viewMode } = this.state;
        const horizontal = viewMode === 'list';
        const isInCart = this.checkIfIProductsInCart(item);
        const buttonTitle = isInCart ? 'Remove From Cart' : 'Add To Cart';
        const iconName = isInCart ? 'trash-can' : 'cart-plus';
        const iconColor = isInCart ? Colors.dangerColorHexCode : Colors.brandColorHexCode;
        const onPress = isInCart ? () => this.onRemoveFromCartPress(item) : () => this.onAddToCartPress(item);
        console.tron.log(isInCart);

        return (
            <ProductCard
                key={`${item.productName}${index}`}
                horizontal={horizontal}
                image={item.imgUrl}
                name={item.productName}
                price={item.price}
                buttonTitle={buttonTitle}
                containerStyle={this.constructProductCardStyleMemoized(this.props.width, this.props.height, horizontal)}
                onPress={onPress}
                icon={iconName}
                iconType={IconTypes.materialCommunity}
                iconColor={iconColor}
            />
        );
    }

    render() {
        const { viewMode, activeCategory } = this.state;
        const dropDownData = this.constructDropDownDataMemoized(this.props.products);

        console.tron.warn(this.props);
        return (
            <SafeAreaView style={styles.containerStyle}>
                <View style={styles.headerOptionsContainerStyle}>
                    <View style={styles.containerStyle}>
                        <Dropdown
                            value={activeCategory}
                            data={dropDownData}
                            onChangeText={this.onDropDownValueChange}
                        />
                    </View>
                    <View style={styles.containerStyle} />

                    <View style={styles.viewingOptionsContainerStyle}>
                        {_map(this.viewModes, (value) => this.renderViewingOption(value, this.state.viewMode))}
                    </View>
                </View>

                <FlatList
                    key={viewMode}
                    data={this.props.displayProduct}
                    renderItem={this.renderProduct}
                    numColumns={viewMode === 'grid' ? 2 : 1}
                    extraData={this.props.cart}
                />
            </SafeAreaView>
        );
    }
}

export default Products;
