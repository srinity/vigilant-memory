import { StyleSheet } from 'react-native';

import { Colors } from './../../Theme';

export default StyleSheet.create({
    containerStyle: {
        flex: 1,
    },
    cardStyle: {
        flex: 1,
        borderRadius: 5,
        elevation: 0,
        borderColor: 'rgba(184,23,215,0)',
        backgroundColor: 'rgba(255,255,255,0)',
        padding: 0,
        shadowOpacity: 0,
        justifyContent: 'flex-start'
    },
    logoContainerStyle: {
        marginTop: 30
    },
    datePickerStyle: {
        width: '95%',
        marginTop: 15,
        backgroundColor: Colors.authBrandColorBackgroundHexCode,
        borderColor: Colors.getAuthBrandColorBorderRGBAValue(0.5),
        borderWidth: 0.5,
        borderRadius: 30
    },
    datePickerInvalidStyle: {
        borderColor: Colors.getDangerColorRGPAValue(0.5),
    },
    datePickerIconStyle: {
        position: 'absolute',
        left: 0,
        width: 40,
        paddingTop: 7,
        paddingBottom: 5,
        backgroundColor: Colors.whiteColorHexCode,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 50,
        borderBottomLeftRadius: 100,
        borderBottomRightRadius: 100,
    },
    datePickerDateInputStyle: {
        borderWidth: 0,
        borderRadius: 30,
        alignItems: 'flex-start',
        paddingLeft: 50
    },
    datePickerTextStyle: {
        color: Colors.whiteColorHexCode,
        fontSize: 18
    },
    actionsCardSectionStyle: {
        flex: 0,
        borderBottomWidth: 0,
        flexDirection: 'row'
    },
    inactiveActionTextStyle: {
        color: Colors.whiteColorHexCode,
        marginRight: 5
    },
    actionsTextStyle: {
        fontWeight: 'bold',
        color: Colors.whiteColorHexCode
    },
    buttonCardSectionStyle: {
        borderBottomWidth: 0,
        marginTop: 20,
        flex: 0,
        width: '100%'
    },
    buttonStyle: {
        borderRadius: 50,
        backgroundColor: Colors.whiteColorHexCode,
        minHeight: 40
    },
    buttonTextStyle: {
        color: Colors.brandColorHexCode
    },
    disabledButtonStyle: {
        backgroundColor: Colors.getWhiteColorRGBAValue(0.5)
    },
    indicatorColor: {
        color: Colors.brandColorHexCode
    },
    footerContainerStyle: {
        marginVertical: 20
    },
    radioListStyle: {
        backgroundColor: Colors.brandColorHexCode,
        borderColor: Colors.whiteColorHexCode,
        marginTop: 15
    },
    radioListSelectedStyle: {
        backgroundColor: Colors.whiteColorHexCode,
        borderColor: Colors.authBrandColorBorderHexCode
    }
});
