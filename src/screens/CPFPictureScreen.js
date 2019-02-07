import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import PhotoUpload from '../components/PhotoUpload';

export default class CpfPictureScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" />
        <PhotoUpload
          type="cpf"
          navigationRoute="RgPicture"
          backRoute="CpfPicture"
          header="Foto do CPF"
          modalStatus
          modalTitle="Foto do CPF"
          modalInfo="Fotografe seu CPF. Certifique-se de ter uma
      boa iluminação e nitidez e de ficar o mais próximo e enquadrado possível."
          image="cpf"
        />
      </View>
    );
  }
}
