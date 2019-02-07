import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';
import { withNavigation } from 'react-navigation';
import Button from './Button';
import colors from '../config/colors';
import { moderateScale } from '../config/scaling';

class SecurityStepsScreenSwiper extends Component {
  render() {
    return (
      <View style={{ flex: 1, paddingHorizontal: 10, backgroundColor: '#fff' }}>
        <View style={styles.logoContainer}>
          <Image source={require('../assets/i/logo.png')} style={styles.logo} />
        </View>
        <View style={{ flex: 1 }}>
          <View>
            <Text style={styles.title}>Autenticação e Segurança</Text>
            <Text style={styles.question}>
              Crie um padrão de autenticação para ser usado como verificação de
              alto nível em casos de transações financeiras e outros
              procedimentos que requiram autenticação.
            </Text>
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
      </View>
    );
  }
}

export default withNavigation(SecurityStepsScreenSwiper);

const styles = StyleSheet.create({
  logoContainer: {
    height: moderateScale(130),
    marginBottom: moderateScale(20),
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  logo: {
    resizeMode: 'contain',
    width: moderateScale(200, 0.5),
    paddingHorizontal: moderateScale(10),
    alignSelf: 'center',
  },
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButton: {
    fontSize: moderateScale(14),
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: moderateScale(8),
  },
  proceedButton: {
    justifyContent: 'center',
    marginTop: moderateScale(50),
    alignSelf: 'center',
    width: '65%',
  },
  proceedButtonText: {
    color: colors.button_text,
    fontFamily: 'Rubik-Light',
    fontSize: moderateScale(18),
  },
  buttonText: {
    fontSize: 50,
    color: colors.primary,
    fontFamily: 'Arial',
  },
  slide: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: moderateScale(20),
  },
  slideTitle: {
    flex: 0.5,
    alignContent: 'center',
    justifyContent: 'center',
  },
  text: {
    color: colors.text,
    fontSize: moderateScale(22),
    fontFamily: 'Rubik-Light',
    marginTop: 30,
    marginBottom: moderateScale(6),
    textAlign: 'center',
  },
  description: {
    color: colors.secondary_text,
    fontSize: moderateScale(17),
    fontFamily: 'Rubik-Light',
    textAlign: 'center',
    marginTop: moderateScale(15),
  },
  pagination: {
    marginBottom: moderateScale(150),
  },
  backButton: {
    fontFamily: 'Rubik-Light',
    color: colors.text,
    marginTop: moderateScale(20),
  },
  slideOptions: {
    flex: 0,
    width: '100%',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  button: {
    width: Dimensions.get('window').width / 2,
    backgroundColor: '#977430',
    padding: 12,
    margin: 16,
    alignItems: 'center',
    borderRadius: 20,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalText: {
    color: 'white',
    fontFamily: 'Rubik-Light',
    fontSize: moderateScale(18),
  },
  modalWarning: {
    marginHorizontal: 2,
    padding: 20,
    fontSize: 14,
    color: colors.secondary_text,
    fontFamily: 'Rubik-Light',
    textAlign: 'center',
  },
  modalWarningSub: {
    marginBottom: 30,
    fontSize: 18,
    color: colors.secondary,
    fontFamily: 'Rubik-Light',
    textAlign: 'center',
  },
  confirmWrapper: {
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkbox: {
    backgroundColor: '#ccc',
    color: '#a18037',
    borderColor: 'transparent',
  },
  confirmText: {
    marginLeft: moderateScale(15),
  },
  mainContainer: {
    flex: 0,
    backgroundColor: '#fff',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 26,
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 2,
  },
  shield: {
    width: 150,
    height: 150,
  },
  titleText: {
    fontSize: moderateScale(25),
    textAlign: 'center',
    color: colors.secondary_text,
    fontFamily: 'Rubik-Medium',
  },
  infoText: {
    fontSize: moderateScale(15),
    paddingVertical: moderateScale(15),
    textAlign: 'center',
    color: colors.secondary_text,
    fontFamily: 'Rubik-Light',
  },
  question: {
    color: colors.secondary_text,
    fontSize: moderateScale(20),
    fontFamily: 'Rubik-light',
    textAlign: 'center',
  },
  title: {
    color: colors.text,
    fontSize: moderateScale(24),
    marginBottom: moderateScale(15),
    textAlign: 'center',
    fontFamily: 'Rubik-Regular',
  },
});
