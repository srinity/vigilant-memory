import { StyleSheet } from 'react-native';

import { Colors } from '../../Theme';

export default StyleSheet.create({
  containerStyle: {
    flex: 1,
    // backgroundColor: Colors.whiteColorHexCode
  },
  activityIndicatorContainerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loginButtonContainerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loginButtonStyle: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 2,
    borderColor: Colors.notAvailableColorHexCode
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
  userNameContainerStyle: {
    marginVertical: 20,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  userNameTextStyle: {
    fontSize: 18,
    color: Colors.brandColorHexCode,
    marginTop: 5
  },
  userImageContainerStyle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: Colors.getBlackColorRGBAValue(0.6),
    backgroundColor: Colors.whiteColorHexCode,
    alignItems: 'center',
    justifyContent: 'center'
  },
  accountOptionsContainerStyle: {
    marginVertical: 10,
    // paddingHorizontal: 10,
    // backgroundColor: Colors.whiteColorHexCode
  },
  accountOptionButtonStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    // marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: Colors.notAvailableColorHexCode
  },
  lastAccountOptionButtonStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5
  },
  accountOptionButtonTextStyle: {
    marginLeft: 5,
    fontSize: 16,
    color: Colors.blackColorHexCode
  },
  cardsContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'center'
  }
});
