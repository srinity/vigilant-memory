import React from 'react';
import { View, ViewPropTypes, Text, Image, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import memoize from 'memoize-one';
import { isString as _isString } from 'lodash';
import I18n from 'react-native-i18n';

import { Card } from './../';
import { Icon, IconTypes } from '../Icon';

import { Colors } from '../../Theme';

import verticalStyle, { horizontalStyle } from './ShopCard.Styles';

function constructImageSource(image) {
  if (_isString(image)) {
    return { uri: image };
  }

  return image;
}

function constructCardContainerStyle(height, width, defaultContainerStyle, containerStyle) {
  return StyleSheet.flatten([defaultContainerStyle, containerStyle, { height, width }]);
}

const constructImageSourceMemoized = memoize(constructImageSource);
const constructCardContainerStyleMemoized = memoize(constructCardContainerStyle);

const ShopCard = ({
  name,
  address,
  deliveryCharge,
  image,
  height,
  width,
  onPress,
  containerStyle,
  imageStyle,
  infoContainerStyle,
  nameStyle,
  addressStyle,
  horizontal,
  ...props
}) => {
  const styles = horizontal ? horizontalStyle : verticalStyle;
  const source = constructImageSourceMemoized(image);
  const cardStyle = constructCardContainerStyleMemoized(height, width, styles.containerStyle, containerStyle);
  const deliveryIconColor = horizontal ? Colors.whiteColorHexCode : '#484f7d';
  const deliveryIconSize = horizontal ? 15 : 10;

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Card style={cardStyle}>
        <View style={styles.imageContainerStyle}>
          <Image
            source={source}
            style={[styles.imageStyle, imageStyle]}
            resizeMode='cover'
            {...props}
          />
        </View>
        <View style={[styles.infoContainerStyle, infoContainerStyle]}>
          <Text style={[styles.nameStyle, nameStyle]}>{name}</Text>

          <View style={styles.addressContainerStyle}>
            <Icon type={IconTypes.fontAwesome} name='map-marker' color='#d21706' size={10} />
            <Text style={[styles.addressStyle, addressStyle]}>{address}</Text>
          </View>

          <View style={styles.deliveryContainerStyle}>
            <Icon type={IconTypes.materialCommunity} name='truck-delivery' color={deliveryIconColor} size={deliveryIconSize} />
            <Text style={[styles.deliveryStyle, addressStyle]}>{deliveryCharge === 0 ? I18n.t('home_screen_free_shop_delivery') : `${deliveryCharge}${I18n.t('home_screen_shop_delivery_currency')}`}</Text>
          </View>
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
  addressStyle: {},
  horizontal: false
};

ShopCard.propTypes = {
  name: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  deliveryCharge: PropTypes.number.isRequired,
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
  addressStyle: Text.propTypes.style,
  horizontal: PropTypes.bool
};

export default ShopCard;
