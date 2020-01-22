import { StyleSheet, I18nManager } from 'react-native';
import { Colors } from '../../Theme';

export default StyleSheet.create({
  containerStyle: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    marginHorizontal: 10,
    marginVertical: 0,
    marginBottom: 10, 
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 7
  },
  imageStyle: {
    width: 80,
    height: 80,
  },
  infoContainerStyle: {
    flex: 1,
    marginHorizontal: 5,
    marginTop: 5
  },
  topTextContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10
  },
  titleTextStyle: {
    fontSize: 16,
    color: Colors.brandColorHexCode,
    textAlign: I18nManager.isRTL ? 'auto' : 'left',
  },
  textStyle: {
    fontSize: 11
  },
  middleTextContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 7
  },
  bottomTextContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5
  },
  tagStyle: {
    paddingVertical: 2,
    paddingHorizontal: 12
  }
});
