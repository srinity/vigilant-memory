import React, { Component } from 'react';
import { View, TouchableOpacity, ScrollView, Text, Platform } from 'react-native';
import { Actions } from 'react-native-router-flux';

import {
    Button,
    CardSection,
    CustomInput,
    IconTypes,
    Logo,
    PasswordInput
} from './../../Components';

import { isEgyptPhone, isValidPassword } from './../../Utils/Validators';

import styles from './Login.Styles';
import { Colors } from '../../Theme';

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
        console.warn('in Forgot Passward');
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
                            label='Phone Number'
                            hint='Enter your phone number'
                            onChangeText={this.onPhoneChange}
                            value={phone}
                            isValid={phoneIsValid}
                            errorMessage='Invalid Phone Number'
                            keyboardType='phone-pad'
                        />

                        <PasswordInput
                            label='Password'
                            hint='Enter your password'
                            leftIconColor={Colors.brandColorHexCode}
                            rightIconColor={Colors.brandColorHexCode}
                            onChangeText={this.onPasswordChange}
                            value={password}
                            isValid={passwordIsValid}
                        />

                        <CardSection style={styles.buttonCardSectionStyle}>
                            <Button 
                                title='LOGIN'
                                isLoading={this.props.isLoading}
                                indicatorColor={styles.indicatorColor.color}
                                onPress={this.onLoginPress}
                                style={styles.buttonStyle}
                                textStyle={styles.buttonTextStyle}
                                disabledStyle={styles.disabledButtonStyle}
                            />
                        </CardSection>

                        <CardSection style={[styles.cardSectionStyle, styles.actionsContainerStyle]}>
                            <Text style={styles.inactiveActionTextStyle}>Don't have an account?</Text>
                            <TouchableOpacity onPress={this.onNewUserPress}>
                                <Text style={styles.actionsTextStyle}>Sign Up Now</Text>
                            </TouchableOpacity>
                        </CardSection>
                    </View>

                    <CardSection style={[styles.cardSectionStyle, styles.footerContainerStyle]}>
                        <TouchableOpacity onPress={this.onForgotPasswordPress}>
                                <Text style={styles.actionsTextStyle}>Forgot Password</Text>
                        </TouchableOpacity>
                    </CardSection>
                </ScrollView>
            </View>
        );
    }
}

export default Login;
