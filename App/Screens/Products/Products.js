import React, { Component } from 'react';
import {
    View,
    SafeAreaView,
    TouchableOpacity,
    TouchableNativeFeedback,
    StyleSheet,
    Platform,
    ActivityIndicator
} from 'react-native';
import { map as _map } from 'lodash';
import memoize from 'memoize-one';
import { Dropdown } from 'react-native-material-dropdown';

import { ProductCard, Icon, IconTypes, CustomFlatList } from './../../Components';

import { CartActions } from '../../Store/Actions';

import { ImageHostUrl } from '../../Config/APIConfig';

import { Colors } from '../../Theme';

import styles from './Products.Styles';


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
        this.fetchCategoryProducts();
    }

    componentWillUnmount() {
        this.props.cleanCategoryProductsData();
    }

    onViewModeChange = (newViewMode) => {
        this.setState({ viewMode: newViewMode });
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

    onAddToCartPress = (productInfo, quantity) => {
        const { _id: shopId, shopName, addToCart, cart } = this.props;
        const product = { ...productInfo, quantity };
        addToCart(shopId, shopName, product, cart);
    }

    onRemoveFromCartPress = (productInfo) => {
        const { _id: shopId, shopName, removeFromCart, cart } = this.props;
        removeFromCart(shopId, shopName, productInfo, cart);
    }

    onCartProductQuantityChange = (productInfo, quantity) => {
        const { _id: shopId, shopName, changeCartProductQuantity, cart } = this.props;
        const product = { ...productInfo, quantity };
        changeCartProductQuantity(shopId, shopName, product, cart);
    }

    onDropDownValueChange = (value) => {
        if (value !== this.state.activeCategory) {
            this.setState({ activeCategory: value }, () => {
                this.fetchCategoryProducts(true);
            });
        }
    }

    fetchCategoryProducts = (shouldCleanData = false) => {
        const {
            getCategoryProducts,
            _id: shopId,
            categoryProducts,
            allCategoryProductsCount,
            currentOffset,
            currentLimit
        } = this.props;

        getCategoryProducts(
            shopId,
            this.state.activeCategory,
            categoryProducts,
            currentLimit,
            currentOffset,
            allCategoryProductsCount,
            shouldCleanData
        );
    }

    fetchNextProducts = () => {
        this.fetchCategoryProducts(false);
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

    constructProductCardStyleMemoized = memoize(this.constructProductCardStyle)

    renderViewingOption = (viewOption = {}, viewMode) => {
        const TouchableComponent = Platform.OS === 'ios' ? TouchableOpacity : TouchableNativeFeedback;
        const isDisabled = viewMode === viewOption.mode;
        const color = isDisabled ? Colors.whiteColorHexCode : Colors.blackColorHexCode;
        const style = isDisabled ? 
            StyleSheet.flatten([styles.viewingOptionStyle, styles.activeViewingOptionStyle])
            : styles.viewingOptionStyle;

        return (
            <TouchableComponent
                onPress={() => this.onViewModeChange(viewOption.mode)}
                disabled={isDisabled}
            >
                <View style={style}>
                    <Icon type={viewOption.type} name={viewOption.name} size={25} color={color} />
                </View>
            </TouchableComponent>
        );
    }

    renderProductsFooter = () => {
        const { areExtraCategoryProductsLoading, noMoreCategoryProducts } = this.props;

        return (
            areExtraCategoryProductsLoading && !noMoreCategoryProducts
            ? (
                <View style={styles.activityIndicatorContainerStyle}>
                    <ActivityIndicator color={Colors.brandColorHexCode} size='large' />
                </View>
            ) :
            null
        );
    }

    renderProduct = ({ item }) => {
        const { viewMode } = this.state;
        const horizontal = viewMode === 'list';
        const { cart, _id: shopId, width, height } = this.props;
        const initialQuantity = CartActions.getProductQuantityInCart(item, shopId, cart);

        return (
            <ProductCard
                horizontal={horizontal}
                image={`${ImageHostUrl}${item.imgUrl}`}
                name={item.productName}
                price={item.price}
                containerStyle={this.constructProductCardStyleMemoized(width, height, horizontal)}
                onQuantityChange={(quantity) => this.onProductQuantityChange(item, quantity)}
                initialQuantity={initialQuantity}
            />
        );
    }

    render() {
        const { viewMode, activeCategory } = this.state;
        const { categories, categoryProducts, areCategoryProductsLoading } = this.props;

        console.tron.warn(this.props);
        return (
            <SafeAreaView style={styles.containerStyle}>
                <View style={styles.headerOptionsContainerStyle}>
                    <View style={styles.containerStyle}>
                        <Dropdown
                            value={activeCategory}
                            data={categories}
                            onChangeText={this.onDropDownValueChange}
                            baseColor={Colors.brandColorHexCode}
                            dropdownPosition={0}
                        />
                    </View>
                    <View style={styles.containerStyle} />

                    <View style={styles.viewingOptionsContainerStyle}>
                        {_map(this.viewModes, (value) => this.renderViewingOption(value, this.state.viewMode))}
                    </View>
                </View>

                <CustomFlatList
                    indicatorSize='large'
                    indicatorColor={Colors.brandColorHexCode}
                    isLoading={areCategoryProductsLoading}
                    emptyText='No Products Available'
                    key={viewMode}
                    data={categoryProducts}
                    renderItem={this.renderProduct}
                    numColumns={viewMode === 'grid' ? 2 : 1}
                    keyExtractor={product => product._id}
                    ListFooterComponent={this.renderProductsFooter()}
                    onEndReached={this.fetchNextProducts}
                    onEndReachedThreshold={0.5}
                />
            </SafeAreaView>
        );
    }
}

export default Products;
