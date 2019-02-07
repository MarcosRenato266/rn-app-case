import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import PhotoUpload from '../components/PhotoUpload';

export default class RgPicture extends Component {
  render() {
    console.log(this.props);
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" />
        <PhotoUpload
          type="document"
          navigationRoute="AddressProof"
          backRoute="RgPicture"
          header="Foto do RG"
          modalStatus
          modalTitle="Documento de Identificação"
          modalInfo="Retire o plástico e abra o documento para tirar uma foto única."
          modalInfoTwo="São aceitos: RG, CNH e RNE"
          image="id"
        />
      </View>
    );
  }
}
