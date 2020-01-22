import { StyleSheet } from 'react-native';

import { Colors } from '../../Theme';

export default StyleSheet.create({
  containerStyle: {
    flex: 1,
     paddingHorizontal: 15,
     paddingTop: 40
  },
  inputsStyle: {
    marginBottom: 10
  },
  buttonStyle: {
    flex: 0,
    marginTop: 40,
    marginBottom: 10,
    backgroundColor: Colors.brandColorHexCode,
    borderRadius: 25,
    marginHorizontal: 30,
    minHeight: 40,
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
});
