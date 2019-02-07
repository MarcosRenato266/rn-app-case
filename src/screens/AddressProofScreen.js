import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import PhotoUpload from '../components/PhotoUpload';

export default class AddressProof extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" />
        <PhotoUpload
          type="residence"
          navigationRoute="DataValidation"
          backRoute="AddressProof"
          modalStatus
          header="Foto do comprovante de residência"
          modalTitle="Foto do comprovante de residência"
          modalInfo="Fotografe seu comprovante de residência. Certifique-se de ter uma
          boa iluminação e nitidez."
          modalInfoTwo="Emitido há, no máximo, 90 dias"
          image="require('./src/assets/i/address.png')"
        />
      </View>
    );
  }
}
