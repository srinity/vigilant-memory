import { StyleSheet } from 'react-native';

import { Colors } from '../../Theme';

export default StyleSheet.create({
    containerStyle: {
        backgroundColor: Colors.whiteColorHexCode,
        flex: 1,
        flexDirection: 'row',
        paddingVertical: 7,
        borderBottomColor: Colors.notAvailableColorHexCode,
        borderBottomWidth: 1,
        paddingHorizontal: 15
    },
    imageContainerStyle: {
        flex: 1
    },
    imageStyle: {
        marginVertical: 10,
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: Colors.notAvailableColorHexCode
    },
    infoContainerStyle: {
        flex: 2,
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 7,
    },
    nameContainerStyle: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    priceContainerStyle: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        // marginVertical: 5
    },
    textStyle: {
        color: Colors.blackColorHexCode,
        fontWeight: 'bold'
    },
    numericUpDownStyle: {
        height: undefined,
        width: 75,
    },
    numericUpDownNumbersStyle: {
        fontSize: 16,
        color: Colors.brandColorHexCode,
        fontWeight: 'bold'
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
        borderWidth: 1,
        borderColor: Colors.getBlackColorRGBAValue(0.8)
    }
});
