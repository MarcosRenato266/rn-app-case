import React from 'react';
import { View, StatusBar } from 'react-native';
import SurveyForm from '../components/SurveyForm';

export default class SurveyScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" />
        <SurveyForm />
      </View>
    );
  }
}
