import React from 'react';
import { TextInput, View, Text, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';

import { colorPropType } from './../../Utils/PropTypesValidators';

import { Icon, IconTypes } from './../index';
import { iconTypesValues } from './../Icon/IconTypes';

import styles from './Input.Styles';

const Input = ({
    inputStyle, 
    inputLabelStyle, 
    inputFieldStyle,
    keyboardType,
    label,
    leftIconType,
    leftIconName,
    leftIconSize,
    leftIconColor,
    leftIconStyle,
    leftIconContainerStyle,
    rightIconName,
    rightIconType,
    rightIconColor,
    rightIconSize,
    rightIconStyle,
    rightIconContainerStyle,
    onChangeText, 
    placeholder, 
    placeholderTextColor, 
    returnKeyType,
    secureTextEntry, 
    selectionColor,
    underlineColorAndroid,
    value, 
    ...props
    }) => (
    <View style={[styles.containerStyle, inputStyle]}>
        {
            leftIconName 
            ?
            <View style={leftIconContainerStyle}>
                <Icon
                    type={leftIconType}
                    color={leftIconColor}
                    size={leftIconSize}
                    name={leftIconName}
                    style={[styles.leftIconStyle, leftIconStyle]}
                />
            </View>
            :
            null
        }
        {label && <Text style={[styles.labelStyle, inputLabelStyle]}>{label}</Text>}
        <TextInput
            autoCorrect={false}
            keyboardType={keyboardType}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor}
            returnKeyType={returnKeyType}
            secureTextEntry={secureTextEntry}
            selectionColor={selectionColor}
            style={[styles.inputStyle, inputFieldStyle]}
            underlineColorAndroid={underlineColorAndroid}
            value={value}
            {...props}
        />

        {
            rightIconName 
            ?
            <View style={rightIconContainerStyle}>
                <Icon
                    type={rightIconType}
                    color={rightIconColor}
                    size={rightIconSize}
                    name={rightIconName}
                    style={[styles.rightIconStyle, rightIconStyle]}
                />
            </View>
            :
            null
        }
    </View>
);

Input.defaultProps = {
    inputStyle: {},
    inputFieldStyle: {},
    inputLabelStyle: {},
    leftIconType: IconTypes.material,
    leftIconSize: 25,
    leftIconColor: '#000000',
    leftIconStyle: {},
    leftIconContainerStyle: {},
    rightIconType: IconTypes.material,
    rightIconSize: 25,
    rightIconColor: '#000000',
    rightIconStyle: {},
    rightIconContainerStyle: {},
    placeholderTextColor: 'rgba(0,0,0,0.6)',
    returnKeyType: 'next',
    underlineColorAndroid: 'transparent'
};

Input.propTypes = {
    label: PropTypes.string, 
    value: PropTypes.string.isRequired, 
    onChangeText: PropTypes.func.isRequired, 
    placeholder: PropTypes.string, 
    secureTextEntry: PropTypes.bool, 
    placeholderTextColor: colorPropType, 
    inputStyle: ViewPropTypes.style, 
    inputLabelStyle: Text.propTypes.style, 
    inputFieldStyle: Text.propTypes.style,
    underlineColorAndroid: colorPropType,
    keyboardType: PropTypes.oneOf([
        'default',
        'number-pad',
        'decimal-pad',
        'numeric',
        'email-address',
        'phone-pad'
    ]),
    leftIconType: PropTypes.oneOf(iconTypesValues),
    leftIconName: PropTypes.string,
    leftIconSize: PropTypes.number,
    leftIconColor: colorPropType,
    leftIconStyle: ViewPropTypes.style,
    leftIconContainerStyle: ViewPropTypes.style,
    rightIconType: PropTypes.oneOf(iconTypesValues),
    rightIconName: PropTypes.string,
    rightIconSize: PropTypes.number,
    rightIconColor: colorPropType,
    rightIconStyle: ViewPropTypes.style,
    rightIconContainerStyle: ViewPropTypes.style,
    returnKeyType: PropTypes.oneOf([
        'done',
        'go',
        'next',
        'search',
        'send'
    ]),
    selectionColor: colorPropType
};

export default Input;
