import { View, StatusBar } from 'react-native';
import React from 'react';
import WaitingPartner from '../components/WaitingPartner';

export default class WaitingPartnerScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" />
        <WaitingPartner />
      </View>
    );
  }
}
