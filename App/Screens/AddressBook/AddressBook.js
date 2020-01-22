import React, { Component } from 'react';
import {
  View,
  Text,
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
  FlatList
} from 'react-native';
import memoize from 'memoize-one';
import I18n from 'react-native-i18n';

import { Icon, IconTypes, AddressModal, LocalizedText, Button } from './../../Components';

import { Colors } from '../../Theme';

import styles from './AddressBook.Styles';


const TouchableComponent = Platform.OS === 'ios' ?
  TouchableOpacity : TouchableNativeFeedback;

class AddressBook extends Component {
  state = {
    isAddressModalVisible: false,
    isEditingAddress: false,
    currentEditingAddress: undefined
  }

  onAddressModalPress = (address) => {
    const { user, addAddress, changeAddress } = this.props;
    const { isEditingAddress } = this.state;

    if (isEditingAddress) {
      const { _id: addressId } = address;
      changeAddress(user, { addressId, ...address });
    } else {
      addAddress(user, address);
    }
  }

  onAddressModalClose = () => {
    let newState = {};

    if (this.state.isEditingAddress) {
      newState = { isEditingAddress: false, currentEditingAddress: undefined };
    }
    this.setState({ isAddressModalVisible: false, ...newState });
  }

  onEditAddressRequest = (address) => {
    const { user, addAddress } = this.props;
    addAddress(user, addressId, address);
  }

  onEditAddressPress = (address) => {
    this.setState({
      isAddressModalVisible: true,
      isEditingAddress: true,
      currentEditingAddress: address
    });
  }

  onAddAddressPress = () => {
    this.setState({ isAddressModalVisible: true });
  }

  onAddAddressClose = () => {
    this.setState({ isAddressModalVisible: false });
  }

  onDeleteAddressPress = (addressId) => {
    const { deleteAddress, user } = this.props;
    deleteAddress(user, addressId);
  }

  onSelectAddressPress = (addressId) => {
    const { selectShippingAddress } = this.props;
    selectShippingAddress(addressId);
  }

  getExtraData = (selectedAddress, isChangingAddress, isAddingAddress, isRemovingAddress) => {
    return [selectedAddress, isChangingAddress, isAddingAddress, isRemovingAddress];
  }

  getExtraDataMemoized = memoize(this.getExtraData)

  renderAddress = ({ item }) => {
    const { lastSelectedAddress, isChangingAddress, isAddingAddress, isRemovingAddress } = this.props
    const { district, area, city, addressDetails = {} } = item;
    const { streetName, apartmentNumber, floor, buildingNumber } = addressDetails || {};
    const buildingNumberText = buildingNumber ? I18n.t('order_screen_order_delivery_address_building_text', { building: buildingNumber }) : '';
    const floorText = buildingNumber ? I18n.t('order_screen_order_delivery_address_floor_text', { floor }) : '';
    const apartmentNumberText = buildingNumber ? I18n.t('order_screen_order_delivery_address_apartment_text', { apartment: apartmentNumber }) : '';
    const address = `${city}-${area}-${district}${buildingNumberText}${floorText}${apartmentNumberText}`;


    const isSelectedAddress = lastSelectedAddress === item._id;
    const iconName = isSelectedAddress ? 'checkcircle' : 'circle';
    const iconType = isSelectedAddress ? IconTypes.ant : IconTypes.entypo;
    const iconColor = isSelectedAddress ?
      Colors.brandColorHexCode : Colors.notAvailableColorHexCode;

    const actionsDisabled = isChangingAddress || isAddingAddress || isRemovingAddress;

    return (
      <View style={styles.addressItemContainerStyle}>
        <TouchableComponent onPress={() => this.onSelectAddressPress(item._id)}>
          <View style={styles.addressInfoContainerStyle}>
            <Icon type={iconType} name={iconName} color={iconColor} size={20} />

            <View style={styles.addressInfoStyle}>
              <Text style={styles.addressTextStyle}>{address}</Text>
            </View>
          </View>
        </TouchableComponent>

        <View style={styles.addressActionsContainerStyle}>
          <TouchableComponent onPress={() => this.onEditAddressPress(item)} disabled={actionsDisabled}>
            <View style={styles.editAddressContainerStyle}>
              <LocalizedText style={styles.editAddressTextStyle}>address_book_screen_edit_address_action</LocalizedText>
            </View>
          </TouchableComponent>
          
          <TouchableComponent onPress={() => this.onDeleteAddressPress(item._id)} disabled={actionsDisabled}>
            <View style={styles.removeAddressContainerStyle}>
              <LocalizedText style={styles.removeAddressTextStyle}>address_book_screen_remove_address_action</LocalizedText>
            </View>
          </TouchableComponent>
        </View>
      </View>
    );
  }

  renderAddresses = (addresses, selectedAddress, isAddingAddress, isChangingAddress, isRemovingAddress) => {
    if (!addresses || !addresses.length || addresses.length === 0) {
      return (
        <View style={styles.noAddressDetailsContainerStyles}>
          <LocalizedText style={styles.noAvailableAddressTextStyle}>address_book_screen_no_addresses_available</LocalizedText>
        </View>
      );
    }

    return (
      <FlatList
        data={addresses}
        renderItem={this.renderAddress}
        extraData={this.getExtraDataMemoized(selectedAddress, isAddingAddress, isChangingAddress, isRemovingAddress)}
        keyExtractor={address => address._id}
      />
    );
  }

  render() {
    const {
      isAddingAddress,
      cities,
      addAddressError,
      changeAddressError ,
      addresses,
      lastSelectedAddress,
      isChangingAddress,
      isRemovingAddress
    } = this.props;
    const { currentEditingAddress, isEditingAddress, isAddressModalVisible } = this.state;

    return (
      <View style={styles.containerStyle}>
        {
          isAddressModalVisible ? (
            <>
              {/* {isEditingAddress ? this.renderAddress({ item: currentEditingAddress }) : null} */}
              <AddressModal
                isVisible={this.state.isAddressModalVisible}
                onClose={this.onAddressModalClose}
                onPress={(address) => this.onAddressModalPress(address)}
                initialAddress={currentEditingAddress}
                buttonText={isEditingAddress ? 'address_book_screen_edit_address_button_text' : 'address_book_screen_add_address_button_text'}
                isLoading={isEditingAddress ? isChangingAddress : isAddingAddress}
                cities={cities}
                error={isEditingAddress ? changeAddressError : addAddressError}
              />
            </>
          ) : (
            <>
              <View style={styles.addressContainerStyle}>
                {this.renderAddresses(addresses, lastSelectedAddress, isAddingAddress, isChangingAddress, isRemovingAddress)}
              </View>

              <Button
                title='address_book_screen_add_new_address'
                onPress={this.onAddAddressPress}
                style={styles.addButtonStyle}
              />
            </>
          )
        }
      </View>
    );
  }
}

export default AddressBook;
