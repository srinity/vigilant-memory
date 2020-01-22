import { StyleSheet, I18nManager, Platform } from 'react-native';

import { Colors } from '../../Theme';

export default StyleSheet.create({
  containerStyle: {
    flex: 1
  },
  contentContainerStyle: {
    paddingHorizontal: 10,
    marginVertical: 20
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
    marginRight: I18nManager.isRTL ? 0 : 10,
    paddingVertical: Platform.OS === 'ios' ? 15 : 0,
  },
  lastRowInputStyle: {
    flex: 1,
    marginHorizontal: 0,
    paddingVertical: Platform.OS === 'ios' ? 15 : 0,
  },
  streetInputStyle: {
    marginTop: 10,
    paddingVertical: Platform.OS === 'ios' ? 15 : 0,
  },
  addButtonStyle: {
    flex: 0,
    backgroundColor: Colors.brandColorHexCode,
    borderRadius: 25,
    minHeight: 40,
    marginHorizontal: 0,
    marginLeft: I18nManager.isRTL ? 0 : 5,
    marginRight: I18nManager.isRTL ? 5 : 0,
  },
  disabledAddButtonStyle: {
    backgroundColor: Colors.getBrandColorRGBAValue(0.7)
  },
  cancelButtonStyle: {
    flex: 0,
    backgroundColor: Colors.whiteColorHexCode,
    borderRadius: 25,
    borderColor: Colors.brandColorHexCode,
    borderWidth: 1,
    minHeight: 40,
    marginHorizontal: 0,
    marginLeft: I18nManager.isRTL ? 5 : 0,
    marginRight: I18nManager.isRTL ? 0 : 5,
  },
  cancelButtonTextStyle: {
    color: Colors.brandColorHexCode,
  },
  disabledCancelButtonStyle: {
    backgroundColor: Colors.notAvailableColorHexCode
  },
  buttonsContainerStyle: {
    alignSelf: 'center',
    flexDirection: 'row',
    marginTop: 30,
    marginBottom: 10
  },
  rowStyle: {
    flexDirection: 'row',
    marginTop: 10
  },
  dropDownContainerStyle: {
    borderRadius: 25,
    borderWidth: 1,
    borderColor: Colors.brandColorHexCode,
    backgroundColor: Colors.whiteColorHexCode,
    height: 50,
    justifyContent: 'center',
    paddingHorizontal: 15,
    // marginBottom: 10,
    width: '100%'
  },
  horizontalDropDownContainerStyle: {
    borderRadius: 25,
    borderWidth: 1,
    borderColor: Colors.brandColorHexCode,
    backgroundColor: Colors.whiteColorHexCode,
    height: 50,
    justifyContent: 'center',
    paddingHorizontal: 15,
    // marginBottom: 10,
    flex: 1,
  },
  firstHorizontalDropDownContainerStyle: {
    borderRadius: 25,
    borderWidth: 1,
    borderColor: Colors.brandColorHexCode,
    backgroundColor: Colors.whiteColorHexCode,
    height: 50,
    justifyContent: 'center',
    paddingHorizontal: 15,
    // marginBottom: 10,
    flex: 1,
    marginLeft: I18nManager.isRTL ? 15 : 0,
    marginRight: I18nManager.isRTL ? 0 : 15
  },
  dropDownTextStyle: {
    textAlign: I18nManager.isRTL ? 'right' : 'left'
  },
});
