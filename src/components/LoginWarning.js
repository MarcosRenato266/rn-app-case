import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { moderateScale } from '../config/scaling';

const LoginWarning = props => {
  const { userNotRegistered, cpfPasswordInvalid } = props;
  return (
    <View>
      {userNotRegistered && (
        <Text style={styles.errorCPF}>
          Atenção: CPF não encontrado na base de dados
        </Text>
      )}
      {cpfPasswordInvalid && (
        <Text style={styles.errorCPF}>Atenção: CPF ou senha inválidos.</Text>
      )}
    </View>
  );
};

export default LoginWarning;

const styles = StyleSheet.create({
  errorCPF: {
    color: '#cc0000',
    paddingHorizontal: moderateScale(12),
    paddingVertical: moderateScale(6),
    fontSize: moderateScale(10),
    textAlign: 'center',
    fontFamily: 'Rubik-Light',
  },
});
