import { StyleSheet } from 'react-native';
import { Colors } from '../../Theme';

export default StyleSheet.create({
  containerStyle: {
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: Colors.notAvailableColorHexCode,
    backgroundColor: Colors.whiteColorHexCode,
    justifyContent: 'center',
    alignItems: 'center'
  },
  activeContainerStyle: {
    borderWidth: 0,
    backgroundColor: Colors.brandColorHexCode
  },
  textStyle: {
    fontSize: 14,
    color: Colors.blackColorHexCode
  },
  activeTextStyle: {
    color: Colors.whiteColorHexCode
  }
});
