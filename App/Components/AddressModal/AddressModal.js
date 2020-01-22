import React, { Component } from 'react';
import {
  View,
  Keyboard,
  Text,
  Platform
} from 'react-native';
import PropTypes from 'prop-types';
import { Dropdown } from 'react-native-material-dropdown';
import {
  find as _find,
  isNumber as _isNumber,
  toNumber as _toNumber,
  isNaN as _isNaN,
  isObject as _isObject
} from 'lodash';
import I18n from 'react-native-i18n';
import Toast from 'react-native-root-toast';

import CustomInput from './../CustomInput';
import Button from './../Button/Button';

import { Colors } from '../../Theme';

import styles from './AddressModal.Styles';

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
    };
  }

  componentDidUpdate(prevProps) {
    const { isLoading, error, onClose } = this.props;

    if (!isLoading && isLoading !== prevProps.isLoading && !error) {
      onClose();
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

  isValidNumericValue = (value = '') => {
    const numericValue = _toNumber(value);
    return (!_isNaN(numericValue) && _isNumber(numericValue));
  }

  renderDropDownBase = (defaultValue, propName, { value }) => {
    const dropDownText = value ? _isObject(value) && propName ? value[propName] : value : I18n.t(defaultValue);

    return (
      <Text style={styles.dropDownTextStyle}>{dropDownText}</Text>
    );
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
    } = this.state;

    return (
      isVisible
        ?
        (
          <View style={styles.contentContainerStyle}>
            <Dropdown
              value={city}
              data={cities || []}
              onChangeText={this.onCityValueChange}
              valueExtractor={item => item}
              labelExtractor={item => item.city}
              baseColor={Colors.brandColorHexCode}
              dropdownPosition={1}
              absoluteRTLLayout
              onFocus={this.onDropDownFocus}
              containerStyle={styles.dropDownContainerStyle}
              renderBase={(dataObject) => this.renderDropDownBase('home_screen_city_drop_down', 'city', dataObject)}
            />

            <View style={styles.rowStyle}>
              <Dropdown
                value={area}
                data={areas || []}
                onChangeText={this.onAreaValueChange}
                valueExtractor={item => item}
                labelExtractor={item => item.area}
                disabled={!areas}
                baseColor={Colors.brandColorHexCode}
                dropdownPosition={1}
                containerStyle={styles.areaDropDownStyle}
                absoluteRTLLayout
                onFocus={this.onDropDownFocus}
                containerStyle={styles.firstHorizontalDropDownContainerStyle}
                renderBase={(dataObject) => this.renderDropDownBase('home_screen_area_drop_down', 'area', dataObject)}
              />

              <Dropdown
                value={district}
                data={districts || []}
                onChangeText={this.onDistrictValueChange}
                disabled={!districts}
                valueExtractor={item => item}
                baseColor={Colors.brandColorHexCode}
                dropdownPosition={1}
                containerStyle={styles.districtDropDown}
                absoluteRTLLayout
                onFocus={this.onDropDownFocus}
                containerStyle={styles.horizontalDropDownContainerStyle}
                renderBase={(dataObject) => this.renderDropDownBase('home_screen_district_drop_down', undefined, dataObject)}
              />
            </View>

            <CustomInput
              placeholder={I18n.t('address_modal_street_label')}
              placeholderTextColor={Platform.OS === 'ios' ? Colors.blackColorHexCode : undefined}
              onChangeText={this.onStreetChange}
              value={street}
              isValid={streetIsValid}
              errorMessage='address_modal_street_error_message'
              containerStyle={styles.streetInputStyle}
            />

            <View style={styles.rowStyle}>
              <CustomInput
                placeholder={I18n.t('address_modal_building_number_label')}
                placeholderTextColor={Platform.OS === 'ios' ? Colors.blackColorHexCode : undefined}
                onChangeText={this.onBuildingNumberChange}
                value={buildingNumber}
                isValid={buildingNumberIsValid}
                errorMessage='address_modal_building_number_error_message'
                keyboardType='number-pad'
                containerStyle={styles.rowInputStyle}
              />

              <CustomInput
                placeholder={I18n.t('address_modal_floor_number_label')}
                placeholderTextColor={Platform.OS === 'ios' ? Colors.blackColorHexCode : undefined}
                onChangeText={this.onFloorChange}
                value={floorNumber}
                isValid={floorNumberIsValid}
                errorMessage='address_modal_floor_number_error_message'
                keyboardType='number-pad'
                containerStyle={styles.rowInputStyle}
              />

              <CustomInput
                placeholder={I18n.t('address_modal_apartment_number_label')}
                placeholderTextColor={Platform.OS === 'ios' ? Colors.blackColorHexCode : undefined}
                onChangeText={this.onApartmentNumberChange}
                value={apartmentNumber}
                isValid={apartmentNumberIsValid}
                errorMessage='address_modal_apartment_number_error_message'
                keyboardType='number-pad'
                containerStyle={styles.lastRowInputStyle}
              />
            </View>

            <View style={styles.buttonsContainerStyle}>
              <Button
                title='address_modal_cancel_button_text'
                style={styles.cancelButtonStyle}
                textStyle={styles.cancelButtonTextStyle}
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
          </View>
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
