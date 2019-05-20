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
        flex: 1,
        margin: 5,
        backgroundColor: Colors.whiteColorHexCode,
        ...shadowing        
    },
    imageContainerStyle: {
        flex: 2,
        flexDirection: 'row'
    },
    imageStyle: {
        flex: 1,
        width: undefined,
        height: undefined
    },
    infoContainerStyle: {
        flex: 1,
        justifyContent: 'space-between',
        paddingVertical: 5,
        paddingHorizontal: 7
    },
    textStyle: {
        color: Colors.blackColorHexCode,
        fontWeight: 'bold'
    },
    priceContainerStyle: {
        flexDirection: 'row',
        marginVertical: 5,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    buttonStyle: {
        paddingVertical: 5
    },
    buttonTextStyle: {
        color: Colors.brandColorHexCode
    }
});

export const horizontalStyles = StyleSheet.create({
    buttonStyle: {
        padding: 5
    },
    buttonTextStyle: {
        color: Colors.brandColorHexCode
    },
    containerStyle: {
        backgroundColor: Colors.whiteColorHexCode,
        flex: 1,
        flexDirection: 'row',
        marginHorizontal: 10,
        marginVertical: 3,
        ...shadowing
    },
    imageContainerStyle: {
        flex: 1
    },
    imageStyle: {
        flex: 1,
        height: undefined,
        width: undefined
    },
    infoContainerStyle: {
        flex: 2,
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 20,
    },
    priceContainerStyle: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 5
    },
    textStyle: {
        color: Colors.blackColorHexCode,
        fontWeight: 'bold'
    },
});
