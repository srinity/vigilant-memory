import { StyleSheet, Platform, I18nManager } from 'react-native';

import { Colors } from '../../Theme';

const shadowing = Platform.select({
  ios: {
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOpacity: 1,
    shadowOffset: { width: 0, height: 2 }
  },
  android: {
    elevation: 2
  }
});

export default StyleSheet.create({
  containerStyle: {
    flex: 1
  },
  purchaseInfoContainerStyle: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: Colors.whiteColorHexCode,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  priceContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  totalTextStyle: {
    fontSize: 14,
    color: Colors.getBlackColorRGBAValue(0.7)
  },
  priceTextStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.blackColorHexCode
  },
  buyButtonStyle: {
    flex: 0,
    backgroundColor: Colors.brandColorHexCode,
    borderRadius: 25,
    marginHorizontal: 30,
    marginBottom: 15,
    minHeight: 40,
  },
  buyButtonDisabledStyle: {
    backgroundColor: Colors.getBrandColorRGBAValue(0.7)
  },
  buyButtonTextStyle: {
    fontSize: 14
  },
  shopContainerStyle: {
    // paddingHorizontal: 10,
    paddingVertical: 5,
    marginVertical: 7,
    backgroundColor: Colors.whiteColorHexCode,
    // ...shadowing
  },
  shopHeaderStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 20,
    marginBottom: 20,
    borderBottomColor: Colors.notAvailableColorHexCode,
    borderBottomWidth: 1
  },
  shopHeaderIconStyle: {
    marginTop: 20
  },
  addressTextStyle: {
    fontSize: 12,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
    marginHorizontal: 7
  },
  noAddressAvailableTextStyle: {
    fontSize: 12,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
    color: Colors.getBlackColorRGBAValue(0.6)
  },
  deliveryInfoContainerStyle: {
    paddingHorizontal: 15,
    paddingVertical: 10
  },
  addressContainerStyle: {
    marginTop: 10,
    marginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  addressDetailsContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  editDeliveryAddressButtonStyle: {
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 15,
    backgroundColor: Colors.brandColorHexCode
  },
  editDeliveryAddressButtonTextStyle: {
    fontSize: 10,
    color: Colors.whiteColorHexCode
  }
});
