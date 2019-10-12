import React, { Component, createRef } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TouchableNativeFeedback,
    TouchableOpacity,
    Platform,
    ActivityIndicator,
    Animated,
} from 'react-native';
import CodeInput from 'react-native-confirmation-code-field';
import { Actions } from 'react-native-router-flux';

import { Logo, LocalizedText } from '../../Components';

import { Colors } from './../../Theme';

import styles from './ForgotPasswordVerificationCode.Styles';

class ForgotPasswordVerificationCode extends Component {
    static getDerivedStateFromProps(props, state) {
        if (props.isSendingVerificationCode !== state.showOverlay && props.isSendingVerificationCode) {
            return { showOverlay: true };
        }

        return null;
    }

    constructor(props) {
        super(props);

        this.state = {
            code: '',
            error: null,
            showOverlay: false
        };

        this.animation = new Animated.Value(0);
    }

    componentDidUpdate(prevProps) {
        const { isSendingVerificationCode } = this.props;
        if (prevProps.isSendingVerificationCode !== isSendingVerificationCode) {
            this.runAnimation(isSendingVerificationCode);
        }
    }

    codeVerify = createRef();

    onSendVerificationCodePress = () => {
        const { sendVerificationCode, phone } = this.props;
        sendVerificationCode(phone, false);
    }

    onVerifyCode = (code) => {
        const { verifyCode, user } = this.props;
        verifyCode(code, user, () => Actions.resetPassword());
    }

    onCodeFulfill = (code) => {
        this.setState({ code });
        this.onVerifyCode(code);
    }

    onFocus = () => {
        const { error } = this.state;
        if (error) {
          this.setState({ error: false });
        }
    }

    runAnimation = (shouldAppear) => {
        Animated.timing(this.animation, {
            duration: 350,
            toValue: shouldAppear ? 1 : 0,
            useNativeDriver: true
        }).start(({ finished }) => {
            if (finished && !shouldAppear) {
                this.setState({ showOverlay: false });
            }
        });
    }

    render() {
        const { width, isVerifyingCode, isSendingVerificationCode } = this.props;
        const { showOverlay } = this.state;

        const size = Math.floor((width - 100) / 4);

        const TouchableComponent = Platform.OS === 'ios' ?
            TouchableOpacity : TouchableNativeFeedback;

        const animatedStyle = {
            opacity: this.animation.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1]
            })
        };

        return (
            <SafeAreaView style={styles.containerStyle}>
                <Logo name='logo' />

                <View style={styles.containerStyle}>
                    <CodeInput
                        ref={this.codeVerify}
                        size={size}
                        codeLength={4}
                        variant='border-b'
                        inactiveColor={Colors.blackColorHexCode}
                        activeColor={Colors.brandColorHexCode}
                        onFulfill={this.onCodeFulfill}
                        cellProps={{ style: styles.codeInputText }}
                        inputProps={{ contextMenuHidden: true, selectionColor: 'transparent', onFocus: this.onFocus }}
                        autoFocus
                        containerProps={{ style: styles.codeInputContainerStyle }}
                        disabled={isVerifyingCode}
                    />

                    {
                        !isVerifyingCode
                        ?
                        (
                            <TouchableComponent onPress={this.onSendVerificationCodePress} disabled={isSendingVerificationCode}>
                                <View style={styles.sendCodeContainerStyle}>
                                    <LocalizedText style={styles.actionTextStyle}>forget_password_verification_code_screen_re_send_verification_code_button</LocalizedText>
                                </View>
                            </TouchableComponent>
                        ) 
                        :
                        (
                            <View style={styles.verifyingCodeStyle}>
                                <ActivityIndicator color={Colors.brandColorHexCode} size='small' style={styles.indicatorStyle} />
                                <LocalizedText style={styles.actionTextStyle}>forget_password_verification_code_screen_verifying_text</LocalizedText>
                            </View>
                        )
                    }
                </View>

                {
                    showOverlay
                    ?
                    (
                        <Animated.View style={[styles.overlayStyle, animatedStyle]} pointerEvents='none'>
                            <ActivityIndicator color={Colors.brandColorHexCode} size='large' />
                        </Animated.View>
                    )
                    :
                    null
                }
            </SafeAreaView>
        );
    }
}

export default ForgotPasswordVerificationCode;
