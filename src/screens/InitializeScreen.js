import React from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import { Container, Spinner } from 'native-base';
import colors from '../config/colors';
import Auth from '../lib/auth';

export default class InitializeScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {
    const userToken = await Auth.getToken();

    if (!userToken) {
      // If the token does not exist then move the user to the
      // Auth stack
      return this.props.navigation.navigate('Auth');
    }

    // Check if the token is still valid
    const tokenValid = await Auth.tokenIsValid(userToken);
    if (!tokenValid) {
      // If not, logout and move the user to the Auth stack
      await Auth.logout().then(() => this.props.navigation.navigate('Auth'));
    } else {
      // Token valid, go to the continue as screen
      this.props.navigation.navigate('ContinueAs');
    }
  };

  render() {
    return (
      <Container style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" />
        <Spinner color={colors.primary} />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
});
