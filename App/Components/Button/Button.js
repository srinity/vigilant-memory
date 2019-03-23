import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import memoize from 'memoize-one';

import { colorPropType } from './../../Utils/PropTypesValidators';

import { Icon, IconTypes } from './../index';
import { iconTypesValues } from './../Icon/IconTypes';

import styles from './Button.Styles';

const getDisabledStyle = (disabledOrLoading, disabledStyle) => {
    return disabledOrLoading ? disabledStyle ? disabledStyle : styles.disabledStyle : {};
};

const getDisabledStyleMemoized = memoize(getDisabledStyle);

const button = ({ 
    title, 
    onPress, 
    disabled, 
    isLoading, 
    style, 
    disabledStyle, 
    textStyle, 
    indicatorColor, 
    indicatorSize,
    leftIcon,
    leftIconType,
    leftIconName,
    leftIconColor,
    leftIconSize,
    rightIcon,
    rightIconType,
    rightIconName,
    rightIconColor,
    rightIconSize,
    ...props 
}) => {
    const disabledButtonStyle = getDisabledStyleMemoized(disabled || isLoading, disabledStyle);
    
    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled || isLoading} 
            style={[styles.buttonStyle, style, disabledButtonStyle]} 
            {...props}
        >
            {
                isLoading 
                ?
                <ActivityIndicator size={indicatorSize} color={indicatorColor} />
                :
                <View style={styles.containerStyle}>
                    {
                        leftIcon
                        ?
                        <Icon type={leftIconType} name={leftIconName} color={leftIconColor} size={leftIconSize} />
                        :
                        null
                    }
                    <Text style={[styles.textStyle, textStyle]}>{title}</Text>
                    {
                        rightIcon
                        ?
                        <Icon type={rightIconType} name={rightIconName} color={rightIconColor} size={rightIconSize} />
                        :
                        null
                    }
                </View>
            }
        </TouchableOpacity>
    );
};

button.defaultProps = {
    disabled: false,
    isLoading: false,
    style: {},
    textStyle: {},
    indicatorColor: '#ffffff',
    indicatorSize: 'large',
    leftIcon: false,
    leftIconType: 'material',
    leftIconColor: '#ffffff',
    leftIconSize: 25,
    rightIcon: false,
    rightIconType: 'material',
    rightIconColor: '#ffffff',
    rightIconSize: 25
};

button.propTypes = {
    title: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    isLoading: PropTypes.bool,
    style: ViewPropTypes.style,
    disabledStyle: ViewPropTypes.style,
    textStyle: Text.propTypes.style,
    indicatorSize: PropTypes.oneOf(['small', 'large']),
    indicatorColor: colorPropType,
    leftIcon: PropTypes.bool,
    leftIconType: PropTypes.oneOf(iconTypesValues),
    leftIconName: function (props, propName, componentName) {
        if (props.leftIcon && typeof props[propName] !== 'string') {
            return new Error(`Invalid prop ${propName} supplied to ${componentName}, Expected a string`);
        }
    },
    leftIconColor: colorPropType,
    leftIconSize: PropTypes.number,
    rightIcon: PropTypes.bool,
    rightIconType: PropTypes.oneOf(iconTypesValues),
    rightIconName: function (props, propName, componentName) {
        if (props.rightIcon && typeof props[propName] !== 'string') {
            return new Error(`Invalid prop ${propName} supplied to ${componentName}, Expected a string`);
        }
    },
    rightIconColor: colorPropType,
    rightIconSize: PropTypes.number
};

export default button;
