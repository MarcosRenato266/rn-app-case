import React from 'react';
import { StyleSheet, View } from 'react-native';

import colors from '../config/colors';
import { moderateScale } from '../config/scaling';

import LoginForm from './LoginForm';

export default class LoginFormWrapper extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <LoginForm />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  submitButton: {
    backgroundColor: colors.primary,
    justifyContent: 'center',
    marginVertical: 24,
    alignSelf: 'center',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    textAlign: 'center',
    alignSelf: 'center',
  },
  whiteText: {
    color: colors.secondary_text,
  },
  passwordRecoveryButton: {
    justifyContent: 'center',
    alignContent: 'center',
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  passwordRecoveryContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: moderateScale(14),
  },
  passwordRecoveryText: {
    color: colors.secondary_text,
    fontSize: moderateScale(15),
  },
});
