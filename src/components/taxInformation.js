import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import Modal from 'react-native-modal';
import { withNavigation } from 'react-navigation';
import { withApollo, compose, graphql } from 'react-apollo';
import { withFormik, Formik } from 'formik';
import VMasker from 'vanilla-masker';
import { Switch } from 'react-native-switch';
import { Picker, Icon } from 'native-base';
import Button from './Button';
import colors from '../config/colors';
import { moderateScale } from '../config/scaling';
import yup from '../lib/yup';
import { TAX_INFORMATION } from '../graphql/mutations';
import FormField from './FormField';
import Checkbox from 'react-native-custom-checkbox';

const enhancer = withFormik({
  validationSchema: yup.object().shape({
    //DATA VALIDATION
    'Data da Emissão': yup.string().notRequired(),
    'Data de Validade': yup.string().notRequired(),
    'País Emissor': yup.string().notRequired(),
    'País de Nascimento': yup.string().notRequired(),
    // PARTARTIR DAQUI
    // PARTARTIR DAQUI
    // PARTARTIR DAQUI
    // PARTARTIR DAQUI
    // PARTARTIR DAQUI
    // PARTARTIR DAQUI
    // PARTARTIR DAQUI
    // PARTARTIR DAQUI
    // PARTARTIR DAQUI
    // PARTARTIR DAQUI
    // PARTARTIR DAQUI
    otherNationality: yup.boolean(),
    usaResidenceVisa: yup.boolean(),
    greenCard: yup.boolean(),
    hasOutInfo: yup.boolean(),
    outRefOne: yup
      .number()
      .notRequired()
      .when('otherNationality', {
        is: val => val === true,
        then: yup.number().required('Campo Obrigatório'),
        otherwise: yup.number().notRequired(),
      })
      .when('usaResidenceVisa', {
        is: val => val === true,
        then: yup.number().required('Campo Obrigatório'),
        otherwise: yup.number().notRequired(),
      })
      .when('greenCard', {
        is: val => val === true,
        then: yup.number().required('Campo Obrigatório'),
        otherwise: yup.number().notRequired(),
      })
      .when('hasOutInfo', {
        is: val => val === true,
        then: yup.number().required('Campo Obrigatório'),
        otherwise: yup.number().notRequired(),
      }),
    outRefCountryOne: yup
      .string()
      .notRequired()
      .when('otherNationality', {
        is: val => val === true,
        then: yup.string().required('Campo Obrigatório'),
        otherwise: yup.string().notRequired(),
      })
      .when('usaResidenceVisa', {
        is: val => val === true,
        then: yup.string().required('Campo Obrigatório'),
        otherwise: yup.string().notRequired(),
      })
      .when('greenCard', {
        is: val => val === true,
        then: yup.string().required('Campo Obrigatório'),
        otherwise: yup.string().notRequired(),
      })
      .when('hasOutInfo', {
        is: val => val === true,
        then: yup.string().required('Campo Obrigatório'),
        otherwise: yup.string().notRequired(),
      }),
    outIdNumberOne: yup
      .number()
      .notRequired()
      .when('otherNationality', {
        is: val => val === true,
        then: yup.number().required('Campo Obrigatório'),
        otherwise: yup.number().notRequired(),
      })
      .when('usaResidenceVisa', {
        is: val => val === true,
        then: yup.number().required('Campo Obrigatório'),
        otherwise: yup.number().notRequired(),
      })
      .when('greenCard', {
        is: val => val === true,
        then: yup.number().required('Campo Obrigatório'),
        otherwise: yup.number().notRequired(),
      })
      .when('hasOutInfo', {
        is: val => val === true,
        then: yup.number().required('Campo Obrigatório'),
        otherwise: yup.number().notRequired(),
      }),
    outWaitingIdNumberOne: yup.boolean(),
    outNeededNifOne: yup.boolean(),
    outDispensedNifOne: yup.boolean(),
    // outRefTwo: yup
    //   .number()
    //   .notRequired()
    //   .when('outWaitingIdNumberOne', {
    //     is: val => val === true,
    //     then: yup.number().required('Campo Obrigatório'),
    //     otherwise: yup.number().notRequired(),
    //   })
    //   .when('outNeededNifOne', {
    //     is: val => val === true,
    //     then: yup.number().required('Campo Obrigatório'),
    //     otherwise: yup.number().notRequired(),
    //   })
    //   .when('outDispensedNifOne', {
    //     is: val => val === true,
    //     then: yup.number().required('Campo Obrigatório'),
    //     otherwise: yup.number().notRequired(),
    //   }),
    outRefCountryTwo: yup
      .string()
      .notRequired()
      .when('outWaitingIdNumberOne', {
        is: val => val === true,
        then: yup.string().required('Campo Obrigatório'),
        otherwise: yup.string().notRequired(),
      })
      .when('outNeededNifOne', {
        is: val => val === true,
        then: yup.string().required('Campo Obrigatório'),
        otherwise: yup.string().notRequired(),
      })
      .when('outDispensedNifOne', {
        is: val => val === true,
        then: yup.string().required('Campo Obrigatório'),
        otherwise: yup.string().notRequired(),
      }),
    outIdNumberTwo: yup
      .number()
      .notRequired()
      .when('outWaitingIdNumberOne', {
        is: val => val === true,
        then: yup.number().required('Campo Obrigatório'),
        otherwise: yup.number().notRequired(),
      })
      .when('outNeededNifOne', {
        is: val => val === true,
        then: yup.number().required('Campo Obrigatório'),
        otherwise: yup.number().notRequired(),
      })
      .when('outDispensedNifOne', {
        is: val => val === true,
        then: yup.number().required('Campo Obrigatório'),
        otherwise: yup.number().notRequired(),
      }),
    outWaitingIdNumberTwo: yup.boolean(),
    outNeededNifTwo: yup.boolean(),
    outDispensedNifTwo: yup.boolean(),
    // outRefThree: yup
    //   .number()
    //   .notRequired()
    //   .when('outWaitingIdNumberTwo', {
    //     is: val => val === true,
    //     then: yup.number().required('Campo Obrigatório'),
    //     otherwise: yup.number().notRequired(),
    //   })
    //   .when('outNeededNifTwo', {
    //     is: val => val === true,
    //     then: yup.number().required('Campo Obrigatório'),
    //     otherwise: yup.number().notRequired(),
    //   })
    //   .when('outDispensedNifTwo', {
    //     is: val => val === true,
    //     then: yup.number().required('Campo Obrigatório'),
    //     otherwise: yup.number().notRequired(),
    //   }),
    outRefCountryThree: yup
      .string()
      .notRequired()
      .when('outWaitingIdNumberTwo', {
        is: val => val === true,
        then: yup.string().required('Campo Obrigatório'),
        otherwise: yup.string().notRequired(),
      })
      .when('outNeededNifTwo', {
        is: val => val === true,
        then: yup.string().required('Campo Obrigatório'),
        otherwise: yup.string().notRequired(),
      })
      .when('outDispensedNifTwo', {
        is: val => val === true,
        then: yup.string().required('Campo Obrigatório'),
        otherwise: yup.string().notRequired(),
      }),
    outIdNumberThree: yup
      .number()
      .notRequired()
      .when('outWaitingIdNumberTwo', {
        is: val => val === true,
        then: yup.number().required('Campo Obrigatório'),
        otherwise: yup.number().notRequired(),
      })
      .when('outNeededNifTwo', {
        is: val => val === true,
        then: yup.number().required('Campo Obrigatório'),
        otherwise: yup.number().notRequired(),
      })
      .when('outDispensedNifTwo', {
        is: val => val === true,
        then: yup.number().required('Campo Obrigatório'),
        otherwise: yup.number().notRequired(),
      }),
    outWaitingIdNumberThree: yup.boolean(),
    outNeededNifThree: yup.boolean(),
    outDispensedNifThree: yup.boolean(),
    // outRefFour: yup
    //   .number()
    //   .notRequired()
    //   .when('outWaitingIdNumberThree', {
    //     is: val => val === true,
    //     then: yup.number().required('Campo Obrigatório'),
    //     otherwise: yup.number().notRequired(),
    //   })
    //   .when('outNeededNifThree', {
    //     is: val => val === true,
    //     then: yup.number().required('Campo Obrigatório'),
    //     otherwise: yup.number().notRequired(),
    //   })
    //   .when('outDispensedNifThree', {
    //     is: val => val === true,
    //     then: yup.number().required('Campo Obrigatório'),
    //     otherwise: yup.number().notRequired(),
    //   }),
    outRefCountryFour: yup
      .string()
      .notRequired()
      .when('outWaitingIdNumberThree', {
        is: val => val === true,
        then: yup.string().required('Campo Obrigatório'),
        otherwise: yup.string().notRequired(),
      })
      .when('outNeededNifThree', {
        is: val => val === true,
        then: yup.string().required('Campo Obrigatório'),
        otherwise: yup.string().notRequired(),
      })
      .when('outDispensedNifThree', {
        is: val => val === true,
        then: yup.string().required('Campo Obrigatório'),
        otherwise: yup.string().notRequired(),
      }),
    outIdNumberFour: yup
      .number()
      .notRequired()
      .when('outWaitingIdNumberThree', {
        is: val => val === true,
        then: yup.number().required('Campo Obrigatório'),
        otherwise: yup.number().notRequired(),
      })
      .when('outNeededNifThree', {
        is: val => val === true,
        then: yup.number().required('Campo Obrigatório'),
        otherwise: yup.number().notRequired(),
      })
      .when('outDispensedNifThree', {
        is: val => val === true,
        then: yup.number().required('Campo Obrigatório'),
        otherwise: yup.number().notRequired(),
      }),
    // resignNationality: yup.boolean(),
    // resignNationalityCountry: yup
    //   .string()
    //   .notRequired()
    //   .when('resignNationality', {
    //     is: val => val === true,
    //     then: yup.string().required('Campo Obrigatório'),
    //     otherwise: yup.string().notRequired(),
    //   }),
  }),
});

class taxInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // TRIGGER FLAG
      sendButton: false,

      //MODAL
      visibleModal: false,
      modalTitle: '',
      modalText: '',
      completeName:
        this.props.navigation.state.params.userData.titularName || '',
      cpfField: this.props.navigation.state.params.userData.cpf || '',
      idType: this.props.navigation.state.params.userData.idType || '',
      identification:
        this.props.navigation.state.params.userData.identification || '',
      idGovernmentIssue:
        this.props.navigation.state.params.userData.governmentIssue || '',
      idIssueDate:
        this.props.navigation.state.params.userData.idIssueDate || '',
      idValidity: '',
      idIssueCountry: '',
      birthdate: this.props.navigation.state.params.userData.birthdayDate || '',
      birthCountry:
        this.props.navigation.state.params.userData.birthCounty || '',
      birthLocal: this.props.navigation.state.params.userData.birthPlace || '',
      nationality:
        this.props.navigation.state.params.userData.nationality || '',
      otherNationality: false,
      usaResidenceVisa:
        this.props.navigation.state.params.userData.usaResidenceVisa || '',

      // completeName: '',
      // cpfField: '',
      // idType: '',
      // identification: '',
      // idGovernmentIssue: '',
      // idIssueDate: '',
      // idValidity: '',
      // idIssueCountry: '',
      // birthdate: '',
      // birthCountry: '',
      // birthLocal: '',
      // nationality: '',
      // otherNationality: false,
      // usaResidenceVisa: '',

      greenCard: false,
      hasOutInfo: false,
      outRefOne: 1,
      outRefCountryOne: '',
      outIdNumberOne: '',
      outWaitingIdNumberOne: false,
      outNeededNifOne: false,
      outDispensedNifOne: false,
      outRefTwo: 2,
      outRefCountryTwo: '',
      outIdNumberTwo: '',
      outWaitingIdNumberTwo: false,
      outNeededNifTwo: false,
      outDispensedNifTwo: false,
      outRefThree: 3,
      outRefCountryThree: '',
      outIdNumberThree: '',
      outWaitingIdNumberThree: false,
      outNeededNifThree: false,
      outDispensedNifThree: false,
      outRefFour: 4,
      outRefCountryFour: '',
      outIdNumberFour: '',
      outWaitingIdNumberFour: false,
      outNeededNifFour: false,
      outDispensedNifFour: false,
      resignNationality: false,
      resignNationalityCountry: '',
      nIdentFiscal: '',
      nIdentFiscalPais: '',

      birthCountryPublicFunctionCode: '',
      birthLocalPublicFunctionCode: '',
      usaResidenceVisaPublicFunctionCode: '',
      greenCardPublicFunctionCode: '',
      hasOutInfoPublicFunctionCode: '',

      confirmChecked: false,
    };
  }

  unMask = value => {
    const regex = /[^a-zA-Z0-9]/g;
    return (value || '').toString().replace(regex, '');
  };

  mask = (value, key) => {
    const regex = /^[\d,.?!a-zA-Z]+$/g;
    let valueUnMasked = this.unMask(value);
    let inputMasked = value;
    if (key.includes('Cnpj')) {
      inputMasked = VMasker.toPattern(
        valueUnMasked,
        valueUnMasked.length === 11 ? '999.999.999-99' : '99.999.999/9999-99'
      );
    } else if (key === 'cnpj') {
      inputMasked = VMasker.toPattern(valueUnMasked, '99.999.999/9999-99');
    } else if (key.includes('cpf')) {
      inputMasked = VMasker.toPattern(valueUnMasked, '999.999.999-99');
    } else if (key.includes('Date') || key.includes('date')) {
      inputMasked = VMasker.toPattern(value, '99/99/9999');
    } else if (key === 'mobilePhone') {
      inputMasked = VMasker.toPattern(value, '(99) 9999-9999');
    } else if (key === 'phone' || key.includes('Phone')) {
      inputMasked = VMasker.toPattern(
        valueUnMasked,
        valueUnMasked.length === 10 ? '(99) 9999-9999' : '(99) 99999-9999'
      );
    } else if (
      key === 'money' ||
      key.includes('salary') ||
      key.includes('Value')
    ) {
      inputMasked = VMasker.toMoney(value);
    } else if (key.includes('Number') || key === 'identification') {
      inputMasked = VMasker.toNumber(value);
    } else if (key === 'zipCode' || key.includes('ZipCode')) {
      inputMasked = VMasker.toPattern(value, '99999-999');
    }
    this.setState({ [key]: inputMasked, borderBottomColor: colors.primary });
    if (regex.test(this.state[key])) {
      this.setState({ blankField: false });
    }
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

  onHandleInput = (value, key) => {
    this.setState({ [key]: value });
  };

  onHandleSelect = (value, key) => {
    this.setState({ [key]: value });
  };

  setFieldsFilledTouched = () => {
    if (this.state.idIssueDate) {
      this.props.setFieldTouched('Data da Emissão');
    }
    if (this.state.idExpireDate) {
      this.props.setFieldTouched('Data de Validade');
    }
    if (this.state.idIssueCountry) {
      this.props.setFieldTouched('País Emissor');
    }
    if (this.state.birthCountry) {
      this.props.setFieldTouched('País de Nascimento');
    }
  };

  saveValidationDataMutation = () => {
    let input = {
      // completeName: "String",
      // documentType: "String",
      // documentNumber: "String",
      // documentEmitterCountry: "String",
      // documentValidThru: "String",
      // outNaionality: true,
      // outTaxResidence: true,
      // outVisaResidence: true,
      // outRefOne: 1,
      // outCountryOne: "String",
      // outTaxIdentificationOne: "String",
      // outWaitingNumberOne: true,
      // outNeededNifOne: true,
      // outDispencedNifOne: true,
      // outRefTwo: 2,
      // outCountryTwo: "String",
      // outTaxIdentificationTwo: "String",
      // outWaitingNumberTwo: true,
      // outNeededNifTwo: true,
      // outDispencedNifTwo: true,
      // outRefThree: 3,
      // outCountryThree: "String",
      // outTaxIdentificationThree: "String",
      // outWaitingNumberThree: true,
      // outNeededNifThree: true,
      // outDispencedNifThree: true,
      // outRefFour: 4,
      // outCountryFour: "String",
      // outTaxIdentificationFour: "String",
      // outWaitingNumberFour: true,
      // outNeededNifFour: true,
      // outDispencedNifFour: true,
      // abdicatedNationality: true,
      // abdicatedCountries: "String"

      completeName: this.state.completeName,
      documentType: this.state.idType,
      documentNumber: this.state.identification,
      documentEmitterCountry: this.state.idGovernmentIssue,
      documentValidThru: this.state.idIssueDate,
      outNaionality: false,
      outTaxResidence: false,
      outVisaResidence: false,
      outRefOne: 1,
      outCountryOne: this.state.outRefCountryOne,
      outTaxIdentificationOne: '',
      outWaitingNumberOne: this.state.outWaitingIdNumberOne,
      outNeededNifOne: this.state.outNeededNifOne,
      outDispencedNifOne: this.state.outDispensedNifOne,
      outRefTwo: 2,
      outCountryTwo: this.state.outRefCountryTwo,
      outTaxIdentificationTwo: '',
      outWaitingNumberTwo: this.state.outWaitingIdNumberTwo,
      outNeededNifTwo: this.state.outNeededNifTwo,
      outDispencedNifTwo: this.state.outDispensedNifTwo,
      outRefThree: 3,
      outCountryThree: this.state.outRefCountryThree,
      outTaxIdentificationThree: '',
      outWaitingNumberThree: this.state.outWaitingIdNumberThree,
      outNeededNifThree: this.state.outNeededNifThree,
      outDispencedNifThree: this.state.outDispensedNifThree,
      outRefFour: 4,
      outCountryFour: this.state.outRefCountryFour,
      outTaxIdentificationFour: '',
      outWaitingNumberFour: this.state.outWaitingIdNumberFour,
      outNeededNifFour: this.state.outNeededNifFour,
      outDispencedNifFour: this.state.outDispensedNifFour,
      abdicatedNationality: this.state.resignNationality,
      abdicatedCountries: this.state.resignNationalityCountry,
    };
    console.log('dados que vao', input);
    this.setState({
      visibleModal: false,
    });
    if (Object.keys(this.props.errors).length !== 0) {
      console.log('errors', this.props.errors);
      let errorsFieldNames = [];
      for (let key in this.props.errors) {
        errorsFieldNames.push(key);
      }
      this.setState({
        backgroundColor: { backgroundColor: '#fff' },
        sendButton: true,
      });
    } else {
      this.props
        .taxInformation({
          variables: {
            input: input,
          },
        })
        .then(data => {
          console.log('data que vai no tax information', data);
          this.props.navigation.navigate('SecuritySteps');
        })
        .catch(error => {
          console.log('error no tax information', error);
          alert('Ops encontramos alguns erros');
        });
    }
  };

  handleInputIdentFiscal = () => {
    return (
      <FormField>
        <Text style={[styles.question]}>Nº Ident. Fiscal/NIF</Text>
        <TextInput
          value={this.state.nIdentFiscal}
          onBlur={() => this.props.setFieldTouched('Nº Ident. Fiscal/NIF')}
          selectTextOnFocus={false}
          returnKeyType="done"
          keyboardType="numeric"
          style={[styles.itemInput]}
          onChangeText={nIdentFiscal => {
            this.mask(nIdentFiscal, 'nIdentFiscal');
            this.props.setFieldValue('Nº Ident. Fiscal/NIF', nIdentFiscal);
          }}
          maxLength={9}
        />
      </FormField>
    );
  };

  handleInputNIF = () => {
    return (
      <FormField>
        <Text style={[styles.question]}>Nº Ident. Fiscal/NIF</Text>
        <Picker
          mode="dropdown"
          iosIcon={<Icon name="arrow-down" style={{ color: colors.primary }} />}
          style={[styles.itemInput, styles.pickerContainer]}
          placeholder="Selecione"
          placeholderStyle={{ color: colors.primary }}
          placeholderIconColor={colors.primary}
          selectedValue={this.state.publicFunctionCode}
          onValueChange={publicFunctionCode =>
            this.onHandleSelect(publicFunctionCode, 'publicFunctionCode')
          }
        >
          <Picker.Item
            label="Aguardando emissão"
            value="Aguardando emissão"
            style={styles.picker}
          />
          <Picker.Item
            label="Sua Jurisdição"
            value="Sua Jurisdição"
            style={styles.picker}
          />
          <Picker.Item
            label="É dispensado do NIF"
            value="É dispensado do NIF"
            style={styles.picker}
          />
        </Picker>
      </FormField>
    );
  };

  errorInput = param => {
    const { sendButton } = this.state;
    let errorInputStyle = {
      borderColor:
        sendButton && this.props.errors[param] ? colors.warning : 'transparent',
    };
    return errorInputStyle;
  };
  errorDropdown = param => {
    let errorDropdownStyle = {
      borderWidth: 1,
      borderColor: this.props.errors[param] ? colors.warning : 'transparent',
    };

    if (!this.state[param] && this.state.sendButton) {
      if (!this.props.touched[param]) {
        this.props.setFieldTouched(param);
      }
    }
    return errorDropdownStyle;
  };

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
          <Modal
            // isVisible={true}
            isVisible={this.state.visibleModal}
          >
            <View style={styles.mainContainer}>
              <View style={styles.viewTitle}>
                <Text style={styles.textTitle}>Leia e Confirme nossos</Text>
                <Text style={styles.textTitleSub}>Termos de Adesão</Text>
              </View>
              <ScrollView style={styles.modalTexts}>
                <Text style={styles.infoText}>
                  Autorizo o reporte das informações constantes neste formulário (ou contrato) e 
                  nos demais acerca de alteração cadastral, bem como os dados financeiros relativos 
                  às minhas contas, meus investimentos, meu(s) produto(s) de previdência, seguros e 
                  consórcios às fontes pagadoras de rendimentos ou aos depositários centrais ou agentes 
                  escrituradores de títulos ou valores mobiliários inerentes à conta, às autoridades 
                  brasileiras ou estrangeiras conforme exigido nos termos da legislação aplicável no 
                  Brasil, dos acordos internacionais firmados pelo Brasil, ou ainda nos termos da 
                  legislação aplicável na jurisdição de nascimento, ou das quais sou cidadão, nacional ou 
                  residente.
                </Text>
              </ScrollView>
              <View style={styles.viewCheck}>
                <Checkbox
                  style={styles.checkbox}
                  onChange={() =>
                    this.setState({
                      confirmChecked: !this.state.confirmChecked,
                    })
                  }
                  checked={this.state.confirmChecked}
                />
                <Text>Li e aceito os termos de adesão</Text>
              </View>
              <View style={styles.modalButton}>
                {this.state.confirmChecked ? (
                  <Button
                    standard
                    primary
                    style={styles.proceedButton}
                    onPress={() => this.saveValidationDataMutation()}
                  >
                    <Text style={styles.proceedButtonText} uppercase={false}>
                      Continuar
                    </Text>
                  </Button>
                ) : (
                  <Button
                    standard
                    disabled
                    style={styles.proceedButton}
                    onPress={() => this.setState({ visibleModal: false })}
                  >
                    <Text style={styles.proceedButtonText} uppercase={false}>
                      Continuar
                    </Text>
                  </Button>
                )}
              </View>
            </View>
          </Modal>
          <Formik onSubmit={this.props.handleSubmit}>
            <View>
              <View style={styles.topbarValidationFields}>
                <View style={styles.logoContainer}>
                  <Image
                    source={require('../assets/i/logo.png')}
                    style={styles.logo}
                  />
                  <Text style={styles.title}>INFORMAÇÕES FISCAIS</Text>
                  <Text style={styles.dividerHeader} />
                </View>
              </View>
              <View style={styles.dataValidationHeader}>
                <FormField
                  validateStatus={this.getValidateStatus('Nome Completo')}
                  error={this.getError('Nome Completo')}
                >
                  <Text style={styles.question}> NOME COMPLETO</Text>
                  <TextInput
                    //
                    ref={c => {
                      this.completeName = c;
                    }}
                    returnKeyType="done"
                    value={this.state.completeName}
                    onBlur={() => setFieldTouched('Nome Completo')}
                    maxLength={32}
                    style={[styles.itemInput]}
                    onChangeText={completeName => {
                      this.onHandleInput(completeName, 'completeName');
                      setFieldValue('Nome Completo', completeName);
                    }}
                  />
                </FormField>
                <FormField
                  validateStatus={this.getValidateStatus('cpf')}
                  error={this.getError('cpf')}
                >
                  <Text style={[styles.question]}>CPF</Text>
                  <TextInput
                    //
                    ref={c => {
                      this.cpf = c;
                    }}
                    returnKeyType="done"
                    value={this.state.cpfField}
                    onBlur={() => setFieldTouched('cpf')}
                    selectTextOnFocus={false}
                    keyboardType="numeric"
                    style={[styles.itemInput]}
                    onChangeText={cpfField => {
                      this.mask(cpfField, 'cpfField');
                      setFieldValue('cpf', cpfField);
                    }}
                    maxLength={18}
                  />
                </FormField>
                <FormField
                  validateStatus={this.getValidateStatus(
                    'Tipo de Identificação'
                  )}
                  error={this.getError('Tipo de Identificação')}
                >
                  <Text style={[styles.question]}>TIPO DE IDENTIFICAÇÃO</Text>
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: 'Rubik-Light',
                      color: colors.primary,
                      marginLeft: 10,
                    }}
                  >
                    O mesmo da foto do passo anterior
                  </Text>
                  <TextInput
                    //
                    ref={c => {
                      this.idType = c;
                    }}
                    returnKeyType="done"
                    value={this.state.idType}
                    onBlur={() => setFieldTouched('Tipo de Identificação')}
                    selectTextOnFocus={false}
                    style={[styles.itemInput]}
                    onChangeText={idType => {
                      this.mask(idType, 'idType');
                      setFieldValue('Tipo de Identificação', idType);
                    }}
                    maxLength={18}
                  />
                </FormField>
                <FormField
                  validateStatus={this.getValidateStatus('Número do Documento')}
                  error={this.getError('Número do Documento')}
                >
                  <Text style={[styles.question]}>NÚMERO DO DOCUMENTO</Text>
                  <TextInput
                    //
                    ref={c => {
                      this.identification = c;
                    }}
                    returnKeyType="done"
                    value={this.state.identification}
                    onBlur={() => setFieldTouched('Número do Documento')}
                    selectTextOnFocus={false}
                    keyboardType="numeric"
                    style={[styles.itemInput]}
                    onChangeText={identification => {
                      this.mask(identification, 'identification');
                      setFieldValue('Número do Documento', identification);
                    }}
                    maxLength={18}
                  />
                </FormField>
                <FormField
                  validateStatus={this.getValidateStatus('Órgão Emissor')}
                  error={this.getError('Órgão Emissor')}
                >
                  <Text style={[styles.question]}>ÓRGÃO EMISSOR</Text>
                  <TextInput
                    //
                    ref={c => {
                      this.idGovernmentIssue = c;
                    }}
                    returnKeyType="done"
                    value={this.state.idGovernmentIssue}
                    onBlur={() => setFieldTouched('Órgão Emissor')}
                    selectTextOnFocus={false}
                    style={[styles.itemInput]}
                    onChangeText={idGovernmentIssue => {
                      this.mask(idGovernmentIssue, 'idGovernmentIssue');
                      setFieldValue('Órgão Emissor', idGovernmentIssue);
                    }}
                    maxLength={18}
                  />
                </FormField>
                <FormField
                  validateStatus={this.getValidateStatus('Data da Emissão')}
                  error={this.getError('Data da Emissão')}
                >
                  <Text style={[styles.question]}>DATA DA EMISSÃO</Text>
                  <TextInput
                    //
                    ref={c => {
                      this.idIssueDate = c;
                    }}
                    returnKeyType="done"
                    value={this.state.idIssueDate}
                    onBlur={() => setFieldTouched('Data da Emissão')}
                    selectTextOnFocus={false}
                    keyboardType="numeric"
                    style={[styles.itemInput]}
                    onChangeText={idIssueDate => {
                      this.mask(idIssueDate, 'idIssueDate');
                      setFieldValue('Data da Emissão', idIssueDate);
                    }}
                    maxLength={18}
                  />
                </FormField>
                <FormField
                  validateStatus={this.getValidateStatus('Data de Validade')}
                  error={this.getError('Data de Validade')}
                >
                  <Text style={[styles.question]}>DATA DE VALIDADE</Text>
                  <TextInput
                    //
                    ref={c => {
                      this.idExpireDate = c;
                    }}
                    returnKeyType="done"
                    value={this.state.idExpireDate}
                    onBlur={() => setFieldTouched('Data de Validade')}
                    selectTextOnFocus={false}
                    keyboardType="numeric"
                    style={[styles.itemInput]}
                    onChangeText={idExpireDate => {
                      this.mask(idExpireDate, 'idExpireDate');
                      setFieldValue('Data de Validade', idExpireDate);
                    }}
                    maxLength={18}
                  />
                </FormField>
                <FormField
                  validateStatus={this.getValidateStatus('País Emissor')}
                  error={this.getError('País Emissor')}
                >
                  <Text style={[styles.question]}>PAÍS EMISSOR</Text>
                  <TextInput
                    //
                    ref={c => {
                      this.idIssueCountry = c;
                    }}
                    returnKeyType="done"
                    value={this.state.idIssueCountry}
                    onBlur={() => setFieldTouched('País Emissor')}
                    selectTextOnFocus={false}
                    style={[styles.itemInput]}
                    onChangeText={idIssueCountry => {
                      this.mask(idIssueCountry, 'idIssueCountry');
                      setFieldValue('País Emissor', idIssueCountry);
                    }}
                    maxLength={18}
                  />
                </FormField>
                <FormField
                  validateStatus={this.getValidateStatus('Data de Nascimento')}
                  error={this.getError('Data de Nascimento')}
                >
                  <Text style={[styles.question]}>DATA DE NASCIMENTO</Text>
                  <TextInput
                    //
                    ref={c => {
                      this.birthdate = c;
                    }}
                    returnKeyType="done"
                    value={this.state.birthdate}
                    onBlur={() => setFieldTouched('Data de Nascimento')}
                    selectTextOnFocus={false}
                    keyboardType="numeric"
                    style={[styles.itemInput]}
                    onChangeText={birthdate => {
                      this.mask(birthdate, 'birthdate');
                      setFieldValue('Data de Nascimento', birthdate);
                    }}
                    maxLength={18}
                  />
                </FormField>
                <FormField
                  validateStatus={this.getValidateStatus('País de Nascimento')}
                  error={this.getError('País de Nascimento')}
                >
                  <Text style={[styles.question]}>PAÍS DE NASCIMENTO</Text>
                  <TextInput
                    //
                    ref={c => {
                      this.birthCountry = c;
                    }}
                    returnKeyType="done"
                    value={this.state.birthCountry}
                    onBlur={() => setFieldTouched('País de Nascimento')}
                    selectTextOnFocus={false}
                    style={[styles.itemInput]}
                    onChangeText={birthCountry => {
                      this.mask(birthCountry, 'birthCountry');
                      setFieldValue('País de Nascimento', birthCountry);
                    }}
                    maxLength={18}
                  />
                </FormField>
                {this.state.birthCountry === 'Brasil' ? (
                  <View />
                ) : (
                  <View>
                    <FormField>
                      <Text style={[styles.question]}>
                        Nº Ident. Fiscal/NIF
                      </Text>
                      <TextInput
                        ref={c => {
                          this.nIdentFiscal = c;
                        }}
                        returnKeyType="done"
                        value={this.state.nIdentFiscal}
                        onBlur={() => setFieldTouched('Nº Ident. Fiscal/NIF')}
                        selectTextOnFocus={false}
                        keyboardType="numeric"
                        style={[styles.itemInput]}
                        onChangeText={nIdentFiscal => {
                          this.mask(nIdentFiscal, 'nIdentFiscal');
                          setFieldValue('Nº Ident. Fiscal/NIF', nIdentFiscal);
                        }}
                        maxLength={9}
                      />
                    </FormField>
                    {!this.state.nIdentFiscal && (
                      <FormField>
                        <Text style={[styles.question]}>
                          Motivo por qual não tem o NIF
                        </Text>
                        <Picker
                          mode="dropdown"
                          iosIcon={
                            <Icon
                              name="arrow-down"
                              style={{ color: colors.primary }}
                            />
                          }
                          style={[styles.itemInput, styles.pickerContainer]}
                          placeholder="Selecione"
                          placeholderStyle={{ color: colors.primary }}
                          placeholderIconColor={colors.primary}
                          selectedValue={this.state.publicFunctionCode}
                          onValueChange={publicFunctionCode =>
                            this.onHandleSelect(
                              publicFunctionCode,
                              'birthCountryPublicFunctionCode'
                            )
                          }
                        >
                          <Picker.Item
                            label="Selecione"
                            value="Selecione"
                            style={styles.picker}
                          />
                          <Picker.Item
                            label="Aguardando emissão"
                            value="Aguardando emissão"
                            style={styles.picker}
                          />
                          <Picker.Item
                            label="Sua Jurisdição"
                            value="Sua Jurisdição"
                            style={styles.picker}
                          />
                          <Picker.Item
                            label="É dispensado do NIF"
                            value="É dispensado do NIF"
                            style={styles.picker}
                          />
                        </Picker>
                      </FormField>
                    )}
                  </View>
                )}
                <FormField
                  validateStatus={this.getValidateStatus('Local de Nascimento')}
                  error={this.getError('Local de Nascimento')}
                >
                  <Text style={[styles.question]}>
                    LOCAL DE NASCIMENTO (Cidade)
                  </Text>
                  <TextInput
                    //
                    ref={c => {
                      this.birthLocal = c;
                    }}
                    returnKeyType="done"
                    value={this.state.birthLocal}
                    onBlur={() => setFieldTouched('Local de Nascimento')}
                    selectTextOnFocus={false}
                    style={[styles.itemInput]}
                    onChangeText={birthLocal => {
                      this.mask(birthLocal, 'birthLocal');
                      setFieldValue('Local de Nascimento', birthLocal);
                    }}
                    maxLength={18}
                  />
                </FormField>
                <FormField
                  validateStatus={this.getValidateStatus('Nacionalidade')}
                  error={this.getError('Nacionalidade')}
                >
                  <Text style={[styles.question]}>NACIONALIDADE</Text>
                  <TextInput
                    //
                    ref={c => {
                      this.nationality = c;
                    }}
                    returnKeyType="done"
                    value={this.state.nationality}
                    onBlur={() => setFieldTouched('Nacionalidade')}
                    selectTextOnFocus={false}
                    style={[styles.itemInput]}
                    onChangeText={nationality => {
                      this.mask(nationality, 'nationality');
                      setFieldValue('Nacionalidade', nationality);
                    }}
                    maxLength={18}
                  />
                </FormField>
                {this.state.nationality.length > 0 && (
                  <FormField>
                    <Text style={[styles.question]}>Nº Ident. Fiscal/NIF</Text>
                    <TextInput
                      ref={c => {
                        this.nIdentFiscalPais = c;
                      }}
                      keyboardType="numeric"
                      returnKeyType="done"
                      value={this.state.nIdentFiscal}
                      onBlur={() => setFieldTouched('Nº Ident. Fiscal/NIF')}
                      selectTextOnFocus={false}
                      style={[styles.itemInput]}
                      onChangeText={nIdentFiscal => {
                        this.mask(nIdentFiscal, 'nIdentFiscal');
                        setFieldValue('Nº Ident. Fiscal/NIF', nIdentFiscal);
                      }}
                      maxLength={9}
                    />
                  </FormField>
                )}
                <Text style={styles.question}>
                  POSSUI ALGUMA NACIONALIDADE ALÉM DA DECLARADA?
                </Text>
                <View style={[styles.itemInput, styles.checkBoxContainer]}>
                  <Text style={styles.question2}>
                    {this.state.otherNationality ? 'SIM' : 'NÃO'}
                  </Text>
                  <Switch
                    onBlur={() => setFieldTouched('otherNationality')}
                    backgroundActive={colors.primary}
                    backgroundInactive="#cecece"
                    circleBorderWidth={0}
                    value={this.state.otherNationality}
                    onValueChange={otherNationality => {
                      this.setState({
                        otherNationality,
                      });
                      setFieldValue('otherNationality', otherNationality);
                    }}
                  />
                </View>
                {!this.state.otherNationality ? (
                  <View />
                ) : (
                  <View>
                    <FormField>
                      <Text style={[styles.question]}>
                        Nº Ident. Fiscal/NIF
                      </Text>
                      <TextInput
                        ref={c => {
                          this.nIdentFiscal = c;
                        }}
                        returnKeyType="done"
                        value={this.state.nIdentFiscal}
                        onBlur={() => setFieldTouched('Nº Ident. Fiscal/NIF')}
                        selectTextOnFocus={false}
                        keyboardType="numeric"
                        style={[styles.itemInput]}
                        onChangeText={nIdentFiscal => {
                          this.mask(nIdentFiscal, 'nIdentFiscal');
                          setFieldValue('Nº Ident. Fiscal/NIF', nIdentFiscal);
                        }}
                        maxLength={9}
                      />
                    </FormField>
                    {!this.state.nIdentFiscal && (
                      <FormField>
                        <Text style={[styles.question]}>
                          Motivo por qual não tem o NIF
                        </Text>
                        <Picker
                          mode="dropdown"
                          iosIcon={
                            <Icon
                              name="arrow-down"
                              style={{ color: colors.primary }}
                            />
                          }
                          style={[styles.itemInput, styles.pickerContainer]}
                          placeholder="Selecione"
                          placeholderStyle={{ color: colors.primary }}
                          placeholderIconColor={colors.primary}
                          selectedValue={this.state.publicFunctionCode}
                          onValueChange={publicFunctionCode =>
                            this.onHandleSelect(
                              publicFunctionCode,
                              'birthLocalPublicFunctionCode'
                            )
                          }
                        >
                          <Picker.Item
                            label="Selecione"
                            value="Selecione"
                            style={styles.picker}
                          />
                          <Picker.Item
                            label="Aguardando emissão"
                            value="Aguardando emissão"
                            style={styles.picker}
                          />
                          <Picker.Item
                            label="Sua Jurisdição"
                            value="Sua Jurisdição"
                            style={styles.picker}
                          />
                          <Picker.Item
                            label="É dispensado do NIF"
                            value="É dispensado do NIF"
                            style={styles.picker}
                          />
                        </Picker>
                      </FormField>
                    )}
                  </View>
                )}
                <Text style={styles.question}>
                  POSSUI ALGUMA RESIDÊNCIA FISCAL DIFERENTE DA BRASILEIRA?
                </Text>
                <View style={[styles.itemInput, styles.checkBoxContainer]}>
                  <Text style={styles.question2}>
                    {this.state.usaResidenceVisa ? 'SIM' : 'NÃO'}
                  </Text>
                  <Switch
                    onBlur={() => setFieldTouched('usaResidenceVisa')}
                    backgroundActive={colors.primary}
                    backgroundInactive="#cecece"
                    circleBorderWidth={0}
                    value={this.state.usaResidenceVisa}
                    onValueChange={usaResidenceVisa => {
                      this.setState({
                        usaResidenceVisa,
                      });
                      setFieldValue('usaResidenceVisa', usaResidenceVisa);
                    }}
                  />
                </View>
                {!this.state.usaResidenceVisa ? (
                  <View />
                ) : (
                  <View>
                    <FormField>
                      <Text style={[styles.question]}>
                        Nº Ident. Fiscal/NIF
                      </Text>
                      <TextInput
                        ref={c => {
                          this.nIdentFiscal = c;
                        }}
                        returnKeyType="done"
                        keyboardType="numeric"
                        value={this.state.nIdentFiscal}
                        onBlur={() => setFieldTouched('Nº Ident. Fiscal/NIF')}
                        selectTextOnFocus={false}
                        style={[styles.itemInput]}
                        onChangeText={nIdentFiscal => {
                          this.mask(nIdentFiscal, 'nIdentFiscal');
                          setFieldValue('Nº Ident. Fiscal/NIF', nIdentFiscal);
                        }}
                        maxLength={9}
                      />
                    </FormField>
                    {!this.state.nIdentFiscal && (
                      <FormField>
                        <Text style={[styles.question]}>
                          Motivo por qual não tem o NIF
                        </Text>
                        <Picker
                          mode="dropdown"
                          iosIcon={
                            <Icon
                              name="arrow-down"
                              style={{ color: colors.primary }}
                            />
                          }
                          style={[styles.itemInput, styles.pickerContainer]}
                          placeholder="Selecione"
                          placeholderStyle={{ color: colors.primary }}
                          placeholderIconColor={colors.primary}
                          selectedValue={this.state.publicFunctionCode}
                          onValueChange={publicFunctionCode =>
                            this.onHandleSelect(
                              publicFunctionCode,
                              'usaResidenceVisaPublicFunctionCode'
                            )
                          }
                        >
                          <Picker.Item
                            label="Selecione"
                            value="Selecione"
                            style={styles.picker}
                          />
                          <Picker.Item
                            label="Aguardando emissão"
                            value="Aguardando emissão"
                            style={styles.picker}
                          />
                          <Picker.Item
                            label="Sua Jurisdição"
                            value="Sua Jurisdição"
                            style={styles.picker}
                          />
                          <Picker.Item
                            label="É dispensado do NIF"
                            value="É dispensado do NIF"
                            style={styles.picker}
                          />
                        </Picker>
                      </FormField>
                    )}
                  </View>
                )}
                <Text style={styles.question}>
                  POSSUI VISTO DE RESIDÊNCIA PERMANENTE VÁLIDO EM OUTROS PAÍSES,
                  COMO POR EXEMPLO GREEN CARD?
                </Text>
                <View style={[styles.itemInput, styles.checkBoxContainer]}>
                  <Text style={styles.question2}>
                    {this.state.greenCard ? 'SIM' : 'NÃO'}
                  </Text>
                  <Switch
                    onBlur={() => setFieldTouched('greenCard')}
                    backgroundActive={colors.primary}
                    backgroundInactive="#cecece"
                    circleBorderWidth={0}
                    value={this.state.greenCard}
                    onValueChange={greenCard => {
                      this.setState({
                        greenCard,
                      });
                      setFieldValue('greenCard', greenCard);
                    }}
                  />
                </View>
                {!this.state.greenCard ? (
                  <View />
                ) : (
                  <View>
                    <FormField>
                      <Text style={[styles.question]}>
                        Nº Ident. Fiscal/NIF
                      </Text>
                      <TextInput
                        ref={c => {
                          this.nIdentFiscal = c;
                        }}
                        returnKeyType="done"
                        keyboardType="numeric"
                        value={this.state.nIdentFiscal}
                        onBlur={() => setFieldTouched('Nº Ident. Fiscal/NIF')}
                        selectTextOnFocus={false}
                        style={[styles.itemInput]}
                        onChangeText={nIdentFiscal => {
                          this.mask(nIdentFiscal, 'nIdentFiscal');
                          setFieldValue('Nº Ident. Fiscal/NIF', nIdentFiscal);
                        }}
                        maxLength={9}
                      />
                    </FormField>
                    {!this.state.nIdentFiscal && (
                      <FormField>
                        <Text style={[styles.question]}>
                          Motivo por qual não tem o NIF
                        </Text>
                        <Picker
                          mode="dropdown"
                          iosIcon={
                            <Icon
                              name="arrow-down"
                              style={{ color: colors.primary }}
                            />
                          }
                          style={[styles.itemInput, styles.pickerContainer]}
                          placeholder="Selecione"
                          placeholderStyle={{ color: colors.primary }}
                          placeholderIconColor={colors.primary}
                          selectedValue={this.state.publicFunctionCode}
                          onValueChange={publicFunctionCode =>
                            this.onHandleSelect(
                              publicFunctionCode,
                              'greenCardPublicFunctionCode'
                            )
                          }
                        >
                          <Picker.Item
                            label="Selecione"
                            value="Selecione"
                            style={styles.picker}
                          />
                          <Picker.Item
                            label="Aguardando emissão"
                            value="Aguardando emissão"
                            style={styles.picker}
                          />
                          <Picker.Item
                            label="Sua Jurisdição"
                            value="Sua Jurisdição"
                            style={styles.picker}
                          />
                          <Picker.Item
                            label="É dispensado do NIF"
                            value="É dispensado do NIF"
                            style={styles.picker}
                          />
                        </Picker>
                      </FormField>
                    )}
                  </View>
                )}
                <Text style={styles.question}>
                  POSSUI QUALQUER OPÇÃO ACIMA E/OU EM CASO DE NASCIMENTO OU
                  NACIONALIDADE EM PAÍS ESTRANGEIRO?
                </Text>
                <View style={[styles.itemInput, styles.checkBoxContainer]}>
                  <Text style={styles.question2}>
                    {this.state.hasOutInfo ? 'SIM' : 'NÃO'}
                  </Text>
                  <Switch
                    onBlur={() => setFieldTouched('hasOutInfo')}
                    backgroundActive={colors.primary}
                    backgroundInactive="#cecece"
                    circleBorderWidth={0}
                    value={this.state.hasOutInfo}
                    onValueChange={hasOutInfo => {
                      this.setState({
                        hasOutInfo,
                      });
                      setFieldValue('hasOutInfo', hasOutInfo);
                    }}
                  />
                </View>
                {!this.state.hasOutInfo ? (
                  <View />
                ) : (
                  <View>
                    <FormField>
                      <Text style={[styles.question]}>
                        Nº Ident. Fiscal/NIF
                      </Text>
                      <TextInput
                        ref={c => {
                          this.nIdentFiscal = c;
                        }}
                        returnKeyType="done"
                        keyboardType="numeric"
                        value={this.state.nIdentFiscal}
                        onBlur={() => setFieldTouched('Nº Ident. Fiscal/NIF')}
                        selectTextOnFocus={false}
                        style={[styles.itemInput]}
                        onChangeText={nIdentFiscal => {
                          this.mask(nIdentFiscal, 'nIdentFiscal');
                          setFieldValue('Nº Ident. Fiscal/NIF', nIdentFiscal);
                        }}
                        maxLength={9}
                      />
                    </FormField>
                    {!this.state.nIdentFiscal && (
                      <FormField>
                        <Text style={[styles.question]}>
                          Motivo por qual não tem o NIF
                        </Text>
                        <Picker
                          mode="dropdown"
                          iosIcon={
                            <Icon
                              name="arrow-down"
                              style={{ color: colors.primary }}
                            />
                          }
                          style={[styles.itemInput, styles.pickerContainer]}
                          placeholder="Selecione"
                          placeholderStyle={{ color: colors.primary }}
                          placeholderIconColor={colors.primary}
                          selectedValue={this.state.publicFunctionCode}
                          onValueChange={publicFunctionCode =>
                            this.onHandleSelect(
                              publicFunctionCode,
                              'hasOutInfoPublicFunctionCode'
                            )
                          }
                        >
                          <Picker.Item
                            label="Selecione"
                            value="Selecione"
                            style={styles.picker}
                          />
                          <Picker.Item
                            label="Aguardando emissão"
                            value="Aguardando emissão"
                            style={styles.picker}
                          />
                          <Picker.Item
                            label="Sua Jurisdição"
                            value="Sua Jurisdição"
                            style={styles.picker}
                          />
                          <Picker.Item
                            label="É dispensado do NIF"
                            value="É dispensado do NIF"
                            style={styles.picker}
                          />
                        </Picker>
                      </FormField>
                    )}
                  </View>
                )}
                {(this.state.hasOutInfo ||
                  this.state.otherNationality ||
                  this.state.usaResidenceVisa ||
                  this.state.greenCard) && (
                  <View>
                    <FormField
                      validateStatus={this.getValidateStatus(
                        'outRefCountryOne'
                      )}
                      error={this.getError('outRefCountryOne')}
                    >
                      <Text style={[styles.question]}>PAÍS</Text>
                      <TextInput
                        ref={c => {
                          this.outRefCountryOne = c;
                        }}
                        returnKeyType="done"
                        value={this.state.outRefCountryOne}
                        onBlur={() => setFieldTouched('outRefCountryOne')}
                        selectTextOnFocus={false}
                        style={[
                          styles.itemInput,
                          this.errorInput('outRefCountryOne'),
                        ]}
                        onChangeText={outRefCountryOne => {
                          this.mask(outRefCountryOne, 'outRefCountryOne');
                          setFieldValue('outRefCountryOne', outRefCountryOne);
                        }}
                        maxLength={18}
                      />
                    </FormField>
                    <FormField
                      validateStatus={this.getValidateStatus('outIdNumberOne')}
                      error={this.getError('outIdNumberOne')}
                    >
                      <Text style={[styles.question]}>
                        NUMERO DE IDENTIFICAÇÃO FISCAL
                      </Text>
                      <TextInput
                        ref={c => {
                          this.outIdNumberOne = c;
                        }}
                        returnKeyType="done"
                        value={this.state.outIdNumberOne}
                        onBlur={() => setFieldTouched('outIdNumberOne')}
                        selectTextOnFocus={false}
                        keyboardType="numeric"
                        style={[
                          styles.itemInput,
                          this.errorInput('outIdNumberOne'),
                        ]}
                        onChangeText={outIdNumberOne => {
                          this.mask(outIdNumberOne, 'outIdNumberOne');
                          setFieldValue('outIdNumberOne', outIdNumberOne);
                        }}
                        maxLength={18}
                      />
                    </FormField>
                    <Text style={styles.question}>
                      AGUARDANDO A EMISSÃO DO NÚMERO DE IDENTIFICAÇÃO FISCAL, O
                      QUAL COMPROMETO-ME A ENTREGAR TÃO LOGO O RECEBA.
                    </Text>
                    <View style={[styles.itemInput, styles.checkBoxContainer]}>
                      <Text style={styles.question2}>
                        {this.state.outWaitingIdNumberOne ? 'SIM' : 'NÃO'}
                      </Text>
                      <Switch
                        onBlur={() => setFieldTouched('outWaitingIdNumberOne')}
                        backgroundActive={colors.primary}
                        backgroundInactive="#cecece"
                        circleBorderWidth={0}
                        value={this.state.outWaitingIdNumberOne}
                        onValueChange={outWaitingIdNumberOne => {
                          this.setState({
                            outWaitingIdNumberOne,
                          });
                          setFieldValue(
                            'outWaitingIdNumberOne',
                            outWaitingIdNumberOne
                          );
                        }}
                      />
                    </View>
                    <Text style={styles.question}>
                      SUA JURISDIÇÃO NÃO EXIGE O NIF
                    </Text>
                    <View style={[styles.itemInput, styles.checkBoxContainer]}>
                      <Text style={styles.question2}>
                        {this.state.outNeededNifOne ? 'SIM' : 'NÃO'}
                      </Text>
                      <Switch
                        onBlur={() => setFieldTouched('outNeededNifOne')}
                        backgroundActive={colors.primary}
                        backgroundInactive="#cecece"
                        circleBorderWidth={0}
                        value={this.state.outNeededNifOne}
                        onValueChange={outNeededNifOne => {
                          this.setState({
                            outNeededNifOne,
                          });
                          setFieldValue('outNeededNifOne', outNeededNifOne);
                        }}
                      />
                    </View>
                    <Text style={styles.question}>
                      É DISPENSADO DO NIF, DE ACORDO COM AS REGRAS DO ÓRGÃO DE
                      ADMINISTRAÇÃO TRIBUTARIA NO EXTERIOR.
                    </Text>
                    <View style={[styles.itemInput, styles.checkBoxContainer]}>
                      <Text style={styles.question2}>
                        {this.state.outDispensedNifOne ? 'SIM' : 'NÃO'}
                      </Text>
                      <Switch
                        onBlur={() => setFieldTouched('outDispensedNifOne')}
                        backgroundActive={colors.primary}
                        backgroundInactive="#cecece"
                        circleBorderWidth={0}
                        value={this.state.outDispensedNifOne}
                        onValueChange={outDispensedNifOne => {
                          this.setState({
                            outDispensedNifOne,
                          });
                          setFieldValue(
                            'outDispensedNifOne',
                            outDispensedNifOne
                          );
                        }}
                      />
                    </View>
                    {(this.state.outWaitingIdNumberOne ||
                      this.state.outDispensedNifOne ||
                      this.state.outNeededNifOne) && (
                      <View>
                        <FormField
                          validateStatus={this.getValidateStatus(
                            'outRefCountryTwo'
                          )}
                          error={this.getError('outRefCountryTwo')}
                        >
                          <Text style={[styles.question]}>PAÍS</Text>
                          <TextInput
                            ref={c => {
                              this.outRefCountryTwo = c;
                            }}
                            returnKeyType="done"
                            value={this.state.outRefCountryTwo}
                            onBlur={() => setFieldTouched('outRefCountryTwo')}
                            selectTextOnFocus={false}
                            style={[
                              styles.itemInput,
                              this.errorInput('outRefCountryTwo'),
                            ]}
                            onChangeText={outRefCountryTwo => {
                              this.mask(outRefCountryTwo, 'outRefCountryTwo');
                              setFieldValue(
                                'outRefCountryTwo',
                                outRefCountryTwo
                              );
                            }}
                            maxLength={18}
                          />
                        </FormField>
                        <FormField
                          validateStatus={this.getValidateStatus(
                            'outIdNumberTwo'
                          )}
                          error={this.getError('outIdNumberTwo')}
                        >
                          <Text style={[styles.question]}>
                            NUMERO DE IDENTIFICAÇÃO FISCAL
                          </Text>
                          <TextInput
                            ref={c => {
                              this.outIdNumberTwo = c;
                            }}
                            returnKeyType="done"
                            value={this.state.outIdNumberTwo}
                            onBlur={() => setFieldTouched('outIdNumberTwo')}
                            selectTextOnFocus={false}
                            keyboardType="numeric"
                            style={[
                              styles.itemInput,
                              this.errorInput('outIdNumberTwo'),
                            ]}
                            onChangeText={outIdNumberTwo => {
                              this.mask(outIdNumberTwo, 'outIdNumberTwo');
                              setFieldValue('outIdNumberTwo', outIdNumberTwo);
                            }}
                            maxLength={18}
                          />
                        </FormField>
                        <Text style={styles.question}>
                          AGUARDANDO A EMISSÃO DO NÚMERO DE IDENTIFICAÇÃO
                          FISCAL, O QUAL COMPROMETO-ME A ENTREGAR TÃO LOGO O
                          RECEBA.
                        </Text>
                        <View
                          style={[styles.itemInput, styles.checkBoxContainer]}
                        >
                          <Text style={styles.question2}>
                            {this.state.outWaitingIdNumberTwo ? 'SIM' : 'NÃO'}
                          </Text>
                          <Switch
                            onBlur={() =>
                              setFieldTouched('outWaitingIdNumberTwo')
                            }
                            backgroundActive={colors.primary}
                            backgroundInactive="#cecece"
                            circleBorderWidth={0}
                            value={this.state.outWaitingIdNumberTwo}
                            onValueChange={outWaitingIdNumberTwo => {
                              this.setState({
                                outWaitingIdNumberTwo,
                              });
                              setFieldValue(
                                'outWaitingIdNumberTwo',
                                outWaitingIdNumberTwo
                              );
                            }}
                          />
                        </View>
                        <Text style={styles.question}>
                          SUA JURISDIÇÃO NÃO EXIGE O NIF
                        </Text>
                        <View
                          style={[styles.itemInput, styles.checkBoxContainer]}
                        >
                          <Text style={styles.question2}>
                            {this.state.outNeededNifTwo ? 'SIM' : 'NÃO'}
                          </Text>
                          <Switch
                            onBlur={() => setFieldTouched('outNeededNifTwo')}
                            backgroundActive={colors.primary}
                            backgroundInactive="#cecece"
                            circleBorderWidth={0}
                            value={this.state.outNeededNifTwo}
                            onValueChange={outNeededNifTwo => {
                              this.setState({
                                outNeededNifTwo,
                              });
                              setFieldValue('outNeededNifTwo', outNeededNifTwo);
                            }}
                          />
                        </View>
                        <Text style={styles.question}>
                          É DISPENSADO DO NIF, DE ACORDO COM AS REGRAS DO ÓRGÃO
                          DE ADMINISTRAÇÃO TRIBUTARIA NO EXTERIOR.
                        </Text>
                        <View
                          style={[styles.itemInput, styles.checkBoxContainer]}
                        >
                          <Text style={styles.question2}>
                            {this.state.outDispensedNifTwo ? 'SIM' : 'NÃO'}
                          </Text>
                          <Switch
                            onBlur={() => setFieldTouched('outDispensedNifTwo')}
                            backgroundActive={colors.primary}
                            backgroundInactive="#cecece"
                            circleBorderWidth={0}
                            value={this.state.outDispensedNifTwo}
                            onValueChange={outDispensedNifTwo => {
                              this.setState({
                                outDispensedNifTwo,
                              });
                              setFieldValue(
                                'outDispensedNifTwo',
                                outDispensedNifTwo
                              );
                            }}
                          />
                        </View>
                      </View>
                    )}
                    {(this.state.outWaitingIdNumberTwo ||
                      this.state.outDispensedNifTwo ||
                      this.state.outNeededNifTwo) && (
                      <View>
                        <FormField
                          validateStatus={this.getValidateStatus(
                            'outRefCountryThree'
                          )}
                          error={this.getError('outRefCountryThree')}
                        >
                          <Text style={[styles.question]}>PAÍS</Text>
                          <TextInput
                            ref={c => {
                              this.outRefCountryThree = c;
                            }}
                            returnKeyType="done"
                            value={this.state.outRefCountryThree}
                            onBlur={() => setFieldTouched('outRefCountryThree')}
                            selectTextOnFocus={false}
                            style={[
                              styles.itemInput,
                              this.errorInput('outRefCountryThree'),
                            ]}
                            onChangeText={outRefCountryThree => {
                              this.mask(
                                outRefCountryThree,
                                'outRefCountryThree'
                              );
                              setFieldValue(
                                'outRefCountryThree',
                                outRefCountryThree
                              );
                            }}
                            maxLength={18}
                          />
                        </FormField>
                        <FormField
                          validateStatus={this.getValidateStatus(
                            'outIdNumberThree'
                          )}
                          error={this.getError('outIdNumberThree')}
                        >
                          <Text style={[styles.question]}>
                            NUMERO DE IDENTIFICAÇÃO FISCAL
                          </Text>
                          <TextInput
                            ref={c => {
                              this.outIdNumberThree = c;
                            }}
                            returnKeyType="done"
                            value={this.state.outIdNumberThree}
                            onBlur={() => setFieldTouched('outIdNumberThree')}
                            selectTextOnFocus={false}
                            keyboardType="numeric"
                            style={[
                              styles.itemInput,
                              this.errorInput('outIdNumberThree'),
                            ]}
                            onChangeText={outIdNumberThree => {
                              this.mask(outIdNumberThree, 'outIdNumberThree');
                              setFieldValue(
                                'outIdNumberThree',
                                outIdNumberThree
                              );
                            }}
                            maxLength={18}
                          />
                        </FormField>
                        <Text style={styles.question}>
                          AGUARDANDO A EMISSÃO DO NÚMERO DE IDENTIFICAÇÃO
                          FISCAL, O QUAL COMPROMETO-ME A ENTREGAR TÃO LOGO O
                          RECEBA.
                        </Text>
                        <View
                          style={[styles.itemInput, styles.checkBoxContainer]}
                        >
                          <Text style={styles.question2}>
                            {this.state.outWaitingIdNumberThree ? 'SIM' : 'NÃO'}
                          </Text>
                          <Switch
                            onBlur={() =>
                              setFieldTouched('outWaitingIdNumberThree')
                            }
                            backgroundActive={colors.primary}
                            backgroundInactive="#cecece"
                            circleBorderWidth={0}
                            value={this.state.outWaitingIdNumberThree}
                            onValueChange={outWaitingIdNumberThree => {
                              this.setState({
                                outWaitingIdNumberThree,
                              });
                              setFieldValue(
                                'outWaitingIdNumberThree',
                                outWaitingIdNumberThree
                              );
                            }}
                          />
                        </View>
                        <Text style={styles.question}>
                          SUA JURISDIÇÃO NÃO EXIGE O NIF
                        </Text>
                        <View
                          style={[styles.itemInput, styles.checkBoxContainer]}
                        >
                          <Text style={styles.question2}>
                            {this.state.outNeededNifThree ? 'SIM' : 'NÃO'}
                          </Text>
                          <Switch
                            onBlur={() => setFieldTouched('outNeededNifThree')}
                            backgroundActive={colors.primary}
                            backgroundInactive="#cecece"
                            circleBorderWidth={0}
                            value={this.state.outNeededNifThree}
                            onValueChange={outNeededNifThree => {
                              this.setState({
                                outNeededNifThree,
                              });
                              setFieldValue(
                                'outNeededNifThree',
                                outNeededNifThree
                              );
                            }}
                          />
                        </View>
                        <Text style={styles.question}>
                          É DISPENSADO DO NIF, DE ACORDO COM AS REGRAS DO ÓRGÃO
                          DE ADMINISTRAÇÃO TRIBUTARIA NO EXTERIOR.
                        </Text>
                        <View
                          style={[styles.itemInput, styles.checkBoxContainer]}
                        >
                          <Text style={styles.question2}>
                            {this.state.outDispensedNifThree ? 'SIM' : 'NÃO'}
                          </Text>
                          <Switch
                            onBlur={() =>
                              setFieldTouched('outDispensedNifThree')
                            }
                            backgroundActive={colors.primary}
                            backgroundInactive="#cecece"
                            circleBorderWidth={0}
                            value={this.state.outDispensedNifThree}
                            onValueChange={outDispensedNifThree => {
                              this.setState({
                                outDispensedNifThree,
                              });
                              setFieldValue(
                                'outDispensedNifThree',
                                outDispensedNifThree
                              );
                            }}
                          />
                        </View>
                      </View>
                    )}
                    {(this.state.outWaitingIdNumberThree ||
                      this.state.outDispensedNifThree ||
                      this.state.outNeededNifThree) && (
                      <View>
                        <FormField
                          validateStatus={this.getValidateStatus(
                            'outRefCountryFour'
                          )}
                          error={this.getError('outRefCountryFour')}
                        >
                          <Text style={[styles.question]}>PAÍS</Text>
                          <TextInput
                            ref={c => {
                              this.outRefCountryFour = c;
                            }}
                            returnKeyType="done"
                            value={this.state.outRefCountryFour}
                            onBlur={() => setFieldTouched('outRefCountryFour')}
                            selectTextOnFocus={false}
                            style={[
                              styles.itemInput,
                              this.errorInput('outRefCountryFour'),
                            ]}
                            onChangeText={outRefCountryFour => {
                              this.mask(outRefCountryFour, 'outRefCountryFour');
                              setFieldValue(
                                'outRefCountryFour',
                                outRefCountryFour
                              );
                            }}
                            maxLength={18}
                          />
                        </FormField>
                        <FormField
                          validateStatus={this.getValidateStatus(
                            'outIdNumberFour'
                          )}
                          error={this.getError('outIdNumberFour')}
                        >
                          <Text style={[styles.question]}>
                            NUMERO DE IDENTIFICAÇÃO FISCAL
                          </Text>
                          <TextInput
                            ref={c => {
                              this.outIdNumberFour = c;
                            }}
                            returnKeyType="done"
                            value={this.state.outIdNumberFour}
                            onBlur={() => setFieldTouched('outIdNumberFour')}
                            selectTextOnFocus={false}
                            keyboardType="numeric"
                            style={[
                              styles.itemInput,
                              this.errorInput('outIdNumberFour'),
                            ]}
                            onChangeText={outIdNumberFour => {
                              this.mask(outIdNumberFour, 'outIdNumberFour');
                              setFieldValue('outIdNumberFour', outIdNumberFour);
                            }}
                            maxLength={18}
                          />
                        </FormField>
                        <Text style={styles.question}>
                          AGUARDANDO A EMISSÃO DO NÚMERO DE IDENTIFICAÇÃO
                          FISCAL, O QUAL COMPROMETO-ME A ENTREGAR TÃO LOGO O
                          RECEBA.
                        </Text>
                        <View
                          style={[styles.itemInput, styles.checkBoxContainer]}
                        >
                          <Text style={styles.question2}>
                            {this.state.outWaitingIdNumberFour ? 'SIM' : 'NÃO'}
                          </Text>
                          <Switch
                            backgroundActive={colors.primary}
                            backgroundInactive="#cecece"
                            circleBorderWidth={0}
                            value={this.state.outWaitingIdNumberFour}
                            onValueChange={outWaitingIdNumberFour =>
                              this.setState({
                                outWaitingIdNumberFour,
                              })
                            }
                          />
                        </View>
                        <Text style={styles.question}>
                          SUA JURISDIÇÃO NÃO EXIGE O NIF
                        </Text>
                        <View
                          style={[styles.itemInput, styles.checkBoxContainer]}
                        >
                          <Text style={styles.question2}>
                            {this.state.outNeededNifFour ? 'SIM' : 'NÃO'}
                          </Text>
                          <Switch
                            backgroundActive={colors.primary}
                            backgroundInactive="#cecece"
                            circleBorderWidth={0}
                            value={this.state.outNeededNifFour}
                            onValueChange={outNeededNifFour =>
                              this.setState({
                                outNeededNifFour,
                              })
                            }
                          />
                        </View>
                        <Text style={styles.question}>
                          É DISPENSADO DO NIF, DE ACORDO COM AS REGRAS DO ÓRGÃO
                          DE ADMINISTRAÇÃO TRIBUTARIA NO EXTERIOR.
                        </Text>
                        <View
                          style={[styles.itemInput, styles.checkBoxContainer]}
                        >
                          <Text style={styles.question2}>
                            {this.state.outDispensedNifFour ? 'SIM' : 'NÃO'}
                          </Text>
                          <Switch
                            backgroundActive={colors.primary}
                            backgroundInactive="#cecece"
                            circleBorderWidth={0}
                            value={this.state.outDispensedNifFour}
                            onValueChange={value =>
                              this.setState({
                                outDispensedNifFour: value,
                              })
                            }
                          />
                        </View>
                      </View>
                    )}
                  </View>
                )}
                <Text style={styles.dividerFotter} />
                <Text style={styles.question}>
                  RENUNCIOU/ABDICOU A NACIONALIDADE?(NECESSÁRIA A APRESENTAÇÃO
                  DE DOCUMENTAÇÃO COMPROBATÓRIA)
                </Text>
                <View style={[styles.itemInput, styles.checkBoxContainer]}>
                  <Text style={styles.question2}>
                    {this.state.resignNationality ? 'SIM' : 'NÃO'}
                  </Text>
                  <Switch
                    onBlur={() => setFieldTouched('resignNationality')}
                    backgroundActive={colors.primary}
                    backgroundInactive="#cecece"
                    circleBorderWidth={0}
                    value={this.state.resignNationality}
                    onValueChange={resignNationality => {
                      this.setState({ resignNationality });
                      setFieldValue('resignNationality', resignNationality);
                    }}
                  />
                </View>
                {this.state.resignNationality && (
                  <View>
                    <FormField
                      validateStatus={this.getValidateStatus(
                        'resignNationalityCountry'
                      )}
                      error={this.getError('resignNationalityCountry')}
                    >
                      <Text style={[styles.question]}>
                        QUAL PAÍS HOUVE A RENÚNCIA/ABDICAÇÃO?
                      </Text>
                      <TextInput
                        ref={c => {
                          this.resignNationalityCountry = c;
                        }}
                        returnKeyType="done"
                        value={this.state.resignNationalityCountry}
                        onBlur={() =>
                          setFieldTouched('resignNationalityCountry')
                        }
                        selectTextOnFocus={false}
                        style={[
                          styles.itemInput,
                          this.errorInput('resignNationalityCountry'),
                        ]}
                        onChangeText={resignNationalityCountry => {
                          this.mask(
                            resignNationalityCountry,
                            'resignNationalityCountry'
                          );
                          setFieldValue(
                            'resignNationalityCountry',
                            resignNationalityCountry
                          );
                        }}
                        maxLength={18}
                      />
                    </FormField>
                  </View>
                )}
              </View>
              <Button
                standard
                primary
                style={styles.proceedButton}
                // onPress={this.saveValidationDataMutation}
                onPress={() => {
                  this.setState({
                    visibleModal: !this.state.visibleModal,
                  });
                }}
              >
                <Text style={[styles.proceedButtonText]} uppercase={false}>
                  Enviar
                </Text>
              </Button>
            </View>
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

export default compose(
  withApollo,
  graphql(TAX_INFORMATION, { name: 'taxInformation' })
)(withNavigation(enhancer(taxInformation)));

const styles = StyleSheet.create({
  dividerFotter: {
    height: 1,
    width: '100%',
    backgroundColor: '#b9b9b9',
    marginVertical: moderateScale(30),
  },
  titleDividerImp: {
    color: 'red',
    textAlign: 'center',
    marginTop: moderateScale(35),
  },
  dividerSection: {
    textAlign: 'center',
    marginBottom: moderateScale(35),
  },
  container: {
    flex: 1,
  },

  //MODAL
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 26,
  },
  proceedButton: {
    width: Dimensions.get('window').width / 2,
    justifyContent: 'center',
    marginTop: moderateScale(15),
    alignSelf: 'center',
    marginBottom: moderateScale(30),
  },
  proceedButtonText: {
    fontSize: moderateScale(18),
    color: '#fff',
    fontFamily: 'Rubik-Light',
  },
  pickerContainer: {
    width: '100%',
    alignSelf: 'center',
    borderRadius: 10,
  },
  dataValidationHeader: {
    elevation: 0,
    flex: 2,
    backgroundColor: '#f0eeef',
    padding: 10,
  },
  checkBoxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(10),
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

  //ETAPA DO CADASTRAL

  topbarValidationFields: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    shadowOpacity: 0.75,
    shadowRadius: 55,
    elevation: 7,
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: moderateScale(8),
  },
  logo: {
    resizeMode: 'contain',
    width: moderateScale(200, 0.5),
    paddingHorizontal: moderateScale(10),
    marginVertical: moderateScale(20),
  },
  title: {
    color: colors.text,
    fontSize: moderateScale(20),
    fontFamily: 'Rubik-Medium',
    textAlign: 'center',
  },
  dividerHeader: {
    width: '15%',
    height: moderateScale(5),
    borderRadius: 10,
    backgroundColor: '#a18037',
    marginVertical: moderateScale(10),
  },

  //INPUT
  itemInput: {
    textAlign: 'left',
    fontFamily: 'Rubik-Regular',
    fontSize: moderateScale(16),
    color: '#808281',
    borderColor: 'transparent',
    borderWidth: 1,
    borderRadius: 10,
    width: '100%',
    backgroundColor: '#eae6e5',
    paddingHorizontal: moderateScale(20),
    height: 48,
  },
  question: {
    color: '#9fa0a5',
    fontSize: moderateScale(14),
    fontFamily: 'Rubik-Light',
    textAlign: 'left',
    paddingTop: moderateScale(18),
    paddingBottom: moderateScale(5),
  },
  checkbox: {
    backgroundColor: '#ccc',
    color: '#a18037',
    borderColor: 'transparent',
    padding: moderateScale(2),
  },
  viewTitle: {
    padding: moderateScale(10),
  },
  textTitle: {
    textAlign: 'center',
    fontSize: moderateScale(18),
  },
  textTitleSub: {
    fontSize: moderateScale(28),
    fontFamily: 'Rubik-Regular',
    textAlign: 'center',
  },
  viewCheck: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
