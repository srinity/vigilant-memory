import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import I18n from 'react-native-i18n';

import {
    Button,
    CardSection,
    CustomInput,
    Logo,
} from './../../Components';

import { isEgyptPhone } from './../../Utils/Validators';

import styles from './ForgotPassword.Styles';

class ForgotPassword extends Component {
    state = {
        phone: '',
        phoneIsValid: true,
    }

    onPhoneChange = (phone) => {
        this.setState({ phone, phoneIsValid: true });
    }

    onForgotPasswordPress = () => {
        console.warn('in Forgot Passward');
        const { phone } = this.state;
        console.warn(phone);

        this.setState({ phoneIsValid: isEgyptPhone(phone) }, () => {
            if (this.state.phoneIsValid) {
                this.props.forgotPassword(phone);
            }
        });
    }

    render() {
        const { phone, phoneIsValid } = this.state;
        const { isGeneratingResetPassword } = this.props;

        return (
            <View style={styles.containerStyle}>
                <ScrollView
                    style={styles.scrollContainerStyle}
                    contentContainerStyle={styles.contentContainerStyle}
                    keyboardShouldPersistTaps='handled'
                >
                    <Logo name='logo' />

                    <View style={styles.controlsContainerStyle}>
                        <CustomInput
                            placeholder={I18n.t('forget_password_screen_phone_label')}
                            onChangeText={this.onPhoneChange}
                            value={phone}
                            isValid={phoneIsValid}
                            errorMessage='forget_password_screen_phone_error_message'
                            keyboardType='phone-pad'
                            containerStyle={styles.inputContainerStyle}
                        />

                        <CardSection style={styles.buttonCardSectionStyle}>
                            <Button 
                                title='forget_password_screen_send_verification_code_button'
                                isLoading={isGeneratingResetPassword}
                                indicatorColor={styles.indicatorColor.color}
                                onPress={this.onForgotPasswordPress}
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

export default ForgotPassword;
