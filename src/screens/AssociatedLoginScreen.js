import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import colors from '../config/colors';

import TextButton from '../components/TextButton';
import AssociatedLoginFormWrapper from '../components/AssociatedLoginFormWrapper';
import EntryScreensWrapper from '../components/EntryScreensWrapper';

export default class AssociatedLoginScreen extends React.Component {
  get loginForm() {
    return <AssociatedLoginFormWrapper />;
  }

  handleRegisterButtonOnPress = () => {
    this.props.navigation.navigate('EmailRegister');
  };

  render() {
    return (
      <EntryScreensWrapper style={styles.container} content={this.loginForm}>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" />
        <View style={styles.registerContainer}>
          <TextButton
            color={colors.text}
            text={`Ainda não é sócio Fiduc? ${'\n'} Queremos te conhecer`}
            onPress={() =>
              this.props.navigation.navigate('NewAssociateQuizScreen')
            }
            style={styles.registerButton}
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
  registerContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    //alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 26,
  },
  registerContainerText: {
    color: colors.secondary_text,
  },
  registerButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
