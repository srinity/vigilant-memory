import React from 'react';
import { View, ViewPropTypes } from 'react-native';

import styles from './CardSection.Styles';

const cardSection = ({ children, style, ...props }) => {
    return (
        <View style={[styles.viewStyle, style]} {...props}>
            {children}
        </View>
    );
};

cardSection.defaultProps = {
    style: {}
};

cardSection.propTypes = {
    style: ViewPropTypes.style
};

export default cardSection;
