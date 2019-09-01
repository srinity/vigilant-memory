import { StyleSheet, Platform } from 'react-native';

import { Colors } from '../../Theme';

const shadowing = Platform.select({
    ios: {
        shadowColor: 'rgba(0, 0, 0, 0.2)',
        shadowOpacity: 1,
        shadowOffset: { width: 0, height: 2 }
    },
    android: {
        elevation: 2
    }
});

export default StyleSheet.create({
    containerStyle: {
        flex: 1
    },
    purchaseInfoContainerStyle: {
        flexDirection: 'row',
        height: 60,
        backgroundColor: Colors.whiteColorHexCode,
        paddingHorizontal: 10,
        paddingVertical: 5,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    priceContainerStyle: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    totalTextStyle: {
        fontSize: 14,
        color: Colors.getBlackColorRGBAValue(0.7)
    },
    priceTextStyle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.blackColorHexCode
    },
    buyButtonStyle: {
        flex: 0,
        minHeight: 30,
        height: 40,
        backgroundColor: Colors.brandColorHexCode
    },
    buyButtonDisabledStyle: {
        backgroundColor: Colors.getBrandColorRGBAValue(0.7)
    },
    buyButtonTextStyle: {
        fontSize: 14
    },
    shopContainerStyle: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginVertical: 7,
        backgroundColor: Colors.whiteColorHexCode,
        ...shadowing
    },
    shopCheckBoxStyle: {
        borderBottomColor: Colors.notAvailableColorHexCode,
        borderBottomWidth: 1,
        paddingVertical: 10
    },
    shopCheckBoxTextStyle: {
        color: Colors.blackColorHexCode,
        fontSize: 16
    }
});
