import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'native-base';
import colors from '../config/colors';
import { moderateScale } from '../config/scaling';

import AuthenticationScreenSwiper from '../components/AuthenticationStepScreenSwiper';
import EntryScreensWrapper from '../components/EntryScreensWrapper';
import Button from '../components/Button';

export default class AuthenticationStepScreenSwiper extends React.Component {
  handleNextButtonPressed = () => {
    this.props.navigation.navigate('EmailRegister');
  };

  render() {
    return (
      <EntryScreensWrapper style={styles.container}>
        <View style={styles.registerContainer}>
          <View style={styles.swiper}>
            <AuthenticationScreenSwiper />

            <Button
              primary
              style={styles.proceedButton}
              onPress={() => this.props.navigation.navigate('RegisterPattern')}
            >
              <Text style={[styles.proceedButtonText]} uppercase={false}>
                Cadastrar Padrão
              </Text>
            </Button>
          </View>
        </View>
      </EntryScreensWrapper>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  swiper: {
    marginHorizontal: 0,
    width: '100%',
    height: moderateScale(350),
    justifyContent: 'center',
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
    justifyContent: 'center',
    marginVertical: 24,
    alignSelf: 'center',
    width: '70%',
  },
  proceedButtonText: {
    color: colors.button_text,
    fontFamily: 'Rubik-Light',
    fontSize: moderateScale(18),
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
  textButton: {
    fontSize: moderateScale(14),
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
