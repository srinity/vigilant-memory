import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Router, Scene, Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { isFunction as _isFunction, findIndex as _findIndex, get as _get } from 'lodash';

import { AuthSwitch, DeviceDimensions, ScreenTypes, IconTypes, BottomBar } from './Components';

import {
  AccountScreen,
  AddressBookScreen,
  CartScreen,
  CheckOutScreen,
  HomeScreen,
  LoginScreen,
  ProductsScreen,
  RegisterScreen,
  ShopScreen,
  VerificationCodeScreen
} from './Screens';

import {
  DeviceDimensionsActions,
  AccountActions,
  ShopActions,
  ProductsActions,
  ShopsActions,
  CartActions,
  UserActions
} from './Store/Actions';

import { Colors } from './Theme';

const screensWithBottomBar = ['home', 'cart', 'account'];

class AppRouter extends Component {
  constructor(props) {
    super(props);

    this.tabs = [
      {
        key: 'home',
        type: IconTypes.entypo,
        icon: 'home',
        label: 'Home',
        barColor: Colors.whiteColorHexCode,
        pressColor: 'rgba(255, 255, 255, 0.16)'
      },
      {
        key: 'cart',
        type: IconTypes.entypo,
        icon: 'shopping-cart',
        label: 'Cart',
        barColor: Colors.whiteColorHexCode,
        pressColor: 'rgba(255, 255, 255, 0.16)'
      },
      {
        key: 'account',
        type: IconTypes.materialCommunity,
        icon: 'account',
        label: 'Account',
        barColor: Colors.whiteColorHexCode,
        pressColor: 'rgba(255, 255, 255, 0.16)'
      }
    ];

    this.connectedComponents = {
      AuthSwitch: connect(
        ({ auth, cart }) => ({ ...auth, ...cart }),
        dispatch => ({
          uploadUserCart: (cart, user) => dispatch(CartActions.uploadUserCart(cart, user)),
          getSearchAreas: () => dispatch(ShopsActions.getSearchAreas()),
          refreshToken: (user) => dispatch(AccountActions.refreshToken(user)),
          getUserInfo: (user) => dispatch(UserActions.getUserInfo(user)),
        })
      )(AuthSwitch),
      DeviceDimensions: connect(null, dispatch => ({
        onDimensionsChanged: deviceDimensions =>
          dispatch(DeviceDimensionsActions.deviceDimensionsChanged(deviceDimensions))
      }))(DeviceDimensions),
      Login: connect(
        ({ deviceDimensions, auth }) => ({ ...deviceDimensions, ...auth }),
        dispatch => ({
          login: (phone, password) => dispatch(AccountActions.login(phone, password))
        })
      )(LoginScreen),
      Register: connect(
        ({ deviceDimensions, auth }) => ({ ...deviceDimensions, ...auth }),
        dispatch => ({
          register: (firstName, lastName, email, password, phone, birthDate, gender) =>
            dispatch(AccountActions.register(firstName, lastName, email, password, phone, birthDate, gender))
        })
      )(RegisterScreen),
      VerificationCode: connect(
        ({ deviceDimensions, auth }) => ({ ...deviceDimensions, ...auth }),
        dispatch => ({
          verifyCode: (code, user) =>
            dispatch(AccountActions.verifyCode(code, user)),
          sendVerificationCode: (user) =>
            dispatch(AccountActions.sendVerificationCode(user))
        })
      )(VerificationCodeScreen),
      Home: connect(
        ({ deviceDimensions, auth, shops }) => ({ ...deviceDimensions, user: auth.user, ...shops }),
        dispatch => ({
          getShops: (city, area, district) => dispatch(ShopsActions.getShops(city, area, district)),
          getSearchAreas: () => dispatch(ShopsActions.getSearchAreas())
        })
      )(HomeScreen),
      Shop: connect(
        ({ deviceDimensions, auth, shop, cart }) => ({
            ...deviceDimensions,
            user: auth.user,
            ...shop,
            ...cart
        }),
        dispatch => ({
          getProducts: (shopId, products, currentLimit, currentOffset, productsCount) =>
            dispatch(ShopActions.getProducts(shopId, products, currentLimit, currentOffset, productsCount)),
          cleanProductsData: () => dispatch(ShopActions.cleanProductsData()),
          addToCart: (shopId, shopName, product, cart, user) =>
            dispatch(CartActions.addToCart(shopId, shopName, product, cart, user)),
          removeFromCart: (shopId, shopName, product, cart, user) =>
            dispatch(CartActions.removeFromCart(shopId, shopName, product, cart, user)),
          changeCartProductQuantity: (shopId, shopName, product, cart, user) =>
            dispatch(CartActions.changeCartProductQuantity(shopId, shopName, product, cart, user)),
        })
      )(ShopScreen),
      Products: connect(
        ({ deviceDimensions, auth, products, cart }) => ({
          ...deviceDimensions,
          user: auth.user,
          ...products,
          ...cart
        }),
        dispatch => ({
          getCategoryProducts: (shopId, category, products, currentLimit, currentOffset, productsCount, shouldCleanData) =>
            dispatch(ProductsActions.getCategoryProducts(shopId, category, products, currentLimit, currentOffset, productsCount, shouldCleanData)),
          cleanCategoryProductsData: () => dispatch(ProductsActions.cleanCategoryProductsData()),
          addToCart: (shopId, shopName, product, cart, user) =>
            dispatch(CartActions.addToCart(shopId, shopName, product, cart, user)),
          removeFromCart: (shopId, shopName, product, cart, user) =>
            dispatch(CartActions.removeFromCart(shopId, shopName, product, cart, user)),
          changeCartProductQuantity: (shopId, shopName, product, cart, user) =>
            dispatch(CartActions.changeCartProductQuantity(shopId, shopName, product, cart, user)),
        })
      )(ProductsScreen),
      Cart: connect(
        ({ deviceDimensions, auth, cart }) => ({
          ...deviceDimensions,
          user: auth.user,
          isLoggedIn: auth.isLoggedIn,
          ...cart
        }),
        dispatch => ({
          removeFromCart: (shopId, shopName, product, cart, user) =>
            dispatch(CartActions.removeFromCart(shopId, shopName, product, cart, user)),
          changeCartProductQuantity: (shopId, shopName, product, cart, user) =>
            dispatch(CartActions.changeCartProductQuantity(shopId, shopName, product, cart, user)),
          getUserCart: (user) => dispatch(CartActions.getUserCart(user)),
          buyShopProducts: (user, products, cart) => 
            dispatch(CartActions.buyShopProducts(user, products, cart))
        })
      )(CartScreen),
      CheckOut: connect(
        ({ deviceDimensions, auth, cart, user, shops }) => ({
          ...deviceDimensions,
          user: auth.user,
          isLoggedIn: auth.isLoggedIn,
          ...cart,
          ...user,
          cities: shops.cities
        }),
        dispatch => ({
          buyShopProducts: (user, products, cart) => 
            dispatch(CartActions.buyShopProducts(user, products, cart)),
          selectShippingAddress: (addressId) =>
            dispatch(UserActions.selectShippingAddress(addressId)),
          addAddress: (user, address) => dispatch(UserActions.addAddress(user, address)),
        })
      )(CheckOutScreen),
      Account: connect(
        ({ deviceDimensions, auth, user }) => ({
          ...deviceDimensions,
          user: auth.user,
          ...user
        }),
        dispatch => ({
          getUserInfo: (user) => dispatch(UserActions.getUserInfo(user))
        })
      )(AccountScreen),
      AddressBook: connect(
        ({ deviceDimensions, auth, user, shops }) => ({
          ...deviceDimensions,
          user: auth.user,
          cities: shops.cities,
          ...user
        }),
        dispatch => ({
          selectShippingAddress: (addressId) =>
            dispatch(UserActions.selectShippingAddress(addressId)),
          addAddress: (user, address) => dispatch(UserActions.addAddress(user, address)),
          changeAddress: (user, address) => dispatch(UserActions.changeAddress(user, address)),
          deleteAddress: (user, addressId) => dispatch(UserActions.removeAddress(user, addressId)),
        })
      )(AddressBookScreen),
    };
  }

  onTabBackClick = () => {
    this.handleBottomBarVisibility();
    if (_isFunction(this.bottomBar.setActiveTab) && Actions.currentScene === 'home') {
      this.bottomBar.setActiveTab('home');
    }
  }

  setUpBottomBarRef = (comp) => {
    this.bottomBar = comp;
  }

  handleBottomBarVisibility = () => {
    const currentScene = Actions.currentScene;
    if (_findIndex(screensWithBottomBar, val => val === currentScene) === -1) {
      this.bottomBar.setBottomBarVisibility(false);
    } else {
      this.bottomBar.setBottomBarVisibility(true);
    }
  }


  render() {
    const ConnectedComponents = this.connectedComponents;

    return (
      <View style={styles.wrapperViewContainerStyle}>
        <ConnectedComponents.AuthSwitch />
        <ConnectedComponents.DeviceDimensions />

        <Router
          backAndroidHandler={() => {}}
          navigationBarStyle={styles.navBarStyle}
          titleStyle={styles.navBarTitleStyle}
          navBarButtonColor='#fff'
        >
          <Scene key='root' hideNavBar>
            <Scene key={ScreenTypes.auth}>
              <Scene
                key='login'
                initial
                hideNavBar
                title='Login'
                component={ConnectedComponents.Login}
              />
              <Scene
                key='register'
                // initial
                hideNavBar
                title='Register'
                component={ConnectedComponents.Register}
              />
              <Scene
                key='verificationCode'
                // initial
                hideNavBar
                title='Verify Code'
                component={ConnectedComponents.VerificationCode}
              />
            </Scene>
            <Scene key={ScreenTypes.app}>
              <Scene
                initial
                key='home'
                hideNavBar
                title='Home'
                component={ConnectedComponents.Home}
                onExit={this.handleBottomBarVisibility}
                onEnter={this.handleBottomBarVisibility}
              />
              <Scene
                key='shop'
                title='Shop'
                // initial
                component={ConnectedComponents.Shop}
              />
              <Scene
                key='products'
                title='Products'
                // initial
                // hideNavBar
                component={ConnectedComponents.Products}
              />

              <Scene
                key='cart'
                title='Cart'
                onExit={this.onTabBackClick}
                onEnter={this.handleBottomBarVisibility}
                initial
                // hideNavBar
                component={ConnectedComponents.Cart}
              />

              <Scene
                key='checkOut'
                title='Check Out'
                // initial
                // hideNavBar
                component={ConnectedComponents.CheckOut}
              />

              <Scene
                key='account'
                title='Account'
                onExit={this.onTabBackClick}
                onEnter={this.handleBottomBarVisibility}
                // initial
                // hideNavBar
                component={ConnectedComponents.Account}
              />

              <Scene
                key='addressBook'
                title='Shipping Addresses'
                // initial
                // hideNavBar
                component={ConnectedComponents.AddressBook}
              />
            </Scene>
          </Scene>
        </Router>
        <BottomBar ref={this.setUpBottomBarRef} tabs={this.tabs} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapperViewContainerStyle: {
    flex: 1
  },
  navBarStyle: {
    backgroundColor: Colors.brandColorHexCode
  },
  navBarTitleStyle: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center'
  }
});

export default AppRouter;
