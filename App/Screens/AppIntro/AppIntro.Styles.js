import { StyleSheet } from 'react-native';

import { Colors } from './../../Theme';

export default StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: Colors.whiteColorHexCode
  },
  skipButtonContainerStyle: {
    alignSelf: 'flex-end',
    margin: 15,
    padding: 5
  },
  imageContainerStyle: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 30,
    marginVertical: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageStyle: {
    width: 300,
    height: 300
  },
  textContainerStyle: {
    justifyContent: 'center',
    marginBottom: 50,
    marginHorizontal: 5
  },
  titleTextStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.brandColorHexCode,
    textAlign: 'center',
    marginBottom: 5
  },
  descriptionTextStyle: {
    fontSize: 14,
    textAlign: 'center'
  },
  paginationStyle: {
    alignSelf: 'center',
    flex: 0
  },
  dotStyle: {
    borderWidth: 1,
    borderColor: Colors.brandColorHexCode
  },
  primaryButtonStyle: {
    flex: 0,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: Colors.brandColorHexCode,
    borderRadius: 25,
    marginHorizontal: 30,
    minHeight: 40,
    width: 150
  },
  buttonContainerStyle: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 20,
    justifyContent: 'center'
  },
  previousButtonStyle: {
    flex: 0,
    borderWidth: 1,
    borderColor: Colors.brandColorHexCode,
    backgroundColor: Colors.whiteColorHexCode,
    borderRadius: 25,
    marginHorizontal: 10,
    minHeight: 40,
    width: 120
  },
  previousButtonTextStyle: {
    color: Colors.brandColorHexCode,
  },
  nextButtonStyle: {
    flex: 0,
    backgroundColor: Colors.brandColorHexCode,
    borderRadius: 25,
    marginHorizontal: 10,
    minHeight: 40,
    width: 120
  }
});
