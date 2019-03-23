import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import Thunk from 'redux-thunk';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web and AsyncStorage for react-native

import Reactotron from './../Config/ReactotronConfig';

import {
    DeviceDimensions,
    Account
} from './Reducers';

const persistAuthConfig = {
    key: 'Auth',
    storage,
    whitelist: ['user']
};

const middleWares = [Thunk];

const rootReducer = combineReducers({
    deviceDimensions: DeviceDimensions,
    auth: persistReducer(persistAuthConfig, Account)
});

const initialData = {};
const storeAppliedMiddleWare = applyMiddleware(...middleWares);

const store = createStore(rootReducer, initialData, compose(storeAppliedMiddleWare, Reactotron.createEnhancer()));

const persistor = persistStore(store);

export { persistor };

export default store;
