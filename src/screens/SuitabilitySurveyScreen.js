import React from 'react';
import { View, StatusBar } from 'react-native';
import SuitabilitySurveyForm from '../components/SuitabilitySurveyForm';

export default class SuitabilitySurveyScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" />
        <SuitabilitySurveyForm />
      </View>
    );
  }
}
