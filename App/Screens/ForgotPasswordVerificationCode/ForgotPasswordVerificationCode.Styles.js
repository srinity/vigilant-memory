import { StyleSheet } from 'react-native';

import { Colors } from './../../Theme';

export default StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: Colors.whiteColorHexCode
    },
    codeInputText: {
        marginBottom: 35,
        marginTop: 20
    },
    codeInputContainerStyle: {
        marginBottom: 20,
        flex: 0
    },
    sendCodeContainerStyle: {
        marginVertical: 10,
        padding: 5,
        alignSelf: 'center',
        flexDirection: 'row'
    },
    verifyingCodeStyle: {
        marginVertical: 10,
        padding: 5,
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center'
    },
    actionTextStyle: {
        color: Colors.brandColorHexCode,
        fontSize: 14.6
    },
    indicatorStyle: {
        marginHorizontal: 5
    },
    overlayStyle: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: Colors.getBlackColorRGBAValue(0.7),
        justifyContent: 'center',
        alignItems: 'center'
    }
});
