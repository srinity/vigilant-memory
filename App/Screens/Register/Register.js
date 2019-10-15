import React, { Component } from 'react';
import { View, Platform, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import DatePicker from 'react-native-datepicker';
import { Actions } from 'react-native-router-flux';
import I18n from 'react-native-i18n';

import {
  Button,
  CardSection,
  Icon,
  IconTypes,
  Logo,
  CustomInput,
  PasswordInput,
  LocalizedText
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
      password: '',
      confirmPassword: '',
      phone: '',
      gender: 'M',
      dateOfBirth: undefined,
      firstNameIsValid: true,
      lastNameIsValid: true,
      passwordIsValid: true,
      confirmPasswordIsValid: true,
      phoneIsValid: true,
      dateOfBirthIsValid: true
    };

    this.dropDownData = [
      {
        label: I18n.t('register_screen_male_text'),
        value: 'M'
      },
      {
        label: I18n.t('register_screen_female_text'),
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
    const { firstName, lastName, password, confirmPassword, phone, dateOfBirth, gender } = this.state;

    this.setState({
      firstNameIsValid: Validators.isValidFirstOrLastName(firstName),
      lastNameIsValid: Validators.isValidFirstOrLastName(lastName),
      phoneIsValid: Validators.isEgyptPhone(phone),
      passwordIsValid: Validators.isValidPassword(password),
      confirmPasswordIsValid: Validators.isValidConfirmPassword(password, confirmPassword),
      dateOfBirthIsValid: Validators.exists(dateOfBirth)
    }, () => {
      const {
        firstNameIsValid,
        lastNameIsValid,
        phoneIsValid,
        passwordIsValid,
        confirmPasswordIsValid,
        dateOfBirthIsValid
      } = this.state;
      if (firstNameIsValid && lastNameIsValid && phoneIsValid && passwordIsValid && confirmPasswordIsValid && dateOfBirthIsValid) {
        const birthDateProperFormat = dateOfBirth.split('-').reverse().join('-');
        this.props.register(firstName, lastName, password, phone, birthDateProperFormat, gender);
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
      password,
      passwordIsValid,
      phone,
      phoneIsValid,
      gender,
      dateOfBirth,
      dateOfBirthIsValid
    } = this.state;
    const { isLoading } = this.props;
    const currentDate = new Date();

    return (
      <SafeAreaView style={styles.containerStyle}>
        <ScrollView style={styles.containerStyle} keyboardShouldPersistTaps='handled'>
          <Logo name='logo' />

          <View style={styles.inputsContainerStyle}>
            <View style={styles.nameInputsContainerStyle}>
              <CustomInput
                label='register_screen_first_name_label'
                leftIconName='person'
                leftIconType={IconTypes.oct}
                leftIconColor={Colors.brandColorHexCode}
                value={firstName}
                onChangeText={this.onFirstNameChange}
                isValid={firstNameIsValid}
                errorMessage='register_screen_first_name_error_message'
                containerStyle={styles.nameInputStyle}
              />

              <CustomInput
                label='register_screen_last_name_label'
                leftIconName='person'
                leftIconType={IconTypes.oct}
                leftIconColor={Colors.brandColorHexCode}
                value={lastName}
                onChangeText={this.onLastNameChange}
                isValid={lastNameIsValid}
                errorMessage='register_screen_last_name_error_message'
                containerStyle={styles.nameInputStyle}
              />
            </View>

            <CustomInput
                label='register_screen_phone_number_label'
                hint='register_screen_phone_number_hint'
                leftIconName={Platform.OS === 'ios' ? 'cellphone-iphone' : 'cellphone'}
                leftIconType={IconTypes.materialCommunity}
                leftIconColor={Colors.brandColorHexCode}
                value={phone}
                onChangeText={this.onPhoneChange}
                isValid={phoneIsValid}
                errorMessage='register_screen_phone_number_error_message'
                keyboardType='phone-pad'
            />

            <PasswordInput
              label='register_screen_password_label'
              hint='register_screen_password_hint'
              leftIconColor={Colors.brandColorHexCode}
              rightIconColor={Colors.brandColorHexCode}
              onChangeText={this.onPasswordChange}
              value={password}
              isValid={passwordIsValid}
              errorMessage='register_screen_password_error_message'
            />

            <PasswordInput
              label='register_screen_confirm_password_label'
              leftIconColor={Colors.brandColorHexCode}
              rightIconColor={Colors.brandColorHexCode}
              onChangeText={this.onConfirmPasswordChange}
              value={confirmPassword}
              isValid={confirmPasswordIsValid}
              errorMessage='register_screen_confirm_password_error_message'
            />

            <Dropdown
              label={I18n.t('register_screen_gender_drop_down')}
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
              placeholder={I18n.t('register_screen_birthday_text')}
              format='DD-MM-YYYY'
              minDate='01-01-1950'
              maxDate={`${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`}
              confirmBtnText={I18n.t('register_screen_birthday_confirm_text')}
              cancelBtnText={I18n.t('register_screen_birthday_cancel_text')}
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
                  <LocalizedText style={styles.errorTextStyle}>register_screen_birthday_error_text</LocalizedText>
                </View>
                : null
            }

            <CardSection style={styles.buttonCardSectionStyle}>
              <Button
                title='register_screen_register_button_text'
                isLoading={isLoading}
                indicatorColor={styles.indicatorColor.color}
                onPress={this.onRegisterPress}
                style={styles.buttonStyle}
                textStyle={styles.buttonTextStyle}
                disabledStyle={styles.disabledButtonStyle}
                indicatorSize='small'
              />
            </CardSection>

          </View>

          <CardSection style={[styles.actionsCardSectionStyle, styles.footerContainerStyle]}>
            <LocalizedText style={styles.inactiveActionTextStyle}>register_screen_already_have_account</LocalizedText>
            <TouchableOpacity onPress={Actions.login}>
              <LocalizedText style={styles.actionsTextStyle}>register_screen_login_now</LocalizedText>
            </TouchableOpacity>
          </CardSection>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default Register;
