import React, { Component } from 'react';
import { BackHandler } from 'react-native';
import AppRoot from './src';
import './src/reactotron/ReactotronConfig';

export default class App extends Component {
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressed);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.onBackButtonPressed
    );
  }

  onBackButtonPressed() {
    return true;
  }

  render() {
    return <AppRoot />;
  }
}
