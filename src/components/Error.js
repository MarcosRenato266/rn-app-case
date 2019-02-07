import React from 'react';
import { View } from 'react-native';
import { Text, Icon } from 'native-base';
import colors from '../config/colors';

const ErrorComponent = props => {
  if (props.date) {
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
            // marginRight: 10,
          }}
        >
          Dia, mês ou ano inválido
        </Text>
      </View>
    );
  }
};

export default ErrorComponent;
