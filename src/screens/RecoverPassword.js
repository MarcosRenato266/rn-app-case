import React from 'react';
import { View, StatusBar } from 'react-native';
import RecoverPasswordCompoment from '../components/RecoverPassword';

export default class RecoverPassword extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" />
        <RecoverPasswordCompoment />
      </View>
    );
  }
}
