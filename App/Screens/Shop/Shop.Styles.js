import { StyleSheet } from 'react-native';

import { Colors } from '../../Theme';

export default StyleSheet.create({
    containerStyle: {
        flex: 1
    },
    categoriesContainerStyle: {
        marginTop: 10
    },
    showMoreContainerStyle: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    showMoreTextStyle: {
        color: Colors.dangerColorHexCode,
        padding: 5
    },
    categoryContainerStyle: {
        marginVertical: 5,
        paddingLeft: 10
    },
    categoryTextStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.blackColorHexCode,
        marginBottom: 10
    }
});
