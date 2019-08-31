import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { has as _has, isString as _isString } from 'lodash';

import CustomInput from './../CustomInput';
import { IconTypes } from '../Icon';

import { Colors } from './../../Theme';

import styles from './PasswordInput.Styles';

const passwordShowHideIconsName = Object.freeze({
  showPassword: 'eye',
  hidePassword: 'eye-with-line'
})

class PasswordInput extends Component {
  constructor(props) {
    super(props);

    let rightIcon = passwordShowHideIconsName.showPassword;
    let shouldHidePassword = true;

    if (_has(props, 'value') && _isString(props.value) && props.value.length > 0) {
      rightIcon = passwordShowHideIconsName.hidePassword;
      shouldHidePassword = false;
    }

    this.state = {
      rightIcon,
      shouldHidePassword
    };
  }

  onRightIconPress = () => {
    const { shouldHidePassword, rightIcon } = this.state;
    const newRightIcon = rightIcon === passwordShowHideIconsName.showPassword ?
      passwordShowHideIconsName.hidePassword : passwordShowHideIconsName.showPassword;

    this.setState({ shouldHidePassword: !shouldHidePassword, rightIcon: newRightIcon });
  }

  render () {
    const { rightIcon, shouldHidePassword } = this.state;

    return (
      <CustomInput
        leftIconType={IconTypes.material}
        leftIconName='lock'
        secureTextEntry={shouldHidePassword}
        rightIconName={rightIcon}
        rightIconType={IconTypes.entypo}
        rightIconPress={this.onRightIconPress}
        {...this.props}
      />
    );
  }
}

PasswordInput.defaultProps = {
  label: 'Password',
  baseColor: Colors.brownishGrey,
  tintColor: Colors.brownishGrey,
  textColor: Colors.blackTwo
};

PasswordInput.propTypes = {
  value: PropTypes.string,
  label: PropTypes.string,
  baseColor: PropTypes.string,
  tintColor: PropTypes.string,
  textColor: PropTypes.string
};

export default PasswordInput
