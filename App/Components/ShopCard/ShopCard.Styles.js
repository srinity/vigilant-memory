import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  containerStyle: {
    flex: 0,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 0
  },
  imageContainerStyle: {
    flex: 1,
    flexDirection: 'row'
  },
  imageStyle: {
    flex: 1,
    width: undefined,
    height: undefined
  },
  infoContainerStyle: {
    marginVertical: 10,
    padding: 10
  },
  nameStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5
  }
});
