import { StyleSheet } from 'react-native';

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
    borderRadius: 50,
    backgroundColor: Colors.brandColorHexCode,
    minHeight: 40
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
  controlsContainerStyle: {
    flex: 1,
    paddingHorizontal: 15
  },
});
