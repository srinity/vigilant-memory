import React, { Component } from 'react';
import { View } from 'react-native';
import { Actions } from 'react-native-router-flux';

import { Button, PasswordInput } from './../../Components';

import { isValidPassword, isValidConfirmPassword } from './../../Utils/Validators';

import { Colors } from '../../Theme';

import styles from './ChangePassword.Styles';

class ChangePassword extends Component {
  state = {
    oldPassword: '',
    password: '',
    confirmPassword: '',
    oldPasswordIsValid: true,
    passwordIsValid: true,
    confirmPasswordIsValid: true,
  }

  onOldPasswordChange = (oldPassword) => {
    this.setState({ oldPassword, oldPasswordIsValid: true });
  }

  onPasswordChange = (password) => {
    this.setState({ password, passwordIsValid: true });
  }

  onConfirmPasswordChange = (confirmPassword) => {
      this.setState({ confirmPassword, confirmPasswordIsValid: true });
  }

  onResetPasswordPress = () => {
      const { oldPassword, password, confirmPassword } = this.state;

      this.setState({
        oldPasswordIsValid: isValidPassword(oldPassword),
        passwordIsValid: isValidPassword(password),
        confirmPasswordIsValid: isValidConfirmPassword(password, confirmPassword),
      }, () => {
        const { oldPasswordIsValid, passwordIsValid, confirmPasswordIsValid } = this.state;
        const { resetPassword, user } = this.props;

          if (oldPasswordIsValid && passwordIsValid && confirmPasswordIsValid) {
              resetPassword(oldPassword, password, user, () => (Actions.popTo('account')));
          }
      });
  }

  render() {
    const {
      confirmPassword,
      confirmPasswordIsValid,
      password,
      passwordIsValid,
      oldPassword,
      oldPasswordIsValid
    } = this.state;
    const { isResettingPassword } = this.props;

    return (
      <View style={styles.containerStyle}>
        <PasswordInput
          label='Old Password'
          hint='Enter Old password'
          leftIconName={undefined}
          leftIconColor={Colors.brandColorHexCode}
          rightIconColor={Colors.brandColorHexCode}
          onChangeText={this.onOldPasswordChange}
          value={oldPassword}
          isValid={oldPasswordIsValid}
          errorMessage='Please enter valid password'
        />

        <PasswordInput
          label='New Password'
          hint='Enter New password'
          leftIconName={undefined}
          leftIconColor={Colors.brandColorHexCode}
          rightIconColor={Colors.brandColorHexCode}
          onChangeText={this.onPasswordChange}
          value={password}
          isValid={passwordIsValid}
          errorMessage='Please enter valid password'
        />

        <PasswordInput
          label='Confirm Password'
          hint='Confirm New Password'
          leftIconName={undefined}
          leftIconColor={Colors.brandColorHexCode}
          rightIconColor={Colors.brandColorHexCode}
          onChangeText={this.onConfirmPasswordChange}
          value={confirmPassword}
          isValid={confirmPasswordIsValid}
          errorMessage='Confirm password must match password'
        />

        <Button
          onPress={this.onResetPasswordPress}
          title='Change Password'
          isLoading={isResettingPassword}
          indicatorColor={styles.indicatorColor.color}
          indicatorSize='small'
          style={styles.buttonStyle}
          textStyle={styles.buttonTextStyle}
          disabledStyle={styles.disabledButtonStyle}
        />
      </View>
    );
  }
}

export default ChangePassword;
