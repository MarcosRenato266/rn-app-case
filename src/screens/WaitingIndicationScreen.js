import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { Text } from 'native-base';
import colors from '../config/colors';
import { moderateScale } from '../config/scaling';

import EntryScreensWrapper from '../components/EntryScreensWrapper';
import Button from '../components/Button';

export default class WaitingIndicationScreen extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      //this.props.navigation.navigate('AssociatedAccepted');
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
            Agradecemos o seu interesse pela FIDUC e entraremos em contato em breve!
          </Text>
          <Text style={styles.description}>
            Será um prazer conversarmos sobre nosso Modelo, os Serviços Financeiros e as Soluções que podemos oferecer para sua Saúde Financeira e da sua família.~{"\n"}
            Caso tenha qualquer dúvida ou para obter mais informações, por favor nos escreva por meio do contato@fiduc.com.br ou entre em contato no (11) 4118-2310.
          </Text>
          <Button
            primary
            style={styles.proceedButton}
            //loading={true}
            //loadingIconColor={colors.button_text}
          >
            <Text style={styles.proceedButtonText} uppercase={false}>
              Aguardando...
            </Text>
          </Button>
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
    fontFamily: 'Rubik-Light',
    paddingHorizontal: moderateScale(25),
    marginBottom: moderateScale(50),
  },
  description: {
    color: colors.secondary_text,
    fontFamily: 'Rubik-Light',
    fontSize: moderateScale(15),
    textAlign: 'center',
    paddingHorizontal: moderateScale(15),
    marginBottom: moderateScale(20),
  },
  proceedButton: {
    justifyContent: 'center',
    width: moderateScale(180),
    marginVertical: 24,
    alignSelf: 'center',
  },
  proceedButtonText: {
    color: colors.button_text,
    fontFamily: 'Rubik-Light',
    fontSize: moderateScale(14),
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
    fontFamily: 'Rubik-Light',
  },
});
