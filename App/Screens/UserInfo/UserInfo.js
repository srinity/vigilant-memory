import React, { Component } from 'react';
import { View } from 'react-native';
import DatePicker from 'react-native-datepicker';
import { Actions } from 'react-native-router-flux';
import moment from 'moment';

import { Button, CustomInput, GenderSelection } from './../../Components';

import styles from './UserInfo.Styles';
import { Colors } from '../../Theme';

class UserInfo extends Component {
  onChangePasswordPress = () => {
    Actions.changePassword();
  }

  render() {
    const { userInfo = {} } = this.props;
    const { birthDate, phone, gender } = userInfo;
    const { firstName, lastName } = userInfo.fullName || {};

    const formatedBirthDate = moment(birthDate).format('DD/MM/YYYY');

    return (
      <View style={styles.containerStyle}>
        <View style={styles.infoInputsContainerStyle}>
          <View style={styles.nameContainerStyle}>
            <CustomInput containerStyle={styles.firstNameContainerStyle} value={firstName} editable={false} style={styles.inputStyle} />
            <CustomInput containerStyle={styles.lastNameContainerStyle} value={lastName} editable={false} style={styles.inputStyle} />
          </View>

          <CustomInput containerStyle={styles.inputContainerStyle} value={phone} editable={false} style={styles.inputStyle} />

          <DatePicker
            style={styles.datePickerContainerStyle}
            disabled
            showIcon={false}
            date={formatedBirthDate}
            mode='date'
            format='DD/MM/YYYY'
            customStyles={{
                dateInput: styles.datePickerStyle,
                disabled: styles.disabledDatePickerStyle
            }}
          />

          <GenderSelection
            containerStyle={styles.genderContainerStyle}
            maleText='user_info_screen_male_text'
            femaleText='user_info_screen_female_text'
            initialValue={gender}
            disabled
          />

          <Button
            title='user_info_screen_change_password_action'
            style={styles.changePasswordButtonStyle}
            onPress={this.onChangePasswordPress}
          />
        </View>
      </View>
    );
  }
}

export default UserInfo;
