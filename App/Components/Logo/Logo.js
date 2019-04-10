import React from 'react';
import { Image, ViewPropTypes, SafeAreaView} from 'react-native';
import PropTypes from 'prop-types';

import { Images, imageNames } from './../../Theme';

import styles from './Logo.Styles';

const Logo = ({
  containerStyle,
  name,
  resizeMode,
  style,
  ...props
}) => {
  return (
    <SafeAreaView style={[styles.logoContainerStyle, containerStyle]}>
      <Image
        source={Images[name]}
        style={[styles.logoStyle, style]}
        resizeMode={resizeMode}
        {...props}
      />
    </SafeAreaView>
  );
};

Logo.defaultProps = {
  resizeMode: 'contain',
  containerStyle: {},
  style: {}
};

Logo.propTypes = {
  containerStyle: ViewPropTypes.style,
  name: PropTypes.oneOf(imageNames).isRequired,
  resizeMode: PropTypes.oneOf(['cover', 'contain', 'stretch', 'repeat', 'center']),
  style: ViewPropTypes.style
};

export default Logo;
