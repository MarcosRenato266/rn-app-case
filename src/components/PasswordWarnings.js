import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { moderateScale } from '../config/scaling';

const PasswordWarning = props => {
  const { passwordDidntMatch, passwordLenght } = props;
  return (
    <View>
      {passwordDidntMatch && (
        <Text style={styles.errorCPF}>
          Atenção: A senha precisa ser identica em ambos os campos
        </Text>
      )}
      {passwordLenght && (
        <Text style={styles.errorCPF}>
          Atenção: Sua senha deve conter no mínimo 6 caracteres e ao menos uma
          letra.
        </Text>
      )}
    </View>
  );
};

export default PasswordWarning;

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
