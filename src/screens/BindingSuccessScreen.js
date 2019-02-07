import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { Text, Thumbnail } from 'native-base';
import colors from '../config/colors';
import { moderateScale } from '../config/scaling';

import EntryScreensWrapper from '../components/EntryScreensWrapper';
import Button from '../components/Button';

export default class SelectAssociateScreen extends React.Component {
  handleNextButtonPressed = () => {
    this.props.navigation.navigate('EmailRegister');
  };

  render() {
    return (
      <EntryScreensWrapper style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" />
        <View style={styles.registerContainer}>
          <View style={styles.thumbnailContainer}>
            <Thumbnail
              style={styles.thumbnailStyle}
              source={require('../assets/i/bussinesswoman.jpg')}
            />
          </View>
          <View style={styles.associatedInfo}>
            <Text style={styles.associated}>SÓCIO</Text>
            <View style={styles.associatedAndStateView}>
              <Text style={styles.associatedName}>Julia Awakes</Text>
              <Text style={styles.stateStyle}>RJ</Text>
            </View>
          </View>
          <Text style={styles.title}>
            Sócio Vinculado a sua
            {'\n'}
            conta com sucesso!
          </Text>
          <Text style={styles.description}>
            Continue seu cadastro para conhecer
            {'\n'}
            seu sócio gestor e saber mais sobre
            {'\n'}
            como funciona o aplicativo.
          </Text>
          <Button
            primary
            standard
            style={styles.proceedButton}
            onPress={() => this.props.navigation.navigate('Welcome')}
          >
            <Text uppercase={false} style={styles.proceedButtonText}>
              Prosseguir
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
    color: colors.secondary_text,
    fontSize: moderateScale(20),
    textAlign: 'center',
    fontFamily: 'Rubik-Regular',
  },
  description: {
    color: colors.secondary_text,
    fontSize: moderateScale(17),
    textAlign: 'center',
    paddingVertical: moderateScale(20),
    fontFamily: 'Rubik-Light',
  },
  proceedButton: {
    justifyContent: 'center',
    marginVertical: 24,
    alignSelf: 'center',
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
    marginTop: -40,
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
    fontSize: moderateScale(19),
    fontFamily: 'Rubik-Regular',
  },
  associatedName: {
    color: colors.text,
    fontSize: moderateScale(35),
    fontFamily: 'Rubik-Medium',
    padding: 8,
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
