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
    margin: 10
  },
  userNameTextStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.brandColorHexCode
  },
  accountOptionsContainerStyle: {
    marginVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: Colors.whiteColorHexCode
  },
  accountOptionButtonStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    // marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: Colors.notAvailableColorHexCode
  },
  accountOptionButtonTextStyle: {
    marginLeft: 5,
    fontSize: 16,
    color: Colors.blackColorHexCode
  }
});
