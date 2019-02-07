import { View, StatusBar } from 'react-native';
import React from 'react';
import TaxInformation from '../components/taxInformation';

export default class taxInformation extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" />
        <TaxInformation />
      </View>
    );
  }
}
