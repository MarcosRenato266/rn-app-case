import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import colors from '../config/colors';
import { moderateScale } from '../config/scaling';

import SecurityQuestionForm from '../components/SecurityQuestionForm';
import EntryScreensWrapper from '../components/EntryScreensWrapper';

export default class SecurityQuestionScreen extends React.Component {
  get SecurityQuestionForm() {
    return <SecurityQuestionForm />;
  }

  handleNextButtonPressed = () => {
    this.props.navigation.navigate('SuitabilitySurvey');
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" />
        <EntryScreensWrapper
          style={styles.container}
          content={this.SecurityQuestionForm}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  registerContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: moderateScale(60),
  },
  registerContainerText: {
    fontSize: moderateScale(10),
    paddingHorizontal: 48,
  },
  receive_indication: {
    textAlign: 'center',
  },
  continueButton: {
    width: moderateScale(250),
  },
  textButton: {
    fontSize: moderateScale(20),
    fontFamily: 'Rubik-Light',
    color: colors.button_text,
  },
});
