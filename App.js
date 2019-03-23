import React, { Component } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import Router from './App/index';
import store, { persistor } from './App/Store';
import { Colors } from './App/Theme';

export default class App extends Component {
  renderLoading = () => (
    <View style={styles.indicatorContainerStyle}>
      <ActivityIndicator color={Colors.brandColorHexCode} size='large' />
    </View>
  );
 
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={this.renderLoading()} persistor={persistor}>
            <Router />
        </PersistGate>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  indicatorContainerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
