import React, { Component } from 'react';
import { ImageBackground, SafeAreaView, FlatList } from 'react-native';
import { Actions } from 'react-native-router-flux';

import { ShopCard } from './../../Components';

import { Images } from './../../Theme';

import styles from './Home.Styles';

class Home extends Component {
  componentDidMount() {
    this.props.getShops();
  }

  onShopPress = (shopInfo) => {
    console.tron.warn(shopInfo);
    Actions.shop({ title: shopInfo.shopName, ...shopInfo });
  }

  renderItem = ({ item }) => {
    return (
      <ShopCard
        key={item.shopName}
        name={item.shopName}
        address={item.address}
        image={item.shopImage}
        height={this.props.height / 2.5}
        onPress={() => this.onShopPress(item)}
      />
    );
  }

  render() {
    console.tron.error(this.props);

    return (
      <ImageBackground source={Images.cover2} style={styles.containerStyle}>
        <SafeAreaView style={styles.containerStyle}>
          <FlatList
            data={this.props.shops}
            renderItem={this.renderItem}
            style={{ flex: 1 }}
          />
        </SafeAreaView>
      </ImageBackground>
    );
  }
}

export default Home;
