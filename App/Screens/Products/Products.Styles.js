import { StyleSheet } from 'react-native';
import { Colors } from '../../Theme';

export default StyleSheet.create({
    containerStyle: {
        flex: 1
    },
    headerOptionsContainerStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginBottom: 10
    },
    viewingOptionsContainerStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 6,
        backgroundColor: Colors.notAvailableColorHexCode,
        marginTop: 10,
        overflow: 'hidden'
    },
    viewingOptionStyle: {
        paddingHorizontal: 7,
        paddingVertical: 5
    },
    activeViewingOptionStyle: {
        backgroundColor: Colors.brandColorHexCode
    }
});
