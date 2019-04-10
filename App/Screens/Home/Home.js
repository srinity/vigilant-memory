import React, { Component } from 'react';
import { ImageBackground, SafeAreaView, FlatList } from 'react-native';

import { ShopCard } from './../../Components';

import { Images } from './../../Theme';

import styles from './Home.Styles';

class Home extends Component {
  constructor(props) {
    super(props);

    this.data = [
      {
        shopName: 'Some Shop Name',
        shopImage: Images.cover,
        address: 'Some Shop Adress, more address, address!!'
      },
      {
        shopName: 'Another Shop!',
        shopImage: 'https://picsum.photos/200/300/?random',
        address: 'This is the other shop Address!ß'
      },
      {
        shopName: 'Some Other Shop Name',
        shopImage: 'https://picsum.photos/200/300/?random',
        address: 'Some Shop Adress, more address, address!!'
      },
      {
        shopName: 'Fat7 Allah',
        shopImage: 'https://picsum.photos/200/300/?random',
        address: 'Some Shop Adress, more address, address!!'
      },
      {
        shopName: 'Mdenah',
        shopImage: 'https://picsum.photos/200/300/?random',
        address: 'Some Shop Adress, more address, address!!'
      },
      {
        shopName: 'Some Shop Name',
        shopImage: 'https://picsum.photos/600/600/?random',
        address: 'Some Shop Adress, more address, address!!'
      }
    ];
  }

  onShopPress = (shopInfo) => {
    console.tron.warn(shopInfo);
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
            data={this.data}
            renderItem={this.renderItem}
            style={{ flex: 1 }}
          />
        </SafeAreaView>
      </ImageBackground>
    );
  }
}

export default Home;
