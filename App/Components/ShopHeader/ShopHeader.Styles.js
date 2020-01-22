import { StyleSheet, I18nManager } from 'react-native';

import { Colors } from '../../Theme';

export default StyleSheet.create({
  containerStyle: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 10,
    backgroundColor: Colors.whiteColorHexCode
  },
  imageStyle: {
    width: 60
  },
  textContainerStyle: {
   marginVertical: 5,
   marginHorizontal: 10,
   justifyContent: 'center'
  },
  nameTextStyle: {
    fontSize: 16,
    color: Colors.brandColorHexCode,
    fontWeight: 'bold',
    lineHeight: 37,
    textAlign: I18nManager.isRTL ? 'right' : 'left'
  },
  addressTextStyle: {
    fontSize: 12,
    textAlign: I18nManager.isRTL ? 'right' : 'left'
  },
  addressContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});
