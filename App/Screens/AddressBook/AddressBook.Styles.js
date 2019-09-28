import { StyleSheet, I18nManager } from 'react-native';

import { Colors } from '../../Theme';

export default StyleSheet.create({
  containerStyle: {
    flex: 1
  },
  addressContainerStyle: {
    paddingHorizontal: 10,
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.notAvailableColorHexCode
  },
  addressDetailTextStyle: {
    marginBottom: 5
  },
  editAddressContainerStyle: {
    alignItems: 'center',
    padding: 5
  },
  editAddressTextStyle: {
    color: Colors.brandColorHexCode,
  },
  removeAddressContainerStyle: {
    alignItems: 'center',
    padding: 5,
    marginBottom: 7
  },
  removeAddressTextStyle: {
    color: Colors.dangerColorHexCode,
  },
  addressInfoContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  addressInfoStyle: {
    marginLeft: I18nManager.isRTL ? 0 : 10,
    marginRight: I18nManager.isRTL ? 10 : 0
  },
  addressActionsContainerStyle: {
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  }
});
