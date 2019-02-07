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
        <View style={{ alignItems: 'center', padding: 20 }}>
          <Image
            source={require('../assets/i/wrong.png')}
            style={styles.shield}
          />
        </View>
        <Text style={styles.titleText}>
          Ops! Algo deu errado
          {'\n'}
          Por favor verifique seu cadastro.
        </Text>
        <Text style={styles.infoText}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud.
        </Text>
        <Button style={styles.continueButton} primary>
          <Text uppercase={false} style={styles.textButton}>
            Corrigir
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
    //alignItems: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 26,
  },
  shield: {
    width: 180,
    height: 180,
  },
  titleText: {
    fontSize: moderateScale(18),
    textAlign: 'center',
    color: colors.text,
    fontFamily: 'Rubik-Medium',
    padding: 15,
  },
  infoText: {
    fontSize: moderateScale(16),
    paddingVertical: moderateScale(15),
    textAlign: 'justify',
    color: colors.secondary_text,
    fontFamily: 'Rubik-Regular',
  },
  continueButton: {
    marginTop: moderateScale(60),
  },
  textButton: {
    fontSize: moderateScale(20),
    fontFamily: 'Rubik-Light',
  },
});
