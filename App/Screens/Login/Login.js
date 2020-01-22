import React, { Component } from 'react';
import { View, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { Actions } from 'react-native-router-flux';
import I18n from 'react-native-i18n';

import {
    Button,
    CardSection,
    CustomInput,
    Logo,
    PasswordInput,
    LocalizedText
} from './../../Components';

import { isEgyptPhone, isValidPassword } from './../../Utils/Validators';

import styles from './Login.Styles';

class Login extends Component {
    state = {
        phone: '',
        password: '',
        phoneIsValid: true,
        passwordIsValid: true
    }

    onPhoneChange = (phone) => {
        this.setState({ phone, phoneIsValid: true });
    }

    onPasswordChange = (password) => {
        this.setState({ password, passwordIsValid: true });
    }

    onForgotPasswordPress = () => {
        Actions.forgotPassword();
    }

    onNewUserPress = () => {
        Actions.register();
    }

    onLoginPress = () => {
        const { phone, password } = this.state;
        console.warn(phone);
        console.warn(password);

        this.setState({ phoneIsValid: isEgyptPhone(phone), passwordIsValid: isValidPassword(password) }, () => {
            if (this.state.phoneIsValid && this.state.passwordIsValid) {
                this.props.login(phone, password);
            }
        });
    }

    render() {
        const { phone, phoneIsValid, password, passwordIsValid } = this.state;
        const { isLoading } = this.props;

        return (
            <View style={styles.containerStyle}>
                <ScrollView
                    style={styles.scrollContainerStyle}
                    contentContainerStyle={styles.contentContainerStyle}
                    keyboardShouldPersistTaps='handled'
                >
                    <Logo name='logo' />

                    <View style={{ flex: 1, paddingHorizontal: 25 }}>
                        <CustomInput
                            placeholder={I18n.t('login_screen_phone_label')}
                            onChangeText={this.onPhoneChange}
                            value={phone}
                            isValid={phoneIsValid}
                            errorMessage='login_screen_phone_error_message'
                            keyboardType='phone-pad'
                            containerStyle={styles.phoneInputContainerStyle}
                        />

                        <PasswordInput
                            placeholder={I18n.t('login_screen_password_label')}
                            onChangeText={this.onPasswordChange}
                            value={password}
                            isValid={passwordIsValid}
                            containerStyle={styles.passwordInputContainerStyle}
                        />

                        <CardSection style={styles.buttonCardSectionStyle}>
                            <Button 
                                title='login_screen_login_button_text'
                                isLoading={isLoading}
                                indicatorColor={styles.indicatorColor.color}
                                onPress={this.onLoginPress}
                                style={styles.buttonStyle}
                                textStyle={styles.buttonTextStyle}
                                disabledStyle={styles.disabledButtonStyle}
                                indicatorSize='small'
                            />
                        </CardSection>

                        <CardSection style={[styles.cardSectionStyle, styles.actionsContainerStyle]}>
                            <TouchableOpacity onPress={this.onForgotPasswordPress}>
                                    <LocalizedText style={styles.actionsTextStyle}>login_screen_forgot_password</LocalizedText>
                            </TouchableOpacity>
                        </CardSection>
                    </View>

                    <CardSection style={[styles.cardSectionStyle, styles.footerContainerStyle]}>
                        <TouchableOpacity onPress={this.onNewUserPress}>
                            <LocalizedText style={styles.actionsTextStyle}>login_screen_register_now</LocalizedText>
                        </TouchableOpacity>
                    </CardSection>
                </ScrollView>
            </View>
        );
    }
}

export default Login;
