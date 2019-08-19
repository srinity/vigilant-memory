import { StyleSheet, Platform } from 'react-native';

import { isIPhoneDeviceWithNotch } from './../../Utils/Platform';

import { Colors } from './../../Theme';

export default StyleSheet.create({
  containerStyle: {
    flex: 1
  },
  flatListStyle: {
    flex: 1
  },
  headerContainerStyle: {
    backgroundColor: Colors.brandColorHexCode,
    paddingHorizontal: 10,
    ...Platform.select({
      android: {
        paddingVertical: 10
      },
      ios: {
        paddingTop: isIPhoneDeviceWithNotch() ? 40 : 0,
        paddingBottom: isIPhoneDeviceWithNotch() ? 10 : 0,
        paddingVertical: isIPhoneDeviceWithNotch() ? 0 : 10
      }
    })
  },
  searchBoxContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: Colors.whiteColorHexCode,
    borderRadius: 25
  },
  searchTextStyle: {
    color: Colors.blackColorHexCode,
    fontSize: 16,
    marginHorizontal: 10,
    flex: 1
  },
  searchSelectionContainerStyle: {
    flex: 2,
    justifyContent: 'center',
    width: 250,
    alignSelf: 'center'
  },
  searchButtonStyle: {
    flex: 0,
    marginVertical: 15,
    backgroundColor: Colors.brandColorHexCode
  },
  disabledSearchButtonStyle: {
    backgroundColor: Colors.getBrandColorRGBAValue(0.5)
  },
  backContainerStyle: {
    marginLeft: Platform.OS === 'ios' ? 10 : 20,
    marginTop: isIPhoneDeviceWithNotch() ? 50 : 20
  }
});
