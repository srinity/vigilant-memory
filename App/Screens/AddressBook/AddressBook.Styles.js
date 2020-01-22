import { StyleSheet, I18nManager } from 'react-native';

import { Colors } from '../../Theme';

export default StyleSheet.create({
  containerStyle: {
    flex: 1
  },
  addressContainerStyle: {
    paddingTop: 10,
    backgroundColor: Colors.whiteColorHexCode
  },
  addressHeaderContainerStyle: {
    backgroundColor: Colors.whiteColorHexCode,
    marginBottom: 10,
    paddingVertical: 7,
    paddingHorizontal: 10
  },
  noAddressDetailsContainerStyles: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  noAvailableAddressTextStyle: {
    color: Colors.notAvailableColorHexCode
  },
  addAddressContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5
  },
  addAddressTextStyle: {
    color: Colors.brandColorHexCode,
    marginHorizontal: 10,
  },
  addressItemContainerStyle: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.notAvailableColorHexCode
  },
  addressDetailTextStyle: {
    marginBottom: 5
  },
  addressTextStyle: {
    flex: 1
  },
  editAddressContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    marginHorizontal: 10
  },
  editAddressTextStyle: {
    fontSize: 10,
    color: Colors.brandColorHexCode,
  },
  removeAddressContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    backgroundColor: Colors.brandColorHexCode
  },
  removeAddressTextStyle: {
    fontSize: 10,
    color: Colors.whiteColorHexCode,
    fontWeight: 'bold'
  },
  addressInfoContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  addressInfoStyle: {
    flex: 1,
    marginLeft: I18nManager.isRTL ? 0 : 10,
    marginRight: I18nManager.isRTL ? 10 : 0
  },
  addressActionsContainerStyle: {
    marginTop: 5,
    alignSelf: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row'
  },
  addButtonStyle: {
    flex: 0,
    marginTop: 40,
    marginBottom: 10,
    backgroundColor: Colors.brandColorHexCode,
    borderRadius: 25,
    marginHorizontal: 30,
    minHeight: 40,
  }
});
