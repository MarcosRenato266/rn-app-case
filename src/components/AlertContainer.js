import React from 'react';
import { BackHandler, StyleSheet, Animated, Dimensions } from 'react-native';
import Alert from './Alert';

export default class AlertContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      fadeAnim: new Animated.Value(0),
    };
  }

  static alertInstance;

  static show({ ...config }) {
    if (this.alertInstance) this.alertInstance.showAlert({ config });
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  getButtonText(buttonText) {
    if (buttonText) {
      if (buttonText.trim().length === 0) {
        return undefined;
      } else return buttonText;
    }
    return undefined;
  }

  showAlert({ config }) {
    this.setState({
      modalVisible: true,
      title: config.title,
      message: config.message,
      buttonText: this.getButtonText(config.buttonText),
      onClose: config.onClose,
    });

    Animated.timing(this.state.fadeAnim, {
      toValue: 1,
      duration: 300,
    }).start();

    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  modalClosed() {
    this.setState({
      modalVisible: false,
    });
    const { onClose } = this.state;
    if (onClose && typeof onClose === 'function') {
      onClose();
    }
  }

  closeModal() {
    Animated.timing(this.state.fadeAnim, {
      toValue: 0,
      duration: 300,
    }).start(this.modalClosed.bind(this));
  }

  handleOnClose = () => {
    this.closeModal();
  };

  handleBackPress = () => {
    if (this.state.modalVisible) {
      this.closeModal();
      return true;
    }
    return false;
  };

  render() {
    const modalBg = this.state.fadeAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.5)'],
    });

    const alertBottom = this.state.fadeAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [Dimensions.get('window').height * 0.8, 0],
    });

    if (this.state.modalVisible) {
      return (
        <Animated.View
          style={[
            styles.container,
            {
              backgroundColor: modalBg,
            },
          ]}
        >
          <Alert
            style={{
              transform: [{ translateY: alertBottom }],
            }}
            title={this.state.title}
            message={this.state.message}
            buttonText={this.state.buttonText}
            onClose={this.handleOnClose}
          />
        </Animated.View>
      );
    }
    return null;
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
