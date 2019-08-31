import React, { Component } from 'react';
import { View, Platform, Text, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import DatePicker from 'react-native-datepicker';
import { Actions } from 'react-native-router-flux';

import {
  AuthInput,
  Button,
  Card,
  CardSection,
  Icon,
  IconTypes,
  Logo,
  CustomInput,
  PasswordInput
} from './../../Components';

import * as Validators from './../../Utils/Validators';

import { Colors } from './../../Theme';

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
      gender: 'M',
      dateOfBirth: undefined,
      firstNameIsValid: true,
      lastNameIsValid: true,
      emailIsValid: true,
      passwordIsValid: true,
      confirmPasswordIsValid: true,
      phoneIsValid: true,
      dateOfBirthIsValid: true
    };

    this.dropDownData = [
      {
        label: 'Male',
        value: 'M'
      },
      {
        label: 'Female',
        value: 'F'
      }
    ];
  }

  onFirstNameChange = (firstName) => {
    this.setState({ firstName, firstNameIsValid: true });
  }

  onLastNameChange = (lastName) => {
    this.setState({ lastName, lastNameIsValid: true });
  }

  onEmailChange = (email) => {
    this.setState({ email, emailIsValid: true });
  }

  onPasswordChange = (password) => {
    this.setState({ password, passwordIsValid: true });
  }

  onConfirmPasswordChange = (confirmPassword) => {
    this.setState({ confirmPassword, confirmPasswordIsValid: true });
  }

  onPhoneChange = (phone) => {
    this.setState({ phone, phoneIsValid: true });
  }

  onGenderChange = (gender) => {
    this.setState({ gender });
  }

  onDateOfBirthChange = (dateOfBirth) => {
    this.setState({ dateOfBirth });
  }

  onRegisterPress = () => {
    const { firstName, lastName, email, password, confirmPassword, phone, dateOfBirth } = this.state;
    console.tron.log(firstName, lastName, email, password);

    this.setState({
      firstNameIsValid: Validators.isValidFirstOrLastName(firstName),
      lastNameIsValid: Validators.isValidFirstOrLastName(lastName),
      phoneIsValid: Validators.isEgyptPhone(phone),
      emailIsValid: Validators.isEmail(email),
      passwordIsValid: Validators.isValidPassword(password),
      confirmPasswordIsValid: Validators.isValidConfirmPassword(password, confirmPassword),
      dateOfBirthIsValid: Validators.exists(dateOfBirth)
    }, () => {
      const { firstNameIsValid, lastNameIsValid, phoneIsValid, emailIsValid, passwordIsValid, confirmPasswordIsValid, dateOfBirthIsValid } = this.state;
      console.tron.log(firstNameIsValid, lastNameIsValid, emailIsValid, passwordIsValid, confirmPasswordIsValid);
      if (firstNameIsValid && lastNameIsValid && phoneIsValid && emailIsValid && passwordIsValid && confirmPasswordIsValid && dateOfBirthIsValid) {
        this.props.register(firstName, lastName, email, password, phone);
      }
    });
  }

  render() {
    const {
      firstName,
      firstNameIsValid,
      lastName,
      lastNameIsValid,
      confirmPassword,
      confirmPasswordIsValid,
      email,
      emailIsValid,
      password,
      passwordIsValid,
      phone,
      phoneIsValid,
      gender,
      dateOfBirth,
      dateOfBirthIsValid
    } = this.state;
    const currentDate = new Date();

    return (
      <SafeAreaView style={styles.containerStyle}>
        <ScrollView style={styles.containerStyle} keyboardShouldPersistTaps='handled'>
          <Logo name='logo' />

          <View style={styles.inputsContainerStyle}>
            <View style={styles.nameInputsContainerStyle}>
              <CustomInput
                label='First Name'
                leftIconName='person'
                leftIconType={IconTypes.oct}
                leftIconColor={Colors.brandColorHexCode}
                value={firstName}
                onChangeText={this.onFirstNameChange}
                isValid={firstNameIsValid}
                errorMessage='First name can not be empty'
                containerStyle={styles.nameInputStyle}
              />

              <CustomInput
                label='Last Name'
                leftIconName='person'
                leftIconType={IconTypes.oct}
                leftIconColor={Colors.brandColorHexCode}
                value={lastName}
                onChangeText={this.onLastNameChange}
                isValid={lastNameIsValid}
                errorMessage='Last name can not be empty'
                containerStyle={styles.nameInputStyle}
              />
            </View>

            <CustomInput
                label='Phone Number'
                hint='Enter your phone number'
                leftIconName={Platform.OS === 'ios' ? 'cellphone-iphone' : 'cellphone'}
                leftIconType={IconTypes.materialCommunity}
                leftIconColor={Colors.brandColorHexCode}
                value={phone}
                onChangeText={this.onPhoneChange}
                isValid={phoneIsValid}
                errorMessage='Please enter a valid phone'
                keyboardType='phone-pad'
            />

            <CustomInput
                label='E-mail'
                hint='Enter your e-mail'
                leftIconName='email'
                leftIconType={IconTypes.materialCommunity}
                leftIconColor={Colors.brandColorHexCode}
                value={email}
                onChangeText={this.onEmailChange}
                isValid={emailIsValid}
                errorMessage='Please enter a valid e-mail'
                keyboardType='email-address'
            />

            <PasswordInput
              label='Password'
              hint='Enter your password'
              leftIconColor={Colors.brandColorHexCode}
              rightIconColor={Colors.brandColorHexCode}
              onChangeText={this.onPasswordChange}
              value={password}
              isValid={passwordIsValid}
              errorMessage='Please enter a valid password'
            />

            <PasswordInput
              label='Confirm Password'
              leftIconColor={Colors.brandColorHexCode}
              rightIconColor={Colors.brandColorHexCode}
              onChangeText={this.onConfirmPasswordChange}
              value={confirmPassword}
              isValid={confirmPasswordIsValid}
              errorMessage='Confirm password must match password'
            />

            <Dropdown
              label='Gender'
              value={gender}
              data={this.dropDownData}
              onChangeText={this.onGenderChange}
              baseColor={Colors.brandColorHexCode}
              dropdownPosition={0}
              containerStyle={styles.genderDropDownStyle}
              lineWidth={1}
              labelFontSize={14.6}
              fontSize={18.7}
            />

            <DatePicker
              style={[styles.datePickerStyle, dateOfBirthIsValid ? undefined : styles.datePickerInvalidStyle]}
              date={dateOfBirth}
              mode='date'
              placeholder='Birthday'
              format='DD-MM-YYYY'
              minDate='01-01-1950'
              maxDate={`${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`}
              confirmBtnText='Confirm'
              cancelBtnText='Cancel'
              showIcon
              iconComponent={(
                  <View style={styles.datePickerIconStyle}>
                      <Icon type={IconTypes.ion} name='ios-calendar' color={Colors.brandColorHexCode} />
                  </View>
              )}
              onDateChange={this.onDateOfBirthChange}
              customStyles={{
                  dateInput: styles.datePickerDateInputStyle,
                  placeholderText: styles.datePickerTextStyle,
                  dateText: styles.datePickerTextStyle
              }}
            />
            {
              !dateOfBirthIsValid
                ? <View style={styles.errorContainerStyle}>
                  <Icon
                    accessibilityLabel='warningIcon'
                    name='warning'
                    type={IconTypes.fontAwesome}
                    color={Colors.dangerColorHexCode}
                    size={24}
                  />
                  <Text style={styles.errorTextStyle}>Please enter date of birth</Text>
                </View>
                : null
            }

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

          </View>

          <CardSection style={[styles.actionsCardSectionStyle, styles.footerContainerStyle]}>
            <Text style={styles.inactiveActionTextStyle}>Already have an account?</Text>
            <TouchableOpacity onPress={Actions.login}>
              <Text style={styles.actionsTextStyle}>Login Now</Text>
            </TouchableOpacity>
          </CardSection>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default Register;
