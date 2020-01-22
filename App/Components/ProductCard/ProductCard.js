import React from 'react';
import { View, ViewPropTypes, Text, Image, StyleSheet, Platform, TouchableOpacity, TouchableNativeFeedback } from 'react-native';
import PropTypes from 'prop-types';
import memoize from 'memoize-one';
import { isString as _isString } from 'lodash';
import I18n from 'react-native-i18n';

import { Icon, IconTypes } from '../Icon';

import { colorPropType } from '../../Utils/PropTypesValidators';

import verticalStyles, { horizontalStyles } from './ProductCard.Styles';

const TouchableComponent = Platform.OS === 'ios' ? TouchableOpacity : TouchableNativeFeedback;

function constructImageSource(image) {
  if (_isString(image)) {
    return { uri: image };
  }

  return image;
}

function getImageStyle(height, horizontal) {
  let imageSize = (height * (1.5 / 2.5)) - 20;

  if (horizontal) {
    imageSize = height - 20;
  }

  return { width: imageSize, height: imageSize, borderRadius: imageSize / 2 };
}

const constructImageSourceMemoized = memoize(constructImageSource);
const getImageStyleMemoized = memoize(getImageStyle);

const ProductCard = ({
  image,
  name,
  price,
  horizontal,
  onPress,
  iconName,
  iconSize,
  iconColor,
  containerStyle,
  ...props
}) => {
  const styles = horizontal ? horizontalStyles : verticalStyles;
  const source = constructImageSourceMemoized(image);
  const containerStyleFinal = StyleSheet.flatten([styles.containerStyle, containerStyle]);
  const imageStyle = getImageStyleMemoized(containerStyleFinal.height, horizontal);

  return (
    <View style={containerStyleFinal}>
      <Image source={source} style={[styles.imageStyle, imageStyle]} />

      {
        horizontal ? (
          <View style={styles.dataContainerStyle}>
            <View style={styles.infoContainerStyle}>
              <Text style={styles.nameTextStyle} numberOfLines={1}>{name}</Text>

              <Text style={styles.textStyle} numberOfLines={1}>{price} {I18n.t('products_screen_price_currency_text')}</Text>
            </View>
            
            <TouchableComponent onPress={onPress}>
                <View style={styles.iconContainerStyle}>
                  <Icon name={iconName} type={IconTypes.materialCommunity} size={iconSize} color={iconColor} />
                </View>
              </TouchableComponent>
          </View>
        ) : (
          <View style={styles.infoContainerStyle}>
            <Text style={styles.nameTextStyle} numberOfLines={1}>{name}</Text>

            <View style={styles.priceContainerStyle}>
              <Text style={styles.textStyle} numberOfLines={1}>{price} {I18n.t('products_screen_price_currency_text')}</Text>

              <TouchableComponent onPress={onPress}>
                <Icon name={iconName} type={IconTypes.materialCommunity} size={iconSize} color={iconColor} />
              </TouchableComponent>
            </View>
          </View>
        )
      }
    </View>
  );
};

ProductCard.defaultProps = {
  onQuantityChange: () => { },
  containerStyle: {},
  horizontal: false,
  isLoading: false,
  iconSize: 25,
  iconColor: '#FFFFFF',
  initialQuantity: 0,
  quantity: 0
};

ProductCard.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  horizontal: PropTypes.bool,
  isLoading: PropTypes.bool,
  iconSize: PropTypes.number,
  iconColor: colorPropType,
  onQuantityChange: PropTypes.func.isRequired,
  initialQuantity: PropTypes.number,
  quantity: PropTypes.number,
  containerStyle: ViewPropTypes.style
};

export default ProductCard;
