import React, { Component } from 'react';
import Modal from 'react-native-modal';

export default class ModalErro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cpf: '',
      visibleModal: false,
      errorCPF: false,
      saving: false,
      loading: false,
      step: null,
    };
  }
  render() {
    return (
      <Modal
        isVisible={this.state.visibleModal || false}
        animationIn="slideInLeft"
        animationOut="slideOutRight"
      >
        {this.renderModalContent()}
      </Modal>
    );
  }
}
