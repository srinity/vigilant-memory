import { StyleSheet, Platform } from 'react-native';

import { Colors } from '../../Theme';

const headerTextStyle = {
  color: Colors.blackColorHexCode,
  fontWeight: 'bold',
  fontSize: 16,
  marginHorizontal: 10
};

export default StyleSheet.create({
  containerStyle: {
    flex: 1
  },
  scrollContentContainerStyle: {
    minHeight: '100%'
  },
  addressContainerStyle: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: Colors.whiteColorHexCode
  },
  addressHeaderContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  addressHeaderTextStyle: headerTextStyle,
  addressDetailsContainerStyles: {
    paddingLeft: 30,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  noAvailableAddressTextStyle: {
    color: Colors.notAvailableColorHexCode
  },
  addAddressTextStyle: {
    padding: 5,
    color: Colors.blackColorHexCode
  },
  addressItemContainerStyle: {
    padding: 7,
    backgroundColor: Colors.whiteColorHexCode,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.notAvailableColorHexCode,
    borderRadius: 7,
    marginRight: 10
  },
  selectedAddressItemContainerStyle: {
    borderWidth: 2,
    borderColor: Colors.brandColorHexCode,
    ...Platform.select({
      android: {
        elevation: 2
      },
      ios: {
        shadowColor: Colors.notAvailableColorHexCode,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1
      }
    }),
  },
  cardStyle: {
    flex: 0,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginHorizontal: 10
  },
  orderSummaryHeaderStyle: {
    ...headerTextStyle,
    marginBottom: 10
  },
  orderItemContainerStyle: {
    flexDirection: 'row',
    marginBottom: 5,
    marginHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderItemsTextStyle: {
    fontSize: 13,
    color: '#888888',
    flex: 1
  },
  orderItemPriceTextStyle: {
    fontSize: 13,
    color: '#888888'
  },
  orderTotalAmountContainerStyle: {
    flexDirection: 'row',
    marginTop: 10,
    marginHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderTotalAmountTextStyle: {
    color: Colors.brandColorHexCode,
    fontSize: 13,
    fontWeight: 'bold',
    flex: 1
  },
  orderTotalAmountPriceTextStyle: {
    color: Colors.brandColorHexCode,
    fontSize: 13,
    fontWeight: 'bold'
  },
  paymentMethodContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  paymentMethodHeaderStyle: {
    ...headerTextStyle,
    flex: 1
  },
  paymentMethodTotalAmountHeaderStyle: {
    ...headerTextStyle,
    color: Colors.brandColorHexCode
  },
  paymentOptionContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 10
  },
  paymentOptionInfoContainerStyle: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center'
  },
  paymentOptionInfoTextStyle: {
    marginHorizontal: 7,
    color: '#888888',
    fontSize: 13
  },
  buyButtonContainerStyle: {
    marginTop: 15,
    marginBottom: 10
  },
  buyButtonStyle: {
    backgroundColor: Colors.brandColorHexCode,
    minHeight: 45
  },
  buyButtonDisabledStyle: {
    backgroundColor: Colors.getBrandColorRGBAValue(0.7)
  },
  addressInfoContainerStyle: {

  },
  addressDetailTextStyle: {
    marginBottom: 5
  }
});
