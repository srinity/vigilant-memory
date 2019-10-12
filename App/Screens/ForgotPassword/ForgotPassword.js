import React, { Component } from 'react';
import { View, ScrollView, Platform } from 'react-native';

import {
    Button,
    CardSection,
    CustomInput,
    IconTypes,
    Logo,
} from './../../Components';

import { isEgyptPhone } from './../../Utils/Validators';

import { Colors } from '../../Theme';

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
                            leftIconName={Platform.OS === 'ios' ? 'cellphone-iphone' : 'cellphone'}
                            leftIconType={IconTypes.materialCommunity}
                            leftIconColor={Colors.brandColorHexCode}
                            label='forget_password_screen_phone_label'
                            hint='forget_password_screen_phone_hint'
                            onChangeText={this.onPhoneChange}
                            value={phone}
                            isValid={phoneIsValid}
                            errorMessage='forget_password_screen_phone_error_message'
                            keyboardType='phone-pad'
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
