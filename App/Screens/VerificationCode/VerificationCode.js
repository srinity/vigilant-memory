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
    StyleSheet
} from 'react-native';
import CodeInput from 'react-native-confirmation-code-field';

import { Logo } from '../../Components';

import { Colors } from './../../Theme';

import styles from './VerificationCode.Styles';

class VerificationCode extends Component {
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

    componentDidMount() {
        this.onSendVerificationCodePress();
    }

    componentDidUpdate(prevProps) {
        const { isSendingVerificationCode } = this.props;
        if (prevProps.isSendingVerificationCode !== isSendingVerificationCode) {
            this.runAnimation(isSendingVerificationCode);
        }
    }

    codeVerify = createRef();

    onSendVerificationCodePress = () => {
        const { sendVerificationCode, user } = this.props;
        sendVerificationCode(user);
    }

    onVerifyCode = (code) => {
        const { verifyCode, user } = this.props;
        verifyCode(code, user);
    }

    onCodeFulfill = (code) => {
        this.setState({ code });
        console.tron.log(code);
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
        console.tron.error(this.props);
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
                                    <Text style={styles.actionTextStyle}>Re-Send Code</Text>
                                </View>
                            </TouchableComponent>
                        ) 
                        :
                        (
                            <View style={styles.verifyingCodeStyle}>
                                <ActivityIndicator color={Colors.brandColorHexCode} size='small' style={styles.indicatorStyle} />
                                <Text style={styles.actionTextStyle}>Verifying...</Text>
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

export default VerificationCode;
