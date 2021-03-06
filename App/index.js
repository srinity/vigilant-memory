import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Router, Scene, Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { isFunction as _isFunction, findIndex as _findIndex, get as _get } from 'lodash';
import I18n from 'react-native-i18n';

import { AuthSwitch, DeviceDimensions, ScreenTypes, IconTypes, BottomBar } from './Components';

import {
  AccountScreen,
  AddressBookScreen,
  CartScreen,
  ChangePasswordScreen,
  CheckOutScreen,
  ForgotPasswordScreen,
  ForgotPasswordVerificationCodeScreen,
  HomeScreen,
  LoginScreen,
  ProductsScreen,
  RegisterScreen,
  SetForgetenPasswordScreen,
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
        label: I18n.t('bottom_bar_home_text'),
        barColor: Colors.whiteColorHexCode,
        pressColor: 'rgba(255, 255, 255, 0.16)'
      },
      {
        key: 'cart',
        type: IconTypes.entypo,
        icon: 'shopping-cart',
        label: I18n.t('bottom_bar_cart_text'),
        barColor: Colors.whiteColorHexCode,
        pressColor: 'rgba(255, 255, 255, 0.16)'
      },
      {
        key: 'account',
        type: IconTypes.materialCommunity,
        icon: 'account',
        label: I18n.t('bottom_bar_account_text'),
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
          registerUserNotificationToken: (token, user) => dispatch(UserActions.registerUserNotificationToken(token, user)),
          setActiveTab: (tabName) => this.setActiveTab(tabName),
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
      ForgotPassword: connect(
        ({ deviceDimensions, auth }) => ({ ...deviceDimensions, ...auth }),
        dispatch => ({
          forgotPassword: (phone) => dispatch(AccountActions.forgotPassword(phone))
        })
      )(ForgotPasswordScreen),
      ForgotPasswordVerificationCode: connect(
        ({ deviceDimensions, auth }) => ({ ...deviceDimensions, ...auth }),
        dispatch => ({
          verifyCode: (code, user, onVerify) =>
            dispatch(AccountActions.verifyCode(code, user, onVerify)),
          sendVerificationCode: (phone, shouldNavigate) =>
            dispatch(AccountActions.forgotPassword(phone, shouldNavigate))
        })
      )(ForgotPasswordVerificationCodeScreen),
      SetForgetenPassword: connect(
        ({ deviceDimensions, auth }) => ({ ...deviceDimensions, ...auth }),
        dispatch => ({
          resetPassword: (oldPassword, newPassword, user) =>
            dispatch(AccountActions.resetPassword(oldPassword, newPassword, user)),
        })
      )(SetForgetenPasswordScreen),
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
          buyShopProducts: (user, shopId, products, userAddress, cart, onBuy) => 
            dispatch(CartActions.buyShopProducts(user, shopId, products, userAddress, cart, onBuy)),
          selectShippingAddress: (addressId) =>
            dispatch(UserActions.selectShippingAddress(addressId)),
          addAddress: (user, address) => dispatch(UserActions.addAddress(user, address)),
          setActiveTab: (tabName) => this.setActiveTab(tabName),
        })
      )(CheckOutScreen),
      Account: connect(
        ({ deviceDimensions, auth, user }) => ({
          ...deviceDimensions,
          user: auth.user,
          isLoggedIn: auth.isLoggedIn,
          ...user
        }),
        dispatch => ({
          getUserInfo: (user) => dispatch(UserActions.getUserInfo(user)),
          logout: () => dispatch(AccountActions.logout()),
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
      ChangePassword: connect(
        ({ deviceDimensions, auth }) => ({
          ...deviceDimensions,
          user: auth.user,
          isResettingPassword: auth.isResettingPassword,
        }),
        dispatch => ({
          resetPassword: (oldPassword, newPassword, user, onReset) =>
            dispatch(AccountActions.resetPassword(oldPassword, newPassword, user, onReset)),
        })
      )(ChangePasswordScreen),
    };
  }

  onTabBackClick = () => {
    this.handleBottomBarVisibility();
    if (_isFunction(this.bottomBar.setActiveTab) && Actions.currentScene === 'home') {
      this.bottomBar.setActiveTab('home');
    }
  }

  setActiveTab = (tabName = 'home') => {
    this.bottomBar.setActiveTab(tabName);
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
                title={I18n.t('header_login_title')}
                component={ConnectedComponents.Login}
              />
              <Scene
                key='register'
                // initial
                hideNavBar
                title={I18n.t('header_register_title')}
                component={ConnectedComponents.Register}
              />
              <Scene
                key='verificationCode'
                // initial
                hideNavBar
                title={I18n.t('header_verify_code_title')}
                component={ConnectedComponents.VerificationCode}
              />

              <Scene
                key='forgotPassword'
                // initial
                hideNavBar
                title={I18n.t('header_forget_password_title')}
                component={ConnectedComponents.ForgotPassword}
              />

              <Scene
                key='forgotPasswordVerificationCode'
                // initial
                hideNavBar
                title={I18n.t('header_verify_code_title')}
                component={ConnectedComponents.ForgotPasswordVerificationCode}
              />

              <Scene
                key='resetPassword'
                // initial
                hideNavBar
                title={I18n.t('header_reset_password_title')}
                component={ConnectedComponents.SetForgetenPassword}
              />
            </Scene>
            <Scene key={ScreenTypes.app}>
              <Scene
                initial
                key='home'
                hideNavBar
                title={I18n.t('header_home_title')}
                component={ConnectedComponents.Home}
                onExit={this.handleBottomBarVisibility}
                onEnter={this.handleBottomBarVisibility}
              />
              <Scene
                key='shop'
                title={I18n.t('header_shop_title')}
                // initial
                component={ConnectedComponents.Shop}
              />
              <Scene
                key='products'
                title={I18n.t('header_products_title')}
                // initial
                // hideNavBar
                component={ConnectedComponents.Products}
              />

              <Scene
                key='cart'
                title={I18n.t('header_cart_title')}
                onExit={this.onTabBackClick}
                onEnter={this.handleBottomBarVisibility}
                // initial
                // hideNavBar
                component={ConnectedComponents.Cart}
              />

              <Scene
                key='checkOut'
                title={I18n.t('header_check_out_title')}
                // initial
                // hideNavBar
                component={ConnectedComponents.CheckOut}
              />

              <Scene
                key='account'
                title={I18n.t('header_account_title')}
                onExit={this.onTabBackClick}
                onEnter={this.handleBottomBarVisibility}
                // initial
                // hideNavBar
                component={ConnectedComponents.Account}
              />

              <Scene
                key='addressBook'
                title={I18n.t('header_address_book_title')}
                // initial
                // hideNavBar
                component={ConnectedComponents.AddressBook}
              />

              <Scene
                key='changePassword'
                title={I18n.t('header_change_password_title')}
                // initial
                // hideNavBar
                component={ConnectedComponents.ChangePassword}
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
