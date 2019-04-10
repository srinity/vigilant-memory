import React from 'react';
import { View, ViewPropTypes, Text, Image, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import memoize from 'memoize-one';
import { isString as _isString } from 'lodash'

import { Card } from './../';

import styles from './ShopCard.Styles';

function constructImageSource (image) {
  if (_isString(image)) {
    return { uri: image };
  }

  return image;
}

function constructCardContainerStyle (height, defaultContainerStyle, containerStyle) {
  return StyleSheet.flatten([defaultContainerStyle, containerStyle, { height }]);
}

const constructImageSourceMemoized = memoize(constructImageSource);
const constructCardContainerStyleMemoized = memoize(constructCardContainerStyle);

const ShopCard = ({
  name,
  address,
  image,
  height,
  onPress,
  containerStyle,
  imageStyle,
  infoContainerStyle,
  nameStyle,
  addressStyle,
  ...props
}) => {
  const source = constructImageSourceMemoized(image);
  const cardStyle = constructCardContainerStyleMemoized(height, styles.containerStyle, containerStyle);
  console.tron.log(source)
  console.tron.log(cardStyle)
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Card style={cardStyle}>
        <View style={styles.imageContainerStyle}>
          <Image source={source} style={[styles.imageStyle, imageStyle]} resizeMode='cover' {...props} />
        </View>
        <View style={[styles.infoContainerStyle, infoContainerStyle]}>
          <Text style={[styles.nameStyle, nameStyle]}>{name}</Text>
          <Text style={addressStyle}>{address}</Text>
        </View>
      </Card>
    </TouchableWithoutFeedback>
  );
}

ShopCard.defaultProps = {
  onPress: () => {},
  containerStyle: {},
  imageStyle: {},
  infoContainerStyle: {},
  nameStyle: {},
  addressStyle: {}
};

ShopCard.propTypes = {
  name: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  image: PropTypes.oneOf([
    PropTypes.shape({
      uri: PropTypes.string.isRequired
    }).isRequired,
    PropTypes.string.isRequired
  ]).isRequired,
  height: PropTypes.number.isRequired,
  onPress: PropTypes.func.isRequired,
  containerStyle: ViewPropTypes.style,
  imageStyle: ViewPropTypes.style,
  infoContainerStyle: ViewPropTypes.style,
  nameStyle: Text.propTypes.style,
  addressStyle: Text.propTypes.style
};

export default ShopCard;
