import React from 'react';
import { StyleSheet, View, BackHandler, StatusBar } from 'react-native';
import { Text } from 'native-base';
import colors from '../config/colors';
import { moderateScale } from '../config/scaling';

import EntryScreensWrapper from '../components/EntryScreensWrapper';
import Button from '../components/Button';

export default class SelectAssociateScreen extends React.Component {
  handleNextButtonPressed = () => {
    this.props.navigation.navigate('EmailRegister');
  };

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => {
    this.props.navigation.navigate('Home');
    return true;
  };

  render() {
    const associateName = this.props.navigation
      .getParam('associateName')
      .split(/(\s).+\s/)
      .join('');
    return (
      <EntryScreensWrapper style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" />
        <View style={styles.registerContainer}>
          <View style={styles.associatedInfo}>
            <Text style={styles.associated}> O SÓCIO</Text>
            <View style={styles.associatedAndStateView}>
              <Text style={styles.associatedName}>{associateName}</Text>
            </View>
            <Text style={styles.title}>Foi Selecionado</Text>
          </View>
          <View />
          <View>
            <Text style={styles.description}>
              Iremos notificá-lo que seu cadastro foi iniciado. Enquanto isso,
              continue com o passo a passo.
            </Text>
          </View>
          <Button
            standard
            primary
            style={styles.proceedButton}
            onPress={() =>
              this.props.navigation.navigate('Welcome', {
                clientId: this.props.navigation.getParam('clientId'),
              })
            }
          >
            <Text uppercase={false} style={styles.proceedButtonText}>
              Prosseguir
            </Text>
          </Button>

          {/* BOTAO VOLTAR */}

          {/* <Button
            standard
            primary
            style={styles.proceedButton}
            onPress={() => this.props.navigation.navigate('SelectAssociate')}
          >
            <Text uppercase={false} style={styles.proceedButtonText}>
              Voltar
            </Text>
          </Button> */}

          {/* FIM BOTAO VOLTAR */}
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
    fontFamily: 'Rubik-light',
  },
  subtitle: {
    color: colors.secondary,
    fontSize: moderateScale(16),
    textAlign: 'center',
    fontFamily: 'Rubik-Light',
  },
  description: {
    color: colors.secondary_text,
    fontSize: moderateScale(15),
    textAlign: 'center',
    marginTop: 20,
    paddingVertical: moderateScale(5),
    fontFamily: 'Rubik-Light',
  },
  subDescription: {
    color: colors.secondary_text,
    fontSize: moderateScale(15),
    textAlign: 'center',
    marginTop: 5,
    fontFamily: 'Rubik-Light',
  },
  proceedButton: {
    justifyContent: 'center',
    marginTop: moderateScale(30),
    marginBottom: moderateScale(50),
    alignSelf: 'center',
    width: '65%',
  },
  proceedButtonText: {
    color: colors.button_text,
    fontFamily: 'Rubik-Light',
    fontSize: moderateScale(18),
  },
  registerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  registerContainerText: {
    color: colors.secondary_text,
  },
  pictureContainer: {
    backgroundColor: 'red',
    width: moderateScale(120),
    height: moderateScale(120),
    borderRadius: 1200,
  },
  associated: {
    color: colors.secondary_text,
    paddingVertical: moderateScale(5),
    fontSize: moderateScale(16),
    fontFamily: 'Rubik-Regular',
  },
  associatedName: {
    color: colors.text,
    fontSize: moderateScale(29),
    fontFamily: 'Rubik-Medium',
    paddingHorizontal: 8,
  },
  thumbnailStyle: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  thumbnailContainer: {
    shadowColor: '#999',
    shadowOffset: { width: 3, height: 2 },
    shadowOpacity: 2.0,
  },
  stateStyle: {
    fontSize: 16,
    fontFamily: 'Rubik-Regular',
    color: colors.secondary_text,
  },
  associatedInfo: {
    alignItems: 'center',
    marginVertical: 20,
  },
  associatedAndStateView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
