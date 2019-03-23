import React from 'react';
import { ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import memoize from 'memoize-one';
import AntIcon from 'react-native-vector-icons/AntDesign';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FoundationIcon from 'react-native-vector-icons/Foundation';
import Ionicon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import OctIcon from 'react-native-vector-icons/Octicons';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import ZocialIcon from 'react-native-vector-icons/Zocial';

import IconTypes, { iconTypesValues } from './IconTypes';

import { colorPropType } from './../../Utils/PropTypesValidators';

const determineProperIconTag = (iconType) => {
  switch (iconType) {
    case IconTypes.material:
      return MaterialIcon;
    case IconTypes.ant:
      return AntIcon;
    case IconTypes.entypo:
      return EntypoIcon;
    case IconTypes.evil:
      return EvilIcon;
    case IconTypes.feather:
      return FeatherIcon;
    case IconTypes.fontAwesome:
      return FontAwesomeIcon;
    case IconTypes.foundation:
      return FoundationIcon;
    case IconTypes.ion:
      return Ionicon;
    case IconTypes.materialCommunity:
      return MaterialCommunityIcon;
    case IconTypes.oct:
      return OctIcon;
    case IconTypes.simpleLine:
      return SimpleLineIcon;
    case IconTypes.zocial:
      return ZocialIcon;
    default:
      return MaterialIcon;
  }
};

const determineProperIconTagMemoized = memoize(determineProperIconTag);

const icon = ({ type, name, color, size, style, ...props }) => {
  const Icon = determineProperIconTagMemoized(type);

  return (
    <Icon name={name} color={color} size={size} style={style} {...props} />
  );
};

icon.defaultProps = {
  type: IconTypes.material,
  color: '#000000',
  size: 25,
  style: {}
};

icon.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf([...iconTypesValues]),
  size: PropTypes.number,
  color: colorPropType,
  style: ViewPropTypes.style
};

export default icon;
