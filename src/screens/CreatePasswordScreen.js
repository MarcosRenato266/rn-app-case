import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { Text, Input, Form, Item, Label } from 'native-base';
import { withFormik } from 'formik';
import { withNavigation } from 'react-navigation';
import yup from 'yup';
import { withApollo, graphql, compose } from 'react-apollo';
import Modal from 'react-native-modal';
import axios from 'axios';
import _ from 'lodash';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { BallIndicator } from 'react-native-indicators';
import Button from '../components/Button';
import { cpfRegex } from '../utils/Mask';

import colors from '../config/colors';
import { moderateScale } from '../config/scaling';

import AlertContainer from '../components/AlertContainer';

import { REGISTER_USER, USER_CLIENT } from '../graphql/mutations';
import { signUp } from '../lib/config';
import deviceStorage from '../service/deviceStorage';
import { TOKEN_KEY } from '../utils/Constants';
import PasswordWarning from '../components/PasswordWarnings';
import AppContext from '../components/AppContext';

const enhancer = withFormik({
  validationSchema: yup.object().shape({
    cpf: yup
      .string()
      .cpf('CPF inválido')
      .required('Este campo é obrigatório'),
  }),
  mapPropsToValues: props => ({
    cpf: '',
  }),
  handleSubmit: (values, { props: { client, navigation }, setSubmitting }) => {
    const { cpf } = values;
    navigation.navigate('Login');
    navigation.navigate('AssociateSelected');
    if (!cpf) {
      AlertContainer.show({
        message: 'CPF inválido',
        buttonText: 'Tentar novamente',
      });
      setSubmitting(false);
    }
  },
});

class CreatePasswordScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      confirmPassword: '',
      visibleModal: null,
      key: '',
      clientId: '',
      saving: false,
      passwordDidntMatch: false,
      passwordWeak: true,
      passwordLenght: true,
      passwordWarning: true,
      borderBottomColor: colors.secondary_text,
      borderBottomWidth: 2,
    };
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
      <Text style={styles.modalWarning}> Senhas não conferem! </Text>
      {this.renderButton('Ok, entendi!', () => {
        this.setState({
          visibleModal: false,
        });
      })}
    </View>
  );

  login() {
    const { password } = this.state;
    const { getParam, navigate } = this.props.navigation;
    this.setState({ saving: true });
    axios
      .post(signUp, {
        password,
        cpf: cpfRegex(getParam('cpf')),
      })
      .then(response => {
        const { token } = response.data;

        deviceStorage.saveItem(TOKEN_KEY, token);
        this.setState({ jwt: token });

        this.props.client
          .mutate({
            mutation: USER_CLIENT,
          })
          .then(data => {
            this.setState({
              clientId: data.data.createClient.id,
              saving: false,
            });
            navigate('SelectAssociate', { clientId: this.state.clientId });
          })
          .catch(error => {
            this.setState({ saving: false });
            console.log(error);
          });
      });
  }

  checkPassword = () => {
    const { password, confirmPassword } = this.state;
    if(password === confirmPassword){
        this.login()
    }else{
      this.setState({
        passwordDidntMatch: true,
        password: '',
        confirmPassword: '',
      })
    }
  };

  saveButton() {
    return (
      <View style={{ flex: 2, alignItems: 'center' }}>
        <Button
          primary
          style={styles.submitButton}
          onPress={() => this.checkPassword()}
        >
          <Text style={[styles.submitButtonText]} uppercase={false}>
            Cadastre-se
          </Text>
        </Button>
      </View>
    );
  }

  validatePassword = password => {
    const regex = /[\D]/g;
    console.log('testando regex', regex.test(password));
    this.setState({
      passwordLenght: _.size(password) < 6,
      passwordWeak: !regex.test(password),
      password,
      borderBottomColor: colors.primary,
    });
  };

  savingSpinner = () => {
    return (
      <View
        style={{
          marginTop: moderateScale(50),
          marginBottom: moderateScale(20),
          alignItems: 'center',
        }}
      >
        <BallIndicator color={colors.primary} style={{ height: 50 }} />
      </View>
    );
  };

  render() {
    const { setFieldTouched } = this.props;
    const {
      saving,
      passwordDidntMatch,
      passwordWeak,
      passwordLenght,
    } = this.state;

    return (
      <KeyboardAwareScrollView style={styles.keyboardAwareContainer}>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" />
        <AppContext.Provider
          value={{
            clientId: this.state.clientId,
          }}
        >
          <Modal
            isVisible={this.state.visibleModal}
            animationIn="slideInLeft"
            animationOut="slideOutRight"
          >
            {this.renderModalContent()}
          </Modal>
          <View style={styles.logoContainer}>
            <Image
              source={require('../assets/i/logo.png')}
              style={styles.logo}
            />
          </View>
          <View style={styles.newPasswordContainer}>
            {passwordDidntMatch || passwordWeak || passwordLenght ? (
              <View style={styles.erroAreaPassword}>
                <PasswordWarning
                  passwordDidntMatch={passwordDidntMatch}
                  passwordLenght={passwordLenght}
                  passwordWeak={passwordWeak}
                />
              </View>
            ) : null}
            <Form style={styles.formStylePassword}>
              <Item stackedLabel style={styles.itemFormPassword}>
                <Label>Senha</Label>
                <Input
                  style={[
                    styles.passwordField,
                    {
                      borderBottomColor: this.state.borderBottomColor,
                      borderBottomWidth: this.state.borderBottomWidth,
                    },
                  ]}
                  onSubmitEditing={() => this._confirmPassword._root.focus()}
                  blurOnSubmit={false}
                  returnKeyType="done"
                  containerStyle={{ marginTop: 12 }}
                  secureTextEntry
                  onChangeText={password => {
                    this.validatePassword(password);
                  }}
                  onBlur={() => setFieldTouched('password')}
                  value={this.state.password}
                />
              </Item>
              <Item stackedLabel style={styles.itemFormPassword}>
                <Label>Confirmar Senha</Label>
                <Input
                  style={[
                    styles.passwordField,
                    {
                      borderBottomColor: this.state.borderBottomColor,
                      borderBottomWidth: this.state.borderBottomWidth,
                    },
                  ]}
                  ref={c => (this._confirmPassword = c)}
                  containerStyle={{ marginTop: 12 }}
                  returnKeyType="done"
                  secureTextEntry
                  onChangeText={confirmPassword => {
                    this.setState({
                      confirmPassword,
                      borderBottomColor: colors.primary,
                    });
                  }}
                  value={this.state.confirmPassword}
                  key={this.state.key}
                />
              </Item>
            </Form>
          </View>
          {!saving ? this.saveButton() : this.savingSpinner()}
        </AppContext.Provider>
      </KeyboardAwareScrollView>
    );
  }
}

export default compose(
  withApollo,
  graphql(REGISTER_USER, { name: 'registerUser' })
)(withNavigation(enhancer(CreatePasswordScreen)));

const styles = StyleSheet.create({
  itemFormPassword: {
    marginRight: moderateScale(12),
  },
  newPasswordContainer: {
    paddingHorizontal: moderateScale(20),
  },
  formStylePassword: {
    flex: 1,
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  submitButton: {
    justifyContent: 'center',
    marginTop: moderateScale(50),
    marginBottom: moderateScale(20),
    alignSelf: 'center',
    width: '65%',
  },
  submitButtonText: {
    color: colors.button_text,
    fontFamily: 'Rubik-Light',
    fontSize: moderateScale(18),
  },
  title: {
    fontSize: moderateScale(18),
    fontFamily: 'Rubik-Light',
    color: colors.secondary_text,
    paddingBottom: moderateScale(10),
    textAlign: 'center',
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
    fontSize: moderateScale(25),
    fontFamily: 'Rubik-Light',
  },
  passwordField: {
    color: colors.primary,
    fontFamily: 'Rubik-Light',
    fontSize: moderateScale(16),
    textAlign: 'left',
    width: '100%',
    alignSelf: 'center',
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
    fontFamily: 'Rubik-Regular',
    fontSize: 17,
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
    backgroundColor: '#977430',
    padding: 12,
    margin: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  erroAreaPassword: {
    backgroundColor: 'rgba(0,0,0,0.03)',
    borderColor: 'rgba(0,0,0,0.1)',
    textAlign: 'center',
    borderWidth: 1,
    borderRadius: 3,
    paddingHorizontal: moderateScale(10),
  },
});
