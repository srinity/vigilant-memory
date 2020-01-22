import React from 'react';
import { Platform, TouchableNativeFeedback, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import memoize from 'memoize-one';

import { Icon, iconTypesValues } from './../Icon';
import Card from './../Card/Card';
import LocalizedText from './../LocalizedText/LocalizedText';

import { Colors } from '../../Theme';

import styles from './AccountCard.Styles';

const TouchableComponent = Platform.OS === 'ios' ? TouchableWithoutFeedback : TouchableNativeFeedback;

function getContainerStyle(size, defaultStyle) {
  const stylesArr = [defaultStyle];

  stylesArr.push({ height: size, width: size });

  return StyleSheet.flatten(stylesArr);
}

const getContainerStyleMemoized = memoize(getContainerStyle);

const AccountCard = ({
  title,
  iconName,
  iconType,
  onPress,
  size,
  ...props
}) => {
  const containerStyle = getContainerStyleMemoized(size, styles.containerStyle);

  return (
    <TouchableComponent onPress={onPress} {...props}>
      <Card style={containerStyle}>
        <Icon name={iconName} type={iconType} color={Colors.brandColorHexCode} size={50} />
        <LocalizedText style={styles.titleStyle}>{title}</LocalizedText>
      </Card>
    </TouchableComponent>
  );
};

AccountCard.propTypes = {
  title: PropTypes.string.isRequired,
  iconName: PropTypes.string.isRequired,
  iconType: PropTypes.oneOf(iconTypesValues).isRequired,
  onPress: PropTypes.func.isRequired,
  size: PropTypes.number.isRequired
};

export default AccountCard;
