import React, { Component } from 'react';
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  TouchableNativeFeedback,
  StyleSheet,
  Platform,
  ActivityIndicator,
  FlatList,
  I18nManager
} from 'react-native';
import { map as _map, get as _get, reduce as _reduce } from 'lodash';
import memoize from 'memoize-one';
import I18n from 'react-native-i18n';
import { Actions } from 'react-native-router-flux';

import { ProductCard, Icon, IconTypes, CustomFlatList, ShopHeader, Tag } from './../../Components';

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
      activeCategory: 'all'
    };
  }

  componentDidMount() {
    this.fetchCategoryProducts(false, true);
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
    const { _id: shopId, shopName, shopImage, address, addToCart, cart, user } = this.props;
    const product = { ...productInfo, quantity };
    addToCart(shopId, shopName, product, cart, user, shopImage, address);
  }

  onRemoveFromCartPress = (productInfo) => {
    const { _id: shopId, shopName, removeFromCart, cart, user } = this.props;
    removeFromCart(shopId, shopName, productInfo, cart, user);
  }

  onCartProductQuantityChange = (productInfo, quantity) => {
    const { _id: shopId, shopName, changeCartProductQuantity, cart, user } = this.props;
    const product = { ...productInfo, quantity };
    changeCartProductQuantity(shopId, shopName, product, cart, user);
  }

  onCategoryValueChange = (value) => {
    if (value !== this.state.activeCategory) {
      this.setState({ activeCategory: value }, () => {
        this.fetchCategoryProducts(true);
      });
    }
  }

  fetchCategoryProducts = (shouldCleanData = false, shouldFetchCategories = false) => {
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
      this.state.activeCategory === 'all' ? undefined : this.state.activeCategory,
      categoryProducts,
      currentLimit,
      currentOffset,
      allCategoryProductsCount,
      shouldCleanData,
      shouldFetchCategories
    );
  }

  fetchNextProducts = () => {
    this.fetchCategoryProducts(false);
  }

  constructProductCardStyle = (width, height, horizontal) => {
    if (horizontal) {
      if (height > width) {
        return { flex: 0, height: height / 9, width: width - 20 };
      }

      return { flex: 0, height: width / 9, width: height - 20 };
    }

    if (height > width) {
      return { flex: 0, height: height / 4.5, width: ((width - 30) / 2) };
    }

    return { flex: 0, height: width / 4.5, width: ((height - 30) / 2) };
  }

  constructProductCardStyleMemoized = memoize(this.constructProductCardStyle)

  onCartInfoPress = () => {
    Actions.cart();
  }

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

  renderCategories = ({ item }) => {
    const { activeCategory } = this.state;

    return (
      <Tag
        isActive={activeCategory === item.value}
        onPress={() => this.onCategoryValueChange(item.value)}
        title={item.label}
      />
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

  renderProduct = ({ item, index }) => {
    const { viewMode } = this.state;
    const { cart, _id: shopId, width, height } = this.props;

    const horizontal = viewMode === 'list';
    const isInCart = CartActions.checkIfIProductsInCart(item, shopId, cart);

    const additionalStyle = (!horizontal && index % 2 === 0) ? { marginRight: I18nManager.isRTL ? 0 : 10, marginLeft: I18nManager.isRTL ? 10 : 0 } : undefined;
    
    const iconSize = horizontal ? 30 : 25;

    const iconName = isInCart ? 'cart-off' : 'cart-plus';
    const iconColor = isInCart ? Colors.blackColorHexCode : Colors.brandColorHexCode;
    const onPress = isInCart ? () => this.onProductQuantityChange(item, 0) : () => this.onProductQuantityChange(item, 1);

    return (
      <ProductCard
        horizontal={horizontal}
        image={`${ImageHostUrl}${item.imgUrl}`}
        name={item.productName}
        price={item.price}
        containerStyle={StyleSheet.flatten([this.constructProductCardStyleMemoized(width, height, horizontal), additionalStyle])}
        onPress={onPress}
        iconName={iconName}
        iconColor={iconColor}
        iconSize={iconSize}
      />
    );
  }

  render() {
    const { viewMode, activeCategory } = this.state;
    const { categories, categoryProducts, areCategoryProductsLoading, shopImage, shopName, address, cart, _id: shopId } = this.props;

    const shopCart = _get(cart, shopId, {});
    const shopCartNumber = _get(shopCart, 'products.length', 0);
    const shopCartTotalPrice = _reduce(shopCart.products, (sum, product) => {
      return sum + ((product.quantity || 1) * product.price);
    }, 0);

    return (
      <SafeAreaView style={styles.containerStyle}>
        <ShopHeader
          image={`${ImageHostUrl}${shopImage}`}
          name={shopName}
          address={address ? `${address.city}-${address.area}-${address.district}` : ''}
          icon='location-pin'
        />

        <View style={styles.headerOptionsContainerStyle}>
          <View style={styles.containerStyle}>
            <FlatList
              data={categories}
              renderItem={this.renderCategories}
              horizontal
              showsHorizontalScrollIndicator={false}
              extraData={activeCategory}
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
          emptyText='products_screen_no_products_text'
          key={viewMode}
          data={categoryProducts}
          renderItem={this.renderProduct}
          numColumns={viewMode === 'grid' ? 2 : 1}
          keyExtractor={product => product._id}
          ListFooterComponent={this.renderProductsFooter()}
          onEndReached={this.fetchNextProducts}
          onEndReachedThreshold={0.5}
          style={{ marginHorizontal: 10 }}
          extraData={cart}
        />
        
        {
          shopCartNumber > 0 ? (
            <Tag
             title={`${I18n.t('products_screen_price_name_text')} ${shopCartNumber} ${I18n.t('products_screen_price_element_text')} ${shopCartTotalPrice} ${I18n.t('products_screen_price_currency_text')}`}
            //  isActive
             onPress={this.onCartInfoPress}
             style={styles.summaryContainerStyle}
             textStyle={styles.summaryTextStyle}
            />
          ) : null
        }
      </SafeAreaView>
    );
  }
}

export default Products;
