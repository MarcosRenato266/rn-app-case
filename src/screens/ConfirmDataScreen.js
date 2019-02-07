import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import colors from '../config/colors';
import { moderateScale } from '../config/scaling';

import ConfirmDataForm from '../components/ConfirmDataForm';
import EntryScreensWrapper from '../components/EntryScreensWrapper';

export default class LoginScreen extends React.Component {
  get ConfirmDataForm() {
    return <ConfirmDataForm />;
  }

  handleRegisterButtonOnPress = () => {
    this.props.navigation.navigate('EmailRegister');
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" />
        <EntryScreensWrapper
          style={styles.container}
          content={this.ConfirmDataForm}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 26,
  },
  registerContainerText: {
    color: colors.secondary_text,
  },
  registerButton: {
    textAlign: 'center',
    fontSize: moderateScale(12),
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButton: {
    justifyContent: 'center',
    width: moderateScale(210),
    marginBottom: moderateScale(15),
  },
  submitButtonText: {
    color: colors.button_text,
    fontSize: moderateScale(17),
    fontFamily: 'Rubik-Light',
  },
  buttonWrapper: {
    flex: 1,
    alignItems: 'center',
  },
  underline: {
    textDecorationLine: 'underline',
  },
});
