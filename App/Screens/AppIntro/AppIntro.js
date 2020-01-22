import React, { Component } from 'react';
import { SafeAreaView, TouchableWithoutFeedback, View, Image } from 'react-native';
import I18n from 'react-native-i18n';

import { Pagination, LocalizedText, Button } from './../../Components';

import { Images, Colors } from './../../Theme';

import styles from './AppIntro.Styles';

class AppIntro extends Component {
  constructor(props) {
    super(props);

    this.introSteps = [
      {
        image: Images.logo,
        title: 'app_intro_screen_intro_one_title_text',
        description: 'app_intro_screen_intro_one_description_text'
      },
      {
        image: Images.demoImage,
        title: 'app_intro_screen_intro_two_title_text',
        description: 'app_intro_screen_intro_two_description_text'
      },
      {
        image: Images.demoImage,
        title: 'app_intro_screen_intro_three_title_text',
        description: 'app_intro_screen_intro_three_description_text'
      },
      {
        image: Images.demoImage,
        title: 'app_intro_screen_intro_four_title_text',
        description: 'app_intro_screen_intro_four_description_text'
      }
    ];

    this.state = {
      activeIndex: 0,
      started: false
    };
  }

  onPreviousPress = () => {
    const { activeIndex } = this.state;
    const newActiveIndex = activeIndex - 1;
    this.setState({ activeIndex: newActiveIndex, started: newActiveIndex !== 0 });
  }

  onNextPress = () => {
    const { activeIndex } = this.state;
    this.setState({ activeIndex: activeIndex + 1, started: true });
  }

  onFinishPress = () => {
    const { complete } = this.props;
    complete();
  }

  onSkipPress = () => {
    const { skip } = this.props;
    skip();
  }

  renderStartOrFinishButton = (started, activeIndex) => {
    if (started && activeIndex !== this.introSteps.length - 1) {
      return null;
    }

    let onPress = this.onNextPress;
    let title = I18n.t('app_intro_screen_start_action_text');

    if (activeIndex === this.introSteps.length - 1) {
      onPress = this.onFinishPress;
      title = I18n.t('app_intro_screen_finish_action_text');
    }

    return (
      <Button
        title={title}
        onPress={onPress}
        style={styles.primaryButtonStyle}
      />
    );
  }

  renderNextAnPreviousButton = (started, activeIndex) => {
    if (!started || activeIndex === this.introSteps.length - 1) {
      return null;
    }

    return (
      <View style={styles.buttonContainerStyle}>
        <Button
          title={I18n.t('app_intro_screen_previous_action_text')}
          onPress={this.onPreviousPress}
          style={styles.previousButtonStyle}
          textStyle={styles.previousButtonTextStyle}
        />

      <Button
        title={I18n.t('app_intro_screen_next_action_text')}
        onPress={this.onNextPress}
        style={styles.nextButtonStyle}
      />
      </View>
    );
  }

  render() {
    const { activeIndex, started } = this.state;
    const currentCard = this.introSteps[activeIndex];

    return (
      <SafeAreaView style={styles.containerStyle}>
        <TouchableWithoutFeedback onPress={this.onSkipPress}>
          <View style={styles.skipButtonContainerStyle}>
            <LocalizedText>app_intro_screen_skip_action_text</LocalizedText>
          </View>
        </TouchableWithoutFeedback>

        <View style={styles.imageContainerStyle}>
          <Image
            source={currentCard.image}
            style={styles.imageStyle}
            resizeMode='contain'
          />
        </View>

        <View style={styles.textContainerStyle}>
          <LocalizedText style={styles.titleTextStyle}>{currentCard.title}</LocalizedText>
          <LocalizedText style={styles.descriptionTextStyle}>{currentCard.description}</LocalizedText>
        </View>

        <Pagination
          activeDotIndex={activeIndex}
          numberOfDots={this.introSteps.length}
          containerStyle={styles.paginationStyle}
          color={Colors.brandColorHexCode}
          inactiveColor={Colors.whiteColorHexCode}
          size={12}
          activeSize={12}
          inactiveOpacity={1}
          dotStyle={styles.dotStyle}
        />

        {this.renderStartOrFinishButton(started, activeIndex)}
        {this.renderNextAnPreviousButton(started, activeIndex)}
      </SafeAreaView>
    );
  }
}

export default AppIntro;
