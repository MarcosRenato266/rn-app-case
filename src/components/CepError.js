import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'native-base';
import { moderateScale } from '../config/scaling';

const CepError = props => {
  return <Text style={styles.errorCPF}>CEP inválido!</Text>;
};

export default CepError;

const styles = StyleSheet.create({
  errorCPF: {
    color: '#cc0000',
    paddingHorizontal: moderateScale(12),
    paddingVertical: moderateScale(6),
    fontSize: moderateScale(16),
    fontFamily: 'Rubik-Light',
  },
});
