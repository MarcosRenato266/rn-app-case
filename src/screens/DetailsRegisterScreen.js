import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'native-base';
import colors from '../config/colors';
import { moderateScale } from '../config/scaling';

import TextButton from '../components/TextButton';
import DetailsRegisterForm from '../components/DetailsRegisterForm';
import EntryScreensWrapper from '../components/EntryScreensWrapper';

export default class DetailsRegisterScreen extends React.Component {
  get registerForm() {
    return <DetailsRegisterForm />;
  }

  handleLoginButtonOnPress = () => {
    this.props.navigation.goBack();
  };

  render() {
    return (
      <EntryScreensWrapper style={styles.container} content={this.registerForm}>
        <View style={styles.formShadow} />

        <View style={styles.loginContainer}>
          <Text style={styles.loginContainerText}>Já é cadastrado?</Text>
          <TextButton
            color={colors.text}
            text="Volte para o Login"
            onPress={() => this.handleLoginButtonOnPress()}
          />
        </View>
      </EntryScreensWrapper>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formShadow: {
    backgroundColor: colors.secondaryCardBackground,
    height: moderateScale(12, 0.5, true),
    width: '80%',
    alignSelf: 'center',
    borderBottomRightRadius: 12,
    borderBottomLeftRadius: 12,
  },
  loginContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 26,
  },
  loginContainerText: {
    color: colors.secondary_text,
  },
});
