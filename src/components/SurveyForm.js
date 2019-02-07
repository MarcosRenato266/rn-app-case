import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import { Icon, Picker } from 'native-base';
import { compose, graphql } from 'react-apollo';
import { Switch } from 'react-native-switch';
import { BallIndicator } from 'react-native-indicators';
import { withNavigation } from 'react-navigation';
import VMasker from 'vanilla-masker';
import { withFormik, Formik } from 'formik';
import yup from '../lib/yup';
import colors from '../config/colors';
import { moderateScale } from '../config/scaling';
import Button from './Button';
import { iphoneX } from '../utils/IphoneX';
import FormField from './FormField';
import { SUBMIT_INITIAL_CONTACT } from '../graphql/mutations';
import { _storeData } from '../lib/AsyncStorage';

const enhancer = withFormik({
  validationSchema: yup.object().shape({
    name: yup
      .string()
      .min(7, 'Digite seu Nome Completo')
      .required('Esse campo é obrigatório'),
    email: yup
      .string()
      .email('Digite um e-mail válido')
      .required('Este campo é obrigatório'),
    celular: yup
      .string()
      .min(11, 'Celular Inválido')
      .required('Esse campo é obrigatório'),
    city: yup.string().required('Esse campo é obrigatório'),
    // mainBank: yup.string().required('Esse campo é obrigatório'),
    // mainBroke: yup.string().required('Esse campo é obrigatório'),
  }),
});

class SurveyForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientId: '',
      borderBottomColor: '#ccc',
      borderBottomWidth: 3,
      visibleModal: false,
      name: '',
      city: '',
      email: '',
      celular: '',
      investment: 'Zero',
      contactTime: 'Manhã',
      maritalStatus: 'SOLTEIRO(A)',
      familySalary: 'Até R$ 10.000,00',
      mainBank: '',
      mainBroke: '',
      ensurance: false,
      healthEnsurance: false,
      saving: false,
      blankField: false,
    };
  }

  onHandleInput = (value, key) => {
    this.setState({ [key]: value });
  };

  onHandleSelect = (value, key) => {
    this.setState({ [key]: value });
  };

  mask = (value, key) => {
    const regex = /^[\d,.?!a-zA-Z]+$/g;
    let inputMasked = value;
    if (key === 'cpf' || key.includes('Cpf')) {
      inputMasked = VMasker.toPattern(value, '999.999.999-99');
    } else if (key.includes('Date')) {
      inputMasked = VMasker.toPattern(value, '99/99/9999');
    } else if (key === 'mobilePhone') {
      inputMasked = VMasker.toPattern(value, '(99) 99999-9999');
    } else if (key === 'celular') {
      inputMasked = VMasker.toPattern(value, '(99) 99999-9999');
    } else if (key === 'money') {
      inputMasked = VMasker.toMoney(value);
    } else if (key.includes('Number') || key === 'identification') {
      inputMasked = VMasker.toNumber(value);
    } else if (key === 'healthEnsurance') {
      inputMasked = VMasker.toPattern(value, '99999-999');
    }
    this.setState({ [key]: inputMasked, borderBottomColor: colors.primary });
    if (regex.test(this.state[key])) {
      this.setState({ blankField: false });
    }
  };

  checkInput = (value, prev, next) => {
    const regexBlank = /^$/g;
    var regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (regexBlank.test(this.state[value])) {
      this.setState({ blankField: true });
    } else if (value === 'email') {
      if (regexEmail.test(this.state.email)) {
        this.setState({ blankField: false });
        return this.setState({ [next]: true, [prev]: false });
      } else {
        this.setState({ blankField: true });
      }
    } else {
      return this.setState({ [next]: true, [prev]: false });
    }
  };

  checkSelect = (value, prev, next) => {
    return this.setState({ [next]: true, [prev]: false });
  };

  unMask(value) {
    const regex = /[^a-zA-Z0-9]/g;
    return (value || '').toString().replace(regex, '');
  }

  savingSpinner = () => {
    return <BallIndicator color={colors.primary} />;
  };

  getValidateStatus = param => {
    return this.props.errors[param] && this.props.touched[param]
      ? 'error'
      : this.props.touched[param]
      ? 'success'
      : '';
  };

  getError = param => {
    return this.props.errors[param] && this.props.touched[param]
      ? this.props.errors[param]
      : '';
  };

  handleMutationForm = () => {
    this.props
      .submitInitialContact({
        variables: {
          input: {
            name: this.state.name,
            email: this.state.email,
            phone: this.state.celular,
            city: this.state.city,
            investment: this.state.investment,
            contactTime: this.state.contactTime,
            maritalStatus: this.state.maritalStatus,
            familySalary: this.state.familySalary,
            mainBank: this.state.mainBank,
            mainBroke: this.state.mainBroke,
            ensurance: this.state.ensurance,
            healthEnsurance: this.state.healthEnsurance,
          },
        },
      })
      .then(data => {
        _storeData('partner', 'waiting')
          .then(() => {
            this.props.navigation.navigate('WaitingPartner');
          })
          .catch(() => {
            console.log('Error storeData');
          });
      })
      .catch(error => {
        for (let key in this.props.errors) {
          this.props.setFieldTouched(key);
        }
        console.log('deu erro aqui', error);
      });
  };

  focusInput(inputField) {
    this[inputField].focus();
  }

  render() {
    const { setFieldValue, setFieldTouched } = this.props;
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <ScrollView
          nativeID="tti_complete"
          ref="_scrollView"
          style={styles.container}
          innerRef={ref => {
            this.scroll = ref;
          }}
        >
          <Formik
            initialValues={{ email: '' }}
            onSubmit={this.props.handleSubmit}
          >
            <View>
              <View style={styles.topbarValidationFields}>
                <View style={styles.logoContainer}>
                  <Image
                    source={require('../assets/i/logo.png')}
                    style={styles.logo}
                  />
                  <Text style={styles.title}>QUERO SER CLIENTE</Text>
                  <Text style={styles.dividerHeader} />
                </View>
              </View>
              <View style={styles.dataValidationHeader}>
                <FormField
                  validateStatus={this.getValidateStatus('name')}
                  error={this.getError('name')}
                >
                  <Text style={styles.question}> NOME</Text>
                  <TextInput
                    // onFocus={event => {
                    //   // `bind` the function if you're using ES6 classes
                    //   this._scrollToInput(
                    //     ReactNative.findNodeHandle(event.target)
                    //   );
                    // }}
                    ref={c => {
                      this.name = c;
                    }}
                    returnKeyType="next"
                    // onSubmitEditing={() => this.focusInput('email')}
                    // blurOnSubmit={false}
                    onBlur={() => setFieldTouched('name')}
                    value={this.state.name}
                    maxLength={32}
                    style={[styles.itemInput]}
                    onChangeText={name => {
                      this.onHandleInput(name, 'name');
                      setFieldValue('name', name);
                    }}
                  />
                </FormField>
                <FormField
                  validateStatus={this.getValidateStatus('email')}
                  error={this.getError('email')}
                >
                  <Text style={styles.question}> E-MAIL</Text>
                  <TextInput
                    // onFocus={event => {
                    //   // `bind` the function if you're using ES6 classes
                    //   this._scrollToInput(
                    //     ReactNative.findNodeHandle(event.target)
                    //   );
                    // }}
                    ref={c => {
                      this.email = c;
                    }}
                    returnKeyType="next"
                    // onSubmitEditing={() => this.focusInput('celular')}
                    // blurOnSubmit={false}
                    onBlur={() => setFieldTouched('email')}
                    value={this.state.email}
                    maxLength={32}
                    style={[styles.itemInput]}
                    onChangeText={email => {
                      this.onHandleInput(email, 'email');
                      setFieldValue('email', email);
                    }}
                  />
                </FormField>
                <FormField
                  validateStatus={this.getValidateStatus('celular')}
                  error={this.getError('celular')}
                >
                  <Text style={styles.question}> CELULAR</Text>
                  <TextInput
                    // onFocus={event => {
                    //   // `bind` the function if you're using ES6 classes
                    //   this._scrollToInput(
                    //     ReactNative.findNodeHandle(event.target)
                    //   );
                    // }}
                    ref={c => {
                      this.celular = c;
                    }}
                    returnKeyType="next"
                    onBlur={() => setFieldTouched('celular')}
                    value={this.state.celular}
                    maxLength={32}
                    keyboardType="numeric"
                    style={[styles.itemInput]}
                    onChangeText={celular => {
                      this.mask(celular, 'celular');
                      setFieldValue('celular', celular);
                    }}
                  />
                </FormField>
                <Text style={styles.question}>
                  VALOR APROXIMADO DOS INVESTIMENTOS
                </Text>
                <Picker
                  mode="dropdown"
                  iosIcon={
                    <Icon name="arrow-down" style={{ color: colors.primary }} />
                  }
                  style={[styles.suppliedItemInput, styles.pickerContainer]}
                  placeholder="Selecione"
                  placeholderStyle={{ color: colors.primary }}
                  placeholderIconColor={colors.primary}
                  selectedValue={this.state.investment}
                  onValueChange={value =>
                    this.onHandleSelect(value, 'investment')
                  }
                >
                  <Picker.Item
                    label="Zero"
                    value="Zero"
                    style={styles.picker}
                  />
                  <Picker.Item
                    label="Menos de R$ 30.000,00"
                    value="Menos de R$ 30.000,00"
                    style={styles.picker}
                  />
                  <Picker.Item
                    label="Entre R$ 30.000,00 a R$ 100.000,00"
                    value="Entre R$ 30.000,00 a R$ 100.000,00"
                    style={styles.picker}
                  />
                  <Picker.Item
                    label="Entre R$ 100.000,00 a R$ 500.000,00"
                    value="Entre R$ 100.000,00 a R$ 500.000,00"
                    style={styles.picker}
                  />
                  <Picker.Item
                    label="Entre R$ 500.000,00 a R$ 1.000.000,00"
                    value="Entre R$ 500.000,00 a R$ 1.000.000,00"
                    style={styles.picker}
                  />
                  <Picker.Item
                    label="Mais de R$ 1.000.000,00"
                    value="Mais de R$ 1.000.000,00"
                    style={styles.picker}
                  />
                </Picker>
                <FormField
                  validateStatus={this.getValidateStatus('city')}
                  error={this.getError('city')}
                >
                  <Text style={styles.question}>CIDADE</Text>
                  <TextInput
                    // onFocus={event => {
                    //   // `bind` the function if you're using ES6 classes
                    //   this._scrollToInput(
                    //     ReactNative.findNodeHandle(event.target)
                    //   );
                    // }}
                    ref={c => {
                      this.city = c;
                    }}
                    returnKeyType="done"
                    onBlur={() => setFieldTouched('city')}
                    value={this.state.city}
                    maxLength={32}
                    style={[styles.itemInput]}
                    onChangeText={city => {
                      this.onHandleInput(city, 'city');
                      setFieldValue('city', city);
                    }}
                  />
                </FormField>
                <Text style={styles.question}>PREFERÊNCIA DE CONTATO</Text>
                <Picker
                  mode="dropdown"
                  iosIcon={
                    <Icon name="arrow-down" style={{ color: colors.primary }} />
                  }
                  style={[styles.suppliedItemInput, styles.pickerContainer]}
                  placeholder="Selecione"
                  placeholderStyle={{ color: colors.primary }}
                  placeholderIconColor={colors.primary}
                  selectedValue={this.state.contactTime}
                  onValueChange={value =>
                    this.onHandleSelect(value, 'contactTime')
                  }
                >
                  <Picker.Item
                    label="Manhã"
                    value="Manhã"
                    style={styles.picker}
                  />
                  <Picker.Item
                    label="Tarde"
                    value="Tarde"
                    style={styles.picker}
                  />
                  <Picker.Item
                    label="Noite"
                    value="Noite"
                    style={styles.picker}
                  />
                </Picker>
                <Text style={styles.question}>ESTRUTURA FAMILIAR</Text>
                <Picker
                  mode="dropdown"
                  iosIcon={
                    <Icon name="arrow-down" style={{ color: colors.primary }} />
                  }
                  style={[styles.suppliedItemInput, styles.pickerContainer]}
                  placeholder="Selecione"
                  placeholderStyle={{ color: colors.primary }}
                  placeholderIconColor={colors.primary}
                  selectedValue={this.state.maritalStatus}
                  onValueChange={value =>
                    this.onHandleSelect(value, 'maritalStatus')
                  }
                >
                  <Picker.Item label="SOLTEIRO(A)" value="SOLTEIRO(A)" />
                  <Picker.Item label="CASADO(A)" value="CASADO(A)" />
                  <Picker.Item label="VIÚVO(A)" value="VIUVO(A)" />
                  <Picker.Item label="DIVORCIADO(A)" value="DIVORCIADO(A)" />
                  <Picker.Item label="SEPARADO(A)" value="SEPARADO(A)" />
                </Picker>
                <Text style={styles.question}>RENDA FAMILIAR APROXIMADA</Text>
                <Picker
                  mode="dropdown"
                  iosIcon={
                    <Icon name="arrow-down" style={{ color: colors.primary }} />
                  }
                  style={[styles.suppliedItemInput, styles.pickerContainer]}
                  placeholder="Selecione"
                  placeholderStyle={{ color: colors.primary }}
                  placeholderIconColor={colors.primary}
                  selectedValue={this.state.familySalary}
                  onValueChange={value =>
                    this.onHandleSelect(value, 'familySalary')
                  }
                >
                  <Picker.Item
                    label="Até R$ 10.000,00"
                    value="Até R$ 10.000,00"
                  />
                  <Picker.Item
                    label="Entre R$ 10.000,00 a R$ 30.000,00"
                    value="Entre R$ 10.000,00 a R$ 30.000,00"
                  />
                  <Picker.Item
                    label="Acima de R$ 30.000,00"
                    value="Acima de R$ 30.000,00"
                  />
                </Picker>
                <FormField
                  validateStatus={this.getValidateStatus('mainBank')}
                  error={this.getError('mainBank')}
                >
                  <Text style={styles.question}>PRINCIPAL BANCO UTILIZADO</Text>
                  <TextInput
                    // onFocus={event => {
                    //   this._scrollToInput(
                    //     ReactNative.findNodeHandle(event.target)
                    //   );
                    // }}
                    ref={c => {
                      this.mainBank = c;
                    }}
                    returnKeyType="done"
                    // onSubmitEditing={() => this.focusInput('mainBroke')}
                    // blurOnSubmit={false}
                    onBlur={() => setFieldTouched('mainBank')}
                    value={this.state.mainBank}
                    maxLength={32}
                    style={[styles.itemInput]}
                    onChangeText={mainBank => {
                      this.onHandleInput(mainBank, 'mainBank');
                      setFieldValue('mainBank', mainBank);
                    }}
                  />
                </FormField>
                <FormField
                  validateStatus={this.getValidateStatus('mainBroke')}
                  error={this.getError('mainBroke')}
                >
                  <Text style={styles.question}>
                    PRINCIPAL CORRETORA UTILIZADA
                  </Text>
                  <TextInput
                    // onFocus={event => {
                    //   this._scrollToInput(
                    //     ReactNative.findNodeHandle(event.target)
                    //   );
                    // }}
                    ref={c => {
                      this.mainBroke = c;
                    }}
                    returnKeyType="done"
                    onBlur={() => setFieldTouched('mainBroke')}
                    value={this.state.mainBroke}
                    maxLength={32}
                    style={[styles.itemInput]}
                    onChangeText={mainBroke => {
                      this.onHandleInput(mainBroke, 'mainBroke');
                      setFieldValue('mainBroke', mainBroke);
                    }}
                  />
                </FormField>
                <Text style={styles.question}>POSSUI PREVIDÊNCIA?</Text>
                <View
                  style={[styles.itemInput, styles.checkBoxContainer]}
                  onPress={() => {
                    this.setState({
                      ensurance: !this.state.ensurance,
                    });
                  }}
                >
                  <Text style={styles.question2}>
                    {this.state.ensurance ? 'SIM' : 'NÃO'}
                  </Text>
                  <Switch
                    backgroundActive={colors.primary}
                    backgroundInactive="#cecece"
                    circleBorderWidth={0}
                    value={this.state.ensurance}
                    onValueChange={value =>
                      this.setState({
                        ensurance: !this.state.ensurance,
                      })
                    }
                  />
                </View>
                <Text style={styles.question}>POSSUI SEGURO DE VIDA?</Text>
                <View
                  style={[styles.itemInput, styles.checkBoxContainer]}
                  onPress={() => {
                    this.setState({
                      healthEnsurance: !this.state.healthEnsurance,
                    });
                  }}
                >
                  <Text style={styles.question2}>
                    {this.state.healthEnsurance ? 'SIM' : 'NÃO'}
                  </Text>
                  <Switch
                    backgroundActive={colors.primary}
                    backgroundInactive="#cecece"
                    circleBorderWidth={0}
                    value={this.state.healthEnsurance}
                    onValueChange={value =>
                      this.setState({
                        healthEnsurance: !this.state.healthEnsurance,
                      })
                    }
                  />
                </View>

                <Button
                  standard
                  primary
                  style={styles.proceedButton}
                  onPress={this.handleMutationForm}
                >
                  <Text style={[styles.proceedButtonText]} uppercase={false}>
                    Enviar
                  </Text>
                </Button>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      name: '',
                      city: '',
                      email: '',
                      celular: '',
                      investment: '',
                      contactTime: '',
                      maritalStatus: '',
                      familySalary: '',
                      mainBank: '',
                      mainBroke: '',
                      ensurance: '',
                      healthEnsurance: '',
                    });
                    this.props.navigation.navigate('SelectAssociate');
                  }}
                >
                  <Text style={styles.clickMe}> Voltar </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

export default compose(
  graphql(SUBMIT_INITIAL_CONTACT, { name: 'submitInitialContact' })
)(withNavigation(enhancer(SurveyForm)));

const styles = StyleSheet.create({
  clickMe: {
    fontFamily: 'Rubik-Light',
    color: colors.secondary,
    fontSize: moderateScale(13),
    paddingVertical: moderateScale(20),
    textAlign: 'center',
  },
  erroContainer: {
    backgroundColor: '#f28686',
    borderRadius: 10,
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(15),
    marginTop: moderateScale(10),
    flexDirection: 'row',
  },
  erroText: {
    fontSize: moderateScale(15),
    color: '#fff',
    fontFamily: 'Rubik-Light',
    marginLeft: moderateScale(10),
  },
  switchStyle: {
    borderColor: 'red',
  },
  collapseTab: {
    width: '100%',
  },
  dividerHeader: {
    width: '15%',
    height: moderateScale(5),
    borderRadius: 10,
    backgroundColor: '#a18037',
    marginVertical: moderateScale(10),
  },
  dataValidationHeader: {
    elevation: 0,
    flex: 2,
    backgroundColor: '#f0eeef',
    padding: 10,
  },
  topbarValidationFields: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    shadowOpacity: 0.75,
    shadowRadius: 55,
    elevation: 7,
  },
  viewCollapse: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#c0c0c0',
    borderBottomWidth: 1,
    paddingVertical: moderateScale(15),
  },
  container: {
    flex: 1,
  },
  text: {
    color: colors.text,
    fontSize: moderateScale(12),
    fontWeight: 'bold',
  },
  valueBoxTitleText: {
    textAlign: 'center',
    color: colors.light_gray,
    fontSize: moderateScale(14),
    fontFamily: 'Rubik-medium',
  },
  value: {
    color: colors.primary,
    fontSize: moderateScale(19),
    marginBottom: moderateScale(10),
    textAlign: 'center',
  },
  paginationStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  paginationText: {
    color: colors.primary,
    fontSize: 20,
  },
  valueBox: {
    borderBottomWidth: 1,
    borderBottomColor: colors.text,
    marginVertical: moderateScale(15),
  },
  editButton: {
    backgroundColor: colors.primary,
    width: moderateScale(45),
    height: moderateScale(45),
    alignSelf: 'center',
    marginTop: moderateScale(12),
  },
  icon: {
    fontSize: moderateScale(24),
    color: '#fff',
    backgroundColor: colors.primary,
  },
  proceedButton: {
    width: Dimensions.get('window').width / 2,
    justifyContent: 'center',
    marginTop: moderateScale(15),
    alignSelf: 'center',
  },
  cepButton: {
    width: Dimensions.get('window').width / 3,
    backgroundColor: colors.primary,
    color: '#fff',
    borderRadius: 15,
    alignSelf: 'flex-end',
  },
  proceedButtonText: {
    fontSize: moderateScale(18),
    color: '#fff',
    fontFamily: 'Rubik-Light',
  },
  itemInput: {
    textAlign: 'left',
    fontFamily: 'Rubik-Regular',
    fontSize: moderateScale(16),
    color: '#808281',
    borderColor: 'transparent',
    borderWidth: 1,
    backgroundColor: '#eae6e5',
    width: '100%',
    borderRadius: 10,
    paddingHorizontal: moderateScale(20),
    height: Platform.OS === 'ios' ? 40 : 48,
  },
  suppliedItemInput: {
    color: '#808281',
    borderColor: 'transparent',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#eae6e5',
    paddingHorizontal: moderateScale(20),
    height: Platform.OS === 'ios' ? 40 : 48,
  },
  pickerContainer: {
    width: '93%',
    alignSelf: 'center',
    borderRadius: 10,
  },
  maskedInput: {
    flex: 1,
    textAlign: 'center',
    fontFamily: 'Rubik-Regular',
    fontSize: moderateScale(22),
  },
  checkBoxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '93%',
    alignSelf: 'center',
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(10),
  },
  question: {
    color: '#9fa0a5',
    fontSize: moderateScale(14),
    fontFamily: 'Rubik-Light',
    textAlign: 'left',
    paddingTop: moderateScale(18),
    paddingBottom: moderateScale(5),
  },
  question2: {
    color: '#9fa0a5',
    fontSize: moderateScale(14),
    fontFamily: 'Rubik-Light',
    textAlign: 'left',
    marginRight: moderateScale(10),
  },
  title: {
    color: colors.text,
    fontSize: moderateScale(20),
    fontFamily: 'Rubik-Medium',
    textAlign: 'center',
  },
  description: {
    color: colors.secondary_text,
    fontSize: moderateScale(12),
    textAlign: 'center',
    paddingBottom: moderateScale(10),
    paddingTop: moderateScale(10),
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: moderateScale(iphoneX ? 40 : 8),
  },
  boxWithShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  logo: {
    resizeMode: 'contain',
    width: moderateScale(200, 0.5),
    paddingHorizontal: moderateScale(10),
    marginVertical: moderateScale(20),
  },
  picker: {
    fontSize: moderateScale(16),
    color: colors.primary,
    fontFamily: 'Rubik-Light',
  },
  checkbox: {
    backgroundColor: '#ccc',
    color: '#a18037',
    borderColor: 'transparent',
    alignSelf: 'center',
  },
  mainContainer: {
    flex: 1.0,
    backgroundColor: '#fff',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 26,
  },
  shield: {
    width: 160,
    height: 160,
  },
  titleText: {
    fontSize: moderateScale(25),
    textAlign: 'center',
    color: colors.secondary_text,
    fontFamily: 'Rubik-Medium',
    padding: 15,
  },
  infoText: {
    fontSize: moderateScale(17),
    paddingVertical: moderateScale(15),
    textAlign: 'center',
    color: colors.secondary_text,
    fontFamily: 'Rubik-Light',
  },
});
