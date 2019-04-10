import React, { Component } from 'react';
import { View, TouchableOpacity, ScrollView, ImageBackground, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';

import {
    AuthInput,
    Button,
    Card,
    CardSection,
    IconTypes,
    Logo
} from './../../Components';

import { isEmail, isValidPassword } from './../../Utils/Validators';

import { Images } from './../../Theme';

import styles from './Login.Styles';

class Login extends Component {
    state = {
        email: '',
        password: '',
        emailIsValid: true,
        passwordIsValid: true
    }

    onEmailChange = (email) => {
        this.setState({ email });
    }

    onPasswordChange = (password) => {
        this.setState({ password });
    }

    onForgotPasswordPress = () => {
        console.warn('in Forgot Passward');
    }

    onNewUserPress = () => {
        Actions.register();
    }

    onLoginPress = () => {
        const { email, password } = this.state;
        console.warn(email);
        console.warn(password);

        this.setState({ emailIsValid: isEmail(email), passwordIsValid: isValidPassword(password) }, () => {
            if (this.state.emailIsValid && this.state.passwordIsValid) {
                this.props.login(email, password);
            }
        });
    }

    render() {
        return (
            <View style={styles.containerStyle}>
                <ImageBackground
                    source={Images.cover}
                    style={styles.containerStyle}
                    resizeMode='cover'
                >
                    <ScrollView style={styles.scrollContainerStyle} contentContainerStyle={styles.contentContainerStyle} keyboardShouldPersistTaps='handled'>
                        <Logo name='logo' />
                        
                        <Card style={styles.cardStyle}>
                            <AuthInput
                                placeholder='E-mail'
                                value={this.state.email}
                                onChangeText={this.onEmailChange}
                                keyboardType='email-address'
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
                                returnKeyType='done'
                                isValid={this.state.passwordIsValid}
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
                        </Card>

                        <CardSection style={[styles.cardSectionStyle, styles.footerContainerStyle]}>
                            <TouchableOpacity onPress={this.onForgotPasswordPress}>
                                    <Text style={styles.actionsTextStyle}>Forgot Password</Text>
                            </TouchableOpacity>
                        </CardSection>
                    </ScrollView>
                </ImageBackground>
            </View>
        );
    }
}

export default Login;
