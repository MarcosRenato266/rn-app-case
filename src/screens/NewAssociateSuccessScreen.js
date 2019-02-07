import React, { Component } from 'react';
import { Label, Button, Text, StatusBar } from 'native-base';
import { StyleSheet } from 'react-native';
import { moderateScale } from '../config/scaling';
import colors from '../config/colors';
import EntryScreensWrapper from '../components/EntryScreensWrapper';

export default class NewAssociateSucessScreen extends Component {
  render() {
    return (
      <EntryScreensWrapper style={{ flex: 1 }}>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" />
        <Label style={title}>Obrigado pelo Envio!</Label>
        <Label style={subtitle}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.
        </Label>
        <Button
          rounded
          primary
          style={submitButton}
          onPress={() => {
            this.props.navigation.navigate('AssociatedLoginScreen');
          }}
        >
          <Text style={submitButtonText} uppercase={false}>
            Prosseguir
          </Text>
        </Button>
      </EntryScreensWrapper>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  logo: {
    resizeMode: 'contain',
    width: moderateScale(200, 0.5),
    paddingHorizontal: moderateScale(10),
  },
  title: {
    color: '#a9872f',
    fontSize: moderateScale(25),
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    color: colors.text,
    fontSize: moderateScale(16),
    textAlign: 'justify',
    margin: 20,
  },
  submitButton: {
    backgroundColor: '#a18037',
    height: moderateScale(40),
    borderRadius: 30,
    justifyContent: 'center',
    marginTop: moderateScale(50),
    paddingHorizontal: 48,
    alignSelf: 'center',
  },
  submitButtonText: {
    color: colors.button_text,
    fontSize: moderateScale(18),
    textAlign: 'center',
    alignSelf: 'center',
  },
});

const { title, subtitle, submitButton, submitButtonText } = styles;
