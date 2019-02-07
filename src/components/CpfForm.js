import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  StatusBar,
} from 'react-native';
import { Text, Icon } from 'native-base';
import { withNavigation } from 'react-navigation';
import Modal from 'react-native-modal';
import CPF from 'gerador-validador-cpf';
import { BallIndicator } from 'react-native-indicators';
import { withApollo } from 'react-apollo';
import Button from '../components/Button';
import { cpfRegex } from '../utils/Mask';
import colors from '../config/colors';
import { moderateScale } from '../config/scaling';
import FormField from './FormField';
import ItemInput from './ItemInput';
import CpfError from './CpfError';
import {
  cpfHasAccount,
  registrationStep,
  stepByStep,
} from '../graphql/queries';
import { _storeData } from '../lib/AsyncStorage';

class CpfForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cpf: this.props.navigation.getParam('cpf') || '',
      visibleModal: false,
      errorCPF: false,
      saving: false,
      loading: false,
      step: null,
    };
  }

  step = () => {
    this.setState({
      loading: true,
    });
    return this.props.client
      .query({
        query: stepByStep,
        variables: { cpf: cpfRegex(this.state.cpf) },
      })
      .then(data => {
        this.setState({
          loading: data.loading,
          step: data.data.clientStepApp,
        });
      });
  };
  renderButton = (text, onPress) => (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text style={styles.modalText}>{text}</Text>
      </View>
    </TouchableOpacity>
  );

  renderModalContent = () => (
    <View style={styles.mainContainer}>
      <View
        style={{
          alignSelf: 'flex-end',
          flex: 0,
          marginTop: moderateScale(-20),
        }}
      >
        <TouchableWithoutFeedback
          onPress={() => this.setState({ visibleModal: null })}
        >
          <Icon
            type="FontAwesome"
            name="close"
            r
            color={colors.primary}
            style={{ color: colors.primary }}
          />
        </TouchableWithoutFeedback>
      </View>
      <View style={{ flex: 0, paddingHorizontal: moderateScale(10) }}>
        <View style={{ alignItems: 'center', padding: 20 }}>
          <Image
            source={require('../assets/i/cpfNotFound.png')}
            style={styles.shield}
          />
        </View>
        <Text style={styles.titleText}>Cadastro não encontrado</Text>
        <Text style={styles.infoText}>
          O Aplicativo não foi capaz de encontrar seu CPF em nossa base de dados
          como um cliente. Clique no botão abaixo para registrar-se.
        </Text>
      </View>
      {this.renderButton('Cadastrar-se', () => {
        this.props.navigation.navigate('PasswordScreen', {
          cpf: this.state.cpf,
        });
        this.setState({ visibleModal: null });
      })}
    </View>
  );

  onSaveCPF() {
    this.step();
    const { cpf } = this.state;
    if (CPF.validate(cpf)) {
      this.setState({ saving: true });
      //local storage
      _storeData('cpf', cpf);
      _storeData('first_open', '1');
      this.props.client
        .query({
          query: registrationStep,
        })
        .catch(error => console.log('error no registration', error));
      return this.props.client
        .query({
          query: cpfHasAccount,
          variables: { cpf: cpfRegex(this.state.cpf) },
        })
        .then(data => {
          this.setState({ saving: false });
          this.cpfHasAccountCheck(data);
        })
        .catch(error => {
          this.setState({ saving: false });
          console.log('Error aqui', error);
        });
    } else {
      this.setState({ errorCPF: true });
    }
  }

  cpfHasAccountCheck = data => {
    return data.data.cpfHasAccount
      ? this.props.navigation.navigate('Login', {
          cpf: this.state.cpf,
          oldCpf: true,
        })
      : this.props.navigation.navigate('PasswordScreen', {
          cpf: this.state.cpf,
        });
  };

  savingSpinner = () => {
    return <BallIndicator color={colors.primary} style={{ height: 50 }} />;
  };

  handleGoToLogin = () => {
    this.props.navigation.navigate('Login');
  };

  saveButton() {
    return (
      <View style={{ flex: 2, alignItems: 'center' }}>
        <Button
          primary
          style={styles.submitButton}
          onPress={() => this.onSaveCPF()}
        >
          <Text style={[styles.submitButtonText]} uppercase={false}>
            Acessar
          </Text>
        </Button>
        <View style={styles.credentialsWrapper}>
          <Text style={styles.credentialText}>Já é cadastrado na FIDUC?</Text>
          <TouchableOpacity onPress={() => this.handleGoToLogin()}>
            <Text style={styles.clickMe}> Clique Aqui e Faça Login!</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  render() {
    const { errorCPF, saving } = this.state;
    return (
      <View style={styles.keyboardAwareContainer}>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" />
        <Modal
          isVisible={this.state.visibleModal || false}
          animationIn="slideInLeft"
          animationOut="slideOutRight"
        >
          {this.renderModalContent()}
        </Modal>
        <View style={styles.logoContainer}>
          <Image source={require('../assets/i/logo.png')} style={styles.logo} />
        </View>
        <View style={styles.inputAndButton}>
          <View
            style={{
              flex: 1,
              height: Dimensions.get('window').height / 2 - 50,
              paddingHorizontal: 20,
            }}
          >
            <Text style={styles.title}>Digite o seu CPF</Text>
            <FormField style={styles.inputField}>
              <ItemInput
                maskType="cpf"
                keyboardType="numeric"
                returnKeyType="done"
                onChangeText={text => {
                  this.setState({ cpf: text, errorCPF: false });
                }}
                maxLength={14}
                initialValue={this.state.cpf}
                style={styles.inputField}
              />
            </FormField>
            {errorCPF && <CpfError />}
          </View>
          {!saving ? this.saveButton() : this.savingSpinner()}
        </View>
      </View>
    );
  }
}

export default withApollo(withNavigation(CpfForm));

const styles = StyleSheet.create({
  credentialsWrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: moderateScale(20),
  },
  credentialText: {
    fontFamily: 'Rubik-Light',
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
  },
  inputAndButton: {
    flex: 1,
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  keyboardAwareContainer: {
    backgroundColor: '#fff',
    flex: 1,
  },
  submitButton: {
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: moderateScale(20),
    marginBottom: moderateScale(20),
    width: '65%',
  },
  submitButtonText: {
    color: colors.button_text,
    fontFamily: 'Rubik-Light',
    fontSize: moderateScale(18),
  },
  title: {
    fontSize: moderateScale(20),
    fontFamily: 'Rubik-Light',
    color: colors.text,
    paddingBottom: moderateScale(10),
    textAlign: 'center',
    paddingVertical: 10,
  },
  whiteText: {
    color: colors.secondary_text,
  },
  container: {
    alignItems: 'center',
  },
  test: {
    flex: 1,
    marginBottom: moderateScale(135),
    alignItems: 'center',
  },
  inputField: {
    borderBottomColor: colors.primary,
    color: colors.primary,
    fontFamily: 'Rubik-Light',
    fontSize: moderateScale(25),
    textAlign: 'center',
  },
  exit: {
    fontSize: 15,
    fontFamily: 'Rubik-Light',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: moderateScale(50),
  },
  logo: {
    resizeMode: 'contain',
    width: moderateScale(200, 0.5),
    //height: moderateScale(100, 0.5),
    paddingHorizontal: moderateScale(10),
    //marginVertical: moderateScale(70, 0.5, true),
  },
  modalText: {
    color: 'white',
    fontFamily: 'Rubik-Light',
    fontSize: moderateScale(16),
  },
  modalWarning: {
    padding: 30,
    fontSize: 18,
    color: colors.secondary,
    fontFamily: 'Rubik-Light',
    textAlign: 'justify',
  },
  confirmWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    backgroundColor: '#ccc',
    color: '#a18037',
    borderColor: 'transparent',
  },
  confirmText: {
    marginLeft: moderateScale(15),
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
    width: Dimensions.get('window').width / 2,
    backgroundColor: '#977430',
    padding: 12,
    margin: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  errorCPF: {
    color: '#cc0000',
    paddingHorizontal: moderateScale(6),
    paddingVertical: moderateScale(6),
    fontSize: moderateScale(14),
    fontFamily: 'Rubik-Light',
  },
  mainContainer: {
    flex: 1.0,
    backgroundColor: '#ffffff',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: moderateScale(5),
    paddingVertical: moderateScale(5),
  },
  shield: {
    width: moderateScale(120),
    height: moderateScale(120),
    backgroundColor: '#fff',
  },
  titleText: {
    fontSize: moderateScale(20),
    textAlign: 'center',
    color: colors.secondary_text,
    fontFamily: 'Rubik-Medium',
    padding: 15,
  },
  infoText: {
    fontSize: moderateScale(16),
    paddingVertical: moderateScale(15),
    textAlign: 'center',
    color: colors.secondary_text,
    fontFamily: 'Rubik-Light',
  },
});
