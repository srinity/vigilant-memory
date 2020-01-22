import { StyleSheet, Platform } from 'react-native';

import { Colors } from './../../Theme';

export default StyleSheet.create({
  containerStyle: {
    flexDirection: 'row',
    borderRadius: 30,
    borderColor: Colors.brandColorHexCode,
    borderWidth: 1,
    paddingVertical: Platform.OS === 'ios' ? 10 : 0,
    paddingHorizontal: 15,
    backgroundColor: Colors.whiteColorHexCode,
    alignItems: 'center'
  },
  inputStyle: {
    flex: 1
  },
  iconStyle: {
    padding: 5
  },
  errorContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  errorTextStyle: {
    color: Colors.dangerColorHexCode,
    fontSize: 11,
    marginHorizontal: 5
  }
});
