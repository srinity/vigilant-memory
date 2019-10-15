import React, { Component, Fragment } from 'react';
import {
  View,
  Animated,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Platform
} from 'react-native';
import PropTypes from 'prop-types';
import { Dropdown } from 'react-native-material-dropdown';
import {
  find as _find,
  isNumber as _isNumber,
  toNumber as _toNumber,
  isNaN as _isNaN
} from 'lodash';
import I18n from 'react-native-i18n';
import Toast from 'react-native-root-toast';

import CustomInput from './../CustomInput';
import Button from './../Button/Button';

import styles from './AddressModal.Styles';
import { Colors } from '../../Theme';

class AddressModal extends Component {
  static getDerivedStateFromProps(props, prevState) {
    if (props.isVisible !== prevState.isVisible && props.isVisible) {
      let newState = { isVisible: true };

      if (props.initialAddress) {
        const { city, area, district, addressDetails = {} } = props.initialAddress;

        if (city) {
          const selectedCity = _find(props.cities, cityObj => cityObj.city === city);
          newState.areas = selectedCity ? selectedCity.areas : null;
          if (newState.areas) {
            const selectedArea = _find(newState.areas, areaObj => areaObj.area === area);
            newState.districts = selectedArea ? selectedArea.districts : null;
          }
        }

        newState = {
          ...newState,
          city,
          area,
          district,
          apartmentNumber: addressDetails.apartmentNumber,
          floorNumber: addressDetails.floor,
          buildingNumber: addressDetails.buildingNumber,
          street: addressDetails.streetName,
        };
      }

      return newState;
    }

    return null;
  }

  constructor(props) {
    super(props);

    const { isVisible, initialAddress = {} } = props;
    const { city, area, district, addressDetails = {} } = initialAddress;

    this.state = {
      isVisible,
      areas: null,
      districts: null,
      city,
      area,
      district,
      apartmentNumber: addressDetails.apartmentNumber,
      floorNumber: addressDetails.floor,
      buildingNumber: addressDetails.buildingNumber,
      street: addressDetails.streetName,
      cityIsValid: true,
      areaIsValid: true,
      districtIsValid: true,
      apartmentNumberIsValid: true,
      floorNumberIsValid: true,
      buildingNumberIsValid: true,
      streetIsValid: true,
      isKeyboardOpen: false,
    };

    this.animation = new Animated.Value(isVisible ? 1 : 0);
  }

  componentDidMount() {
    this.runAnimation(this.props.isVisible);

    if (Platform.OS === 'ios') {
      this.keyboardIsShownListener = Keyboard.addListener('keyboardDidShow', this.handleKeyboardDidShow);
      this.keyboardIsHiddenListener = Keyboard.addListener('keyboardDidHide', this.handleKeyboardDidHide);
    }
  }

  componentDidUpdate(prevProps) {
    const { isVisible, isLoading, error, onClose } = this.props;

    if (prevProps.isVisible !== isVisible) {
      this.runAnimation(isVisible);
    }

    if (!isLoading && isLoading !== prevProps.isLoading && !error) {
      onClose();
    }
  }

  componentWillUnmount() {
    if (Platform.OS === 'ios') {
      this.keyboardIsShownListener.remove();
      this.keyboardIsHiddenListener.remove();
    }
  }

  onStreetChange = (street) => {
    this.setState({ street, streetIsValid: true });
  }

  onFloorChange = (floorNumber) => {
    this.setState({ floorNumber, floorNumberIsValid: true });
  }

  onApartmentNumberChange = (apartmentNumber) => {
    this.setState({ apartmentNumber, apartmentNumberIsValid: true });
  }

  onBuildingNumberChange = (buildingNumber) => {
    this.setState({ buildingNumber, buildingNumberIsValid: true });
  }

  onCityValueChange = (selectedCity) => {
    this.setState({
      areas: selectedCity.areas,
      city: selectedCity.city,
      area: '',
      district: '',
      cityIsValid: true
    });
  }

  onAreaValueChange = (selectedArea) => {
    this.setState({
      districts: selectedArea.districts,
      area: selectedArea.area,
      district: '',
      areaIsValid: true
    });
  }

  onDistrictValueChange = (district) => {
    this.setState({ district, districtIsValid: true });
  }

  onAddAddressPress = () => {
    const { onPress, initialAddress } = this.props;
    const {
      apartmentNumber,
      buildingNumber,
      city,
      district,
      floorNumber: floor,
      street: streetName,
      area
    } = this.state;

    this.setState({
      apartmentNumberIsValid: this.isValidNumericValue(apartmentNumber),
      buildingNumberIsValid: this.isValidNumericValue(buildingNumber),
      floorNumberIsValid: this.isValidNumericValue(floor),
      streetIsValid: (!streetName || (streetName && streetName.length > 7)),
      cityIsValid: !!city,
      areaIsValid: !!area,
      districtIsValid: !!district
    }, () => {
      const {
        apartmentNumberIsValid,
        areaIsValid,
        buildingNumberIsValid,
        cityIsValid,
        districtIsValid,
        floorNumberIsValid,
        streetIsValid
      } = this.state;

      if (
        apartmentNumberIsValid
        && areaIsValid
        && buildingNumberIsValid
        && cityIsValid
        && districtIsValid
        && floorNumberIsValid
        && streetIsValid
      ) {
        const address = {
          _id: initialAddress._id,
          city,
          area,
          district,
          addressDetails: {
            streetName,
            apartmentNumber,
            floor,
            buildingNumber,
          },
        };
        
        onPress(address);
      } else {
        Toast.show('Please enter valid values', {
          position: Toast.positions.BOTTOM,
          duration: Toast.durations.SHORT,
          shadow: true,
          animation: true,
          hideOnPress: true,
        });
      }
    });
  }

  onDropDownFocus = () => {
    Keyboard.dismiss();
  }

  onCloseRequest = () => {
    if (this.state.isKeyboardOpen) {
      Keyboard.dismiss();
    } else {
      this.props.onClose();
    }
  }

  getContainerStyle = (isKeyboardOpen) => {
    if (isKeyboardOpen) {
      return StyleSheet.flatten([styles.contentContainerStyle, {
        height: styles.contentContainerStyle.height + (this.keyboardHeight / 2)
      }]);
    }

    return styles.contentContainerStyle;
  }

  isValidNumericValue = (value = '') => {
    const numericValue = _toNumber(value);
    return (!_isNaN(numericValue) && _isNumber(numericValue));
  }

  handleKeyboardDidShow = ({ endCoordinates }) => {
    if (this.state.isKeyboardOpen !== true) {
      this.keyboardHeight = endCoordinates.height;
      this.setState({ isKeyboardOpen: true });
    }
  }

  handleKeyboardDidHide = () => {
    if (this.state.isKeyboardOpen !== false) {
      this.setState({ isKeyboardOpen: false });
    }
  }

  runAnimation = (isVisible) => {
    Animated.timing(this.animation, {
      toValue: isVisible ? 1 : 0,
      duration: 350,
      useNativeDriver: true
    }).start(({ finished }) => {
      if (finished && !isVisible) {
        this.setState({ isVisible: false });
      }
    });
  }

  render() {
    const { onClose, isLoading, cities, buttonText } = this.props;
    const {
      isVisible,
      apartmentNumber,
      area,
      buildingNumber,
      city,
      district,
      floorNumber,
      street,
      areas,
      districts,
      cityIsValid,
      areaIsValid,
      districtIsValid,
      apartmentNumberIsValid,
      floorNumberIsValid,
      buildingNumberIsValid,
      streetIsValid,
      isKeyboardOpen
    } = this.state;

    const animatedOverlayStyle = {
      opacity: this.animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0.7]
      })
    };

    const animatedContentStyle = {
      transform: [
        {
          translateY: this.animation.interpolate({
            inputRange: [0, 1],
            outputRange: [styles.contentContainerStyle.height, 0]
          })
        }
      ]
    };

    return (
      isVisible
        ?
        (
          <Fragment>
            <Animated.View style={[this.getContainerStyle(isKeyboardOpen), animatedContentStyle]}>
              <CustomInput
                label='address_modal_street_label'
                hint='address_modal_street_hint'
                onChangeText={this.onStreetChange}
                value={street}
                isValid={streetIsValid}
                errorMessage='address_modal_street_error_message'
                inputContainerStyle={styles.inputContainerStyle}
                containerStyle={styles.streetInputStyle}
                labelFontSize={12}
                fontSize={16}
              />

              <View style={styles.rowStyle}>
                <CustomInput
                  label='address_modal_building_number_label'
                  hint='address_modal_building_number_hint'
                  onChangeText={this.onBuildingNumberChange}
                  value={buildingNumber}
                  isValid={buildingNumberIsValid}
                  errorMessage='address_modal_building_number_error_message'
                  keyboardType='number-pad'
                  containerStyle={styles.rowInputStyle}
                  inputContainerStyle={styles.inputContainerStyle}
                  labelFontSize={12}
                  fontSize={16}
                />

                <CustomInput
                  label='address_modal_floor_number_label'
                  hint='address_modal_floor_number_hint'
                  onChangeText={this.onFloorChange}
                  value={floorNumber}
                  isValid={floorNumberIsValid}
                  errorMessage='address_modal_floor_number_error_message'
                  keyboardType='number-pad'
                  containerStyle={styles.rowInputStyle}
                  inputContainerStyle={styles.inputContainerStyle}
                  labelFontSize={12}
                  fontSize={16}
                />

                <CustomInput
                  label='address_modal_apartment_number_label'
                  hint='address_modal_apartment_number_hint'
                  onChangeText={this.onApartmentNumberChange}
                  value={apartmentNumber}
                  isValid={apartmentNumberIsValid}
                  errorMessage='address_modal_apartment_number_error_message'
                  keyboardType='number-pad'
                  containerStyle={styles.lastRowInputStyle}
                  inputContainerStyle={styles.inputContainerStyle}
                  labelFontSize={12}
                  fontSize={16}
                />
              </View>

              <Dropdown
                label={I18n.t('address_modal_city_drop_down')}
                value={city}
                data={cities || []}
                onChangeText={this.onCityValueChange}
                valueExtractor={item => item}
                labelExtractor={item => item.city}
                baseColor={Colors.brandColorHexCode}
                dropdownPosition={2}
                absoluteRTLLayout
                onFocus={this.onDropDownFocus}
              />

              <View style={styles.rowStyle}>

                <Dropdown
                  label={I18n.t('address_modal_area_drop_down')}
                  value={area}
                  data={areas || []}
                  onChangeText={this.onAreaValueChange}
                  valueExtractor={item => item}
                  labelExtractor={item => item.area}
                  disabled={!areas}
                  baseColor={Colors.brandColorHexCode}
                  dropdownPosition={2}
                  containerStyle={styles.areaDropDownStyle}
                  absoluteRTLLayout
                  onFocus={this.onDropDownFocus}
                />

                <Dropdown
                  label={I18n.t('address_modal_district_drop_down')}
                  value={district}
                  data={districts || []}
                  onChangeText={this.onDistrictValueChange}
                  disabled={!districts}
                  valueExtractor={item => item}
                  baseColor={Colors.brandColorHexCode}
                  dropdownPosition={2}
                  containerStyle={styles.districtDropDown}
                  absoluteRTLLayout
                  onFocus={this.onDropDownFocus}
                />
              </View>

              <View style={styles.buttonsContainerStyle}>
                <Button
                  title='address_modal_cancel_button_text'
                  style={styles.cancelButtonStyle}
                  disabledStyle={styles.disabledCancelButtonStyle}
                  disabled={isLoading}
                  onPress={onClose}
                  indicatorSize='small'
                />
                <Button
                  title={buttonText}
                  style={styles.addButtonStyle}
                  disabledStyle={styles.disabledAddButtonStyle}
                  isLoading={isLoading}
                  onPress={this.onAddAddressPress}
                  indicatorSize='small'
                />
              </View>
            </Animated.View>

            <TouchableWithoutFeedback onPress={this.onCloseRequest}>
              <Animated.View style={[styles.overlayStyle, animatedOverlayStyle]} />
            </TouchableWithoutFeedback>
          </Fragment>
        )
        :
        null
    );
  }
}

AddressModal.defaultProps = {
  initialAddress: {}
};

AddressModal.propTypes = {
  buttonText: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  isVisible: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool,
  onPress: PropTypes.func.isRequired,
  cities: PropTypes.array.isRequired,
  error: PropTypes.any.isRequired,
  initialAddress: PropTypes.objectOf({
    _id: PropTypes.string,
    city: PropTypes.string,
    area: PropTypes.string,
    district: PropTypes.string,
    addressDetails: {
      floor: PropTypes.string,
      streetName: PropTypes.string,
      apartmentNumber: PropTypes.string,
      buildingNumber: PropTypes.string,
    }
  })
};

export default AddressModal;
