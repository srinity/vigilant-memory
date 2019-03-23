import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    buttonStyle: {
        flex: 1, 
        minHeight: 50, 
        minWidth: 80, 
        backgroundColor: '#0baed9', 
        justifyContent: 'center', 
        alignItems: 'center',
        alignSelf: 'stretch',
        marginHorizontal: 10,
        borderRadius: 5,
        paddingVertical: 10
    },
    containerStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textStyle: {
        color: '#ffffff', 
        fontWeight: 'bold', 
        fontSize: 16, 
        textAlign: 'center', 
        marginHorizontal: 5
    },
    disabledStyle: {
        backgroundColor: 'rgba(11,174,217, 0.5)'
    }
});
