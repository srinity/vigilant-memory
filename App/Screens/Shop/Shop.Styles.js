import { StyleSheet, I18nManager } from 'react-native';

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
        color: Colors.brandColorHexCode,
        padding: 5
    },
    categoryHeaderContainerStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        marginHorizontal: 5 
    },
    categoryContainerStyle: {
        marginVertical: 5,
        paddingLeft: I18nManager.isRTL ? 0 : 10,
        paddingRight: I18nManager.isRTL ? 10 : 0
    },
    categoryTextStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.blackColorHexCode,
        // marginBottom: 10
    }
});
