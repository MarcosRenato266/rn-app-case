import React, { Component } from 'react';
import { View, Image, StatusBar } from 'react-native';
import PhotoUpload from '../components/PhotoUpload';

export default class SignatureScreen extends Component {
  render() {
    const confirmChecked = this.props.navigation.getParam('confirmChecked');
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" />
        <PhotoUpload
          type="signature"
          navigationRoute={confirmChecked ? 'RgPicture' : 'CpfPicture'}
          backRoute="SignaturePicture"
          header="Foto da assinatura"
          modalStatus
          modalTitle="Assinatura"
          modalInfo="Faça sua assinatura em um papel branco usando somente caneta de tinta preta ou azul"
          clientId={this.props.navigation.getParam('clientId')}
          image={
            <Image
              source={require('../assets/i/signature.png')}
              style={{ width: 160, height: 160 }}
            />
          }
        />
      </View>
    );
  }
}
