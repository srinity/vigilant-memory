import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import Thunk from 'redux-thunk';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web and AsyncStorage for react-native

import Reactotron from './../Config/ReactotronConfig';

import {
  DeviceDimensions,
  AppIntro,
  Account,
  Shop,
  Products,
  Shops,
  Cart,
  User
} from './Reducers';

const persistAppIntroConfig = {
  key: 'AppIntro',
  storage
};

const persistAuthConfig = {
  key: 'Auth',
  storage,
  whitelist: ['user', 'isLoggedIn', 'lastLoginTime', 'phone']
};

const persistSearchAreasConfig = {
  key: 'Cities',
  storage,
  whitelist: ['cities']
};

const persistCartConfig = {
  key: 'Cart',
  storage,
  whitelist: ['cart']
};

const persistUserConfig = {
  key: 'User',
  storage,
  whitelist: ['addresses', 'lastSelectedAddress']
};

const middleWares = [Thunk];

const rootReducer = combineReducers({
  deviceDimensions: DeviceDimensions,
  appIntro: persistReducer(persistAppIntroConfig, AppIntro),
  auth: persistReducer(persistAuthConfig, Account),
  shop: Shop,
  products: Products,
  shops: persistReducer(persistSearchAreasConfig, Shops),
  cart: persistReducer(persistCartConfig, Cart),
  user: persistReducer(persistUserConfig, User)
});

const initialData = {};
const storeAppliedMiddleWare = applyMiddleware(...middleWares);

const store = createStore(rootReducer, initialData, compose(storeAppliedMiddleWare, Reactotron.createEnhancer()));

const persistor = persistStore(store);

export { persistor };

export default store;
