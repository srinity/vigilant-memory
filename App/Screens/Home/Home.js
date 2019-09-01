import React, { Component } from 'react';
import { SafeAreaView, FlatList, View, Text, TouchableWithoutFeedback } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Dropdown } from 'react-native-material-dropdown';

import { ShopCard, Icon, IconTypes, Logo, Button } from './../../Components';

import { ImageHostUrl } from '../../Config/APIConfig';

import { Colors } from './../../Theme';

import styles from './Home.Styles';

class Home extends Component {
  static getDerivedStateFromProps(props, state) {
    if (state.isLoading && !props.isLoading && props.shops !== null) {
      return {
        isLoading: props.isLoading,
        showSearch: false,
        searchBarCity: state.selectedCity,
        searchBarArea: state.selectedArea,
        searchBarDistrict: state.selectedDistrict
      };
    } else if (state.isLoading !== props.isLoading) {
      return { isLoading: props.isLoading };
    }

    return null;
  }

  state = {
    isLoading: false,
    showSearch: true,
    areas: null,
    districts: null,
    selectedCity: undefined,
    selectedArea: undefined,
    selectedDistrict: undefined,
    searchBarCity: undefined,
    searchBarArea: undefined,
    searchBarDistrict: undefined
  }

  componentDidMount() {
    this.props.getSearchAreas();
  }

  onShopPress = (shopInfo) => {
    console.tron.warn(shopInfo);
    Actions.shop({ title: shopInfo.shopName, ...shopInfo });
  }

  onCityValueChange = (selectedCity) => {
    this.setState({
      areas: selectedCity.areas,
      selectedCity: selectedCity.city,
      selectedArea: '',
      selectedDistrict: ''
    });
  }

  onAreaValueChange = (selectedArea) => {
    this.setState({
      districts: selectedArea.districts,
      selectedArea: selectedArea.area,
      selectedDistrict: ''
    });
  }

  onDistrictValueChange = (selectedDistrict) => {
    this.setState({ selectedDistrict });
  }

  onSearchToolBarPress = () => {
    this.setState({ showSearch: true });
  }

  onBackIconPress = () => {
    this.setState({ showSearch: false });
  }

  onSearchPress = () => {
    const { selectedArea, selectedCity, selectedDistrict } = this.state;

    this.props.getShops(selectedCity, selectedArea, selectedDistrict);    
  }

  renderItem = ({ item }) => {
    return (
      <ShopCard
        key={item._id}
        name={item.shopName}
        address={`${item.address.district}, ${item.address.area}, ${item.address.city}`}
        image={`${ImageHostUrl}${item.shopImage}`}
        height={this.props.height / 2.5}
        onPress={() => this.onShopPress(item)}
      />
    );
  }

  render() {
    const {
      showSearch,
      selectedArea,
      selectedCity,
      selectedDistrict,
      searchBarArea,
      searchBarCity,
      searchBarDistrict
    } = this.state;
    const { isLoading } = this.props;
    console.tron.error(this.props);
    console.tron.error(this.state);

    return (
      showSearch
      ?
      (
        <View style={styles.containerStyle}>
          {
            this.props.shops
            ?
            <TouchableWithoutFeedback onPress={this.onBackIconPress}>
              <View style={styles.backContainerStyle}>
                <Icon type={IconTypes.ant} name='arrowleft' size={20} />
              </View>
            </TouchableWithoutFeedback>
            :
            null
          }
          <Logo name='logo' style={styles.logoStyle} />

          <View style={styles.searchSelectionContainerStyle}>
            <Dropdown
              label='City'
              value={selectedCity}
              data={this.props.cities || []}
              onChangeText={this.onCityValueChange}
              valueExtractor={item => item}
              labelExtractor={item => item.city}
              baseColor={Colors.brandColorHexCode}
              dropdownPosition={2}
            />

            <Dropdown
              label='Area'
              value={selectedArea}
              data={this.state.areas || []}
              onChangeText={this.onAreaValueChange}
              valueExtractor={item => item}
              labelExtractor={item => item.area}
              disabled={!this.state.areas}
              baseColor={Colors.brandColorHexCode}
              dropdownPosition={2}
            />

            <Dropdown
              label='District'
              value={selectedDistrict}
              data={this.state.districts || []}
              onChangeText={this.onDistrictValueChange}
              disabled={!this.state.districts}
              valueExtractor={item => item}
              baseColor={Colors.brandColorHexCode}
              dropdownPosition={2}
            />

            <Button
              title='Search'
              disabled={!selectedCity || !selectedArea || !selectedDistrict}
              isLoading={isLoading}
              style={styles.searchButtonStyle}
              disabledStyle={styles.disabledSearchButtonStyle}
              onPress={this.onSearchPress}
            />
          </View>
        </View>
      )
      :
      (
        <View style={styles.containerStyle}>
          <View style={styles.headerContainerStyle}>
            <TouchableWithoutFeedback onPress={this.onSearchToolBarPress}>
              <View style={styles.searchBoxContainerStyle}>
                <Icon type={IconTypes.oct} name='search' size={15} />
                <Text style={styles.searchTextStyle} numberOfLines={1}>{`${searchBarDistrict || 'District'}, ${searchBarArea || 'Area'}, ${searchBarCity || 'City'}`}</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>

          <SafeAreaView style={styles.containerStyle}>
            <FlatList
              data={this.props.shops}
              renderItem={this.renderItem}
              style={{ flex: 1 }}
            />
          </SafeAreaView>
        </View>
      )
    );
  }
}

export default Home;
