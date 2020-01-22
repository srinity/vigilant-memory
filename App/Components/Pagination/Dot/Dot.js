import React, { Component } from 'react';
import { Animated, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';

import { colorPropType } from './../../../Utils/PropTypesValidators';

class Dot extends Component {
  constructor(props) {
    super(props);

    const { active, size, activeSize } = props;
    const initialSize = active ? activeSize : size;

    this.animation = new Animated.Value(initialSize);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.active !== this.props.active) {
      const { active, activeSize, size } = this.props;

      Animated.spring(this.animation, {
        toValue: active ? activeSize : size,
        friction: 5
      }).start();
    }
  }

  render() {
    const { active, color, inactiveColor = color, inactiveOpacity, dotSpacing, dotStyle, ...props } = this.props;

    return (
      <Animated.View
        {...props}
        style={[dotStyle, {
          width: this.animation._value,
          height: this.animation._value,
          borderRadius: Animated.divide(this.animation._value, 2),
          marginHorizontal: dotSpacing,
          backgroundColor: active ? color : inactiveColor,
          opacity: active ? 1 : inactiveOpacity
        }]}
      />
    );
  }
}

Dot.defaultProps = {
  color: '#000',
  inactiveOpacity: 0.4,
  size: 7,
  activeSize: 9,
  dotSpacing: 3,
  dotStyle: {}
};

Dot.propTypes = {
  active: PropTypes.bool.isRequired,
  color: colorPropType,
  inactiveColor: colorPropType,
  inactiveOpacity: PropTypes.number,
  size: PropTypes.number,
  activeSize: PropTypes.number,
  dotSpacing: PropTypes.number,
  dotStyle: ViewPropTypes.style
};

export default Dot;
