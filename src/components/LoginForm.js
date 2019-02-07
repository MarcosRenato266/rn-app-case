import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Input, Form, Item, Label } from 'native-base';
import { withNavigation } from 'react-navigation';
import { withFormik } from 'formik';
import { withApollo } from 'react-apollo';
import { cpfRegex } from '../utils/Mask';
import yup from '../lib/yup';
import Auth from '../lib/auth';
import colors from '../config/colors';
import { moderateScale } from '../config/scaling';
import FormField from './FormField';
import Button from './Button';
import TextButton from './TextButton';
import LoginWarning from './LoginWarning';
import { _getData } from '../lib/AsyncStorage';
import { stepByStep, cpfHasAccount } from '../graphql/queries';

const enhancer = withFormik({
  validationSchema: yup.object().shape({
    // CPFField: yup.string().required('O nome é obrigatório'),    DANDO ERRO NA VALIDAÇÃO CONCERTAR DPS
  }),
  handleSubmit: (values, { props: { client, navigation }, setSubmitting }) => {
    const { CPFField, password } = values;

    if (!CPFField || !password) {
      console.log('usuario invalido', CPFField, 'senha', password);
      setSubmitting(false);
    }
  },
});

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cpf: '',
      password: '',
      errorCPF: false,
      alreadyUpdateCPFValidation: false,
      step: '',
      borderBottomColor: colors.secondary_text,
      borderBottomWidth: 0.2,
      userNotRegistered: false,
      cpfPasswordInvalid: false,
      renderPartner: '',
    };
    this.reRender = this.props.navigation.addListener('willFocus', () => {
      this.setState({ alreadyUpdateCPFValidation: true }, () => {
        _getData('cpf').then(res => {
          this.setState({ cpf: res.value.toString() });
        });
      });
    });
  }
  handleBackPress = () => {
    this.goBack(); // works best when the goBack is async
    return true;
  };
  returnStep = () => {
    this.setState(
      {
        loading: true,
      },
      () => {
        return this.props.client
          .query({
            query: stepByStep,
            variables: { cpf: cpfRegex(this.state.cpf) },
          })
          .then(data => {
            console.log('### stepp parado ###', data.data.clientStepApp);
            this.setState(
              {
                loading: data.loading,
                step: data.data.clientStepApp,
              },
              () => {
                switch (this.state.step) {
                  case 1:
                    this.props.navigation.navigate('PasswordScreen');
                    console.log('PasswordScreen');
                    break;
                  case 2:
                    if (this.state.renderPartner === 'waiting') {
                      this.props.navigation.navigate('WaitingPartner');
                      console.log('WaitingPartner');
                    } else {
                      this.props.navigation.navigate('SelectAssociate');
                      console.log('SelectAssociate');
                    }
                    break;
                  case 3:
                    this.props.navigation.navigate('Welcome');
                    console.log('3');
                    break;
                  case 4:
                    this.props.navigation.navigate('DataValidation');
                    console.log('4');
                    break;
                  case 5:
                    this.props.navigation.navigate('PoliticallyExposed', {
                      userData: '',
                    });
                    console.log('5');
                    break;
                  case 6:
                    this.props.navigation.navigate('TaxInformation', {
                      userData: '',
                    });
                    console.log('6');
                    break;
                  case 7:
                    this.props.navigation.navigate('SecuritySteps');
                    console.log('7');
                    break;
                  case 8:
                    this.props.navigation.navigate('SecurityQuestion');
                    console.log('8');
                    break;
                  case 9:
                    this.props.navigation.navigate('WebViewTools');
                    console.log('9');
                    break;
                  default:
                    this.props.navigation.navigate('WebViewTools');
                }
              }
            );
          })
          .catch(error => {
            this.props.navigation.navigate('WebViewTools');
          });
      }
    );
  };
  openRecoverPassword = () => {
    return this.props.navigation.navigate('RecoverPassword', {
      cpf: this.state.cpf,
    });
  };

  cpfMark = x => {
    this.setState({
      cpf: x.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4'),
    });
  };

  componentWillMount = () => {
    _getData('partner').then(res =>
      this.setState({ renderPartner: res.value })
    );
  };

  // componentDidMount() {
  //   const { cpf } = this.state;
  //   if (cpf !== undefined) {
  //     return this.returnStep();
  //   }
  // }

  handleLogin = () => {
    return this.props.client
      .query({
        query: cpfHasAccount,
        variables: { cpf: cpfRegex(this.state.cpf) },
      })
      .then(data => {
        this.setState({ saving: false });
        if (data.data.cpfHasAccount) {
          Auth.loginRequest(this.state.cpf, this.state.password)
            .then(res => {
              if (!res || !res.data || !res.data.token) {
                console.log('Erro Interno');
                return;
              }

              const { token } = res.data;
              const { step } = this.state;
              const { navigate } = this.props.navigation;

              Auth.login(token, this.props.client).then(() => {
                this.returnStep();
              });
            })
            .catch(error => {
              console.log('error on login request', error);
              const { response } = error;
              if (response) {
                const { status } = response;
                // let message = 'Erro interno';
                if (status === 400) {
                  // message = 'Dados inválidos';
                  this.setState({
                    cpfPasswordInvalid: true,
                  });
                }
                if (status === 401) {
                  // message = 'CPF ou senha inválidos';
                  this.setState({
                    cpfPasswordInvalid: true,
                  });
                }
              } else {
                // Raw error message
                const errorString = error.toString();
                if (errorString && errorString.indexOf('Network Error') >= 0) {
                  console.log('Erro de Conexão');
                }
              }
            });
          // .finally(() => this.setSubmitting(false));
        } else {
          this.setState({ userNotRegistered: true });
        }
      })
      .catch(error => {
        this.setState({ saving: false });
        console.log('Error aqui', error);
      });
  };

  focusInput(inputField) {
    this[inputField].focus();
  }

  render() {
    const { setFieldValue } = this.props;

    const { userNotRegistered, cpfPasswordInvalid } = this.state;

    return (
      <View style={styles.viewPosition}>
        <View style={styles.newPasswordContainer}>
          {userNotRegistered || cpfPasswordInvalid ? (
            <View style={styles.erroAreaPassword}>
              <LoginWarning
                userNotRegistered={userNotRegistered}
                cpfPasswordInvalid={cpfPasswordInvalid}
              />
            </View>
          ) : null}
        </View>
        <Text style={styles.title}>Login</Text>
        <FormField>
          <View style={styles.viewInput}>
            <Form>
              <Item>
                <Label style={[styles.labelInput]}>CPF</Label>
                <Input
                  returnKeyType="done"
                  onSubmitEditing={() => this._password._root.focus()}
                  blurOnSubmit={false}
                  style={[styles.inputField]}
                  overlayText="CPF"
                  maskType="cpf"
                  keyboardType="numeric"
                  maxLength={14}
                  onChangeText={e => {
                    this.cpfMark(e);
                    setFieldValue('CPFField', e);
                  }}
                  value={this.state.cpf}
                />
              </Item>
            </Form>
          </View>
        </FormField>

        <FormField>
          <Form>
            <Item>
              <Label style={[styles.labelInput]}>Senha</Label>
              <Input
                ref={c => (this._password = c)}
                returnKeyType="done"
                style={[styles.inputField]}
                secureTextEntry
                onChangeText={text => {
                  this.setState({ password: text });
                  setFieldValue('password', text);
                }}
              />
            </Item>
          </Form>
        </FormField>
        <View style={styles.passwordRecoveryContainer}>
          <TextButton
            color={colors.text}
            onPress={this.openRecoverPassword}
            textStyle={styles.passwordRecoveryText}
            text="Esqueceu sua senha?"
          />
        </View>
        <View>
          <Button
            secondary
            style={styles.submitButton}
            onPress={() => {
              this.props.navigation.navigate('Home', { cpf: this.state.cpf });
            }}
          >
            <Text style={[styles.submitButtonTextReg]} uppercase={false}>
              Registrar-se
            </Text>
          </Button>
          <Button
            primary
            style={styles.submitButton}
            onPress={() => this.handleLogin()}
          >
            <Text style={[styles.submitButtonText]} uppercase={false}>
              Acessar
            </Text>
          </Button>
        </View>
      </View>
    );
  }
}

export default withNavigation(withApollo(enhancer(LoginForm)));

const styles = StyleSheet.create({
  viewPosition: {
    flexDirection: 'column',
  },
  labelInput: {
    fontSize: moderateScale(16),
    color: colors.text,
    fontFamily: 'Rubik-Light',
  },
  colorST: {
    color: colors.text,
    fontFamily: 'Rubik-Light',
    fontSize: moderateScale(16),
  },
  submitButton: {
    justifyContent: 'center',
    marginTop: moderateScale(15),
    // marginBottom = moderateScale(20),
    alignSelf: 'center',
    width: '65%',
  },
  submitButtonText: {
    color: colors.button_text,
    fontFamily: 'Rubik-Light',
    fontSize: moderateScale(18),
  },
  submitButtonTextReg: {
    color: colors.button_text,
    fontFamily: 'Rubik-Light',
    fontSize: moderateScale(18),
  },
  whiteText: {
    color: colors.secondary_text,
  },
  passwordRecoveryButton: {
    marginTop: moderateScale(3),
    fontFamily: 'Rubik-Light',
    justifyContent: 'center',
    alignContent: 'center',
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  passwordRecoveryContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: moderateScale(14),
  },
  passwordRecoveryText: {
    paddingHorizontal: moderateScale(20),
    fontFamily: 'Rubik-Light',
  },
  inputField: {
    textAlign: 'right',
    fontFamily: 'Rubik-Light',
    fontSize: moderateScale(20),
    color: colors.primary,
  },
  title: {
    color: colors.text,
    fontFamily: 'Rubik-Light',
    fontSize: moderateScale(18),
    textAlign: 'center',
    justifyContent: 'center',
    paddingVertical: moderateScale(20),
  },
  viewInput: {
    // borderWidth: 0.5,
    // borderBottomColor: '#d6d7da',
  },
  newPasswordContainer: {
    paddingHorizontal: moderateScale(20),
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
