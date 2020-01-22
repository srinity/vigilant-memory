import React from 'react';
import { View, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';

import Dot from './Dot';

import { colorPropType } from './../../Utils/PropTypesValidators';

import styles from './Pagination.Styles';

const renderDots = (numberOfDots, activeDotIndex, props) => {
  const dots = [];
  const { color, inactiveOpacity, size, activeSize, dotSpacing, dotStyle, ...additionalProps } = props;

  for (let i = 0; i < numberOfDots; i++) {
    dots.push(
      <Dot
        key={i}
        active={i === activeDotIndex}
        color={color}
        inactiveOpacity={inactiveOpacity}
        size={size}
        activeSize={activeSize}
        dotSpacing={dotSpacing}
        dotStyle={dotStyle}
        {...additionalProps}
      />
    );
  }

  return dots;
};

const pagination = ({ numberOfDots, activeDotIndex, containerStyle, ...props }) => {
  return (
    <View style={[styles.dotsContainerStyle, containerStyle]}>
      {renderDots(numberOfDots, activeDotIndex, props)}
    </View>
  );
};

pagination.defaultProps = {
  color: '#000'
};

pagination.propTypes = {
  numberOfDots: PropTypes.number.isRequired,
  activeDotIndex: PropTypes.number.isRequired,
  containerStyle: ViewPropTypes.style,
  color: colorPropType,
  inactiveOpacity: PropTypes.number,
  size: PropTypes.number,
  activeSize: PropTypes.number,
  dotSpacing: PropTypes.number,
  dotStyle: ViewPropTypes.style
};

export default pagination;
