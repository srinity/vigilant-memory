import { Platform, Dimensions } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const X_WIDTH = 375;
const X_HEIGHT = 812;
const XSMAX_WIDTH = 414;
const XSMAX_HEIGHT = 896;

export function isIPhoneDeviceWithNotch() {
  return (
    Platform.OS === 'ios' &&
    ((screenHeight === X_HEIGHT && screenWidth === X_WIDTH) ||
      (screenHeight === XSMAX_HEIGHT && screenWidth === XSMAX_WIDTH))
  )
}
