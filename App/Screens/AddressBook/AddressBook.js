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

import { Icon, IconTypes, AddressModal } from './../../Components';

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

    const streetNameString = streetName ? `${streetName}` : '';
    //   const apartmentNumberString = `${apartmentNumber}`;
    //   const floorString = `${floor}th floor, `;
    const buildingNumberString = buildingNumber ? `${buildingNumber} ` : '';

    const isSelectedAddress = lastSelectedAddress === item._id;
    const iconName = isSelectedAddress ? 'dot-circle-o' : 'circle-o';
    const iconColor = isSelectedAddress ?
      Colors.brandColorHexCode : Colors.notAvailableColorHexCode;

    const actionsDisabled = isChangingAddress || isAddingAddress || isRemovingAddress;

    return (
      <View style={styles.addressItemContainerStyle}>
        <TouchableComponent onPress={() => this.onSelectAddressPress(item._id)}>
          <View style={styles.addressInfoContainerStyle}>
            <Icon type={IconTypes.fontAwesome} name={iconName} color={iconColor} size={20} />

            <View style={styles.addressInfoStyle}>
              {
                streetNameString
                  ? (
                    <Text style={styles.addressDetailTextStyle}>{buildingNumberString}{streetNameString}</Text>
                  )
                  : null
              }
              <Text>{`${district}, ${area}, ${city}`}</Text>
            </View>
          </View>
        </TouchableComponent>

        <View style={styles.addressActionsContainerStyle}>
          <TouchableComponent onPress={() => this.onDeleteAddressPress(item._id)} disabled={actionsDisabled}>
            <View style={styles.removeAddressContainerStyle}>
              <Text style={styles.removeAddressTextStyle}>Remove</Text>
              {/* <Icon type={IconTypes.entypo} name='trash' color={Colors.dangerColorHexCode} size={15} /> */}
            </View>
          </TouchableComponent>

          <TouchableComponent onPress={() => this.onEditAddressPress(item)} disabled={actionsDisabled}>
            <View style={styles.editAddressContainerStyle}>
              <Text style={styles.editAddressTextStyle}>Edit</Text>
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
          <Text style={styles.noAvailableAddressTextStyle}>No Addresses Available</Text>
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
    const { currentEditingAddress, isEditingAddress } = this.state

    return (
      <View style={styles.containerStyle}>
        <View style={styles.addressHeaderContainerStyle}>
          <TouchableComponent onPress={this.onAddAddressPress}>
            <View style={styles.addAddressContainerStyle}>
              <Icon type={IconTypes.entypo} name='address' color={Colors.brandColorHexCode} size={20} />
              <Text style={styles.addAddressTextStyle}>Add a new address</Text>
            </View>
          </TouchableComponent>
        </View>

        <View style={styles.addressContainerStyle}>
          {this.renderAddresses(addresses, lastSelectedAddress, isAddingAddress, isChangingAddress, isRemovingAddress)}
        </View>

        <AddressModal
          isVisible={this.state.isAddressModalVisible}
          onClose={this.onAddressModalClose}
          onPress={(address) => this.onAddressModalPress(address)}
          initialAddress={currentEditingAddress}
          buttonText={isEditingAddress ? 'EDIT' : 'ADD'}
          isLoading={isEditingAddress ? isChangingAddress : isAddingAddress}
          cities={cities}
          error={isEditingAddress ? changeAddressError : addAddressError}
        />
      </View>
    );
  }
}

export default AddressBook;
