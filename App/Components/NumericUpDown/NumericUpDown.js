import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ViewPropTypes,
    StyleSheet,
    ActivityIndicator
} from 'react-native';
import PropTypes from 'prop-types';
import {
    has as _has,
    isFinite as _isFinite,
    isFunction as _isFunction,
    isNil as _isNil
} from 'lodash';
import memoize from 'memoize-one';

import { Icon, IconTypes } from './../index';

import { colorPropType } from '../../Utils/PropTypesValidators';

import styles from './NumericUpDown.Styles';

class NumericUpDown extends Component {
    static getDerivedStateFromProps(nextProps, prevState) {
        // console.warn(JSON.stringify(nextProps));
        // console.warn(JSON.stringify(prevState));
        // This for updating the component internal state if the value that passed in the props was
        // changed by an external source and the new value doesn't match the current value of the component.
        // we also save and check for the last value passed before this one so we make
        // sure an update is required.
        // note that the old value will not be updated by the value changing by this 
        // component internal functionality only outside sources. 
        // Also note that we don't limit the setting of outside value by minValue and maxValue
        // need to ask someone later about whether it is valid business to limit it, reject it or accept it.
        if (_isFinite(nextProps.value) &&
            // nextProps.value !== prevState.oldValue &&
            nextProps.value !== prevState.value) {
            return { value: nextProps.value, oldValue: nextProps.value };
        }

        return null;
    }

    constructor(props) {
        super(props);

        const { value, initialValue } = props;

        let properInitialValue;

        // i know that this will be false if it is zero, this is okay because
        // initialValue default is zero so zero will still be the initial value.
        if (value) {
            properInitialValue = value;
        } else if (_isNil(props.minValue) || _isNil(props.maxValue)) {
            properInitialValue = initialValue;
        } else if (initialValue >= props.minValue && initialValue <= props.maxValue) {
            properInitialValue = initialValue;
        } else if (initialValue < props.minValue) {
            properInitialValue = props.minValue;
        } else {
            properInitialValue = props.maxValue;
        }

        this.state = {
            value: properInitialValue,
            oldValue: properInitialValue
        };
    }

    onIncreaseButtonPress = () => {
        const { step, maxValue } = this.props;
        const { value } = this.state;
        let newValue = value;

        if (_isNil(maxValue) || (value + step) <= maxValue) {
            newValue = value + step;
        } else if ((value + step) > maxValue) {
            newValue = this.props.maxValue;
        }

        this.onChange(newValue);
    }

    onDecreaseButtonPress = () => {
        const { step, minValue } = this.props;
        const { value } = this.state;
        let newValue = value;

        if (_isNil(minValue) || (value - step) >= minValue) {
            newValue = value - step;
        } else if ((value - step) < minValue) {
            newValue = minValue;
        }

        this.onChange(newValue);
    }

    onChange = (newValue) => {
        const { onChange } = this.props;

        this.setState({ value: newValue });

        if (_isFunction(onChange)) {
            onChange(newValue);
        }
    }

    getFontSize = (currentValue) => {
        if (Math.floor(currentValue / 100) !== 0) {
            return { fontSize: 20 };
        }

        return { fontSize: 26 };
    }

    getIncreaseButtonStyle = (
        disabled,
        style,
        buttonStyle,
        increaseStyle,
        buttonsColor,
        increaseButtonColor,
        disabledStyles,
        disabledStyle,
        disabledIncreaseStyle,
        disabledButtonsColor,
        disabledIncreaseButtonColor
    ) => {
        const stylesArr = [style, buttonStyle, increaseStyle];

        if (increaseButtonColor || buttonsColor) {
            stylesArr.push({ backgroundColor: increaseButtonColor || buttonsColor });
        }

        if (disabled) {
            stylesArr.push(disabledStyles, disabledStyle, disabledIncreaseStyle);
            stylesArr.push({
                backgroundColor: disabledIncreaseButtonColor || disabledButtonsColor
            });
        }

        return StyleSheet.flatten(stylesArr);
    }

    getDecreaseButtonStyle = (
        disabled,
        style,
        buttonStyle,
        decreaseStyle,
        buttonsColor,
        decreaseButtonColor,
        disabledStyles,
        disabledStyle,
        disabledDecreaseStyle,
        disabledButtonsColor,
        disabledDecreaseButtonColor
    ) => {
        const stylesArr = [style, buttonStyle, decreaseStyle];

        if (decreaseButtonColor || buttonsColor) {
            stylesArr.push({ backgroundColor: decreaseButtonColor || buttonsColor });
        }

        if (disabled) {
            stylesArr.push(disabledStyles, disabledStyle, disabledDecreaseStyle);
            stylesArr.push({
                backgroundColor: disabledDecreaseButtonColor || disabledButtonsColor
            });
        }

        return StyleSheet.flatten(stylesArr);
    }

    getIncreaseButtonStyleMemoized = memoize(this.getIncreaseButtonStyle);
    getDecreaseButtonStyleMemoized = memoize(this.getDecreaseButtonStyle);

    getFontSizeMemoized = memoize(this.getFontSize);

    render() {
        const {
            style,
            minValue,
            maxValue,
            isLoading,
            indicatorSize,
            indicatorColor,
            iconSize,
            iconsColor,
            buttonsColor,
            increaseIconColor,
            decreaseIconColor,
            numberContainerStyle,
            numbersStyle,
            buttonsStyle,
            increaseStyle,
            decreaseStyle,
            disabledStyle,
            disabledIncreaseStyle,
            disabledDecreaseStyle,
            increaseButtonColor,
            decreaseButtonColor,
            disabledButtonsColor,
            disabledIncreaseButtonColor,
            disabledDecreaseButtonColor
        } = this.props;

        return (
            isLoading
            ?
            (
                <View style={[styles.containerStyle, style]}>
                    <ActivityIndicator color={indicatorColor} size={indicatorSize} />
                </View>
            )
            :
            (
                <View style={[styles.containerStyle, style]}>
                    <TouchableOpacity
                        style={
                            this.getDecreaseButtonStyleMemoized(
                                this.state.value <= minValue,
                                styles.buttonStyle,
                                buttonsStyle,
                                decreaseStyle,
                                buttonsColor,
                                decreaseButtonColor,
                                styles.disabledStyle,
                                disabledStyle,
                                disabledDecreaseStyle,
                                disabledButtonsColor,
                                disabledDecreaseButtonColor
                            )
                        }
                        disabled={this.state.value <= minValue}
                        onPress={this.onDecreaseButtonPress}
                    >
                        <Icon 
                            type={IconTypes.fontAwesome}
                            name='minus' 
                            color={decreaseIconColor || iconsColor} 
                            size={iconSize} 
                        />
                    </TouchableOpacity>

                    <View style={[styles.numberContainerStyle, numberContainerStyle]}>
                        <Text 
                            style={[
                                styles.numbersStyle, 
                                this.getFontSizeMemoized(this.state.value), 
                                numbersStyle
                            ]}
                        >
                            {this.state.value}
                        </Text>
                    </View>

                    <TouchableOpacity
                        style={
                            this.getIncreaseButtonStyleMemoized(
                                this.state.value >= maxValue,
                                styles.buttonStyle,
                                buttonsStyle,
                                increaseStyle,
                                buttonsColor,
                                increaseButtonColor,
                                styles.disabledStyle,
                                disabledStyle,
                                disabledIncreaseStyle,
                                disabledButtonsColor,
                                disabledIncreaseButtonColor
                            )
                        }
                        disabled={this.state.value >= maxValue}
                        onPress={this.onIncreaseButtonPress}
                    >
                        <Icon 
                            type={IconTypes.fontAwesome}
                            name='plus' 
                            color={increaseIconColor || iconsColor} 
                            size={iconSize}
                        />
                    </TouchableOpacity>
                </View>
            )
        );
    }
}

NumericUpDown.defaultProps = {
    initialValue: 0,
    step: 1,
    isLoading: false,
    indicatorSize: 'small',
    style: {},
    disabledStyle: {},
    disabledIncreaseStyle: {},
    disabledDecreaseStyle: {},
    numbersStyle: {},
    numberContainerStyle: {},
    buttonsStyle: {},
    increaseStyle: {},
    decreaseStyle: {},
    iconsColor: '#ffffff',
    iconSize: 25,
    buttonsColor: '#0baed9',
    disabledButtonsColor: 'rgba(11,174,217, 0.5)'
};

NumericUpDown.propTypes = {
    value: PropTypes.number,
    initialValue: PropTypes.number,
    step: PropTypes.number,
    minValue: PropTypes.number,
    maxValue: PropTypes.number,
    isLoading: PropTypes.bool,
    // eslint-disable-next-line object-shorthand
    onChange: function (props, propName, componentName) {
        if (_has(props, 'value') && !_isFunction(props[propName])) {
            return new Error(`Invalid prop ${propName} supplied to ${componentName}, 
            if prop value is provided ${propName} must be provided. 
            This function will receive the new value as a parameter.`);
        }
    },
    indicatorColor: colorPropType,
    indicatorSize: PropTypes.oneOf(['small', 'large']),
    style: ViewPropTypes.style,
    disabledStyle: ViewPropTypes.style,
    disabledIncreaseStyle: ViewPropTypes.style,
    disabledDecreaseStyle: ViewPropTypes.style,
    numberContainerStyle: ViewPropTypes.style,
    numbersStyle: Text.propTypes.style,
    buttonsStyle: ViewPropTypes.style,
    increaseStyle: ViewPropTypes.style,
    decreaseStyle: ViewPropTypes.style,
    iconsColor: colorPropType,
    increaseIconColor: colorPropType,
    decreaseIconColor: colorPropType,
    iconSize: PropTypes.number,
    buttonsColor: colorPropType,
    increaseButtonColor: colorPropType,
    decreaseButtonColor: colorPropType,
    disabledButtonsColor: colorPropType,
    disabledIncreaseButtonColor: colorPropType,
    disabledDecreaseButtonColor: colorPropType
};

export default NumericUpDown;
