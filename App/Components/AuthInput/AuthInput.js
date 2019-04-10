import React from 'react';
import PropTypes from 'prop-types';

import { CardSection, Input } from './..';

import { iconTypesValues } from './../Icon/IconTypes';

import styles from './AuthInput.Styles';

const getInvalidStyle = (isValid) => {
  return isValid ? {} : styles.inputInvalidStyle;
};

const AuthInput = ({
  keyboardType,
  leftIconType,
  leftIconName,
  onChangeText,
  placeholder,
  returnKeyType,
  secureTextEntry,
  value,
  isValid,
  ...props
}) => {
  return (
    <CardSection style={styles.inputCardSectionStyle}>
      <Input
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={styles.placeHolderColor.color}
        inputFieldStyle={styles.inputTextStyle}
        selectionColor={styles.selectionColor.color}
        underlineColorAndroid='transparent'
        leftIconType={leftIconType}
        leftIconName={leftIconName}
        leftIconColor={styles.iconColor.color}
        leftIconContainerStyle={styles.iconContainerStyle}
        inputStyle={[styles.inputStyle, getInvalidStyle(isValid)]}
        returnKeyType={returnKeyType}
        keyboardType={keyboardType}
        {...props}
      />
    </CardSection>
  );
};

AuthInput.defaultProps = {
  isValid: true
};

AuthInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  secureTextEntry: PropTypes.bool,
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
  returnKeyType: PropTypes.oneOf([
    'done',
    'go',
    'next',
    'search',
    'send'
  ]),
  isValid: PropTypes.bool
};

export default AuthInput;
