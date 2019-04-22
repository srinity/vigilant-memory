import React from 'react';
import { View, ViewPropTypes, Text, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import memoize from 'memoize-one';
import { isString as _isString } from 'lodash';

import styles from './ProductCard.Styles';

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
    onPress,
    buttonTitle,
    disabled,
    containerStyle,
    ...props
}) => {
    const source = constructImageSourceMemoized(image);

    return (
        <View style={[styles.containerStyle, containerStyle]}>
            <View style={styles.imageContainerStyle}>
                <Image source={source} style={styles.imageStyle} />
            </View>

            <View style={styles.infoContainerStyle}>
                <Text style={styles.textStyle}>{name}</Text>
                <View style={styles.priceContainerStyle}>
                    <Text style={styles.textStyle}>{price} EGP</Text>

                    <TouchableOpacity style={styles.buttonStyle} onPress={onPress} disabled={disabled} {...props}>
                        <Text style={styles.buttonTextStyle}>{buttonTitle}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

ProductCard.defaultProps = {
    onPress: () => {},
    containerStyle: {}
};

ProductCard.propTypes = {
    image: PropTypes.oneOf([
        PropTypes.shape({
          uri: PropTypes.string.isRequired
        }).isRequired,
        PropTypes.string.isRequired
      ]).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    buttonTitle: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    containerStyle: ViewPropTypes.style
};

export default ProductCard;
