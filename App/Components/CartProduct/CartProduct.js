import React from 'react';
import { View, ViewPropTypes, Text, Image } from 'react-native';
import PropTypes from 'prop-types';
import memoize from 'memoize-one';
import { connect } from 'react-redux';
import { isString as _isString } from 'lodash';

import { NumericUpDown } from './..';

import styles from './CartProduct.Styles';
import { Colors } from '../../Theme';

function constructImageSource(image) {
    if (_isString(image)) {
      return { uri: image };
    }
  
    return image;
}

function constructCartProductStyle(width, height) {
    if (height > width) {
        return { height: height / 7 };
    }

    return { height: width / 7 };
}

const constructImageSourceMemoized = memoize(constructImageSource);
const constructCartProductStyleMemoized = memoize(constructCartProductStyle);

const CartProduct = ({
    image,
    name,
    price,
    quantity,
    onQuantityChange,
    containerStyle,
    width,
    height,
    ...props
}) => {
    const source = constructImageSourceMemoized(image);
    const style = constructCartProductStyleMemoized(width, height);

    return (
        <View style={[styles.containerStyle, style, containerStyle]}>
            <View style={styles.imageContainerStyle}>
                <Image source={source} style={styles.imageStyle} />
            </View>

            <View style={styles.infoContainerStyle}>
                <Text style={styles.textStyle}>{name}</Text>
                <View style={styles.priceContainerStyle}>
                    <Text style={styles.textStyle}>{price} EGP</Text>

                    <NumericUpDown
                        style={styles.numericUpDownStyle}
                        buttonsStyle={styles.numericUpDownButtonStyle}
                        numberContainerStyle={styles.numericUpDownNumbersContainerStyle}
                        numbersStyle={styles.numericUpDownNumbersStyle}
                        onChange={onQuantityChange}
                        buttonsColor={Colors.brandColorHexCode}
                        disabledButtonsColor={Colors.getBrandColorRGBAValue(0.7)}
                        minValue={1}
                        maxValue={100}
                        initialValue={quantity}
                        iconSize={10}
                        {...props}
                    />
                </View>
            </View>
        </View>
    );
};

CartProduct.defaultProps = {
    onQuantityChange: () => {},
    containerStyle: {},
    quantity: 1,
};

CartProduct.propTypes = {
    image: PropTypes.oneOf([
        PropTypes.shape({
          uri: PropTypes.string.isRequired
        }).isRequired,
        PropTypes.string.isRequired
      ]).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    onQuantityChange: PropTypes.func.isRequired,
    containerStyle: ViewPropTypes.style,
    width: PropTypes.number,
    height: PropTypes.number,
};

export default connect(({ deviceDimensions }) => ({ ...deviceDimensions }))(CartProduct);
