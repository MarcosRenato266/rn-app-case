import { View, StatusBar } from 'react-native';
import React from 'react';
import CpfForm from '../components/CpfForm';

export default class LoginScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" />
        <CpfForm />
      </View>
    );
  }
}
