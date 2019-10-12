import React, { Component } from 'react';
import { View, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { Actions } from 'react-native-router-flux';

import {
    Button,
    CardSection,
    CustomInput,
    IconTypes,
    Logo,
    PasswordInput,
    LocalizedText
} from './../../Components';

import { isEgyptPhone, isValidPassword } from './../../Utils/Validators';

import { Colors } from '../../Theme';

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

                    <View style={{ flex: 1, paddingHorizontal: 15 }}>
                        <CustomInput
                            leftIconName={Platform.OS === 'ios' ? 'cellphone-iphone' : 'cellphone'}
                            leftIconType={IconTypes.materialCommunity}
                            leftIconColor={Colors.brandColorHexCode}
                            label='login_screen_phone_label'
                            hint='login_screen_phone_hint'
                            onChangeText={this.onPhoneChange}
                            value={phone}
                            isValid={phoneIsValid}
                            errorMessage='login_screen_phone_error_message'
                            keyboardType='phone-pad'
                        />

                        <PasswordInput
                            label='login_screen_password_label'
                            hint='login_screen_password_hint'
                            leftIconColor={Colors.brandColorHexCode}
                            rightIconColor={Colors.brandColorHexCode}
                            onChangeText={this.onPasswordChange}
                            value={password}
                            isValid={passwordIsValid}
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
                            <LocalizedText style={styles.inactiveActionTextStyle}>login_screen_do_not_have_an_account</LocalizedText>
                            <TouchableOpacity onPress={this.onNewUserPress}>
                                <LocalizedText style={styles.actionsTextStyle}>login_screen_register_now</LocalizedText>
                            </TouchableOpacity>
                        </CardSection>
                    </View>

                    <CardSection style={[styles.cardSectionStyle, styles.footerContainerStyle]}>
                        <TouchableOpacity onPress={this.onForgotPasswordPress}>
                                <LocalizedText style={styles.actionsTextStyle}>login_screen_forgot_password</LocalizedText>
                        </TouchableOpacity>
                    </CardSection>
                </ScrollView>
            </View>
        );
    }
}

export default Login;
