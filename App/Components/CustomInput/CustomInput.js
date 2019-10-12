import React, { Component } from 'react';
import { View, Text, ViewPropTypes, TouchableOpacity, StyleSheet } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import PropTypes from 'prop-types';
import memoize from 'memoize-one';
import { has as _has, isFunction as _isFunction, get as _get, isNil as _isNil } from 'lodash';
import I18n from 'react-native-i18n';

import { Icon, IconTypes, iconTypesValues } from './../Icon';
import LocalizedText from '../LocalizedText/LocalizedText';

import { colorPropType } from './../../Utils/PropTypesValidators';

import { Colors } from './../../Theme';

import styles from './CustomInput.Styles';

class CustomInput extends Component {
  constructor(props) {
    super(props);

    const isActive = (_has(props, 'value') && props.value !== '' && !_isNil(props.value));

    this.state = {
      isActive,
      label: isActive ? props.label : _get(props, 'hint', props.label)
    };
  }

  componentDidUpdate(prevProps) {
    const { value, hint, label } = this.props;
    const { isActive } = this.state;

    if (prevProps.value !== value && !value && !_get(this.input, 'state.focused')) {
      this.setState({ isActive: false, label: hint || label });
    } else if (prevProps.value !== value && value && !isActive) {
      this.setState({ isActive: true, label });
    }
  }

  onFocus = (...args) => {
    const { onFocus, label } = this.props;

    if (!this.state.isActive) {
      this.setState({ isActive: true, label });
    }

    if (_isFunction(onFocus)) {
      onFocus(...args);
    }
  }

  onBlur = (...args) => {
    const { onBlur, hint, label } = this.props;

    if (this.state.isActive && (this.input && !this.input.state.text)) {
      this.setState({ isActive: false, label: hint || label });
    }

    if (_isFunction(onBlur)) {
      onBlur(...args);
    }
  }

  getInputContainerStyle = (
    isValid,
    inputContainerStyle,
    errorColor,
    errorBorderWidth,
    isHighlighted,
    highlightedColor,
    highlightedBorderWidth
  ) => {
    const stylesArr = [styles.inputContainerStyle, inputContainerStyle];

    if (!isValid) {
      stylesArr.push({ borderColor: errorColor, borderBottomWidth: errorBorderWidth });
    } else if (isHighlighted) {
      stylesArr.push({ borderColor: highlightedColor, borderBottomWidth: highlightedBorderWidth });
    }

    return StyleSheet.flatten(stylesArr);
  }

  getInputContainerStyleMemoized = memoize(this.getInputContainerStyle);

  setUpRef = (component) => {
    this.input = component;
  }

  render() {
    const {
      leftIconName,
      leftIconType,
      leftIconColor,
      leftIconSize,
      leftIconStyle,
      rightIconName,
      rightIconType,
      rightIconColor,
      rightIconSize,
      rightIconStyle,
      rightIconPress,
      errorIconName,
      errorIconType,
      errorIconColor,
      errorIconSize,
      errorIconStyle,
      alwaysShowRightIcon,
      value,
      onChangeText,
      isValid,
      isHighlighted,
      highlightedColor,
      highlightedBorderWidth,
      errorMessage,
      errorColor,
      errorBorderWidth,
      tintColor,
      baseColor,
      labelFontSize,
      fontSize,
      textColor,
      labelTextStyle,
      containerStyle,
      inputContainerStyle,
      containerAccessibilityLabel,
      leftIconAccessibilityLabel,
      rightIconAccessibilityLabel,
      inputAccessibilityLabel,
      ...props
    } = this.props;
    const { isActive, label } = this.state;

    const inputContainerStyles = this.getInputContainerStyleMemoized(
      isValid,
      inputContainerStyle,
      errorColor,
      errorBorderWidth,
      isHighlighted,
      highlightedColor,
      highlightedBorderWidth
    );

    return (
      <View
        style={[styles.containerStyle, containerStyle]}
        accessibilityLabel={containerAccessibilityLabel}
      >
        <View style={inputContainerStyles}>
          {
            isActive && leftIconName
              ? <View style={styles.leftIconContainerStyle}>
                <Icon
                  name={leftIconName}
                  type={leftIconType}
                  color={leftIconColor}
                  size={leftIconSize}
                  style={leftIconStyle}
                  accessibilityLabel={leftIconAccessibilityLabel}
                />
              </View>
              : null
          }

          <TextField
            {...props}
            ref={this.setUpRef}
            label={I18n.t(label)}
            tintColor={tintColor}
            baseColor={baseColor}
            activeLineWidth={0}
            disabledLineWidth={0}
            lineWidth={0}
            labelFontSize={labelFontSize}
            fontSize={fontSize}
            textColor={textColor}
            labelTextStyle={labelTextStyle}
            value={value}
            onChangeText={onChangeText}
            containerStyle={styles.textInputStyle}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            accessibilityLabel={inputAccessibilityLabel}
          />
          {
            (rightIconName && (alwaysShowRightIcon || isActive))
              ? <TouchableOpacity style={styles.rightIconContainerStyle} onPress={rightIconPress}>
                <Icon
                  name={rightIconName}
                  type={rightIconType}
                  color={rightIconColor}
                  size={rightIconSize}
                  style={rightIconStyle}
                  accessibilityLabel={rightIconAccessibilityLabel}
                />
              </TouchableOpacity>
              : null
          }
        </View>

        {
          !isValid
            ? <View style={styles.errorContainerStyle}>
              <Icon
                accessibilityLabel='warningIcon'
                name={errorIconName}
                type={errorIconType}
                color={errorIconColor}
                size={errorIconSize}
                style={errorIconStyle}
              />
              <LocalizedText
                style={styles.errorTextStyle}
                accessibilityLabel='warnningMsg'
                numberOfLines={1}
              >
                {errorMessage}
              </LocalizedText>
            </View>
            : null
        }
      </View>
    );
  }
}

CustomInput.defaultProps = {
  leftIconType: IconTypes.material,
  leftIconSize: 24,
  rightIconType: IconTypes.material,
  rightIconSize: 24,
  errorIconType: IconTypes.fontAwesome,
  errorIconName: 'warning',
  errorIconSize: 24,
  alwaysShowRightIcon: false,
  rightIconPress: () => { },
  labelFontSize: 14.6,
  fontSize: 18.7,
  isValid: true,
  errorColor: Colors.dangerColorHexCode,
  errorIconColor: Colors.dangerColorHexCode,
  errorBorderWidth: 2,
  isHighlighted: false,
  highlightedColor: Colors.dangerColorHexCode,
  highlightedBorderWidth: 2,
  tintColor: Colors.brandColorHexCode,
  baseColor: Colors.brandColorHexCode,
  textColor: Colors.blackColorHexCode,
  labelTextStyle: { color: Colors.brandColorHexCode },
  onChangeText: () => { }
};

CustomInput.propTypes = {
  leftIconName: PropTypes.string.isRequired,
  leftIconType: PropTypes.oneOf(iconTypesValues),
  leftIconColor: colorPropType,
  leftIconSize: PropTypes.number,
  leftIconStyle: ViewPropTypes.style,
  rightIconName: PropTypes.string.isRequired,
  rightIconType: PropTypes.oneOf(iconTypesValues),
  rightIconColor: colorPropType,
  rightIconSize: PropTypes.number,
  rightIconStyle: ViewPropTypes.style,
  rightIconPress: PropTypes.func,
  errorIconName: PropTypes.string.isRequired,
  errorIconType: PropTypes.oneOf(iconTypesValues),
  errorIconColor: colorPropType,
  errorIconSize: PropTypes.number,
  errorIconStyle: ViewPropTypes.style,
  alwaysShowRightIcon: PropTypes.bool,
  label: PropTypes.string.isRequired,
  hint: PropTypes.string,
  value: PropTypes.string,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onChangeText: PropTypes.func,
  isValid: PropTypes.bool,
  isHighlighted: PropTypes.bool,
  highlightedBorderWidth: PropTypes.number,
  errorMessage: PropTypes.string,
  errorBorderWidth: PropTypes.number,
  labelFontSize: PropTypes.number,
  fontSize: PropTypes.number,
  errorColor: colorPropType,
  highlightedColor: colorPropType,
  tintColor: colorPropType,
  baseColor: colorPropType,
  textColor: colorPropType,
  labelTextStyle: Text.propTypes.style,
  containerStyle: ViewPropTypes.style,
  inputContainerStyle: ViewPropTypes.style,
  containerAccessibilityLabel: PropTypes.string,
  leftIconAccessibilityLabel: PropTypes.string,
  rightIconAccessibilityLabel: PropTypes.string,
  inputAccessibilityLabel: PropTypes.string
};

export default CustomInput;
