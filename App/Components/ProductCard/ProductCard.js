import React from 'react';
import { View, ViewPropTypes, Text, Image } from 'react-native';
import PropTypes from 'prop-types';
import memoize from 'memoize-one';
import { isString as _isString } from 'lodash';

import NumericUpDown from './../NumericUpDown/NumericUpDown';

import { colorPropType } from '../../Utils/PropTypesValidators';

import { Colors } from '../../Theme';

import verticalStyles, { horizontalStyles } from './ProductCard.Styles';

function constructImageSource(image) {
    if (_isString(image)) {
      return { uri: image };
    }
  
    return image;
}

const constructImageSourceMemoized = memoize(constructImageSource);

const ProductCard = ({
    image,
    name,
    price,
    horizontal,
    cart,
    iconSize,
    iconColor,
    initialQuantity,
    onQuantityChange,
    containerStyle,
    ...props
}) => {
    const styles = horizontal ? horizontalStyles : verticalStyles;
    const source = constructImageSourceMemoized(image);

    return (
        <View style={[styles.containerStyle, containerStyle]}>
            <View style={styles.imageContainerStyle}>
                <Image source={source} style={styles.imageStyle} />
            </View>

            <View style={styles.infoContainerStyle}>
                <Text style={styles.textStyle} numberOfLines={1}>{name}</Text>
                <Text style={styles.textStyle} numberOfLines={1}>{price} EGP</Text>

                <NumericUpDown
                    style={styles.numericUpDownStyle}
                    buttonsStyle={styles.numericUpDownButtonStyle}
                    numberContainerStyle={styles.numericUpDownNumbersContainerStyle}
                    numbersStyle={styles.numericUpDownNumbersStyle}
                    onChange={onQuantityChange}
                    buttonsColor={Colors.brandColorHexCode}
                    disabledButtonsColor={Colors.getBrandColorRGBAValue(0.5)}
                    minValue={0}
                    maxValue={100}
                    initialValue={initialQuantity}
                    iconSize={iconSize}
                    iconsColor={iconColor}
                    {...props}
                />
            </View>
        </View>
    );
};

ProductCard.defaultProps = {
    onQuantityChange: () => {},
    containerStyle: {},
    horizontal: false,
    iconSize: 10,
    iconColor: '#FFFFFF',
    initialQuantity: 0,
    cart: {}
};

ProductCard.propTypes = {
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    horizontal: PropTypes.bool,
    cart: PropTypes.object,
    iconSize: PropTypes.number,
    iconColor: colorPropType,
    onQuantityChange: PropTypes.func.isRequired,
    initialQuantity: PropTypes.number,
    containerStyle: ViewPropTypes.style
};

export default ProductCard;
