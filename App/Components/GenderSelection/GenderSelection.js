import React, { Component } from 'react';
import { View, TouchableWithoutFeedback, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import { isFunction as _isFunction } from 'lodash';

import { Icon, IconTypes } from './../Icon';
import LocalizedText from './../LocalizedText/LocalizedText';

import { Colors } from '../../Theme';

import styles from './GenderSelection.Styles';

export const GenderEnum = {
  Male: 'M',
  Female: 'F'
};

class GenderSelection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.initialValue
    };
  }

  onChange = (value) => {
    const { onChange } = this.props;

    this.setState({ value });

    if (_isFunction(onChange)) {
      onChange(value);
    }
  }

  render() {
    const { maleText, femaleText, containerStyle, disabled } = this.props;
    const { value } = this.state;

    const isMale = value === GenderEnum.Male;
    const isFemale = value === GenderEnum.Female;

    const maleIconType = isMale ? IconTypes.ant : IconTypes.entypo;
    const maleIconName = isMale ? 'checkcircle' : 'circle';

    const femaleIconType = isFemale ? IconTypes.ant : IconTypes.entypo;
    const femaleIconName = isFemale ? 'checkcircle' : 'circle';

    return (
      <View style={[styles.containerStyle, containerStyle]}>
        <TouchableWithoutFeedback onPress={() => this.onChange(GenderEnum.Male)} disabled={disabled}>
          <View style={styles.optionContainerStyle}>
            <Icon type={maleIconType} name={maleIconName} color={Colors.brandColorHexCode} size={24} />
            <LocalizedText style={styles.optionTextStyle}>{maleText}</LocalizedText>
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={() => this.onChange(GenderEnum.Female)} disabled={disabled}>
          <View style={styles.optionContainerStyle}>
            <Icon type={femaleIconType} name={femaleIconName} color={Colors.brandColorHexCode} size={24} />
            <LocalizedText style={styles.optionTextStyle}>{femaleText}</LocalizedText>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

GenderSelection.defaultProps = {
  initialValue: undefined,
  disabled: false
};

GenderSelection.propTypes = {
  initialValue: PropTypes.oneOf(Object.values(GenderEnum)),
  onChange: PropTypes.func,
  maleText: PropTypes.string,
  femaleText: PropTypes.string,
  containerStyle: ViewPropTypes.style,
  disabled: PropTypes.bool
};

export default GenderSelection;
