import React, { Component } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { withNavigation } from 'react-navigation';
import { withApollo } from 'react-apollo';
import { moderateScale } from '../config/scaling';
import Button from './Button';
import colors from '../config/colors';

import { _getData } from '../lib/AsyncStorage';

class RecoverPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      test: '',
    };
  }
  testTest = () => {
    _getData('partner').then(res => this.setState({ test: res.value }));
  };
  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.logoContainer}>
          <Image source={require('../assets/i/logo.png')} style={styles.logo} />
        </View>
        <View>
          <Text style={styles.textTwo}>
            Agradecemos o{'\n'}
            seu interesse pela FIDUC {'\n'}e entraremos em contato em breve!
          </Text>
          <Text style={styles.text}>
            Será um prazer conversarmos sobre nosso Modelo, 
            os Serviços Financeiros e as Soluções que podemos 
            oferecer para sua Saúde Financeira e da sua família.
            {'\n'}
            Caso tenha qualquer dúvida ou para obter mais 
            informações, por favor nos escreva por meio do 
            contato@fiduc.com.br ou entre em contato no (11) 4118-2310.
          </Text>
          <Text style={styles.textFooter}>
            Saudações,{'\n'}
            <Text style={styles.textTwo}>FIDUC</Text> - Planejamento Financeiro Fiduciário
          </Text>
        </View>
        <View style={styles.buttonView}>
          <View style={styles.actionsContainer}>
            <Button primary style={styles.button} onPress={this.testTest}>
              <Text style={styles.buttonText}>Aguardando...</Text>
            </Button>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: moderateScale(20),
    fontFamily: 'Rubik-Medium',
    color: colors.text,
    textAlign: 'center',
    marginBottom: moderateScale(25),
  },
  textFooter:{
    fontFamily: 'Rubik-Light',
    paddingBottom: moderateScale(40),
    fontSize: moderateScale(16),
    color: 'grey',
  },
  actionsContainer: {
    width: '65%',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  getBackSurvey: {
    fontSize: moderateScale(17),
    fontFamily: 'Rubik-Light',
    color: colors.text,
    textAlign: 'center',
    marginBottom: moderateScale(25),
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: moderateScale(50),
    paddingVertical: moderateScale(5),
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: moderateScale(25),
  },
  logo: {
    resizeMode: 'contain',
    width: moderateScale(200, 0.5),
    paddingHorizontal: moderateScale(10),
  },
  text: {
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Rubik-Light',
    paddingBottom: moderateScale(40),
    fontSize: moderateScale(16),
    color: 'grey',
    textAlign: 'center',
  },
  textTwo: {
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Rubik-Medium',
    paddingBottom: moderateScale(40),
    fontSize: moderateScale(18),
    color: 'grey',
    textAlign: 'center',
  },
  inputField: {
    textAlign: 'center',
    fontSize: moderateScale(16),
    fontFamily: 'Rubik-Light',
  },
  button: {
    width: '100%',
    borderRadius: 20,
    marginTop: moderateScale(50),
    marginBottom: moderateScale(20),
  },
  buttonText: {
    fontSize: moderateScale(18),
    fontFamily: 'Rubik-Light',
    color: '#fff',
  },
  buttonView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: moderateScale(16),
  },
});

export default withApollo(withNavigation(RecoverPassword));
