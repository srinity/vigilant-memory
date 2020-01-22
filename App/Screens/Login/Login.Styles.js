import { StyleSheet, Platform } from 'react-native';

import { Colors } from './../../Theme';

export default StyleSheet.create({
  containerStyle: {
    flex: 1
  },
  scrollContainerStyle: {
    flex: 1,
    backgroundColor: Colors.whiteColorHexCode
  },
  contentContainerStyle: {
    minHeight: '100%'
  },
  cardSectionStyle: {
    borderBottomWidth: 0,
    flex: 0
  },
  buttonCardSectionStyle: {
    borderBottomWidth: 0,
    marginTop: 30,
    flex: 0,
    width: '100%'
  },
  buttonStyle: {
    width: '100%',
    alignSelf: 'center',
    borderRadius: 50,
    backgroundColor: Colors.brandColorHexCode,
    minHeight: 40,
    marginHorizontal: 0,
  },
  buttonTextStyle: {
    color: Colors.whiteColorHexCode
  },
  disabledButtonStyle: {
    backgroundColor: Colors.getBrandColorRGBAValue(0.5)
  },
  indicatorColor: {
    color: Colors.brandColorHexCode
  },
  actionsContainerStyle: {
    flexDirection: 'row',
    marginTop: 20,
  },
  actionsTextStyle: {
    color: Colors.brandColorHexCode,
    fontWeight: 'bold'
  },
  inactiveActionTextStyle: {
    color: Colors.brandColorHexCode,
    marginRight: 5
  },
  footerContainerStyle: {
    marginBottom: 20
  },
  phoneInputContainerStyle: {
    paddingVertical: Platform.OS === 'ios' ? 15 : 0,
    marginBottom: 15
  },
  passwordInputContainerStyle: {
    padding: 5,
    marginBottom: 15
  }
});
