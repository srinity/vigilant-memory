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
    flex: 1,
    marginVertical: 5,
    backgroundColor: Colors.whiteColorHexCode,
    borderRadius: 6,
    ...shadowing
  },
  imageStyle: {
    marginVertical: 10,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: Colors.notAvailableColorHexCode
  },
  infoContainerStyle: {
    flex: 1,
    justifyContent: 'space-between',
    marginVertical: 7,
    paddingHorizontal: 10
  },
  nameTextStyle: {
    textAlign: 'center',
    color: Colors.brandColorHexCode,
    marginBottom: 5
  },
  textStyle: {
    color: Colors.blackColorHexCode,
  },
  priceContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});

export const horizontalStyles = StyleSheet.create({
  containerStyle: {
    backgroundColor: Colors.whiteColorHexCode,
    borderRadius: 6,
    flex: 1,
    flexDirection: 'row',
    // marginHorizontal: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
    ...shadowing
  },
  imageStyle: {
    marginVertical: 10,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: Colors.notAvailableColorHexCode
  },
  infoContainerStyle: {
    flex: 1,
    justifyContent: 'space-between',
    marginTop: 15,
    marginBottom: 15,
    marginHorizontal: 10
  },
  dataContainerStyle: {
    flex: 1,
    flexDirection: 'row'
  },
  nameTextStyle: {
    color: Colors.brandColorHexCode,
    marginBottom: 5,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
  },
  textStyle: {
    color: Colors.blackColorHexCode,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
  },
  iconContainerStyle: {
    padding: 7,
    justifyContent: 'center',
    height: '100%'
  }
});
