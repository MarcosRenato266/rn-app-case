import React from 'react';
import { StyleSheet, View, Image, StatusBar } from 'react-native';
import { Text } from 'native-base';
import colors from '../config/colors';
import { moderateScale } from '../config/scaling';

import Button from '../components/Button';

export default class ApprovedRegistrationScreen extends React.Component {
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
          Tudo certo!
          {'\n'}
          Seu cadastro foi aprovado
        </Text>
        <Text style={styles.infoText}>
          Lorem ipsum dolor sit amet, consectetur adispiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Text>
        <Button style={styles.continueButton} primary>
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
    fontFamily: 'Rubik-Medium',
    padding: 15,
  },
  infoText: {
    fontSize: moderateScale(16),
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
