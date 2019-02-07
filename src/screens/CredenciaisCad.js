import React from 'react';
import { View, StatusBar } from 'react-native';
import CredenciaisCad from '../components/CredenciaisCad';

export default class LoginScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" />
        <CredenciaisCad />
      </View>
    );
  }
}
