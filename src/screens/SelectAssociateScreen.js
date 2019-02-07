import React from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import { moderateScale } from '../config/scaling';

import AssociateForm from '../components/AssociateForm';
import EntryScreensWrapper from '../components/EntryScreensWrapper';

export default class SelectAssociateScreen extends React.Component {
  get associateForm() {
    return (
      <AssociateForm clientId={this.props.navigation.getParam('clientId')} />
    );
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
      </EntryScreensWrapper>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  receiveIndicationText: {
    fontSize: moderateScale(14),
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  registerContainerText: {
    fontSize: moderateScale(14),
  },
  receive_indication: {
    textAlign: 'center',
  },
  textOne: {
    fontSize: moderateScale(14),
    fontFamily: 'Rubik-Regular',
    color: 'grey',
  },
  textTwo: {
    fontSize: moderateScale(14),
    fontFamily: 'Rubik-Regular',
    textDecorationLine: 'underline',
    color: 'grey',
  },
});
