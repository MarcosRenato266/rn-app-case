import React from 'react';
import { StyleSheet, View, TouchableOpacity, StatusBar } from 'react-native';
import { Text } from 'native-base';
import Modal from 'react-native-modal';
import colors from '../config/colors';
import { moderateScale } from '../config/scaling';
import LoginForm from '../components/LoginForm';
import EntryScreensWrapper from '../components/EntryScreensWrapper';

export default class LoginScreen extends React.Component {
  state = {
    visibleModal: null,
  };

  get loginForm() {
    return <LoginForm />;
  }

  renderButton = (text, onPress) => (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text style={styles.modalText}>{text}</Text>
      </View>
    </TouchableOpacity>
  );

  renderModalContent = () => (
    <View style={styles.modalContent}>
      <Text>Obrigado por usar nosso App, até breve!</Text>
      {this.renderButton('Close', () => this.setState({ visibleModal: null }))}
    </View>
  );

  handleRegisterButtonOnPress = () => {
    this.props.navigation.navigate('CredenciaisCad');
  };

  _toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });

  render() {
    return (
      <EntryScreensWrapper style={styles.container} content={this.loginForm}>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" />
        <Modal
          isVisible={this.state.visibleModal === 2}
          animationIn="slideInLeft"
          animationOut="slideOutRight"
        >
          {this.renderModalContent()}
        </Modal>
        <View style={styles.registerContainer}>
          <View style={styles.credentialsWrapper}>
            <Text style={styles.credentialText}>
              Ainda não criou suas credenciais de acesso?
            </Text>
            <TouchableOpacity
              onPress={() => this.handleRegisterButtonOnPress()}
            >
              <Text style={styles.clickMe}> Clique Aqui!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </EntryScreensWrapper>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 26,
  },
  registerContainerText: {
    color: colors.secondary_text,
  },
  registerButton: {
    textAlign: 'center',
    fontSize: moderateScale(14),
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Rubik-Light',
    paddingVertical: 20,
  },

  submitButton: {
    marginTop: moderateScale(15),
    alignSelf: 'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    color: colors.button_text,
    fontFamily: 'Rubik-Light',
    fontSize: moderateScale(18),
  },
  buttonWrapper: {
    flex: 1,
    alignItems: 'center',
  },
  underline: {
    textDecorationLine: 'underline',
  },
  credentialsWrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  credentialText: {
    fontFamily: 'Rubik-Light',
    marginTop: moderateScale(15),
    color: colors.secondary,
    fontSize: moderateScale(13),
    textAlign: 'center',
    paddingVertical: moderateScale(5),
  },
  clickMe: {
    fontFamily: 'Rubik-Light',
    color: colors.secondary,
    fontSize: moderateScale(13),
    textDecorationLine: 'underline',
    marginBottom: moderateScale(20),
  },
  exit: {
    fontFamily: 'Rubik-Light',
    color: colors.secondary,
    fontSize: moderateScale(16),
    paddingTop: moderateScale(40),
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  button: {
    backgroundColor: '#977430',
    padding: 12,
    margin: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalText: {
    color: 'white',
    fontFamily: 'Rubik-Regular',
    fontSize: 17,
  },
});
