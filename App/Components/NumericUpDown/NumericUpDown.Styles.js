import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    containerStyle: {
        width: 150,
        height: 50,
        margin: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0baed9',
        padding: 10,
        borderRadius: 25
    },
    numberContainerStyle: {
        flex: 2, 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginHorizontal: 5
    },
    numbersStyle: {
        color: '#0baed9', 
        fontSize: 26, 
        fontWeight: 'bold', 
        textAlign: 'center'
    },
    disabledStyle: {
        backgroundColor: 'rgba(11,174,217, 0.5)'
    }
});
