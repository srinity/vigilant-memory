import React, { Component } from 'react';
import { View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import I18n from 'react-native-i18n';

import { Button, PasswordInput } from './../../Components';

import { isValidPassword, isValidConfirmPassword } from './../../Utils/Validators';

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
          placeholder={I18n.t('change_password_screen_old_password_hint')}
          onChangeText={this.onOldPasswordChange}
          value={oldPassword}
          isValid={oldPasswordIsValid}
          errorMessage='change_password_screen_old_password_error_message'
          containerStyle={styles.inputsStyle}
        />

        <PasswordInput
          placeholder={I18n.t('change_password_screen_new_password_hint')}
          onChangeText={this.onPasswordChange}
          value={password}
          isValid={passwordIsValid}
          errorMessage='change_password_screen_new_password_error_message'
          containerStyle={styles.inputsStyle}
        />

        <PasswordInput
          placeholder={I18n.t('change_password_screen_confirm_new_password_hint')}
          onChangeText={this.onConfirmPasswordChange}
          value={confirmPassword}
          isValid={confirmPasswordIsValid}
          errorMessage='change_password_screen_confirm_new_password_error_message'
          containerStyle={styles.inputsStyle}
        />

        <Button
          onPress={this.onResetPasswordPress}
          title='change_password_screen_change_password_button_text'
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
