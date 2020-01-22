import { StyleSheet, I18nManager, Platform } from 'react-native';

import { Colors } from './../../Theme';

export default StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: Colors.whiteColorHexCode
    },
    inputsContainerStyle: {
        flex: 1,
        paddingHorizontal: 15,
        paddingVertical: 7,
    },
    nameInputsContainerStyle: {
        flexDirection: 'row',
        marginBottom: 10
    },
    fistNameInputStyle: {
        flex: 1,
        marginRight: I18nManager.isRTL ? 0 : 10,
        marginLeft: I18nManager.isRTL ? 10 : 0,
        paddingVertical: Platform.OS === 'ios' ? 15 : 0,
    },
    lastNameInputStyle: {
        flex: 1,
        paddingVertical: Platform.OS === 'ios' ? 15 : 0,
    },
    inputContainerStyle: {
        paddingVertical: Platform.OS === 'ios' ? 15 : 0,
        marginBottom: 10
    },
    passwordInputContainerStyle: {
        marginBottom: 10
    },
    genderContainerStyle: {
        marginHorizontal: 50,
        marginTop: 10
    },
    actionsCardSectionStyle: {
        flex: 0,
        borderBottomWidth: 0,
        flexDirection: 'row'
    },
    inactiveActionTextStyle: {
        marginRight: 5
    },
    actionsTextStyle: {
        fontWeight: 'bold',
        color: Colors.brandColorHexCode
    },
    buttonCardSectionStyle: {
        borderBottomWidth: 0,
        marginTop: 20,
        flex: 0,
        width: '100%'
    },
    buttonStyle: {
        borderRadius: 50,
        backgroundColor: Colors.brandColorHexCode,
        minHeight: 40
    },
    buttonTextStyle: {
        color: Colors.whiteColorHexCode
    },
    disabledButtonStyle: {
        backgroundColor: Colors.getBrandColorRGBAValue(0.5)
    },
    indicatorColor: {
        color: Colors.whiteColorHexCode
    },
    footerContainerStyle: {
        marginVertical: 10
    },
    datePickerStyle: {
        marginTop: 10,
        paddingHorizontal: 15,
        height: Platform.OS === 'ios' ? 45 : 40,
        paddingVertical: Platform.OS === 'ios' ? 0 : 25,
        alignItems: 'flex-start',
        borderRadius: 30,
        borderColor: Colors.brandColorHexCode,
        backgroundColor: Colors.whiteColorHexCode,
    },
    datePickerContainerStyle: {
        width: '100%',
        marginBottom: Platform.OS === 'ios' ? 10 : 15,
        height: Platform.OS === 'ios' ? 45 : 40,
    },
    datePickerInvalidStyle: {
        borderColor: Colors.dangerColorHexCode,
        borderWidth: 2
    },
    errorContainerStyle: {
        flexDirection: 'row',
        marginTop: 5,
        marginHorizontal: 10
    },
    errorTextStyle: {
        color: Colors.blackTwo,
        flex: 1,
        fontSize: 16.6,
        lineHeight: 22,
        marginLeft: I18nManager.isRTL ? 0 : 7,
        marginRight: I18nManager.isRTL ? 7 : 0,
        paddingTop: Platform.OS === 'ios' ? 3 : 1
    },
});
