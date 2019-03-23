import React from 'react';
import { View, ViewPropTypes } from 'react-native';

import styles from './Card.Styles';

const card = ({ children, style, ...props }) => {
    return (
        <View style={[styles.viewStyle, style]} {...props} >
            {children}
        </View>
    );
};

card.defaultProps = {
    style: {}
};

card.propTypes = {
    style: ViewPropTypes.style
};

export default card;
