import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Dimensions } from 'react-native';

import Swiper from 'react-native-swiper';
import colors from '../config/colors';
import { moderateScale } from '../config/scaling';

export default class WelcomeScreenSwiper extends Component {
  render() {
    return (
      <Swiper
        style={styles.wrapper}
        showsButtons={false}
        loop={false}
        height={Dimensions.get('window').height}
        activeDotColor={colors.primary}
      >
        <View style={styles.slide}>
          <Text style={styles.title}>Autenticação e Segurança</Text>
          <Text style={styles.description}>
            Crie um padrão de autenticação para ser usado como verificação de
            alto nível em casos de transações financeiras e outros procedimentos
            que requeiram autenticação.
          </Text>
        </View>
        <View style={styles.slide}>
          <Text style={styles.text}>Beautiful</Text>
        </View>
        <View style={styles.slide}>
          <Text style={styles.text}>Apenas o</Text>
        </View>
        <View style={styles.slide}>
          <Text style={styles.text}>Quarto passo</Text>
          <Text style={styles.description}>
            Lorem ipsum dolor sit amet, consectetur
            daowdaowkdoawkopdawdkwaidjajwd
          </Text>
        </View>
      </Swiper>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: colors.text,
    fontSize: moderateScale(22),
    fontWeight: 'bold',
  },
  title: {
    color: colors.text,
    fontSize: moderateScale(20),
    textAlign: 'center',
    fontFamily: 'Rubik-Regular',
    padding: 20,
  },
  description: {
    color: colors.secondary_text,
    fontSize: moderateScale(14),
    textAlign: 'center',
  },
});

AppRegistry.registerComponent('myproject', () => WelcomeScreenSwiper);
