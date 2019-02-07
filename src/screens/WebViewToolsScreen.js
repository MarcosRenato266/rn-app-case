import React from 'react';
import { View, StatusBar } from 'react-native';
import WebViewTools from '../components/WebViewTools';

export default class WebViewToolsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" />
        <WebViewTools />
      </View>
    );
  }
}
