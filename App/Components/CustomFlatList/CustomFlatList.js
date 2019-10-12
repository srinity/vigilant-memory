import React from 'react';
import { FlatList, View, Text, ActivityIndicator, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';

import LocalizedText from './../LocalizedText/LocalizedText';

import { colorPropType } from '../../Utils/PropTypesValidators';

import styles from './CustomFlatList.Styles';

const CustomFlatList = ({
  isLoading,
  indicatorSize,
  indicatorColor,
  emptyText,
  emptyTextStyle,
  horizontal,
  data,
  extraData,
  renderItem,
  style,
  contentContainerStyle,
  ...props
}) => {
  if (isLoading) {
    return (
      <View style={styles.indicatorContainerStyle}>
        <ActivityIndicator size={indicatorSize} color={indicatorColor} />
      </View>
    );
  } else if (!isLoading && (!data || data.length < 1)) {
    return (
      <View style={styles.emptyDataContainerStyle}>
        <LocalizedText style={[styles.emptyTextStyle, emptyTextStyle]}>{emptyText}</LocalizedText>
      </View>
    );
  }

  return (
    <FlatList
      data={data}
      extraData={extraData}
      renderItem={renderItem}
      horizontal={horizontal}
      style={[{ flex: 1 }, style]}
      contentContainerStyle={contentContainerStyle}
      {...props}
    />
  );
};

CustomFlatList.propTypes = {
  isLoading: PropTypes.bool,
  indicatorSize: PropTypes.oneOf(['large', 'small']),
  indicatorColor: colorPropType,
  emptyText: PropTypes.string,
  emptyTextStyle: Text.propTypes.style,
  horizontal: PropTypes.bool,
  data: PropTypes.array,
  extraData: PropTypes.any,
  renderItem: PropTypes.func,
  style: ViewPropTypes.style,
  contentContainerStyle: ViewPropTypes.style
};

export default CustomFlatList;
