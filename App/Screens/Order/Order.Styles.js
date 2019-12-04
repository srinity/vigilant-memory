import { StyleSheet, I18nManager } from 'react-native';

import { Colors } from '../../Theme';

export default StyleSheet.create({
  containerStyle: {
    flex: 1
  },
  rawStyle: {
    flexDirection: 'row',
    marginBottom: 3
  },
  orderInfoCardStyle: {
    backgroundColor: Colors.whiteColorHexCode,
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginBottom: 5,
  },
  orderInfoPropertyTextStyle: {
    color: Colors.getBlackColorRGBAValue(0.4)
  },
  orderInfoTextStyle: {
    marginHorizontal: 3,
    flex: 1,
    textAlign: I18nManager.isRTL ? 'auto' : 'left'
  },
  orderItemsTitleTextStyle: {
    fontWeight: 'bold',
    marginBottom: 10
  },
  orderItemContainerStyle: {
    flexDirection: 'row',
    marginBottom: 5,
    borderBottomColor: Colors.notAvailableColorHexCode,
    borderBottomWidth: 1
  },
  orderTotalContainerStyle: {
    flexDirection: 'row',
    marginTop: 5
  },
  orderItemNameTextStyle: {
    marginBottom: 3,
    flex: 1,
    textAlign: I18nManager.isRTL ? 'auto' : 'left'
  },
  orderItemPriceTextStyle: {
    color: Colors.getBlackColorRGBAValue(0.5)
  }
});
