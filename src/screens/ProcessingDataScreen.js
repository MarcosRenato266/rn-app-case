import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Spinner, StatusBar } from 'native-base';
import colors from '../config/colors';
import { moderateScale } from '../config/scaling';

import EntryScreensWrapper from '../components/EntryScreensWrapper';

export default class ProcessingDataScreen extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.navigate('DataValidation');
    }, 1200);
  }

  handleNextButtonPressed = () => {
    this.props.navigation.navigate('EmailRegister');
  };

  render() {
    return (
      <EntryScreensWrapper style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" />
        <View style={styles.registerContainer}>
          <Text style={styles.title}>
            Aguarde, estamos processando seus dados
          </Text>
          <Text style={styles.description}>
            Aguarde, estamos processando seus dados para um cadastro completo em
            nossos sistemas.
          </Text>
          <Spinner color="black" />
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
    fontSize: moderateScale(20),
    textAlign: 'center',
  },
  description: {
    color: colors.secondary_text,
    fontSize: moderateScale(16),
    textAlign: 'center',
    paddingVertical: moderateScale(10),
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
    color: colors.text,
    fontSize: 20,
    textAlign: 'center',
    alignSelf: 'center',
  },
  registerContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 26,
    marginHorizontal: 20,
  },
  registerContainerText: {
    color: colors.secondary_text,
  },
});
