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
        borderRadius: 6,
        ...shadowing        
    },
    imageContainerStyle: {
        flex: 2,
        flexDirection: 'row',
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
        overflow: 'hidden'
    },
    imageStyle: {
        flex: 1,
        width: undefined,
        height: undefined
    },
    infoContainerStyle: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 7,
        paddingHorizontal: 7
    },
    textStyle: {
        color: Colors.blackColorHexCode,
        fontWeight: 'bold',
        marginBottom: 3
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
    },
    numericUpDownStyle: {
        width: 75,
        height: undefined,
        margin: 0,
        marginBottom: 5
    },
    numericUpDownNumbersStyle: {
        fontSize: 16,
        color: Colors.blackColorHexCode,
        fontWeight: 'normal'
    },
    numericUpDownNumbersContainerStyle: {
        flex: 0,
        width: 27
    },
    numericUpDownButtonStyle: {
        flex: 0,
        height: 20,
        width: 20,
        padding: 0,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
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
