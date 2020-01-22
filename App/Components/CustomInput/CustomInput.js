import React from 'react';
import { View, TextInput, ViewPropTypes, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';

import { Icon, iconTypesValues, IconTypes } from './../Icon';
import LocalizedText from './../LocalizedText/LocalizedText';

import { colorPropType } from './../../Utils/PropTypesValidators';

import { Colors } from './../../Theme';

import styles from './CustomInput.Styles';

const CustomInput = ({
  editable,
  keyboardType,
  onChangeText,
  value,
  placeholder,
  placeholderTextColor,
  secureTextEntry,
  onEndEditing,
  onBlur,
  onFocus,
  onSubmitEditing,
  returnKeyType,
  showIcon,
  iconName,
  iconType,
  iconSize,
  iconColor,
  onIconPress,
  iconStyle,
  isValid,
  errorMessage,
  errorIconName,
  errorIconType,
  errorIconSize,
  errorIconColor,
  errorIconStyle,
  style,
  containerStyle,
  ...props
}) => {
  return (
    <View style={[styles.containerStyle, containerStyle]}>
      <TextInput
        underlineColorAndroid={Colors.getBlackColorRGBAValue(0)}
        editable={editable}
        keyboardType={keyboardType}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        onEndEditing={onEndEditing}
        onBlur={onBlur}
        onFocus={onFocus}
        onSubmitEditing={onSubmitEditing}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        returnKeyType={returnKeyType}
        style={[styles.inputStyle, style]}
        {...props}
      />

      {
        showIcon && isValid ? (
          <TouchableWithoutFeedback onPress={onIconPress}>
            <Icon name={iconName} type={iconType} size={iconSize} color={iconColor} style={[styles.iconStyle, iconStyle]} />
          </TouchableWithoutFeedback>
        ) : null
      }
      {
        isValid ? null : (
          <View style={styles.errorContainerStyle}>
            {errorMessage && <LocalizedText numberOfLines={1} style={styles.errorTextStyle}>{errorMessage}</LocalizedText>}
            <Icon name={errorIconName} type={errorIconType} size={errorIconSize} color={errorIconColor} style={errorIconStyle} />
          </View>
        )
      }
    </View>
  );
};

CustomInput.defaultProps = {
  errorIconName: 'exclamationcircle',
  errorIconType: IconTypes.ant,
  errorIconSize: 15,
  errorIconColor: Colors.dangerColorHexCode,
  showIcon: false,
  iconColor: Colors.brandColorHexCode,
  iconSize: 15,
  onIconPress: () => {},
  isValid: true
};

CustomInput.propTypes = {
  returnKeyType: PropTypes.oneOf(['done', 'go', 'next', 'search', 'send', 'none', 'previous', 'default', 'emergency-call', 'google', 'join', 'route', 'yahoo']),
  editable: PropTypes.bool,
  keyboardType: PropTypes.oneOf(['default', 'email-address', 'numeric', 'phone-pad', 'ascii-capable', 'numbers-and-punctuation', 'url', 'number-pad', 'name-phone-pad', 'decimal-pad', 'twitter', 'web-search', 'visible-password']),
  onChangeText: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  placeholderTextColor: colorPropType,
  secureTextEntry: PropTypes.bool,
  onEndEditing: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onSubmitEditing: PropTypes.func,
  isValid: PropTypes.bool,
  errorMessage: PropTypes.string,
  errorIconName: PropTypes.string,
  errorIconType: PropTypes.oneOf(iconTypesValues),
  errorIconSize: PropTypes.number,
  errorIconColor: colorPropType,
  showIcon: PropTypes.bool,
  iconName: PropTypes.string,
  iconType: PropTypes.oneOf(iconTypesValues),
  iconSize: PropTypes.number,
  iconColor: colorPropType,
  onIconPress: PropTypes.func,
  iconStyle: ViewPropTypes.style,
  style: ViewPropTypes.style,
  containerStyle: ViewPropTypes.style,
  errorIconStyle: ViewPropTypes.style
};

export default CustomInput;
