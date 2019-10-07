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
                            label='Phone Number'
                            hint='Enter your phone number'
                            onChangeText={this.onPhoneChange}
                            value={phone}
                            isValid={phoneIsValid}
                            errorMessage='Invalid Phone Number'
                            keyboardType='phone-pad'
                        />

                        <CardSection style={styles.buttonCardSectionStyle}>
                            <Button 
                                title='SEND VERIFICATION CODE'
                                isLoading={isGeneratingResetPassword}
                                indicatorColor={styles.indicatorColor.color}
                                onPress={this.onForgotPasswordPress}
                                style={styles.buttonStyle}
                                textStyle={styles.buttonTextStyle}
                                disabledStyle={styles.disabledButtonStyle}
                            />
                        </CardSection>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

export default ForgotPassword;
