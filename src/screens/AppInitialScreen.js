import React from 'react';
import { View, StatusBar } from 'react-native';
import LoadingApp from '../components/LoadingApp';

export default class AppInitialPage extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" />
        <LoadingApp />
      </View>
    );
  }
}
