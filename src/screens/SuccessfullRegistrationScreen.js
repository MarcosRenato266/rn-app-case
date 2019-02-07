import React from 'react';
import { StyleSheet, View, Image, StatusBar } from 'react-native';
import { Text } from 'native-base';
import colors from '../config/colors';
import { moderateScale } from '../config/scaling';

import Button from '../components/Button';

export default class SuccessfullRegistrationScreen extends React.Component {
  handleRegisterButtonOnPress = () => {
    this.props.navigation.navigate('EmailRegister');
  };

  render() {
    return (
      <View style={styles.mainContainer}>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" />
        <View style={styles.shieldWrapper}>
          <Image
            source={require('../assets/i/success.png')}
            style={styles.shield}
          />
        </View>
        <Text style={styles.titleText}>
          Cadastro efetuado
          {'\n'}
          com sucesso!
        </Text>
        <Text style={styles.infoText}>
          Seu cadastro foi realizado e enviado para nossa equipe com sucesso.
          Agora iremos processar e analisar as informações. Você receberá uma
          notificação assim que o processo for concluído.
        </Text>
        <Button
          style={styles.continueButton}
          primary
          onPress={() => this.props.navigation.navigate('Login')}
        >
          <Text uppercase={false} style={styles.textButton}>
            Continuar
          </Text>
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 26,
  },
  shieldWrapper: {
    resizeMode: 'contain',
    alignItems: 'center',
    marginTop: moderateScale(60),
  },
  shield: {
    width: moderateScale(150),
    height: moderateScale(150),
    resizeMode: 'contain',
  },
  titleText: {
    fontSize: moderateScale(20),
    paddingHorizontal: moderateScale(15),
    marginTop: moderateScale(15),
    textAlign: 'center',
    color: colors.text,
    fontFamily: 'Rubik-Regular',
    padding: 15,
  },
  infoText: {
    fontSize: moderateScale(14),
    paddingHorizontal: moderateScale(15),
    paddingVertical: moderateScale(15),
    textAlign: 'center',
    color: colors.secondary_text,
    fontFamily: 'Rubik-Regular',
  },
  continueButton: {
    alignSelf: 'center',
    marginTop: moderateScale(60),
    width: moderateScale(150),
  },
  textButton: {
    fontSize: moderateScale(20),
    fontFamily: 'Rubik-Light',
  },
});
