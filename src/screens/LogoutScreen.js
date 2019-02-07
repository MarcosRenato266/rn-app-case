import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Spinner } from 'native-base';
import Auth from '../lib/auth';
import colors from '../config/colors';

export default class LogoutScreen extends React.Component {
  componentDidMount() {
    Auth.logout().then(() =>
      setTimeout(() => {
        this.props.navigation.navigate('Initialize');
      }, 1)
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Spinner color={colors.primary} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
