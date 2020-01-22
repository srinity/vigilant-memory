import { StyleSheet, I18nManager, Platform } from 'react-native';

import { Colors } from '../../Theme';

export default StyleSheet.create({
  containerStyle: {
    flex: 1,
    paddingTop: 40
  },
  infoInputsContainerStyle: {
    marginHorizontal: 10
  },
  nameContainerStyle: {
    flexDirection: 'row',
    marginBottom: 10
  },
  firstNameContainerStyle: {
    flex: 1,
    marginRight: I18nManager.isRTL ? 0 : 10,
    marginLeft: I18nManager.isRTL ? 10 : 0
  },
  lastNameContainerStyle: {
    flex: 1
  },
  inputContainerStyle: {
    marginBottom: 10
  },
  inputStyle: {
    color: Colors.getBlackColorRGBAValue(0.7)
  },
  datePickerStyle: {
    marginTop: Platform.OS === 'ios' ? 0 : 10,
    paddingHorizontal: 15,
    paddingVertical: Platform.OS === 'ios' ? 0 : 25, 
    alignItems: 'flex-start',
    borderRadius: 30,
    borderColor: Colors.brandColorHexCode,
    backgroundColor: Colors.whiteColorHexCode,
  },
  disabledDatePickerStyle: {
    backgroundColor: Colors.whiteColorHexCode 
  },
  datePickerContainerStyle: {
    width: '100%',
    marginBottom: 10
  },
  genderContainerStyle: {
    marginHorizontal: 50,
    marginTop: 20
  },
  changePasswordButtonStyle: {
    flex: 0,
    marginTop: 40,
    marginBottom: 10,
    backgroundColor: Colors.brandColorHexCode,
    borderRadius: 25,
    marginHorizontal: 30,
    minHeight: 40,
  }
});
