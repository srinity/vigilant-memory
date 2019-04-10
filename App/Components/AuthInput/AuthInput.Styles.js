import { StyleSheet, Platform } from 'react-native';

import { Colors } from './../../Theme';

export default StyleSheet.create({
  inputCardSectionStyle: {
    borderBottomWidth: 0,
    flex: 0
  },
  inputStyle: {
    flex: 0,
    paddingVertical: Platform.OS === 'ios' ? 10 : 0,
    backgroundColor: Colors.authBrandColorBackgroundHexCode,
    borderColor: Colors.getAuthBrandColorBorderRGBAValue(0.5),
    borderWidth: 0.5,
    paddingLeft: 40,
    maxHeight: 41
  },
  inputInvalidStyle: {
    borderColor: Colors.getDangerColorRGPAValue(1),
  },
  inputTextStyle: {
    color: Colors.whiteColorHexCode
  },
  iconContainerStyle: {
    paddingVertical: 7,
    backgroundColor: Colors.whiteColorHexCode,
    position: 'absolute',
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconColor: {
    color: Colors.brandColorHexCode
  },
  selectionColor: {
    color: Colors.whiteColorHexCode
  },
  placeHolderColor: {
    color: Colors.whiteColorHexCode
  }
});
