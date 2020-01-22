import React from 'react';
import {
    View,
    ViewPropTypes,
    Text,
    Image,
    TouchableOpacity,
    TouchableNativeFeedback,
    Platform
} from 'react-native';
import PropTypes from 'prop-types';
import memoize from 'memoize-one';
import { connect } from 'react-redux';
import { isString as _isString } from 'lodash';

import NumericUpDown from './../NumericUpDown/NumericUpDown';
import { Icon, IconTypes } from './../Icon';

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
        return { height: height / 9 };
    }

    return { height: width / 9 };
}

const constructImageSourceMemoized = memoize(constructImageSource);
const constructCartProductStyleMemoized = memoize(constructCartProductStyle);

const CartProduct = ({
    image,
    name,
    price,
    quantity,
    isLoading,
    onQuantityChange,
    onRemovePress,
    removeDisabled,
    containerStyle,
    width,
    height,
    ...props
}) => {
    const source = constructImageSourceMemoized(image);
    const style = constructCartProductStyleMemoized(width, height);
    const imageSize = (style.height - 20)
    const imageStyle = { height: imageSize, width: imageSize, borderRadius: imageSize / 2 };
    const TouchableComponent = Platform.OS === 'ios' ? TouchableOpacity : TouchableNativeFeedback;

    return (
        <View style={[styles.containerStyle, style, containerStyle]}>
            <Image source={source} style={[styles.imageStyle, imageStyle]} />

            <View style={styles.infoContainerStyle}>
                <View style={styles.nameContainerStyle}>
                    <Text style={styles.textStyle} numberOfLines={2}>{name}</Text>
                    <TouchableComponent onPress={onRemovePress} disabled={removeDisabled}>
                        <Icon type={IconTypes.entypo} name='trash' color={Colors.dangerColorHexCode} size={15} />
                    </TouchableComponent>
                </View>
                <View style={styles.priceContainerStyle}>
                    <Text style={styles.textStyle} numberOfLines={1}>{price} EGP</Text>

                    <NumericUpDown
                        style={styles.numericUpDownStyle}
                        buttonsStyle={styles.numericUpDownButtonStyle}
                        numberContainerStyle={styles.numericUpDownNumbersContainerStyle}
                        numbersStyle={styles.numericUpDownNumbersStyle}
                        onChange={onQuantityChange}
                        buttonsColor={Colors.whiteColorHexCode}
                        disabledButtonsColor={Colors.whiteColorHexCode}
                        disabledStyle={{ borderColor: Colors.getBlackColorRGBAValue(0.5) }}
                        iconsColor={Colors.getBlackColorRGBAValue(0.8)}
                        minValue={1}
                        maxValue={100}
                        value={quantity}
                        isLoading={isLoading}
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
    onRemovePress: () => {},
    removeDisabled: false,
    isLoading: false
};

CartProduct.propTypes = {
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    isLoading: PropTypes.bool,
    quantity: PropTypes.number.isRequired,
    onQuantityChange: PropTypes.func.isRequired,
    onRemovePress: PropTypes.func.isRequired,
    removeDisabled: PropTypes.bool,
    containerStyle: ViewPropTypes.style,
    width: PropTypes.number,
    height: PropTypes.number,
};

export default connect(({ deviceDimensions }) => ({ ...deviceDimensions }))(CartProduct);
