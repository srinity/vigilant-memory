import React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';
import I18n from 'react-native-i18n';

import styles from './LocalizedText.Styles';

const LocalizedText = ({
  children,
  localize,
  localizationOptions,
  ...props
}) => {
  return (
    <Text {...props}>{localize ? I18n.t(children, localizationOptions) : children}</Text>
  );
}

LocalizedText.defaultProps = {
  localize: true
};

LocalizedText.propTypes = {
  localize: PropTypes.bool,
  children: PropTypes.string.isRequired,
  localizationOptions: PropTypes.object
};

export default LocalizedText;
