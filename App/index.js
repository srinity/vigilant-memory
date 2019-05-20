import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Router, Scene, Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { isFunction as _isFunction, findIndex as _findIndex, get as _get } from 'lodash';

import { AuthSwitch, DeviceDimensions, ScreenTypes, IconTypes, BottomBar } from './Components';

import {
  AccountScreen,
  CartScreen,
  HomeScreen,
  LoginScreen,
  ProductsScreen,
  RegisterScreen,
  ShopScreen
} from './Screens';

import {
  DeviceDimensionsActions,
  AccountActions,
  ShopActions,
  ShopsActions,
  CartActions
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
      AuthSwitch: connect(state => ({ ...state.auth }))(AuthSwitch),
      DeviceDimensions: connect(null, dispatch => ({
        onDimensionsChanged: deviceDimensions =>
          dispatch(DeviceDimensionsActions.deviceDimensionsChanged(deviceDimensions))
      }))(DeviceDimensions),
      Login: connect(
        ({ deviceDimensions }) => ({ ...deviceDimensions }),
        dispatch => ({
          login: (email, password) => dispatch(AccountActions.login(email, password))
        })
      )(LoginScreen),
      Register: connect(
        ({ deviceDimensions }) => ({ ...deviceDimensions }),
        dispatch => ({
          register: (firstName, lastName, email, password, phone) =>
            dispatch(AccountActions.register(firstName, lastName, email, password, phone))
        })
      )(RegisterScreen),
      Home: connect(
        ({ deviceDimensions, auth, shops }) => ({ ...deviceDimensions, user: auth.user, ...shops }),
        dispatch => ({
          getShops: () => dispatch(ShopsActions.getShops())
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
          getProducts: () => dispatch(ShopActions.getProducts()),
          addToCart: (shop, product, cart) =>
            dispatch(CartActions.addToCart(shop, product, cart)),
          removeFromCart: (shop, product, cart) =>
            dispatch(CartActions.removeFromCart(shop, product, cart))
        })
      )(ShopScreen),
      Products: connect(
        ({ deviceDimensions, auth, shop, cart }) => ({
          ...deviceDimensions,
          user: auth.user,
          ...shop,
          ...cart
        }),
        dispatch => ({
          getCategoryProducts: (category, products) =>
            dispatch(ShopActions.getCategoryProducts(category, products)),
          addToCart: (shop, product, cart) =>
            dispatch(CartActions.addToCart(shop, product, cart)),
          removeFromCart: (shop, product, cart) =>
            dispatch(CartActions.removeFromCart(shop, product, cart))
        })
      )(ProductsScreen),
      Cart: connect(
        ({ deviceDimensions, auth, cart }) => ({
          ...deviceDimensions,
          user: auth.user,
          ...cart
        }),
        dispatch => ({
          removeFromCart: (shop, product, cart) =>
            dispatch(CartActions.removeFromCart(shop, product, cart)),
          buyShopProducts: (user, products, cart) => 
            dispatch(CartActions.buyShopProducts(user, products, cart))
        })
      )(CartScreen),
      Account: connect(
        ({ deviceDimensions, auth }) => ({
          ...deviceDimensions,
          user: auth.user
        }),
        dispatch => ({})
      )(AccountScreen),
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
        {/* <ConnectedComponents.AuthSwitch /> */}
        <ConnectedComponents.DeviceDimensions />

        <Router
          backAndroidHandler={() => {}}
          navigationBarStyle={styles.navBarStyle}
          titleStyle={styles.navBarTitleStyle}
          navBarButtonColor='#fff'
        >
          <Scene key='root' hideNavBar>
            {/* <Scene key={ScreenTypes.auth}>
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
            </Scene> */}
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
                // initial
                // hideNavBar
                component={ConnectedComponents.Cart}
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
