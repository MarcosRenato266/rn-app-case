import { View, StatusBar } from 'react-native';
import React from 'react';
import PoliticallyExposed from '../components/politicallyExposed';

export default class politicallyExposed extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" />
        <PoliticallyExposed />
      </View>
    );
  }
}
