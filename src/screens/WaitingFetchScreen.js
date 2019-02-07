import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { Text } from 'native-base';
import { BallIndicator } from 'react-native-indicators';
import colors from '../config/colors';
import { moderateScale } from '../config/scaling';

import EntryScreensWrapper from '../components/EntryScreensWrapper';

export default class WaitingFetchScreen extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.navigate('DataValidation');
    }, 3500);
  }

  render() {
    return (
      <EntryScreensWrapper style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" />
        <View style={styles.registerContainer}>
          <Text style={styles.title}>
            Aguarde, estamos processando seus dados
          </Text>
          <Text style={styles.description}>
            Estamos enviando seus dados para um cadastro completo e nossos
            sistemas.
          </Text>
          <BallIndicator color={colors.primary} />
        </View>
      </EntryScreensWrapper>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: colors.text,
    fontSize: moderateScale(22),
    textAlign: 'center',
    fontFamily: 'Rubik-Regular',
    padding: 20,
  },
  description: {
    color: colors.secondary_text,
    fontSize: moderateScale(18),
    textAlign: 'center',
    paddingVertical: moderateScale(50),
    fontFamily: 'Rubik-Light',
  },
  proceedButton: {
    height: moderateScale(54),
    borderRadius: 0,
    justifyContent: 'center',
    marginVertical: 24,
    paddingHorizontal: 48,
    alignSelf: 'center',
  },
  proceedButtonText: {
    color: colors.button_text,
    fontSize: moderateScale(14),
    textAlign: 'center',
    alignSelf: 'center',
  },
  registerContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 26,
    marginHorizontal: 20,
  },
  registerContainerText: {
    color: colors.secondary_text,
  },
  spinner: {
    alignSelf: 'center',
    width: moderateScale(45),
    height: moderateScale(45),
  },
});
