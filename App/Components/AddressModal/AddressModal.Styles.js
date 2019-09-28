import { StyleSheet, I18nManager } from 'react-native';

import { isIPhoneDeviceWithNotch } from './../../Utils/Platform';

import { Colors } from '../../Theme';

const isIphoneWithNotch = isIPhoneDeviceWithNotch();

export default StyleSheet.create({
  containerStyle: {
    flex: 1
  },
  contentContainerStyle: {
    height: isIphoneWithNotch ? 450 : 420,
    width: '100%',
    backgroundColor: Colors.whiteColorHexCode,
    zIndex: 300,
    position: 'absolute',
    paddingHorizontal: 20,
    bottom: 0,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  overlayStyle: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    backgroundColor: Colors.blackColorHexCode
  },
  areaDropDownStyle: {
    flex: 1,
    marginLeft: I18nManager.isRTL ? 10 : 0,
    marginRight: I18nManager.isRTL ? 0 : 10
  },
  districtDropDown: {
    flex: 1
  },
  inputContainerStyle: {
    borderBottomWidth: 0.2
  },
  rowInputStyle: {
    flex: 1,
    marginHorizontal: 0,
    marginLeft: I18nManager.isRTL ? 10 : 0,
    marginRight: I18nManager.isRTL ? 0 : 10
  },
  lastRowInputStyle: {
    flex: 1,
    marginHorizontal: 0
  },
  streetInputStyle: {
    marginHorizontal: 0
  },
  addButtonStyle: {
    marginHorizontal: 0,
    marginLeft: I18nManager.isRTL ? 0 : 5,
    marginRight: I18nManager.isRTL ? 5 : 0,
    backgroundColor: Colors.brandColorHexCode,
    minHeight: 40
  },
  disabledAddButtonStyle: {
    backgroundColor: Colors.getBrandColorRGBAValue(0.7)
  },
  cancelButtonStyle: {
    marginHorizontal: 0,
    marginLeft: I18nManager.isRTL ? 5 : 0,
    marginRight: I18nManager.isRTL ? 0 : 5,
    backgroundColor: Colors.dangerColorHexCode,
    minHeight: 40
  },
  disabledCancelButtonStyle: {
    backgroundColor: Colors.getDangerColorRGPAValue(0.7)
  },
  buttonsContainerStyle: {
    flexDirection: 'row',
    marginTop: 20
  },
  rowStyle: {
    flexDirection: 'row'
  }
});
