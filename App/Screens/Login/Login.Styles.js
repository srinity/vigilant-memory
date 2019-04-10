import { StyleSheet } from 'react-native';

import { Colors } from './../../Theme';

export default StyleSheet.create({
  containerStyle: {
    flex: 1
  },
  scrollContainerStyle: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)'
  },
  contentContainerStyle: {
    minHeight: '100%'
  },
  cardStyle: {
    flex: 1,
    borderRadius: 5,
    elevation: 0,
    borderColor: 'rgba(184,23,215,0)',
    backgroundColor: 'rgba(255,255,255,0)',
    padding: 0,
    shadowOpacity: 0,
    justifyContent: 'flex-start'
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
    borderRadius: 50,
    backgroundColor: Colors.whiteColorHexCode,
    minHeight: 40
  },
  buttonTextStyle: {
    color: Colors.brandColorHexCode
  },
  disabledButtonStyle: {
    backgroundColor: Colors.getWhiteColorRGBAValue(0.5)
  },
  indicatorColor: {
    color: Colors.brandColorHexCode
  },
  actionsContainerStyle: {
    flexDirection: 'row',
    marginTop: 30,
  },
  actionsTextStyle: {
    color: Colors.whiteColorHexCode,
    fontWeight: 'bold'
  },
  inactiveActionTextStyle: {
    color: Colors.whiteColorHexCode,
    marginRight: 5
  },
  footerContainerStyle: {
    marginBottom: 20
  }
});
