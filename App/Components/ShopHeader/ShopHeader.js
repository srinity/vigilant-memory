import React from 'react';
import { View, ViewPropTypes, Text, Image } from 'react-native';
import PropTypes from 'prop-types';
import memoize from 'memoize-one';
import { isString as _isString } from 'lodash';

import { Icon, IconTypes } from './../';
import { iconTypesValues } from './../Icon';

import { colorPropType } from '../../Utils/PropTypesValidators';

import styles from './ShopHeader.Styles';

function constructImageSource(image) {
  if (_isString(image)) {
    return { uri: image };
  }

  return image;
}

const constructImageSourceMemoized = memoize(constructImageSource);

const ShopHeader = ({
  image,
  name,
  address,
  icon,
  iconType,
  iconColor,
  iconSize,
  iconStyle,
  containerStyle,
  ...props
}) => {
  const source = constructImageSourceMemoized(image);

  return (
    <View style={[styles.containerStyle, containerStyle]}>
      <Image
        source={source}
        style={styles.imageStyle}
        resizeMode='cover'
        {...props}
      />

      <View style={styles.textContainerStyle}>
        <Text style={styles.nameTextStyle}>{name}</Text>
        <View style={styles.addressContainerStyle}>
          <Icon
            type={iconType}
            name={icon}
            color={iconColor}
            size={iconSize}
            style={iconStyle}
          />
          <Text style={styles.addressTextStyle}>{address}</Text>
        </View>
      </View>
    </View>
  );
};

ShopHeader.defaultProps = {
  iconType: IconTypes.entypo,
  iconColor: '#d21706',
  iconSize: 10,
  iconStyle: {},
  containerStyle: {}
};

ShopHeader.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  iconType: PropTypes.oneOf(iconTypesValues),
  iconColor: colorPropType,
  iconSize: PropTypes.number,
  iconStyle: ViewPropTypes.style,
  containerStyle: ViewPropTypes.style
};

export default ShopHeader;
