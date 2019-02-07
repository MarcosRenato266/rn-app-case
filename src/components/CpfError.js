import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Icon } from 'native-base';
import { moderateScale } from '../config/scaling';
import colors from '../config/colors';

const CpfError = props => {
  if (props.cpfRepeated) {
    return (
      <View
        style={{
          marginTop: 5,
          marginBottom: 5,
          flexDirection: 'row',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Icon
          type="FontAwesome"
          name="exclamation-triangle"
          style={{ color: colors.warning, marginRight: 2 }}
          size={5}
        />
        <Text
          style={{
            fontSize: 13.5,
            fontFamily: 'Rubik-Light',
            color: colors.warning,
            marginLeft: 7,
          }}
        >
          CPF em uso pelo usuário
        </Text>
      </View>
    );
  } else if (props.invalidCnpj) {
    return <Text style={styles.errorCPF}>CNPJ Inválido</Text>;
  } else {
    return <Text style={styles.errorCPF}>CPF Inválido</Text>;
  }
};

export default CpfError;

const styles = StyleSheet.create({
  errorCPF: {
    color: '#cc0000',
    paddingHorizontal: moderateScale(12),
    paddingVertical: moderateScale(6),
    fontSize: moderateScale(16),
    fontFamily: 'Rubik-Light',
  },
});
