import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';

import {
    Button,
    CardSection,
    Logo,
    PasswordInput
} from './../../Components';

import { isValidPassword, isValidConfirmPassword } from './../../Utils/Validators';

import { Colors } from '../../Theme';

import styles from './SetForgetenPassword.Styles';

class SetForgetenPassword extends Component {
    state = {
        password: '',
        confirmPassword: '',
        passwordIsValid: true,
        confirmPasswordIsValid: true,
    }

    onPasswordChange = (password) => {
        this.setState({ password, passwordIsValid: true });
    }

    onConfirmPasswordChange = (confirmPassword) => {
        this.setState({ confirmPassword, confirmPasswordIsValid: true });
    }

    onResetPasswordPress = () => {
        const { password, confirmPassword } = this.state;

        this.setState({
            passwordIsValid: isValidPassword(password),
            confirmPasswordIsValid: isValidConfirmPassword(password, confirmPassword),
        }, () => {
            if (this.state.passwordIsValid && this.state.confirmPasswordIsValid) {
                this.props.resetPassword(undefined, password, this.props.user);
            }
        });
    }

    render() {
        const { confirmPassword, confirmPasswordIsValid, password, passwordIsValid } = this.state;
        const { isResettingPassword } = this.props;

        return (
            <View style={styles.containerStyle}>
                <ScrollView
                    style={styles.scrollContainerStyle}
                    contentContainerStyle={styles.contentContainerStyle}
                    keyboardShouldPersistTaps='handled'
                >
                    <Logo name='logo' />

                    <View style={styles.controlsContainerStyle}>
                        <PasswordInput
                            label='set_forgoten_password_screen_password_label'
                            hint='set_forgoten_password_screen_password_hint'
                            leftIconColor={Colors.brandColorHexCode}
                            rightIconColor={Colors.brandColorHexCode}
                            onChangeText={this.onPasswordChange}
                            value={password}
                            isValid={passwordIsValid}
                            errorMessage='set_forgoten_password_screen_password_error_message'
                        />

                        <PasswordInput
                            label='set_forgoten_password_screen_confirm_password_label'
                            leftIconColor={Colors.brandColorHexCode}
                            rightIconColor={Colors.brandColorHexCode}
                            onChangeText={this.onConfirmPasswordChange}
                            value={confirmPassword}
                            isValid={confirmPasswordIsValid}
                            errorMessage='set_forgoten_password_screen_confirm_password_error_message'
                        />

                        <CardSection style={styles.buttonCardSectionStyle}>
                            <Button 
                                title='set_forgoten_password_screen_reset_password_button_title'
                                isLoading={isResettingPassword}
                                indicatorColor={styles.indicatorColor.color}
                                onPress={this.onResetPasswordPress}
                                style={styles.buttonStyle}
                                textStyle={styles.buttonTextStyle}
                                disabledStyle={styles.disabledButtonStyle}
                                indicatorSize='small'
                            />
                        </CardSection>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

export default SetForgetenPassword;
