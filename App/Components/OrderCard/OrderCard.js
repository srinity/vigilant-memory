import React from 'react';
import { View, Text, Image, TouchableNativeFeedback, TouchableWithoutFeedback, Platform, ViewPropTypes, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import I18n from 'react-native-i18n';
import memoize from 'memoize-one';

import Card from './../Card/Card';
import LocalizedText from './../LocalizedText/LocalizedText';
import Tag from './../Tag/Tag';

import OrderStatusEnum from './../../Utils/OrderStatus';

import { Colors } from '../../Theme';

import styles from './OrderCard.Styles';

const TouchableComponent = Platform.OS === 'ios' ?
  TouchableWithoutFeedback : TouchableNativeFeedback;

function getOrderStatusStyle(status) {
  const stylesArr = [styles.tagStyle];

  if (status === OrderStatusEnum.PENDING) {
    stylesArr.push({ backgroundColor: Colors.warningColorHexCode });
  } else if (status === OrderStatusEnum.DELIVERED || status === OrderStatusEnum.ACCEPTED) {
    stylesArr.push({ backgroundColor: Colors.successColorHexCode });
  } else {
    stylesArr.push({ backgroundColor: '#aaaaaa' });
  }

  return StyleSheet.flatten(stylesArr);
}

const getOrderStatusStyleMemoized = memoize(getOrderStatusStyle);


const OrderCard = ({
  title,
  image,
  time,
  cost,
  status,
  onPress,
  containerStyle,
}) => {
  return (
    <TouchableComponent onPress={onPress}>
        <Card style={[styles.containerStyle, containerStyle]}>
          <Image source={image} style={styles.imageStyle} />

          <View style={styles.infoContainerStyle}>
            <View style={styles.topTextContainerStyle}>
              <Text style={styles.titleTextStyle} numberOfLines={1}>{title}</Text>
              <Text style={styles.textStyle} numberOfLines={1}>{time}</Text>
            </View>

            <View style={styles.middleTextContainerStyle}>
              <LocalizedText numberOfLines={1} style={styles.textStyle} localizationOptions={{ cost }}>orders_screen_order_cost_text</LocalizedText>
            </View>

            <View style={styles.bottomTextContainerStyle}>
              <Tag
                title={I18n.t(`orders_screen_order_status_${status}_text`)}
                isActive
                activeStyle={getOrderStatusStyleMemoized(status)}
                textStyle={styles.textStyle}
              />
              <Tag
                title={I18n.t('orders_screen_order_details_text')}
                isActive
                style={styles.tagStyle}
                textStyle={styles.textStyle}
              />
            </View>
          </View>
        </Card>
      </TouchableComponent>
  );
};

OrderCard.defaultProps = {
  status: OrderStatusEnum.PENDING
};

OrderCard.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  cost: PropTypes.number.isRequired,
  status: PropTypes.oneOf(Object.values(OrderStatusEnum)).isRequired,
  onPress: PropTypes.func.isRequired,
  containerStyle: ViewPropTypes.style,
};

export default OrderCard;
