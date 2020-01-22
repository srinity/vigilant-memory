import { StyleSheet } from 'react-native';
import { Colors } from '../../Theme';

export default StyleSheet.create({
  containerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  orderSuccessTitle: {
    color: Colors.brandColorHexCode,
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 30
  },
  orderSuccessDescription: {
    fontSize: 10,
    marginVertical: 15,
    marginHorizontal: 30,
    textAlign: 'center'
  },
  orderActionsContainerStyle: {
    flexDirection: 'row',
    marginTop: 10
  },
  keepShoppingButtonStyle: {
    flex: 0,
    backgroundColor: Colors.brandColorHexCode,
    borderRadius: 25,
    marginRight: 10,
    minHeight: 40,
    paddingHorizontal: 15,
    paddingVertical: 5
  },
  keepShoppingButtonTextStyle: {
    fontSize: 11
  },
  backToMainButtonStyle: {
    flex: 0,
    backgroundColor: Colors.whiteColorHexCode,
    borderRadius: 25,
    marginRight: 10,
    minHeight: 40,
    borderColor: Colors.brandColorHexCode,
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 5
  },
  backToMainButtonTextStyle: {
    color: Colors.brandColorHexCode,
    fontSize: 11
  }
});
