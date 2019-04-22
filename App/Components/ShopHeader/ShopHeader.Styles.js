import { StyleSheet } from 'react-native';

import { Colors } from '../../Theme';

export default StyleSheet.create({
    containerStyle: {
        flex: 1
    },
    textContainerStyle: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        paddingHorizontal: 10,
        paddingBottom: 20,
        justifyContent: 'flex-end'
    },
    nameTextStyle: {
        fontSize: 20,
        color: Colors.whiteColorHexCode,
        fontWeight: 'bold',
        lineHeight: 37
    },
    addressTextStyle: {
        fontSize: 16,
        color: Colors.whiteColorHexCode
    },
    addressContainerStyle: {
        flexDirection: 'row',
        alignItems: 'center'
    }
});
