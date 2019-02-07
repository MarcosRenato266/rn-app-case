import React from 'react';
import { View, StatusBar } from 'react-native';
import AssociateForm from '../components/AssociateForm';

export default class AssociateFormScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" />
        <AssociateForm />
      </View>
    );
  }
}
