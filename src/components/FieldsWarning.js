import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { moderateScale } from '../config/scaling';

const FieldsWarning = props => {
  return (
    <View>
      {props.invalidField && (
        <Text style={styles.errorCPF}>Campo Inválido</Text>
      )}
      {!props.invalidField && (
        <Text style={styles.errorCPF}>Campo Obrigatório</Text>
      )}
    </View>
  );
};

export default FieldsWarning;

const styles = StyleSheet.create({
  errorCPF: {
    color: '#cc0000',
    paddingHorizontal: moderateScale(12),
    paddingVertical: moderateScale(6),
    fontSize: moderateScale(16),
    fontFamily: 'Rubik-Light',
  },
});
