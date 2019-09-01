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
        paddingVertical: 7
    },
    nameInputsContainerStyle: {
        flexDirection: 'row'
    },
    nameInputStyle: {
        flex: 1
    },
    genderDropDownStyle: {
        marginHorizontal: 10,
        marginVertical: 5 
    },
    actionsCardSectionStyle: {
        flex: 0,
        borderBottomWidth: 0,
        flexDirection: 'row'
    },
    inactiveActionTextStyle: {
        color: Colors.brandColorHexCode,
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
        marginVertical: 20
    },
    datePickerStyle: {
        width: '95%',
        marginTop: 15,
        marginBottom: 10,
        marginHorizontal: 10,
        borderBottomColor: Colors.brandColorHexCode,
        borderBottomWidth: 1
    },
    datePickerInvalidStyle: {
        borderBottomColor: Colors.dangerColorHexCode,
        borderBottomWidth: 2
    },
    datePickerIconStyle: {
        position: 'absolute',
        left: 0,
        width: 40,
        paddingTop: 7,
        paddingBottom: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    datePickerDateInputStyle: {
        borderWidth: 0,
        borderRadius: 30,
        alignItems: 'flex-start',
        paddingLeft: 50
    },
    datePickerTextStyle: {
        color: Colors.brandColorHexCode,
        fontSize: 18
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
