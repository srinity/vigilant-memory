import React, { Component } from 'react';
import {
  SafeAreaView,
  FlatList,
  View,
  Text,
  TouchableWithoutFeedback,
  BackHandler,
  TextInput,
  Platform,
  TouchableOpacity,
  TouchableNativeFeedback,
  StyleSheet,
  I18nManager
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Dropdown } from 'react-native-material-dropdown';
import { find as _find, map as _map, isNil as _isNil, isObject as _isObject } from 'lodash';
import I18n from 'react-native-i18n';

import { ShopCard, Icon, IconTypes, Logo, Button, LocalizedText } from './../../Components';

import { ImageHostUrl } from '../../Config/APIConfig';

import { Colors } from './../../Theme';

import styles from './Home.Styles';

const TouchableComponent = Platform.OS === 'ios' ? TouchableOpacity : TouchableNativeFeedback;

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

  constructor(props) {
    super(props);

    const { currentSearchCity, currentSearchArea, currentSearchDistrict } = props;

    const selectedCity = _find(this.props.cities, cityData => cityData.city === currentSearchCity);
    const areas = selectedCity ? selectedCity.areas : null;
    const selectedArea = _find(areas, areaData => areaData.area === currentSearchArea);
    const districts = selectedArea ? selectedArea.districts : null;

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
      isLoading: false,
      showSearch: !(currentSearchCity && currentSearchArea && currentSearchDistrict),
      areas,
      districts,
      selectedCity: currentSearchCity,
      selectedArea: currentSearchArea,
      selectedDistrict: currentSearchDistrict,
      searchBarCity: currentSearchCity,
      searchBarArea: currentSearchArea,
      searchBarDistrict: currentSearchDistrict,
      viewMode: this.viewModes[0].mode
    };
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPress)
    this.props.getSearchAreas();
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPress)
  }

  onBackButtonPress = () => {
    if (Actions.currentScene === 'home' && !this.state.showSearch) {
      this.setState({ showSearch: true });
      return true;
    }

    return false;
  }

  onShopPress = (shopInfo) => {
    Actions.products({ title: shopInfo.shopName, ...shopInfo });
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

  onCityDropDownFocus = () => {
    const { cities, getSearchAreas } = this.props;

    if (!cities || !cities.length) {
      getSearchAreas();
    }
  }

  onViewModeChange = (newViewMode) => {
    this.setState({ viewMode: newViewMode });
  }

  renderDropDownBase = (defaultValue, propName, { value }) => {
    const dropDownText = value ? _isObject(value) && propName ? value[propName] : value : I18n.t(defaultValue);

    return (
      <Text style={styles.dropDownTextStyle}>{dropDownText}</Text>
    );
  }

  renderViewingOption = (viewOption = {}, viewMode) => {
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
                <Icon type={viewOption.type} name={viewOption.name} size={30} color={color} />
            </View>
        </TouchableComponent>
    );
  }

  renderItem = ({ item, index }) => {
    const { viewMode } = this.state;
    const deliveryCharge = _isNil(item.deliveryCharge) ? 0 : item.deliveryCharge;
    const isHorizontal = viewMode !== 'grid';
    const height = isHorizontal ? (this.props.height / 4.5) : (this.props.height / 3);
    const width = isHorizontal ? (this.props.width - 20) : ((this.props.width - 30) / 2);
    const additionalStyle = (!isHorizontal && index % 2 === 0) ? { marginRight: I18nManager.isRTL ? 0 : 10, marginLeft: I18nManager.isRTL ? 10 : 0 } : undefined;

    return (
      <ShopCard
        key={item._id}
        name={item.shopName}
        address={`${item.address.city}-${item.address.area}-${item.address.district}`}
        deliveryCharge={deliveryCharge}
        image={`${ImageHostUrl}${item.shopImage}`}
        height={height}
        width={width}
        onPress={() => this.onShopPress(item)}
        horizontal={isHorizontal}
        containerStyle={additionalStyle}
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
      searchBarDistrict,
      viewMode
    } = this.state;
    const { isLoading } = this.props;

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
              value={selectedCity}
              data={this.props.cities || []}
              onChangeText={this.onCityValueChange}
              valueExtractor={item => item}
              labelExtractor={item => item.city}
              baseColor={Colors.brandColorHexCode}
              dropdownPosition={2}
              onFocus={this.onCityDropDownFocus}
              containerStyle={styles.dropDownContainerStyle}
              renderBase={(dataObject) => this.renderDropDownBase('home_screen_city_drop_down', 'city', dataObject)}
            />

            <Dropdown
              value={selectedArea}
              data={this.state.areas || []}
              onChangeText={this.onAreaValueChange}
              valueExtractor={item => item}
              labelExtractor={item => item.area}
              disabled={!this.state.areas}
              baseColor={Colors.brandColorHexCode}
              dropdownPosition={2}
              containerStyle={styles.dropDownContainerStyle}
              renderBase={(dataObject) => this.renderDropDownBase('home_screen_area_drop_down', 'area', dataObject)}
            />

            <Dropdown
              value={selectedDistrict}
              data={this.state.districts || []}
              onChangeText={this.onDistrictValueChange}
              disabled={!this.state.districts}
              valueExtractor={item => item}
              baseColor={Colors.brandColorHexCode}
              dropdownPosition={2}
              containerStyle={styles.dropDownContainerStyle}
              renderBase={(dataObject) => this.renderDropDownBase('home_screen_district_drop_down', undefined, dataObject)}
            />

            <Button
              title='home_screen_search_button_title'
              disabled={!selectedCity || !selectedArea || !selectedDistrict}
              isLoading={isLoading}
              style={styles.searchButtonStyle}
              disabledStyle={styles.disabledSearchButtonStyle}
              onPress={this.onSearchPress}
              indicatorSize='small'
            />
          </View>
        </View>
      )
      :
      (
        <View style={styles.containerStyle}>
          <View style={styles.headerContainerStyle}>
            <View style={styles.searchInfoContainerStyle}>
              <Icon type={IconTypes.fontAwesome} name='map-marker' color={Colors.whiteColorHexCode} size={18} />
              <Text style={styles.searchTextStyle} numberOfLines={1}>{`${searchBarCity}-${searchBarArea}-${searchBarDistrict}`}</Text>
              <TouchableWithoutFeedback onPress={this.onSearchToolBarPress}>
                <LocalizedText style={styles.editSearchTextStyle}>home_screen_edit_search_button_title</LocalizedText>
              </TouchableWithoutFeedback>
            </View>

            <View style={styles.searchInResultContainerStyle}>
              <TextInput
                placeholder={I18n.t('home_screen_search_in_result_placeholder')}
                placeholderTextColor={Colors.notAvailableColorHexCode}
                style={styles.searchInResultInputStyle}
              />

              <TouchableWithoutFeedback onPress={this.onSearchToolBarPress}>
                <Icon type={IconTypes.oct} name='search' size={15} />
              </TouchableWithoutFeedback>
            </View>
          </View>

          <SafeAreaView style={styles.shopsContainerStyle}>
            <View style={styles.viewingOptionsContainerStyle}>
              {_map(this.viewModes, (value) => this.renderViewingOption(value, this.state.viewMode))}
            </View>

            <FlatList
              key={viewMode}
              data={this.props.shops}
              renderItem={this.renderItem}
              style={{ flex: 1, marginBottom: 5 }}
              extraData={this.state.viewMode}
              numColumns={viewMode === 'grid' ? 2 : 1}
            />
          </SafeAreaView>
        </View>
      )
    );
  }
}

export default Home;
