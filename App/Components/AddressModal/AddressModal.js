import React, { Component, Fragment } from 'react';
import { View, Animated, StyleSheet, TouchableWithoutFeedback, Keyboard, Platform, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import { Dropdown } from 'react-native-material-dropdown';
import { find as _find } from 'lodash';

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
    this.setState({ street });
  }

  onFloorChange = (floorNumber) => {
    this.setState({ floorNumber });
  }

  onApartmentNumberChange = (apartmentNumber) => {
    this.setState({ apartmentNumber });
  }

  onBuildingNumberChange = (buildingNumber) => {
    this.setState({ buildingNumber });
  }

  onCityValueChange = (selectedCity) => {
    this.setState({
      areas: selectedCity.areas,
      city: selectedCity.city,
      area: '',
      district: ''
    });
  }

  onAreaValueChange = (selectedArea) => {
    this.setState({
      districts: selectedArea.districts,
      area: selectedArea.area,
      district: ''
    });
  }

  onDistrictValueChange = (district) => {
    this.setState({ district });
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
                label='Street'
                hint='Enter your street'
                onChangeText={this.onStreetChange}
                value={street}
                isValid={streetIsValid}
                errorMessage='Invalid Street details, street can not be empty'
                inputContainerStyle={styles.inputContainerStyle}
                containerStyle={styles.streetInputStyle}
                labelFontSize={12}
                fontSize={16}
              />

              <View style={styles.rowStyle}>
                <CustomInput
                  label='Building Number'
                  hint='Building'
                  onChangeText={this.onBuildingNumberChange}
                  value={buildingNumber}
                  isValid={buildingNumberIsValid}
                  errorMessage='Invalid Building Number'
                  keyboardType='number-pad'
                  containerStyle={styles.rowInputStyle}
                  inputContainerStyle={styles.inputContainerStyle}
                  labelFontSize={12}
                  fontSize={16}
                />

                <CustomInput
                  label='Floor Number'
                  hint='Floor'
                  onChangeText={this.onFloorChange}
                  value={floorNumber}
                  // isValid={buildingNumberIsValid}
                  // errorMessage='Invalid Floor Number'
                  keyboardType='number-pad'
                  containerStyle={styles.rowInputStyle}
                  inputContainerStyle={styles.inputContainerStyle}
                  labelFontSize={12}
                  fontSize={16}
                />

                <CustomInput
                  label='Apartment Number'
                  hint='Apartment'
                  onChangeText={this.onApartmentNumberChange}
                  value={apartmentNumber}
                  // isValid={phoneIsValid}
                  // errorMessage='Invalid Apartment Number'
                  keyboardType='number-pad'
                  containerStyle={styles.lastRowInputStyle}
                  inputContainerStyle={styles.inputContainerStyle}
                  labelFontSize={12}
                  fontSize={16}
                />
              </View>

              <Dropdown
                label='City'
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
                  label='Area'
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
                  label='District'
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
                  title='CANCEL'
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
