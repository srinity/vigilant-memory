import { StyleSheet, I18nManager } from 'react-native';

import { Colors } from '../../Theme';

export default StyleSheet.create({
  containerStyle: {
    flex: 1
  },
  retryButtonContainerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  retryButtonStyle: {
    marginTop: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 2,
    borderColor: Colors.notAvailableColorHexCode
  },
  firstOrderContainerStyle: {
    marginTop: 15,
  },
  orderStoreContainerStyle: {
    justifyContent: 'space-between',
    // flex: 1
  },
  orderStoreTextStyle: {
    fontSize: 16,
    color: Colors.brandColorHexCode,
    textAlign: I18nManager.isRTL ? 'auto' : 'left',
    // marginBottom: 10
  },
  orderStatusTextStyle: {
    alignSelf: 'flex-end',
    fontWeight: 'bold',
  },
  orderTimeTextStyle: {
    marginTop: 5,
    color: Colors.getBlackColorRGBAValue(0.7)
  }
});
