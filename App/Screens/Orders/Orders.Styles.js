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
  orderContainerStyle: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: Colors.notAvailableColorHexCode,
  },
  orderStoreContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderStoreTextStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    marginRight: I18nManager.isRTL ? 0 : 5,
    marginLeft: I18nManager.isRTL ? 5 : 0,
    textAlign: I18nManager.isRTL ? 'auto' : 'left'
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
