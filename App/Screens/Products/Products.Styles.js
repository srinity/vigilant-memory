import { StyleSheet } from 'react-native';
import { Colors } from '../../Theme';

export default StyleSheet.create({
  containerStyle: {
    flex: 1
  },
  headerOptionsContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 20,
    marginTop: 10
  },
  viewingOptionsContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // borderRadius: 6,
    // backgroundColor: Colors.notAvailableColorHexCode,
    // marginTop: 10,
    // overflow: 'hidden'
  },
  viewingOptionStyle: {
    paddingHorizontal: 3,
    paddingVertical: 1,
    borderRadius: 6
  },
  activeViewingOptionStyle: {
    backgroundColor: Colors.brandColorHexCode
  },
  activityIndicatorContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  summaryContainerStyle: {
    position: 'absolute',
    bottom: 25,
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 30,
    backgroundColor: Colors.brandColorHexCode
  },
  summaryTextStyle: {
    fontSize: 18,
    color: Colors.whiteColorHexCode
  }
});
