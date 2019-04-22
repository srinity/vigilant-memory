import { StyleSheet } from 'react-native';

import { Colors } from '../../Theme';

export default StyleSheet.create({
    containerStyle: {
        flex: 1,
        margin: 5,
        backgroundColor: Colors.whiteColorHexCode,
        elevation: 2,
        shadowColor: 'rgba(0, 0, 0, 0.2)',
        shadowOpacity: 1,
        shadowOffset: { width: 0, height: 2 }
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
