import { StyleSheet, I18nManager } from 'react-native';
import { Colors } from '../../Theme';

export default StyleSheet.create({
  containerStyle: {
    flex: 0,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 0,
    marginHorizontal: 0,
    marginVertical: 5
  },
  imageContainerStyle: {
    flex: 1,
    flexDirection: 'row',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    overflow: 'hidden'
  },
  imageStyle: {
    flex: 1,
    width: undefined,
    height: undefined
  },
  infoContainerStyle: {
    marginVertical: 10,
    paddingHorizontal: 10
  },
  nameStyle: {
    color: Colors.brandColorHexCode,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5
  },
  addressStyle: {
    textAlign: I18nManager.isRTL ? 'right' : 'left',
    fontSize: 12,
    marginHorizontal: 5
  },
  deliveryStyle: {
    textAlign: I18nManager.isRTL ? 'right' : 'left',
    fontSize: 12,
    marginHorizontal: 5
  },
  addressContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5
  },
  deliveryContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});

export const horizontalStyle = StyleSheet.create({
  containerStyle: {
    flex: 0,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 0,
    marginHorizontal: 0,
    marginVertical: 5,
    borderRadius: 0
  },
  imageContainerStyle: {
    flex: 1,
    flexDirection: 'row',
    overflow: 'hidden'
  },
  imageStyle: {
    flex: 1,
    width: undefined,
    height: undefined
  },
  infoContainerStyle: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: Colors.getBlackColorRGBAValue(0.6)
  },
  nameStyle: {
    color: Colors.whiteColorHexCode,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5
  },
  addressStyle: {
    color: Colors.whiteColorHexCode,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
    fontSize: 12,
    marginHorizontal: 5
  },
  deliveryStyle: {
    color: Colors.whiteColorHexCode,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
    fontSize: 14,
    marginHorizontal: 5,
    fontWeight: 'bold',
  },
  addressContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginBottom: 5
  },
  deliveryContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    right: 20,
    backgroundColor: Colors.brandColorHexCode,
    borderRadius: 25,
    paddingVertical: 5,
    paddingHorizontal: 5
  }
});
