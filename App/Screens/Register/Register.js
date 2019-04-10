import React, { Component } from 'react';
import { View, ImageBackground, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';

import {
  AuthInput,
  Button,
  Card,
  CardSection,
  Icon,
  IconTypes,
  Logo,
} from './../../Components';

import * as Validators from './../../Utils/Validators';

import { Colors, Images } from './../../Theme';

import styles from './Register.Styles';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
      firstNameIsValid: true,
      lastNameIsValid: true,
      emailIsValid: true,
      passwordIsValid: true,
      confirmPasswordIsValid: true,
      phoneIsValid: true
    };
  }

  onFirstNameChange = (firstName) => {
    this.setState({ firstName });
  }

  onlastNameChange = (lastName) => {
    this.setState({ lastName });
  }

  onEmailChange = (email) => {
    this.setState({ email });
  }

  onPasswordChange = (password) => {
    this.setState({ password });
  }

  onConfirmPasswordChange = (confirmPassword) => {
    this.setState({ confirmPassword });
  }

  onPhoneChange = (phone) => {
    this.setState({ phone });
  }

  onRegisterPress = () => {
    const { firstName, lastName, email, password, confirmPassword, phone } = this.state;
    console.tron.log(firstName, lastName, email, password);

    this.setState({
      firstNameIsValid: Validators.isValidFirstOrLastName(firstName),
      lastNameIsValid: Validators.isValidFirstOrLastName(lastName),
      emailIsValid: Validators.isEmail(email),
      passwordIsValid: Validators.isValidPassword(password),
      confirmPasswordIsValid: Validators.isValidConfirmPassword(password, confirmPassword),
    }, () => {
      const { firstNameIsValid, lastNameIsValid, emailIsValid, passwordIsValid, confirmPasswordIsValid } = this.state;
      console.tron.log(firstNameIsValid, lastNameIsValid, emailIsValid, passwordIsValid, confirmPasswordIsValid);
      if (firstNameIsValid && lastNameIsValid && emailIsValid && passwordIsValid && confirmPasswordIsValid) {
        this.props.register(firstName, lastName, email, password, phone);
      }
    });
  }

  render() {
    return (
      <View style={styles.containerStyle}>
        <ImageBackground
          source={Images.cover2}
          style={styles.containerStyle}
          resizeMode='cover'
        >
          <ScrollView style={styles.containerStyle} keyboardShouldPersistTaps='handled'>
            <Logo name='logo' />

            <Card style={styles.cardStyle}>
              <AuthInput
                placeholder='First Name'
                value={this.state.firstName}
                onChangeText={this.onFirstNameChange}
                leftIconType={IconTypes.fontAwesome}
                leftIconName='user'
                returnKeyType='next'
                isValid={this.state.firstNameIsValid}
              />

              <AuthInput
                placeholder='Last Name'
                value={this.state.lastName}
                onChangeText={this.onlastNameChange}
                leftIconType={IconTypes.fontAwesome}
                leftIconName='user'
                returnKeyType='next'
                isValid={this.state.lastNameIsValid}
              />

              <AuthInput
                placeholder='E-mail'
                value={this.state.email}
                onChangeText={this.onEmailChange}
                leftIconType={IconTypes.ion}
                leftIconName='ios-mail'
                returnKeyType='next'
                isValid={this.state.emailIsValid}
              />

              <AuthInput
                placeholder='Password'
                secureTextEntry
                value={this.state.password}
                onChangeText={this.onPasswordChange}
                leftIconType={IconTypes.ion}
                leftIconName='ios-lock'
                returnKeyType='next'
                isValid={this.state.passwordIsValid}
              />

              <AuthInput
                placeholder='Confirm Password'
                secureTextEntry
                value={this.state.confirmPassword}
                onChangeText={this.onConfirmPasswordChange}
                leftIconType={IconTypes.ion}
                leftIconName='ios-lock'
                returnKeyType='next'
                isValid={this.state.confirmPasswordIsValid}
              />

              <AuthInput
                placeholder='Phone'
                value={this.state.phone}
                onChangeText={this.onPhoneChange}
                leftIconType={IconTypes.ion}
                leftIconName='ios-mail'
                returnKeyType='next'
                isValid={this.state.phoneIsValid}
              />

              <CardSection style={styles.buttonCardSectionStyle}>
                <Button
                  title='REGISTER'
                  isLoading={this.props.isLoading}
                  indicatorColor={styles.indicatorColor.color}
                  onPress={this.onRegisterPress}
                  style={styles.buttonStyle}
                  textStyle={styles.buttonTextStyle}
                  disabledStyle={styles.disabledButtonStyle}
                />
              </CardSection>

            </Card>

            <CardSection style={[styles.actionsCardSectionStyle, styles.footerContainerStyle]}>
              <Text style={styles.inactiveActionTextStyle}>Already have an account?</Text>
              <TouchableOpacity onPress={Actions.login}>
                <Text style={styles.actionsTextStyle}>Login Now</Text>
              </TouchableOpacity>
            </CardSection>
          </ScrollView>
        </ImageBackground>
      </View>
    );
  }
}

export default Register;
