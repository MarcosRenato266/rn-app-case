import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import colors from '../config/colors';
import { moderateScale } from '../config/scaling';

import TextButton from '../components/TextButton';
import NewAssociateQuizForm from '../components/NewAssociateQuizForm';
import EntryScreensWrapper from '../components/EntryScreensWrapper';

export default class NewAssociateQuizScreen extends React.Component {
  get associateForm() {
    return <NewAssociateQuizForm />;
  }

  handleNextButtonPressed = () => {
    this.props.navigation.navigate('EmailRegister');
  };

  render() {
    return (
      <EntryScreensWrapper
        style={styles.container}
        content={this.associateForm}
      >
        <StatusBar barStyle="dark-content" backgroundColor="transparent" />
        <View style={styles.registerContainer}>
          <TextButton
            color={colors.text}
            onPress={() => this.props.navigation.navigate('Survey')}
            textStyle={styles.registerContainerText}
            style={styles.receive_indication}
          />
        </View>
      </EntryScreensWrapper>
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
  },
  registerContainerText: {
    fontSize: moderateScale(10),
    paddingHorizontal: 48,
  },
  receive_indication: {
    textAlign: 'center',
  },
});
