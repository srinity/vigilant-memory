import { StyleSheet, I18nManager } from 'react-native';

export default StyleSheet.create({
  containerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  optionContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  optionTextStyle: {
    marginLeft: I18nManager.isRTL ? 0 : 10,
    marginRight: I18nManager.isRTL ? 10 : 0,
    fontSize: 17
  }
});
