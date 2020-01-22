import { StyleSheet, Platform, I18nManager } from 'react-native';

import { isIPhoneDeviceWithNotch } from './../../Utils/Platform';

import { Colors } from './../../Theme';

export default StyleSheet.create({
  containerStyle: {
    flex: 1
  },
  flatListStyle: {
    flex: 1
  },
  dropDownContainerStyle: {
    borderRadius: 25,
    borderWidth: 2,
    borderColor: Colors.brandColorHexCode,
    backgroundColor: Colors.whiteColorHexCode,
    height: 50,
    justifyContent: 'center',
    paddingHorizontal: 15,
    marginBottom: 10,
    width: '100%'
  },
  dropDownTextStyle: {
    textAlign: I18nManager.isRTL ? 'right' : 'left'
  },
  headerContainerStyle: {
    backgroundColor: Colors.brandColorHexCode,
    paddingHorizontal: 25,
    ...Platform.select({
      android: {
        paddingVertical: 25
      },
      ios: {
        paddingTop: isIPhoneDeviceWithNotch() ? 55 : 35,
        paddingBottom: 25
      }
    }),
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25,
    marginBottom: 10
  },
  logoStyle: {
    marginTop: 10
  },
  searchBoxContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: Colors.whiteColorHexCode,
    borderRadius: 25
  },
  searchInfoContainerStyle: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center'
  },
  editSearchTextStyle: {
    fontSize: 16,
    color: '#ffc592',
    padding: 5
  },
  searchTextStyle: {
    color: Colors.whiteColorHexCode,
    fontSize: 18,
    marginHorizontal: 10,
    flex: 1,
    textAlign: I18nManager.isRTL ? 'right' : 'left'
  },
  searchSelectionContainerStyle: {
    flex: 2,
    justifyContent: 'center',
    width: 300,
    alignSelf: 'center'
  },
  searchButtonStyle: {
    flex: 0,
    marginVertical: 25,
    backgroundColor: Colors.brandColorHexCode,
    borderRadius: 25,
    marginHorizontal: 0,
    minHeight: 40,
  },
  searchInResultContainerStyle: {
    flex: 0,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.whiteColorHexCode,
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  searchInResultInputStyle: {
    flex: 1,
    height: 40
  },
  viewingOptionsContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  viewingOptionStyle: {
      paddingHorizontal: 3,
      paddingVertical: 1,
      borderRadius: 6
  },
  activeViewingOptionStyle: {
      backgroundColor: Colors.brandColorHexCode
  },
  disabledSearchButtonStyle: {
    backgroundColor: Colors.getBrandColorRGBAValue(0.5)
  },
  backContainerStyle: {
    marginLeft: Platform.OS === 'ios' ? 10 : 20,
    marginTop: isIPhoneDeviceWithNotch() ? 50 : 20
  },
  shopsContainerStyle: {
    flex: 1,
    marginHorizontal: 10
  }
});
