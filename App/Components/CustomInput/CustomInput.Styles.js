import { StyleSheet, I18nManager, Platform } from 'react-native';

import { Colors } from './../../Theme';

export default StyleSheet.create({
  containerStyle: {
    marginBottom: 5,
    marginHorizontal: 10,
  },
  errorContainerStyle: {
    flexDirection: 'row',
    marginTop: 5
  },
  errorTextStyle: {
    color: Colors.blackTwo,
    flex: 1,
    fontSize: 16.6,
    lineHeight: 22,
    marginLeft: I18nManager.isRTL ? 0 : 7,
    marginRight: I18nManager.isRTL ? 7 : 0,
    paddingTop: Platform.OS === 'ios' ? 3 : 1
    // paddingTop: Platform.OS === 'ios' ? 3 : null
  },
  inputContainerStyle: {
    borderBottomWidth: 1,
    borderColor: Colors.brandColorHexCode,
    flexDirection: 'row'
  },
  leftIconContainerStyle: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 15,
    marginLeft: I18nManager.isRTL ? 10 : 5,
    marginRight: I18nManager.isRTL ? 5 : 10
  },
  rightIconContainerStyle: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 15,
    marginLeft: I18nManager.isRTL ? 5 : 0,
    marginRight: I18nManager.isRTL ? 0 : 5
  },
  textInputStyle: {
    flex: 1
  }
})
