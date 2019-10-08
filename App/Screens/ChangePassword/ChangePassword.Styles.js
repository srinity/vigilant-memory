import { StyleSheet } from 'react-native';

import { Colors } from '../../Theme';

export default StyleSheet.create({
  containerStyle: {
    flex: 1,
     paddingHorizontal: 15
  },
  buttonStyle: {
    // borderRadius: 50,
    backgroundColor: Colors.brandColorHexCode,
    minHeight: 40,
    flex: 0,
    marginVertical: 10 
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
