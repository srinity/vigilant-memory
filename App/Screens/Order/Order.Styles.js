import { StyleSheet, I18nManager } from 'react-native';

import { Colors } from '../../Theme';

export default StyleSheet.create({
  containerStyle: {
    flex: 1
  },
  rawStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderTopColor: Colors.notAvailableColorHexCode,
    borderTopWidth: 1
  },
  deliveryAddressContainerStyle: {
    padding: 10,
    borderTopColor: Colors.notAvailableColorHexCode,
    borderTopWidth: 1
  },
  orderInfoCardStyle: {
    backgroundColor: Colors.whiteColorHexCode,
    paddingVertical: 10,
    // paddingHorizontal: 10,
    marginBottom: 5,
  },
  orderInfoPropertyTextStyle: {
    fontSize: 13,
    // color: Colors.getBlackColorRGBAValue(0.4)
  },
  orderInfoTextStyle: {
    marginHorizontal: 3,
    fontSize: 13,
    color: Colors.brandColorHexCode,
  },
  orderItemsTitleTextStyle: {
    paddingHorizontal: 10,
    marginBottom: 5
  },
  orderItemContainerStyle: {
    flexDirection: 'row',
    borderTopColor: Colors.notAvailableColorHexCode,
    borderTopWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 15
  },
  orderTotalContainerStyle: {
    flexDirection: 'row',
    marginTop: 5
  },
  orderItemImageStyle: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  orderItemInfoContainerStyle: {
    marginHorizontal: 10
  },
  orderItemNameTextStyle: {
    marginBottom: 5,
    color: Colors.brandColorHexCode,
    fontSize: 14,
    fontWeight: 'bold',
    // flex: 1,
    textAlign: I18nManager.isRTL ? 'auto' : 'left'
  },
  orderItemPriceTextStyle: {
    fontSize: 10,
    marginBottom: 5
  },
  tagStyle: {
    paddingVertical: 2,
    paddingHorizontal: 12
  },
  textStyle: {
    fontSize: 13,
    fontWeight: 'bold'
  },
  orderDetailsCardStyle: {
    backgroundColor: Colors.whiteColorHexCode,
    paddingTop: 15,
    paddingBottom: 10,
    marginBottom: 5,
  },
  orderCostDetailsContainerStyle: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: Colors.notAvailableColorHexCode,
    borderBottomColor: Colors.notAvailableColorHexCode
  },
  orderPriceDetailsRowStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  orderPriceDetailsTitleTextStyle: {
    fontSize: 13
  },
  orderPriceDetailsValueTextStyle: {
    fontSize: 13,
    color: Colors.brandColorHexCode
  },
  orderItemsCostContainerStyle: {
    marginBottom: 5
  },
  orderTotalCostContainerStyle: {
    paddingTop: 5,
    paddingHorizontal: 20
  }
});
