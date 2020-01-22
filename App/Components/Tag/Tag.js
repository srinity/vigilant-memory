import React from 'react';
import { View, Text, StyleSheet, TouchableNativeFeedback, TouchableWithoutFeedback, Platform } from 'react-native';

import styles from './Tag.Styles';

const TouchableComponent = Platform.OS === 'ios' ? TouchableWithoutFeedback : TouchableNativeFeedback;

const Tag = ({
  title,
  isActive,
  onPress,
  activeStyle,
  style,
  textStyle,
  activeTextStyle
}) => {
  return (
    <TouchableComponent onPress={onPress} disabled={isActive}>
      <View style={[styles.containerStyle, style, isActive ? StyleSheet.flatten([styles.activeContainerStyle, activeStyle]) : undefined ]}>
        <Text style={[styles.textStyle, textStyle, isActive ? StyleSheet.flatten([styles.activeTextStyle, activeTextStyle]) : undefined ]}>{title}</Text>
      </View>
    </TouchableComponent>
  );
};

export default Tag;
