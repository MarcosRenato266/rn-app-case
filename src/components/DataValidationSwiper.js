import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import CPF from 'gerador-validador-cpf';
import { Icon, Picker, CardItem, Body } from 'native-base';
import { withApollo, compose, graphql } from 'react-apollo';
import { Switch } from 'react-native-switch';
import { BallIndicator } from 'react-native-indicators';
import { withNavigation } from 'react-navigation';
import VMasker from 'vanilla-masker';
import Checkbox from 'react-native-custom-checkbox';
import Collapsible from 'react-native-collapsible';
import { withFormik, Formik } from 'formik';
import Modal from 'react-native-modal';
import _ from 'lodash';
import { TextInputMask } from 'react-native-masked-text';
import yup from '../lib/yup';
import colors from '../config/colors';
import CpfError from './CpfError';
import { moderateScale } from '../config/scaling';
import { country_list, country_listAndroid } from '../utils/Countries';
import {
  sexo,
  sexoAndroid,
  skinColor,
  skinColorAndroid,
  estadoCivil,
  estadoCivilAndroid,
  conhecimentoFinanceiroAndroid,
  conhecimentoFinanceiro,
  envioCorrespondencia,
  envioCorrespondenciaAndroid,
  segmentoInvestidor,
  segmentoInvestidorAndroid,
  idType,
  idTypeAndroid,
} from '../utils/Picker';
import { states, statesAndroid } from '../utils/BrazilCities';
import Button from './Button';
import { iphoneX } from '../utils/IphoneX';
import { SET_INVESTOR_DATA } from '../graphql/mutations';
import FormField from './FormField';
import CepError from './CepError';
import { capacidadeCiv, capacidadeCivAndroid } from '../utils/CapacidadeCiv';
import { bancos, bancosAndroid } from '../utils/Bancos';

//Local storage
import { _getData } from '../lib/AsyncStorage';

const enhancer = withFormik({
  validationSchema: yup.object().shape({
    titularName: yup
      .string()
      .min(7, 'Digite seu Nome Completo')
      .required('Esse campo é obrigatório'),
    governmentIssue: yup.string().required('Esse campo é obrigatório'),
    idType: yup
      .mixed()
      .oneOf(['CNH', 'RG', 'RNE'])
      .required('Esse campo é obrigatório'),
    identification: yup
      .string()
      .min(5, 'Campo Inválido')
      .required('Esse campo é obrigatório'),
    idIssueDate: yup
      .string()
      .min(8, 'Data inválida')
      .required('Esse campo é obrigatório'),
    birthPlace: yup
      .string()
      .min(4, 'Campo inválido')
      .required('Esse campo é obrigatório'),
    birthdayDate: yup
      .string()
      .min(8, 'Data inválida')
      .required('Esse campo é obrigatório'),
    birthCounty: yup.mixed().notRequired('Esse campo é obrigatório'),
    nationality: yup.mixed().notRequired('Esse campo é obrigatório'),
    gender: yup.mixed().required('Esse campo é obrigatório'),
    skinColor: yup.mixed().required('Esse campo é obrigatório'),
    zipCode: yup.string().notRequired(),
    address: yup.string().required('Esse campo é obrigatório'),
    addressComplement: yup.string().notRequired(),
    neighborhood: yup.string().required('Esse campo é obrigatório'),
    city: yup.string().required('Esse campo é obrigatório'),
    stateCode: yup.mixed().required('Esse campo é obrigatório'),
    phone: yup
      .string()
      .min(10, 'Telefone Inválido')
      .required('Esse campo é obrigatório'),
    email: yup
      .string()
      .email('Insira um email válido')
      .required('Esse campo é obrigatório'),
    fatherName: yup.string().min(7, 'Digite o Nome Completo'),
    motherName: yup
      .string()
      .min(7, 'Digite o Nome Completo')
      .required('Esse campo é obrigatório'),
    'Nome do Terceiro': yup.string().min(7, 'Digite o Nome Completo'),
    civCapacity: yup
      .mixed()
      .oneOf(['MAIOR', 'MENOR', 'INCAPAZ'])
      .required('Esse Campo é obrigatório'),
    hasRepresentative: yup.string().notRequired(),
    // .when('civCapacity', {
    //   is: val => val === 'MENOR' || val === 'INCAPAZ',
    //   then: yup.string().required('Obrigatório'),
    //   otherwise: yup.string().notRequired(),
    // }),
    representativeName: yup
      .string()
      .min(7, 'Digite o Nome Completo')
      .notRequired()
      .when('civCapacity', {
        is: val => val === 'MENOR' || val === 'INCAPAZ',
        then: yup.string().required('Obrigatório'),
        otherwise: yup.string().notRequired(),
      }),
    representativeCpf: yup
      .string()
      .notRequired()
      .when('civCapacity', {
        is: val => val === 'MENOR' || val === 'INCAPAZ',
        then: yup.string().required('Obrigatório'),
        otherwise: yup.string().notRequired(),
      }),
    representativeRelationShip: yup
      .string()
      .notRequired()
      .when('civCapacity', {
        is: val => val === 'MENOR' || val === 'INCAPAZ',
        then: yup.string().required('Obrigatório'),
        otherwise: yup.string().notRequired(),
      }),
    maritalStatus: yup
      .mixed()
      .oneOf([
        'SOLTEIRO(A)',
        'CASADO(A)',
        'VIÚVO(A)',
        'DIVORCIADO(A)',
        'SEPARADO(A)',
      ])
      .required('Esse Campo é obrigatório'),
    spouseName: yup
      .string()
      .min(7, 'Digite o nome completo')
      .notRequired()
      .when('maritalStatus', {
        is: val => val === 'CASADO(A)',
        then: yup.string().required('Obrigatório'),
        otherwise: yup.string().notRequired(),
      }),
    spouseCpf: yup
      .string()
      .notRequired()
      .when('maritalStatus', {
        is: val => val === 'CASADO(A)',
        then: yup.string().required('Obrigatório'),
        otherwise: yup.string().notRequired(),
      }),
    ocupation: yup.string().required('Esse campo é obrigatório'),
    workCompany: yup.string().notRequired(),
    ocupationZipCode: yup.string().notRequired(),
    // .when('workCompany', {
    //   is: val => val !== undefined,
    //   then: yup.string().required('Obrigatório'),
    //   otherwise: yup.string().notRequired(),
    // }),
    ocupationAddress: yup
      .string()
      .notRequired()
      .when('workCompany', {
        is: val => val !== undefined,
        then: yup.string().required('Obrigatório'),
        otherwise: yup.string().notRequired(),
      }),
    ocupationNeighborhood: yup
      .string()
      .notRequired()
      .when('workCompany', {
        is: val => val !== undefined,
        then: yup.string().required('Obrigatório'),
        otherwise: yup.string().notRequired(),
      }),
    ocupationCity: yup
      .string()
      .notRequired()
      .when('workCompany', {
        is: val => val !== undefined,
        then: yup.string().required('Obrigatório'),
        otherwise: yup.string().notRequired(),
      }),
    ocupationStateCode: yup
      .mixed()
      .notRequired()
      .when('workCompany', {
        is: val => val !== undefined,
        then: yup.string().required('Obrigatório'),
        otherwise: yup.string().notRequired(),
      }),
    ocupationNationality: yup.mixed().notRequired(),
    // .when('workCompany', {
    //   is: val => val !== undefined,
    //   then: yup.string().required('Obrigatório'),
    //   otherwise: yup.string().notRequired(),
    // }),
    ocupationPhone: yup
      .string()
      .min(13, 'Telefone inválido')
      .notRequired()
      .when('workCompany', {
        is: val => val !== undefined,
        then: yup.string().required('Obrigatório'),
        otherwise: yup.string().notRequired(),
      })
      .min(10, 'Telefone Inválido'),
    ocupationEmail: yup
      .string()
      .notRequired()
      .when('workCompany', {
        is: val => val !== undefined,
        then: yup.string().required('Obrigatório'),
        otherwise: yup.string().notRequired(),
      }),
    salary: yup
      .string()
      .notRequired()
      .when('workCompany', {
        is: val => val !== undefined,
        then: yup.string().required('Obrigatório'),
        otherwise: yup.string().notRequired(),
      }),
    salaryAditional: yup.string().notRequired(),
    salaryAditionalSpecification: yup
      .string()
      .notRequired()
      .when('salaryAditional', {
        is: val => val !== undefined,
        then: yup.string().required('Esse campo é Obrigatório'),
        otherwise: yup.string().notRequired(),
      }),
    investorFinanceKnowledgment: yup
      .mixed()
      .required('Esse campo é obrigatório'),
    optionToSendCorrespondence: yup
      .mixed()
      .required('Esse campo é obrigatório'),
    allowTransmissionOfOrders: yup.boolean(),
    investorThirdPartyName: yup
      .string()
      .notRequired()
      .when('allowTransmissionOfOrders', {
        is: val => val === true,
        then: yup.string().required('Esse campo é Obrigatório'),
        otherwise: yup.string().notRequired(),
      }),
    investorThirdPartyCpf: yup
      .string()
      .notRequired()
      .when('allowTransmissionOfOrders', {
        is: val => val === true,
        then: yup.string().required('Esse campo é Obrigatório'),
        otherwise: yup.string().notRequired(),
      }),
    bank: yup.string().required('Esse campo é obrigatório'),
    bankBranch: yup
      .number()
      .min(4, 'Inválido')
      .required('Esse campo é obrigatório'),
    bankBranchDigit: yup.string().required(),
    bankAccount: yup
      .number()
      .min(4, 'Inválido')
      .required('Esse campo é obrigatório'),
    bankAccountDigit: yup.string().required(),
    addNewBankAccount: yup.boolean(),
    secondBank: yup
      .string()
      .notRequired()
      .when('addNewBankAccount', {
        is: val => val === true,
        then: yup.string().required('Obrigatório'),
        otherwise: yup.string().notRequired(),
      }),
    secondBankBranch: yup
      .string()
      .notRequired()
      .when('addNewBankAccount', {
        is: val => val === true,
        then: yup.string().required('Obrigatório'),
        otherwise: yup.string().notRequired(),
      }),
    secondBankBranchDigit: yup
      .string()
      .notRequired()
      .when('addNewBankAccount', {
        is: val => val === true,
        then: yup.string().required('Obrigatório'),
        otherwise: yup.string().notRequired(),
      }),
    secondBankAccount: yup
      .string()
      .notRequired()
      .when('addNewBankAccount', {
        is: val => val === true,
        then: yup.string().required('Obrigatório'),
        otherwise: yup.string().notRequired(),
      }),
    secondBankAccountDigit: yup
      .string()
      .notRequired()
      .when('addNewBankAccount', {
        is: val => val === true,
        then: yup.string().required('Obrigatório'),
        otherwise: yup.string().notRequired(),
      }),
    secondBankAccountOwner: yup
      .string()
      .notRequired()
      .when('addNewBankAccount', {
        is: val => val === true,
        then: yup.string().required('Obrigatório'),
        otherwise: yup.string().notRequired(),
      }),
    secondBankAccountOwnerCpf: yup
      .string()
      .notRequired()
      .when('addNewBankAccount', {
        is: val => val === true,
        then: yup.string().required('Obrigatório'),
        otherwise: yup.string().notRequired(),
      }),
    'Segundo Nome do Co-titular': yup
      .string()
      .min(7, 'Favor inserir nome completo')
      .notRequired(),
    secondBankCoOwnerAccountCpf: yup.string().notRequired(),
  }),
});

class DataValidationSwiper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Container color
      backgroundColor: null,

      // Error
      errorVal: false,

      // Cpf invalid error
      secondBankAccountOwnerCpfError: false,
      secondBankCoOwnerAccountCpfError: false,
      spouseCpfError: false,
      representativeCpfError: false,
      investorThirdPartyCpfError: false,
      bankCoOwnerAccountCpfError: false,
      bankAccountOwnerCpfError: false,
      cpfError: false,

      // Client Id
      clientId: '',

      //SelectBank Flag
      selectBank: false,
      selectSecondBank: false,
      bankAccountOwnerCpfFlag: false,

      // Controled Bottom Input
      borderBottomColor: '#ccc',
      borderBottomWidth: 3,

      // Modal
      visibleModal: false,

      // Correios API
      cepJSON: {},

      // Input Border Color
      inputBorderColor: 'transparent',

      // Mutation Fields - Client Register
      titularName: '',
      socialName: '',
      cpf: '',
      idType: '',
      identification: '',
      governmentIssue: '',
      idIssueDate: '',
      birthPlace: '',
      nationality: 'Brasil',
      birthState: '',
      birthCounty: 'Brasil',
      gender: '',
      skinColor: '',
      birthdayDate: '',
      maritalStatus: '',
      spouseName: '',
      spouseCpf: '',
      fatherName: '',
      motherName: '',
      address: '',
      addressComplement: '',
      neighborhood: '',
      city: '',
      stateCode: '',
      zipCode: '',
      country: 'Brasil',
      phone: '',
      email: '',
      civCapacity: '',
      hasRepresentative: false,
      representativeName: '',
      representativeCpf: '',
      representativeRelationShip: '',
      relevantPublicFunction: false,
      linkWithPublicAgent: false,
      usaResidenceVisa: false,
      hasFinanceRepresentative: false,
      receiveExtract: true,
      receiveIncome: true,
      optionToSendCorrespondence: '',
      allowDistributionToSendExtractByEmail: false, ///////
      investorFinanceKnowledgment: '',
      investorAnsweredSuitabilitySurvey: false,
      investorAnsweredSuitabilitySurveyReason: '',
      investorProfile: '',
      investorSegment: 'VAREJO',
      allowTransmissionOfOrders: false,
      operateByThirdPartyAccount: false,
      linkedToIntermediary: false,
      investorThirdPartyName: '',
      investorThirdPartyCpf: '',
      allowTheDebitOnMyBradescoAccount: false,
      ocupation: '',
      workCompany: '',
      ocupationCity: '',
      ocupationStateCode: '',
      ocupationZipCode: '',
      ocupationNationality: 'Brasil',
      ocupationPhone: '',
      ocupationEmail: '',
      ocupationAddress: '',
      ocupationAddressComplement: '',
      ocupationNeighborhood: '',
      salary: '',
      salaryAditional: '',
      salaryAditionalSpecification: '',
      salaryTotal: '',
      bank: '',
      bankCode: '',
      bankBranch: '',
      bankBranchDigit: '',
      bankAccount: '',
      bankAccountDigit: '',
      addNewBankAccount: false,
      bankAccountOwner: '',
      bankAccountOwnerCpf: '',
      bankCoOwnerAccount: '',
      bankCoOwnerAccountCpf: '',
      secondBank: '',
      secondBankCode: '',
      secondBankBranch: '',
      secondBankBranchDigit: '',
      secondBankAccount: '',
      secondBankAccountDigit: '',
      secondBankAccountOwner: '',
      secondBankAccountOwnerCpf: '',
      secondBankCoOwnerAccount: '',
      secondBankCoOwnerAccountCpf: '',
      alreadyUpdateCPFValidation: false,
      patrimonialTypeOne: '',
      patrimonialTypeOneValue: '',
      patrimonialTypeTwo: '',
      patrimonialTypeTwoValue: '',
      patrimonialTypeThree: '',
      patrimonialTypeThreeValue: '',
      patrimonialTypeFour: '',
      patrimonialTypeFourValue: '',
      totalPatrimonial: '',
      totalPatrimonialValue: '',

      salaryValue: '',

      // Flags
      patrimonialSwitch: false,
      saving: false,
      blankField: false,
      invalidCep: false,
      sendButton: false,
      cpfRepeated: false,
      invalidDate: false,
      invalidCpf: false,

      modalTitle: '',
      modalText: '',

      // COLAPSE
      // COLAPSE
      // COLAPSE
      // COLAPSE

      pessoais: true,
      cojuge: true,
      investidor: true,
      professional: true,
      patrimonial: true,

      confirmChecked: false,
    };
    this.onChangeTextDelayed = _.debounce(this.mask, 2000);
  }

  componentWillMount() {
    _getData('cpf').then(res => this.setState({ cpf: res.value.toString() }));
    if (this.state.fetchingCep) {
      return this.savingSpinner();
    }
  }

  renderButton = (text, onPress) => (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text style={styles.modalText}>{text}</Text>
      </View>
    </TouchableOpacity>
  );

  onHandleInput = (value, key) => {
    this.setState({ [key]: value });
  };

  onHandleSelect = (value, key) => {
    this.setState({ [key]: value });
  };

  mask = (value, key) => {
    const regex = /^[\d,.?!a-zA-Z]+$/g;
    let valueUnMasked = this.unMask(value);
    let inputMasked = value;
    if (key === 'cpf' || key.includes('Cpf')) {
      inputMasked = VMasker.toPattern(value, '999.999.999-99');
    } else if (key.includes('Date')) {
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
      let unsmakedInput = this.unMask(value);
      inputMasked =
        'R$ ' + VMasker.toMoney(VMasker.toNumber(unsmakedInput) * 100);
    } else if (key.includes('Number') || key === 'identification') {
      inputMasked = VMasker.toNumber(value);
    } else if (key === 'zipCode' || key.includes('ZipCode')) {
      inputMasked = VMasker.toPattern(value, '99999-999');
    }
    this.setState({
      [key]: inputMasked,
      borderBottomColor: colors.primary,
      invalidDate: false,
    });
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

  unMask = value => {
    const regex = /[^a-zA-Z0-9]/g;
    return (value || '')
      .toString()
      .replace(regex, '')
      .replace('R', '');
  };

  onHandleDropdown = (value, key) => {
    if (value === 'country') {
      if (Platform.OS === 'android') {
        return country_listAndroid.map(country => {
          return (
            <Picker.Item
              label={country}
              value={country === 'Selecione' ? 0 : country}
              style={styles.picker}
            />
          );
        });
      } else {
        return country_list.map(country => {
          return (
            <Picker.Item
              label={country}
              value={country}
              style={styles.picker}
            />
          );
        });
      }
    } else if (value === 'state') {
      if (Platform.OS === 'android') {
        return statesAndroid.map(state => {
          return (
            <Picker.Item
              label={state.Nome}
              value={state.Sigla}
              style={styles.picker}
            />
          );
        });
      } else {
        return states.map(state => {
          return (
            <Picker.Item
              label={state.Nome}
              value={state.Sigla}
              style={styles.picker}
            />
          );
        });
      }
    } else if (value === 'capacidade') {
      if (Platform.OS === 'android') {
        return capacidadeCivAndroid.map(capacidadeCiv => {
          return (
            <Picker.Item
              label={capacidadeCiv}
              value={capacidadeCiv === 'Selecione' ? 0 : capacidadeCiv}
              style={styles.picker}
            />
          );
        });
      } else {
        return capacidadeCiv.map(capacidadeCiv => {
          return (
            <Picker.Item
              label={capacidadeCiv}
              value={capacidadeCiv}
              style={styles.picker}
            />
          );
        });
      }
    } else if (value === 'banco') {
      if (Platform.OS === 'android') {
        return bancosAndroid.map(bancosAndroid => {
          return (
            <Picker.Item
              label={
                bancosAndroid.nome === 'Selecione'
                  ? 'Selecione'
                  : `${bancosAndroid.codigo} - ${bancosAndroid.nome}`
              }
              value={
                bancosAndroid.nome === 'Selecione' ? 0 : bancosAndroid.nome
              }
              style={styles.picker}
            />
          );
        });
      } else {
        return bancos.map(banco => {
          return (
            <Picker.Item
              label={`${banco.codigo} - ${banco.nome}`}
              value={banco.nome}
              style={styles.picker}
            />
          );
        });
      }
    } else if (value === 'gender') {
      if (Platform.OS === 'android') {
        return sexoAndroid.map(sexo => {
          return (
            <Picker.Item
              label={sexo.label}
              value={sexo.value}
              style={styles.picker}
            />
          );
        });
      } else {
        return sexo.map(sexo => {
          return (
            <Picker.Item label={sexo} value={sexo} style={styles.picker} />
          );
        });
      }
    } else if (value === 'estadoCivil') {
      if (Platform.OS === 'android') {
        return estadoCivilAndroid.map(estadoCivil => {
          return (
            <Picker.Item
              label={estadoCivil}
              value={estadoCivil === 'Selecione' ? 0 : estadoCivil}
              style={styles.picker}
            />
          );
        });
      } else {
        return estadoCivil.map(estadoCivil => {
          return (
            <Picker.Item
              label={estadoCivil}
              value={estadoCivil}
              style={styles.picker}
            />
          );
        });
      }
    } else if (value === 'conhecimentoFinanceiro') {
      if (Platform.OS === 'android') {
        return conhecimentoFinanceiroAndroid.map(conhecimentoFinanceiro => {
          return (
            <Picker.Item
              label={conhecimentoFinanceiro}
              value={
                conhecimentoFinanceiro === 'Selecione'
                  ? 0
                  : conhecimentoFinanceiro
              }
              style={styles.picker}
            />
          );
        });
      } else {
        return conhecimentoFinanceiro.map(conhecimentoFinanceiro => {
          return (
            <Picker.Item
              label={conhecimentoFinanceiro}
              value={conhecimentoFinanceiro}
              style={styles.picker}
            />
          );
        });
      }
    } else if (value === 'correspondencia') {
      if (Platform.OS === 'android') {
        return envioCorrespondenciaAndroid.map(correspondencia => {
          return (
            <Picker.Item
              label={correspondencia.label}
              value={
                correspondencia.label === 'Selecione'
                  ? 0
                  : correspondencia.value
              }
              style={styles.picker}
            />
          );
        });
      } else {
        return envioCorrespondencia.map(envioCorrespondencia => {
          return (
            <Picker.Item
              label={envioCorrespondencia.label}
              value={envioCorrespondencia.value}
              style={styles.picker}
            />
          );
        });
      }
    } else if (value === 'segmentoInvestidor') {
      if (Platform.OS === 'android') {
        return segmentoInvestidorAndroid.map(segmento => {
          return (
            <Picker.Item
              label={segmento}
              value={segmento === 'Selecione' ? 0 : segmento}
              style={styles.picker}
            />
          );
        });
      } else {
        return segmentoInvestidor.map(segmento => {
          return (
            <Picker.Item
              label={segmento}
              value={segmento}
              style={styles.picker}
            />
          );
        });
      }
    } else if (value === 'skinColor') {
      if (Platform.OS === 'android') {
        return skinColorAndroid.map(skinColor => {
          return (
            <Picker.Item
              label={skinColor}
              value={skinColor === 'Selecione' ? 0 : skinColor}
              style={styles.picker}
            />
          );
        });
      } else {
        return skinColor.map(skinColor => {
          return (
            <Picker.Item
              label={skinColor}
              value={skinColor}
              style={styles.picker}
            />
          );
        });
      }
    } else if (value === 'idType') {
      if (Platform.OS === 'android') {
        return idTypeAndroid.map(idType => {
          return (
            <Picker.Item
              label={idType}
              value={idType === 'Selecione' ? 0 : idType}
              style={styles.picker}
            />
          );
        });
      } else {
        return idType.map(idType => {
          return (
            <Picker.Item label={idType} value={idType} style={styles.picker} />
          );
        });
      }
    }
  };

  savingSpinner = () => {
    return <BallIndicator color={colors.primary} />;
  };
  selectBank = () => {
    const { bankFiltered } = this.state;
    if (bankFiltered.length <= 6) {
      return _.map(bankFiltered, banco => {
        return (
          <CardItem>
            <Body style={styles.containerAutoComplete}>
              <TouchableWithoutFeedback
                onPress={() =>
                  this.setState({
                    bank: `${banco.codigo} - ${banco.nome}`,
                    selectBank: false,
                  })
                }
              >
                <Text style={styles.associatedStyle}>
                  {`${banco.codigo} - ${banco.nome}`}
                </Text>
              </TouchableWithoutFeedback>
            </Body>
          </CardItem>
        );
      });
    }
  };

  selectSecondBank = () => {
    const { bankFiltered } = this.state;
    if (bankFiltered.length <= 6) {
      return _.map(bankFiltered, banco => {
        return (
          <CardItem>
            <Body style={styles.containerAutoComplete}>
              <TouchableWithoutFeedback
                onPress={() =>
                  this.setState({
                    secondBank: `${banco.codigo} - ${banco.nome}`,
                    selectSecondBank: false,
                  })
                }
              >
                <Text style={styles.associatedStyle}>
                  {`${banco.codigo} - ${banco.nome}`}
                </Text>
              </TouchableWithoutFeedback>
            </Body>
          </CardItem>
        );
      });
    }
  };

  checkCPFFieldsErro = () => {
    // CHECK CPF FIELD
    // this.state.cpf;
    // this.state.representativeCpf;
    // this.state.spouseCpf;
    // this.state.bankAccount;
    // this.state.bankCoOwnerAccountCpf;
    if (
      this.state.cpf === this.state.representativeCpf ||
      this.state.cpf === this.state.spouseCpf
    ) {
      return false;
    } else {
      return true;
    }
  };

  androidPicker = () => {
    if (Platform.OS === 'android') {
      return (
        <Picker.Item
          label="Selecione..."
          value="Selecione..."
          style={styles.picker}
        />
      );
    }
  };

  // MUTATION VALIDATION DATA

  saveValidationDataMutation = () => {
    this.setState(
      {
        sendButton: true,
        visibleModal: false,
      },
      () => {
        if (
          this.state.secondBankAccountOwnerCpfError ||
          this.state.secondBankCoOwnerAccountCpfError ||
          this.state.spouseCpfError ||
          this.state.representativeCpfError ||
          this.state.investorThirdPartyCpfError ||
          this.state.bankCoOwnerAccountCpfError ||
          this.state.cpfError
        )
          return;
        if (Object.keys(this.props.errors).length !== 0) {
          let errorsFieldNames = [];
          for (let key in this.props.errors) {
            errorsFieldNames.push(key);
          }
          this.setState({
            fetchingCep: false,
            backgroundColor: { backgroundColor: '#fff' },
          });
        } else {
          this.props
            .createInvestorData({
              variables: {
                input: {
                  titularName: this.state.titularName,
                  socialName: this.state.socialName,
                  cpf: this.state.cpf,
                  identityType: this.state.idType,
                  identityNumber: this.state.identification,
                  identityIssuingUnitName: this.state.governmentIssue,
                  identityExpeditionDate: this.state.idIssueDate,
                  placeOfBirth: this.state.birthPlace,
                  nationality: this.state.nationality,
                  birthCountry: this.state.birthCounty,
                  gender: this.state.gender,
                  skinColor: this.state.skinColor,
                  birthdate: this.state.birthdayDate,
                  maritalStatus: this.state.maritalStatus,
                  spouseName: this.state.spouseName,
                  spouseCpf: this.state.spouseCpf,
                  fatherName: this.state.fatherName,
                  motherName: this.state.motherName,
                  address: this.state.address,
                  addressComplement: this.state.addressComplement,
                  neighborhood: this.state.neighborhood,
                  city: this.state.city,
                  stateCode: this.state.stateCode,
                  cep: this.state.zipCode,
                  country: this.state.country,
                  phoneNumber: this.state.phone,
                  email: this.state.email,
                  civilCapacity: this.state.civCapacity,
                  hasRepresentative: this.state.hasRepresentative,
                  representativeName: this.state.representativeName,
                  representativeCpf: this.state.representativeCpf,
                  representativeRelationship: this.state
                    .representativeRelationShip,
                  relevantPublicFunction: this.state.relevantPublicFunction,
                  linkWithPublicAgent: this.state.linkWithPublicAgent,
                  nationalityTaxResidenceOrResidenceVisa: this.state
                    .usaResidenceVisa,
                  receiveExtract: this.state.receiveExtract,
                  receiveIncomeReport: this.state.receiveIncome,
                  optionToSendCorrespondence: this.state
                    .optionToSendCorrespondence,
                  allowDistributorToSendExtractsByEmail: this.state
                    .allowDistributionToSendExtractByEmail,
                  investorFinanceKnowledgement: this.state
                    .investorFinanceKnowledgment,
                  investorAnsweredSuitabilitySurvey: false,
                  investorAnsweredSuitabilitySurveyReason: this.state
                    .investorAnsweredSuitabilitySurveyReason,
                  investorProfile: this.state.investorProfile,
                  investorSegment: this.state.investorSegment,
                  allowTheTransmissionOfOrdersByRepresentative: this.state
                    .allowTransmissionOfOrders,
                  operateByThirdPartyAccounts: this.state
                    .operateByThirdPartyAccount,
                  linkedToTheIntermediary: this.state.linkedToIntermediary,
                  investorThirdPartyName: this.state.investorThirdPartyName,
                  investorThirdPartyCpf: this.state.investorThirdPartyCpf,
                  allowTheDebitOnMyBradescoAccountWhenUtilizedOnApplication: this
                    .state.allowTheDebitOnMyBradescoAccount,
                  realEstateThreeCurrentValue: this.state
                    .patrimonialTypeThreeValue,
                  realEstateFourType: this.state.patrimonialTypeFour,
                  realEstateFourCurrentValue: this.state
                    .patrimonialTypeFourValue,
                  totalEquityBaseDate: 'String',
                  specifyOtherIncome: this.state.salaryAditionalSpecification,
                  realEstateOneType: this.state.patrimonialTypeOne,
                  realEstateOneCurrentValue: this.state.patrimonialTypeOneValue,
                  realEstateTwoType: this.state.patrimonialTypeTwo,
                  realEstateTwoCurrentValue: this.state.patrimonialTypeTwoValue,
                  realEstateThreeType: this.state.patrimonialTypeThree,
                  totalEquityValue: this.state.totalPatrimonialValue.toString(),
                  proLaboreSalary: parseFloat(
                    VMasker.toNumber(this.state.salary).replace(',', '.')
                  ),
                  otherIncome: parseFloat(
                    VMasker.toNumber(this.state.salaryAditional).replace(
                      ',',
                      '.'
                    )
                  ),
                  totalIncome: parseFloat(
                    VMasker.toNumber(this.state.salaryTotal).replace(',', '.')
                  ),
                },
                inputProfessional: {
                  professionalOccupation: this.state.ocupation,
                  company: this.state.workCompany,
                  city: this.state.ocupationCity,
                  state: this.state.ocupationStateCode,
                  cep: this.state.ocupationZipCode,
                  country: this.state.ocupationNationality,
                  phoneNumber: this.state.ocupationPhone,
                  email: this.state.ocupationEmail,
                  comercialAddress: this.state.ocupationAddress,
                  ocupationAddressComplement: this.state
                    .ocupationAddressComplement,
                  neighborhood: this.state.ocupationNeighborhood,
                },
                inputBankAccountOne: {
                  bankName: this.state.bank,
                  bankNumber: 0,
                  agency: parseInt(this.state.bankBranch),
                  agencyDigit: parseInt(this.state.bankBranchDigit),
                  checkingAccount: parseInt(this.state.bankAccount),
                  checkingAccountDigit: parseInt(this.state.bankAccountDigit),
                  titularName: this.state.bankAccountOwner,
                  titularCpf: this.state.cpf,
                  coTitularOneName: this.state.bankCoOwnerAccount,
                  coTitularCpf: this.state.bankCoOwnerAccountCpf,
                  coTitularTwoName: '',
                },
                inputBankAccountTwo: {
                  bankName: this.state.secondBank,
                  bankNumber: 0,
                  agency: parseInt(this.state.secondBankBranch),
                  agencyDigit: parseInt(this.state.secondBankBranchDigit),
                  checkingAccount: parseInt(this.state.secondBankAccount),
                  checkingAccountDigit: parseInt(
                    this.state.secondBankAccountDigit
                  ),
                  titularName: this.state.secondBankAccountOwner,
                  titularCpf: this.state.secondBankAccountOwnerCpf,
                  coTitularOneName: this.state.secondBankCoOwnerAccount,
                  coTitularCpf: this.state.secondBankCoOwnerAccountCpf,
                  coTitularTwoName: '',
                },
              },
              // //BANK DATA
              // bank: '',
              // bankCode: '',
              // bankBranch: '',
              // bankBranchDigit: '',
              // bankAccount: '',
              // bankAccountDigit: '',
              // addNewBankAccount: false,
              // bankAccountOwner: '',
              // bankAccountOwnerCpf: '',
              // bankCoOwnerAccount: '',
              // bankCoOwnerAccountCpf: '',
              // secondBank: '',
              // secondBankCode: '',
              // secondBankBranch: '',
              // secondBankBranchDigit: '',
              // secondBankAccount: '',
              // secondBankAccountDigit: '',
              // secondBankAccountOwner: '',
              // secondBankAccountOwnerCpf: '',
              // secondBankCoOwnerAccount: '',
              // secondBankCoOwnerAccountCpf: '',
            })
            .then(data => {
              console.log(data);
              if (
                this.state.relevantPublicFunction ||
                this.state.linkWithPublicAgent
              ) {
                if (this.state.usaResidenceVisa) {
                  return this.props.navigation.navigate('PoliticallyExposed', {
                    navigateAfter: 'taxInformation',
                    userData: this.state,
                  });
                } else {
                  return this.props.navigation.navigate('PoliticallyExposed', {
                    userData: this.state,
                  });
                }
              }
              if (this.state.usaResidenceVisa) {
                return this.props.navigation.navigate('TaxInformation', {
                  userData: this.state,
                });
              }
              if (
                !this.state.usaResidenceVisa &&
                !(
                  this.state.relevantPublicFunction ||
                  this.state.linkWithPublicAgent
                )
              ) {
                return this.props.navigation.navigate('SecuritySteps', {
                  userData: this.state,
                });
              }
            })
            .catch(error => {
              this.setState({
                // modalTitle: 'Opss, algo deu errado.',
                // modalText:
                //   'Favor verifique se todos os campos estão preenchidos corretamente.',
                // visibleModal: !this.state.visibleModal,
                fetchingCep: false,
                inputBorderColor: colors.warning,
                backgroundColor: { backgroundColor: '#fff' },
              });
              console.log('error salvando dados', error);
            });
        }
      }
    );
  };

  getCep = (value, key) => {
    this.setState({ fetchingCep: true }, () => {
      if (key.includes('ocupation')) {
        fetch(`http://viacep.com.br/ws/${value}/json/`)
          .then(response => response.json())
          .then(response => {
            // if (data !== null && data !== undefined) {
            const { bairro, localidade, logradouro, uf } = response;
            let estado = _.filter(
              states,
              estado => estado.Sigla === uf
            );

            return this.setState(
              {
                ocupationAddress: logradouro,
                ocupationNeighborhood: bairro,
                ocupationCity: localidade,
                ocupationStateCode: uf,
                visibleModal: false,
                invalidCep: false,
              },
              () => {
                //TOUCH FIELDS FILLED BY FETCH
                this.touchOcupationFieldsProcess('ocupation');
              }
            );
            // }
          })
          .catch(error => {
            console.log('error fetch Cep', error);
            this.setState({
              fetchingCep: false,
              invalidCep: true,
              visibleModal: false,
            });
          });
      } else {
        fetch(`http://viacep.com.br/ws/${value}/json/`)
          .then(response => response.json())
          .then(response => {
            const { bairro, localidade, logradouro, uf } = response;
            let estado = _.filter(
              states,
              estado => estado.Sigla === uf
            );
            return this.setState(
              {
                address: logradouro,
                neighborhood: bairro,
                city: localidade,
                stateCode: uf,
                visibleModal: false,
                invalidCep: false,
              },
              () => {
                //TOUCH FIELDS FILLED BY FETCH
                this.touchOcupationFieldsProcess('default');
              }
            );
          })
          .catch(error => {
            console.log('error fetch Cep', error);
            this.setState({
              fetchingCep: false,
              invalidCep: true,
              visibleModal: false,
            });
          });
      }
    });
  };

  touchOcupationFieldsProcess = operation => {
    if (operation === 'ocupation') {
      this.props.setFieldValue('ocupationAddress', this.state.ocupationAddress);
      this.props.setFieldValue(
        'ocupationNeighborhood',
        this.state.ocupationNeighborhood
      );
      this.props.setFieldValue('ocupationCity', this.state.ocupationCity);
      this.props.setFieldValue(
        'ocupationStateCode',
        this.state.ocupationStateCode
      );
    } else {
      this.props.setFieldValue('address', this.state.address);
      this.props.setFieldValue('neighborhood', this.state.neighborhood);
      this.props.setFieldValue('city', this.state.city);
      this.props.setFieldValue('stateCode', this.state.stateCode);
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

  errorDropdown = param => {
    let errorDropdownStyle = {
      borderWidth: 1,
      borderColor: this.props.errors[param] ? colors.warning : 'transparent',
    };

    if (!this.state[param] && this.state.sendButton) {
      if (!this.props.touched[param]) {
        this.props.setFieldTouched(param);
      }
      return errorDropdownStyle;
    }
  };

  errorInput = param => {
    const { sendButton } = this.state;
    let errorInputStyle = {
      borderColor:
        sendButton && this.props.errors[param] ? colors.warning : 'transparent',
    };
    return errorInputStyle;
  };

  errorCpf = (param, error, key) => {
    if (param === 'cpf' || param === 'secondBankAccountOwnerCpf') {
      return this.setState({
        [error]:
          !CPF.validate(this.state[param]) || this.state[param].length === 0,
      });
    } else {
      return this.state[param] === this.state.cpf
        ? this.setState({ cpfRepeated: true, [param]: '' })
        : this.setState({ cpfRepeated: false });
    }
    return this.setState({
      [error]:
        CPF.validate(this.state[param]) || this.state[param].length === 0,
    });
  };

  _scrollToInput(reactNode) {
    // Add a 'scroll' ref to your ScrollView
    // return this.scroll.scrollToFocusedInput(reactNode);
    console.log('a');
  }

  updateTotalPatrimonio = () => {
    const {
      patrimonialTypeOneValue,
      patrimonialTypeTwoValue,
      patrimonialTypeThreeValue,
      patrimonialTypeFourValue,
    } = this.state;

    let one, two, three, four;

    one = 0;
    two = 0;
    three = 0;
    four = 0;

    patrimonialTypeOneValue
      ? (one = parseFloat(this.unMask(patrimonialTypeOneValue)) / 100)
      : one;
    patrimonialTypeTwoValue
      ? (two = parseFloat(this.unMask(patrimonialTypeTwoValue)) / 100)
      : two;
    patrimonialTypeThreeValue
      ? (three = parseFloat(this.unMask(patrimonialTypeThreeValue)) / 100)
      : three;
    patrimonialTypeFourValue
      ? (four = parseFloat(this.unMask(patrimonialTypeFourValue)) / 100)
      : four;

    let totalPatrimonialValue = one + two + three + four;
    
    console.log(totalPatrimonialValue)
    return this.setState({ totalPatrimonialValue });
  };

  newBankAccount = () => {
    const { setFieldValue, setFieldTouched } = this.props;
    return (
      <View>
        <FormField
          validateStatus={this.getValidateStatus('secondBank')}
          error={this.getError('secondBank')}
        >
          <Text style={styles.question}> BANCO </Text>
          <TextInput
            ref={c => {
              this.secondBank = c;
            }}
            returnKeyType="done"
            onBlur={() => setFieldTouched('secondBank')}
            value={this.state.secondBank}
            maxLength={32}
            style={[styles.itemInput, this.errorInput('secondBank')]}
            onChangeText={secondBank => {
              const filtered = _.filter(
                bancos,
                banco =>
                  banco.nome === secondBank ||
                  banco.nome.includes(secondBank) ||
                  banco.codigo === secondBank
              );
              this.setState({
                secondBank,
                bankFiltered: filtered,
                selectSecondBank: true,
                selectBank: false,
              });
              setFieldValue('secondBank', this.state.secondBank);
            }}
          />
        </FormField>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <FormField
            validateStatus={this.getValidateStatus('secondBankBranch')}
            error={this.getError('secondBankBranch')}
          >
            <Text style={styles.question}> AGÊNCIA </Text>
            <TextInput
              // onFocus={event => {
              //   // `bind` the function if you're using ES6 classes
              //   this._scrollToInput(ReactNative.findNodeHandle(event.target));
              // }}
              ref={c => {
                this.secondBankBranch = c;
              }}
              returnKeyType="done"
              onBlur={() => setFieldTouched('secondBankBranch')}
              value={this.state.secondBankBranch}
              keyboardType="numeric"
              maxLength={32}
              style={[
                styles.itemInput,
                { width: Dimensions.get('window').width / 2 },
                this.errorInput('secondBankBranch'),
              ]}
              onChangeText={secondBankBranch => {
                this.mask(secondBankBranch, 'secondBankBranch');
                setFieldValue('secondBankBranch', secondBankBranch);
              }}
            />
          </FormField>
          <FormField
            validateStatus={this.getValidateStatus('secondBankBranchDigit')}
            error={this.getError('secondBankBranchDigit')}
          >
            <Text style={styles.question}> DÍGITO </Text>
            <TextInput
              // onFocus={event => {
              //   // `bind` the function if you're using ES6 classes
              //   this._scrollToInput(ReactNative.findNodeHandle(event.target));
              // }}
              ref={c => {
                this.secondBankBranchDigit = c;
              }}
              returnKeyType="done"
              keyboardType="numeric"
              onBlur={() => setFieldTouched('secondBankBranchDigit')}
              value={
                this.state.secondBankBranchDigit.toString().length > 1
                  ? ''
                  : this.state.secondBankBranchDigit
              }
              maxLength={32}
              style={[
                styles.itemInput,
                { width: Dimensions.get('window').width / 4 },
                this.errorInput('secondBankBranchDigit'),
              ]}
              onChangeText={secondBankBranchDigit => {
                this.setState({ secondBankBranchDigit });
                setFieldValue('secondBankBranchDigit', secondBankBranchDigit);
              }}
            />
          </FormField>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <FormField
            validateStatus={this.getValidateStatus('secondBankAccount')}
            error={this.getError('secondBankAccount')}
          >
            <Text style={styles.question}> CONTA-CORRENTE </Text>
            <TextInput
              // onFocus={event => {
              //   // `bind` the function if you're using ES6 classes
              //   this._scrollToInput(ReactNative.findNodeHandle(event.target));
              // }}
              ref={c => {
                this.secondBankAccount = c;
              }}
              returnKeyType="done"
              onBlur={() => setFieldTouched('secondBankAccount')}
              value={this.state.secondBankAccount}
              maxLength={32}
              keyboardType="numeric"
              style={[
                styles.itemInput,
                { width: Dimensions.get('window').width / 2 },
                this.errorInput('secondBankAccount'),
              ]}
              onChangeText={secondBankAccount => {
                this.mask(secondBankAccount, 'secondBankAccount');
                setFieldValue('secondBankAccount', secondBankAccount);
              }}
            />
          </FormField>
          <FormField
            validateStatus={this.getValidateStatus('secondBankAccountDigit')}
            error={this.getError('secondBankAccountDigit')}
          >
            <Text style={styles.question}> DÍGITO </Text>
            <TextInput
              // onFocus={event => {
              //   // `bind` the function if you're using ES6 classes
              //   this._scrollToInput(ReactNative.findNodeHandle(event.target));
              // }}
              ref={c => {
                this.secondBankAccountDigit = c;
              }}
              returnKeyType="done"
              keyboardType="numeric"
              onBlur={() => setFieldTouched('secondBankAccountDigit')}
              value={
                this.state.secondBankAccountDigit.toString().length > 1
                  ? ''
                  : this.state.secondBankAccountDigit
              }
              maxLength={32}
              style={[
                styles.itemInput,
                { width: Dimensions.get('window').width / 4 },
                this.errorInput('secondBankAccountDigit'),
              ]}
              onChangeText={secondBankAccountDigit => {
                this.mask(secondBankAccountDigit, 'secondBankAccountDigit');
                setFieldValue('secondBankAccountDigit', secondBankAccountDigit);
              }}
            />
          </FormField>
        </View>
        <FormField
          validateStatus={this.getValidateStatus('secondBankAccountOwner')}
          error={this.getError('secondBankAccountOwner')}
        >
          <Text style={styles.question}> TITULAR </Text>
          <TextInput
            ref={c => {
              this.secondBankAccountOwner = c;
            }}
            returnKeyType="done"
            onBlur={() => setFieldTouched('secondBankAccountOwner')}
            value={this.state.secondBankAccountOwner}
            maxLength={32}
            style={[
              styles.itemInput,
              this.errorInput('secondBankAccountOwner'),
            ]}
            onChangeText={secondBankAccountOwner => {
              this.setState({ secondBankAccountOwner });
              setFieldValue('secondBankAccountOwner', secondBankAccountOwner);
            }}
          />
        </FormField>
        <FormField
          validateStatus={this.getValidateStatus('secondBankAccountOwnerCpf')}
          error={this.getError('secondBankAccountOwnerCpf')}
        >
          <Text style={styles.question}>CPF</Text>
          <TextInput
            ref={c => {
              this.secondBankAccountOwnerCpf = c;
            }}
            returnKeyType="done"
            value={this.state.secondBankAccountOwnerCpf}
            onBlur={() => setFieldTouched('secondBankAccountOwnerCpf')}
            keyboardType="numeric"
            maxLength={32}
            style={[
              styles.itemInput,
              this.errorInput('secondBankAccountOwnerCpf'),
            ]}
            onChangeText={secondBankAccountOwnerCpf => {
              this.mask(secondBankAccountOwnerCpf, 'secondBankAccountOwnerCpf');
              setFieldValue(
                'secondBankAccountOwnerCpf',
                secondBankAccountOwnerCpf
              );
            }}
          />
        </FormField>
        {this.state.secondBankAccountOwnerCpfError && <CpfError />}
        <FormField
          validateStatus={this.getValidateStatus('Segundo Nome do Co-titular')}
          error={this.getError('Segundo Nome do Co-titular')}
        >
          <Text style={styles.question}>NOME DO CO-TITULAR</Text>
          <TextInput
            ref={c => {
              this.secondBankCoOwnerAccount = c;
            }}
            returnKeyType="done"
            // onSubmitEditing={() =>
            //   this.focusInput('secondBankCoOwnerAccountCpf')
            // }
            value={this.state.secondBankCoOwnerAccount}
            onBlur={() => setFieldTouched('Segundo Nome do Co-titular')}
            maxLength={32}
            style={[styles.itemInput]}
            onChangeText={secondBankCoOwnerAccount => {
              setFieldValue(
                'Segundo Nome do Co-titular',
                secondBankCoOwnerAccount
              );
              return this.mask(
                secondBankCoOwnerAccount,
                'secondBankCoOwnerAccount'
              );
            }}
          />
        </FormField>
        <FormField
          validateStatus={this.getValidateStatus('secondBankCoOwnerAccountCpf')}
          error={this.getError('secondBankCoOwnerAccountCpf')}
        >
          <Text style={styles.question}>CPF DO CO-TITULAR</Text>
          <TextInput
            ref={c => {
              this.secondBankCoOwnerAccountCpf = c;
            }}
            returnKeyType="done"
            value={this.state.secondBankCoOwnerAccountCpf}
            overlayText="CPF"
            maskType="cpf"
            keyboardType="numeric"
            onBlur={() => setFieldTouched('secondBankCoOwnerAccountCpf')}
            maxLength={32}
            style={[styles.itemInput]}
            onChangeText={secondBankCoOwnerAccountCpf => {
              setFieldValue(
                'secondBankCoOwnerAccountCpf',
                secondBankCoOwnerAccountCpf
              );
              return this.mask(
                secondBankCoOwnerAccountCpf,
                'secondBankCoOwnerAccountCpf'
              );
            }}
          />
        </FormField>
        {this.state.secondBankAccountOwnerCpf ===
          this.state.secondBankCoOwnerAccountCpf &&
          this.state.secondBankAccountOwnerCpf.length > 0 && (
            <CpfError cpfRepeated />
          )}
        {this.state.secondBankCoOwnerAccountCpfError && <CpfError />}
      </View>
    );
  };

  focusInput(inputField) {
    this[inputField].focus();
  }

  moneyMask = (value, decimais, key) => {
    let unmasked = parseFloat(_.replace(value, 'R$', ''));
    let decimal = unmasked / 100;
    let money = _.replace(decimal, '.', ',');
    let moneyLength = money.split(',')[0].length;
    // return this.setState({ [key]: maskedMoney });
  };

  render() {
    const { setFieldValue, setFieldTouched } = this.props;

    const { socialName, bankBranchDigit, bankAccountDigit } = this.state;
    // console.log(this.state.totalPatrimonialValue)
    return (
      // <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
      <ScrollView
        nativeID="tti_complete"
        ref="_scrollView"
        // style={styles.container}
        innerRef={ref => {
          this.scroll = ref;
        }}
      >
        <Modal isVisible={this.state.visibleModal}>
          <View style={styles.mainContainer}>
            <View style={styles.viewTitle}>
              <Text style={styles.textTitle}>Leia e Confirme nossa</Text>
              <Text style={styles.textTitleSub}>Declaração de Investidor</Text>
            </View>
            <ScrollView style={styles.modalTexts}>
              <Text style={styles.infoText}>
                O Investidor declara sob as penas da Lei que: (i) É o titular e
                beneficiário final efetivo de todos os valores e investimentos
                movimentados ou detidos por intermédio desta ficha cadastral (ou
                sou o representante legal autorizado a assinar pelo titular) e
                que são verdadeiras e completas as informações por mim prestadas
                e constantes neste formulário, devendo manter atualizadas as
                informações ora declaradas; (ii) se compromete a informar, no
                prazo de 10 (dez) dias, quaisquer alterações que vierem a
                ocorrer nos seus dados cadastrais, inclusive eventual revogação
                de mandato, caso exista procurador. Os mandatos somente serão
                considerados revogados para os efeitos legais, após a
                confirmação do recebimento pela BEM DTVM Ltda.
                (“Administradora”). Caso a Administradora não confirme o
                recebimento da informação aqui referida, o aceite de eventuais
                procurações revogadas não será de responsabilidade da
                Administradora. Em caso de falecimento dos clientes mandantes,
                caberá aos herdeiros e/ou sucessores a comunicação do fato a
                Administradora, para o devido cancelamento interno das
                procurações; (iii) que não possui quaisquer impedimentos para
                operar no mercado que englobam valores mobiliários e mercado de
                capitais; (iv) suas ordens devem ser transmitidas por escrito ou
                por sistemas eletrônicos de conexões automatizadas; (v) autoriza
                os intermediários, caso existam débitos pendentes em seu nome, a
                liquidar os contratos, direitos e ativos adquiridos por sua
                conta e ordem, bem como a executar bens e direitos dados em
                garantia de suas operações ou que estejam em poder do
                intermediário, aplicando o produto da venda no pagamento dos
                débitos pendentes, independentemente de notificação judicial ou
                extrajudicial; (vi) tem ciência que o fornecimento de qualquer
                informação inverídica ou incompleta acerca de sua situação
                financeira e patrimonial, ou o não fornecimento de dados a
                respeito, podem ensejar presunção de inexistência de fundamento
                econômico, em face da incompatibilidade entre a operação
                realizada e a situação financeira e patrimonial declarada; (vii)
                estar ciente que conhece as normas referentes à prevenção e
                combate aos crimes de lavagem de dinheiro, disposto na Lei
                9.613/98 e normas complementares e, ainda, ter ciência de que a
                Administradora, por força dessa lei e normas, comunicará às
                autoridades competentes a ocorrência de operações ali previstas,
                nada tendo a se opor quanto a esse procedimento; (viii) estar
                ciente de que deve, nos termos da Instrução CVM nº 301/99 e
                alterações posteriores, promover a sua atualização cadastral a
                cada período não superior a 24 meses, mediante a substituição
                desta Ficha Cadastral, ou por meio da entrega de declaração
                assinada pelo próprio Investidor atestando a não existência de
                dados cadastrais a serem alterados, bem como atender,
                imediatamente, a qualquer solicitação de documentos realizada
                pela Administradora, caso contrário, o seu cadastro ficará
                bloqueado até a efetiva regularização; (ix) opera por conta
                própria, caso contrário indicará claramente no campo “Opera por
                Conta de Terceiros” contido na Ficha Cadastral, bem como em nome
                de quem pretende operar; (x) não ser pessoa vinculada ao
                Intermediário, caso contrário indicará no campo “Vinculado ao
                Intermediário” da Ficha Cadastral; (xi) concorda e autoriza o
                Bradesco e a BEM DTVM a disponibilizarem informações amparadas
                pelo sigilo bancário a entidades registradoras e liquidantes de
                operações realizadas no âmbito do mercado financeiro e de
                capitais, bem como às entidades auto reguladoras e autarquias,
                quando elas forem necessárias para o cumprimento de determinação
                da entidade auto reguladora, de normativos e/ou legislação dos
                mercados nos quais o Bradesco e/ou a BEM, conforme o caso, atue;
                e (xii) a sua relação de negócio com a BEM DTVM tem como
                propósito e natureza a aplicação em fundos de investimentos
                administrados por esta Instituição. O Investidor deverá fornecer
                as informações verídicas que permitam a Administradora avaliar
                sua capacidade econômico-financeira, preenchendo os devidos
                campos desta Ficha Cadastral e inutilizando os campos cujas
                informações não sejam aplicáveis, desde que não sejam de
                preenchimento obrigatório. A Administradora poderá, ainda,
                solicitar quaisquer informações e/ou documentos adicionais para
                fazer tal avaliação, caso seja necessário. Por fim, o Investidor
                declara que: (i) recebeu o regulamento e, se for o caso, o
                formulário de informações complementares, formulário padronizado
                ou a lâmina de informações essenciais;(ii) tomou ciência dos
                riscos envolvidos e da política de investimento; e (iii) tomou
                ciência da possibilidade de ocorrência de patrimônio líquido
                negativo, se for o caso, e, neste caso, de sua responsabilidade
                por consequentes aportes adicionais de recursos. Todos os
                documentos fornecidos pelo Investidor, para fins de
                preenchimento desta Ficha Cadastral, fazem dela parte integrante
                e indissociável, na qualidade de Anexos, para todos os fins e
                efeitos de direito.
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
                <Text style={styles.title}>CADASTRO DE DADOS</Text>
                <Text style={styles.dividerHeader} />
              </View>
            </View>
            <View style={styles.dataValidationHeader}>
              {/* COMEÇA AQUI O FORM */}
              {/* COMEÇA AQUI O FORM */}
              {/* COMEÇA AQUI O FORM */}
              {/* COMEÇA AQUI O FORM */}
              {/* COMEÇA AQUI O FORM */}

              {/* COLLAPSE */}
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    pessoais: !this.state.pessoais,
                  });
                }}
              >
                <View style={styles.viewCollapse}>
                  <Text style={styles.question2}>Dados Pessoais</Text>
                  <Image
                    style={{ width: 15, height: 15 }}
                    source={require('../assets/i/arrow.png')}
                    onPress={() => {
                      this.setState({
                        pessoais: !this.state.pessoais,
                      });
                    }}
                  />
                </View>
              </TouchableOpacity>

              <Collapsible
                collapsed={this.state.pessoais}
                style={styles.collapseTab}
              >
                <FormField
                  validateStatus={this.getValidateStatus('titularName')}
                  error={this.getError('titularName')}
                >
                  <Text style={styles.question}> NOME COMPLETO </Text>
                  <TextInput
                    ref={ref => (this.nome = ref)}
                    onBlur={() => setFieldTouched('titularName')}
                    returnKeyType="next"
                    value={this.state.titularName}
                    maxLength={32}
                    style={[styles.itemInput, this.errorInput('titularName')]}
                    onChangeText={titularName => {
                      this.setState({
                        titularName,
                        bankAccountOwner: titularName,
                      });
                      setFieldValue('titularName', titularName);
                    }}
                  />
                </FormField>
                <FormField
                  validateStatus={this.getValidateStatus('cpf')}
                  error={this.getError('cpf')}
                >
                  <Text style={[styles.question]}>CPF</Text>
                  <TextInput
                    value={this.state.cpf}
                    onBlur={() => setFieldTouched('cpf')}
                    overlayText="CPF"
                    maskType="cpf"
                    editable={false}
                    selectTextOnFocus={false}
                    keyboardType="numeric"
                    returnKeyType="done"
                    style={[styles.itemInput]}
                    onChangeText={cpf => false}
                    maxLength={14}
                  />
                </FormField>
                <Text style={styles.question}> NOME SOCIAL </Text>
                <View
                  style={{
                    marginTop: 5,
                    marginBottom: 5,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: 'Rubik-Light',
                      color: colors.primary,
                      marginLeft: 10,
                    }}
                  >
                    Nome pelo qual prefere ser chamado
                  </Text>
                </View>
                <TextInput
                  // onFocus={event => {
                  //   // `bind` the function if you're using ES6 classes
                  //   this._scrollToInput(
                  //     ReactNative.findNodeHandle(event.target)
                  //   );
                  // }}
                  value={socialName}
                  returnKeyType="next"
                  onBlur={() => setFieldTouched('socialName')}
                  ref={c => {
                    this.socialName = c;
                  }}
                  maxLength={32}
                  style={[styles.itemInput]}
                  onChangeText={socialName => {
                    this.onHandleInput(socialName, 'socialName');
                    setFieldValue('socialName', socialName);
                  }}
                />

                <FormField
                  validateStatus={this.getValidateStatus('idType')}
                  error={this.getError('idType')}
                >
                  <Text style={styles.question}>
                    {' '}
                    TIPO DE DOCUMENTO DE IDENTIFICAÇÃO{' '}
                  </Text>
                  <Picker
                    mode="dropdown"
                    iosIcon={
                      <Icon
                        name="arrow-down"
                        style={{ color: colors.primary }}
                      />
                    }
                    onBlur={() => setFieldTouched('idType')}
                    style={[
                      styles.itemInput,
                      styles.pickerContainer,
                      this.errorDropdown('idType'),
                    ]}
                    placeholder="Selecione"
                    placeholderStyle={{ color: colors.primary }}
                    placeholderIconColor={colors.primary}
                    selectedValue={this.state.idType}
                    onValueChange={idType => {
                      this.onHandleInput(idType, 'idType');
                      setFieldValue('idType', idType);
                    }}
                  >
                    {this.onHandleDropdown('idType')}
                  </Picker>
                </FormField>

                <FormField
                  validateStatus={this.getValidateStatus('identification')}
                  error={this.getError('identification')}
                >
                  <Text style={styles.question}>NÚMERO DO DOCUMENTO</Text>
                  <TextInput
                    ref={c => {
                      this.identification = c;
                    }}
                    returnKeyType="done"
                    value={this.state.identification}
                    onBlur={() => setFieldTouched('identification')}
                    keyboardType="number-pad"
                    maxLength={32}
                    style={[
                      styles.itemInput,
                      this.errorInput('identification'),
                    ]}
                    onChangeText={identification => {
                      this.onHandleInput(identification, 'identification');
                      setFieldValue('identification', identification);
                    }}
                  />
                </FormField>

                <FormField
                  validateStatus={this.getValidateStatus('governmentIssue')}
                  error={this.getError('governmentIssue')}
                >
                  <Text style={styles.question}> ORGÃO EXPEDIDOR </Text>
                  <TextInput
                    ref={c => {
                      this.governmentIssue = c;
                    }}
                    returnKeyType="next"
                    value={this.state.governmentIssue}
                    onBlur={() => setFieldTouched('governmentIssue')}
                    maxLength={32}
                    style={[
                      styles.itemInput,
                      this.errorInput('governmentIssue'),
                    ]}
                    onChangeText={governmentIssue => {
                      this.onHandleInput(governmentIssue, 'governmentIssue');
                      setFieldValue('governmentIssue', governmentIssue);
                    }}
                  />
                </FormField>

                <FormField
                  validateStatus={this.getValidateStatus('idIssueDate')}
                  error={this.getError('idIssueDate')}
                >
                  <Text style={styles.question}> DATA DE EXPEDIÇÃO </Text>
                  <TextInput
                    ref={c => {
                      this.idIssueDate = c;
                    }}
                    returnKeyType="done"
                    value={this.state.idIssueDate}
                    onBlur={() => setFieldTouched('idIssueDate')}
                    maxLength={10}
                    keyboardType="numeric"
                    style={[styles.itemInput, this.errorInput('idIssueDate')]}
                    onChangeText={idIssueDate => {
                      this.mask(idIssueDate, 'idIssueDate');
                      setFieldValue('idIssueDate', idIssueDate);
                    }}
                  />
                </FormField>

                <FormField
                  validateStatus={this.getValidateStatus('birthPlace')}
                  error={this.getError('birthPlace')}
                >
                  <Text style={styles.question}> NATURALIDADE (CIDADE) </Text>
                  <TextInput
                    ref={c => {
                      this.birthPlace = c;
                    }}
                    returnKeyType="next"
                    value={this.state.birthPlace}
                    maxLength={32}
                    onBlur={() => setFieldTouched('birthPlace')}
                    style={[styles.itemInput, this.errorInput('birthPlace')]}
                    onChangeText={birthPlace => {
                      this.onHandleInput(birthPlace, 'birthPlace');
                      setFieldValue('birthPlace', birthPlace);
                    }}
                  />
                </FormField>

                <FormField
                  validateStatus={this.getValidateStatus('birthdayDate')}
                  error={this.getError('birthdayDate')}
                >
                  <Text style={styles.question}> DATA DE NASCIMENTO </Text>
                  <TextInput
                    ref={c => {
                      this.birthdayDate = c;
                    }}
                    returnKeyType="done"
                    value={this.state.birthdayDate}
                    onBlur={() => setFieldTouched('birthdayDate')}
                    maxLength={10}
                    onEndEditing={() => {
                      setFieldTouched('birthdayDate');
                    }}
                    keyboardType="number-pad"
                    style={[styles.itemInput, this.errorInput('birthdayDate')]}
                    onChangeText={birthdayDate => {
                      this.mask(birthdayDate, 'birthdayDate');
                      setFieldValue('birthdayDate', birthdayDate);
                    }}
                  />
                </FormField>

                <FormField
                  validateStatus={this.getValidateStatus('birthCounty')}
                  error={this.getError('birthCounty')}
                >
                  <Text style={styles.question}> PAÍS DE NASCIMENTO </Text>
                  <Picker
                    mode="dropdown"
                    iosIcon={
                      <Icon
                        name="arrow-down"
                        style={{ color: colors.primary }}
                      />
                    }
                    style={[
                      styles.itemInput,
                      styles.pickerContainer,
                      this.errorDropdown('birthCounty'),
                    ]}
                    placeholder="Selecione"
                    onBlur={() => setFieldTouched('birthCounty')}
                    placeholderStyle={{ color: colors.primary }}
                    placeholderIconColor={colors.primary}
                    selectedValue={this.state.birthCounty}
                    onValueChange={birthCounty => {
                      this.onHandleSelect(birthCounty, 'birthCounty');
                      setFieldValue('birthCounty', birthCounty);
                    }}
                  >
                    {this.onHandleDropdown('country')}
                  </Picker>
                </FormField>

                <FormField
                  validateStatus={this.getValidateStatus('nationality')}
                  error={this.getError('nationality')}
                >
                  <Text style={styles.question}> NACIONALIDADE (PAÍS) </Text>
                  <Picker
                    mode="dropdown"
                    iosIcon={
                      <Icon
                        name="arrow-down"
                        style={{ color: colors.primary }}
                      />
                    }
                    onBlur={() => setFieldTouched('nationality')}
                    style={[
                      styles.itemInput,
                      styles.pickerContainer,
                      this.errorDropdown('nationality'),
                    ]}
                    placeholder="Selecione"
                    placeholderStyle={{ color: colors.primary }}
                    placeholderIconColor={colors.primary}
                    selectedValue={this.state.nationality}
                    onValueChange={nationality => {
                      this.onHandleSelect(nationality, 'nationality');
                      setFieldValue('nationality', nationality);
                    }}
                  >
                    {this.onHandleDropdown('country')}
                  </Picker>
                </FormField>
                <FormField
                  validateStatus={this.getValidateStatus('gender')}
                  error={this.getError('gender')}
                >
                  <Text style={styles.question}> SEXO </Text>
                  <Picker
                    mode="dropdown"
                    iosIcon={
                      <Icon
                        name="arrow-down"
                        style={{ color: colors.primary }}
                      />
                    }
                    style={[
                      styles.itemInput,
                      styles.pickerContainer,
                      this.errorDropdown('gender'),
                    ]}
                    onBlur={() => setFieldTouched('gender')}
                    placeholder="Selecione"
                    placeholderStyle={{ color: colors.primary }}
                    placeholderIconColor={colors.primary}
                    selectedValue={this.state.gender}
                    onValueChange={gender => {
                      this.onHandleSelect(gender, 'gender');
                      setFieldValue('gender', gender);
                    }}
                  >
                    {this.onHandleDropdown('gender')}
                  </Picker>
                </FormField>
                <FormField
                  validateStatus={this.getValidateStatus('skinColor')}
                  error={this.getError('skinColor')}
                >
                  <Text style={styles.question}> COR </Text>
                  <Picker
                    mode="dropdown"
                    iosIcon={
                      <Icon
                        name="arrow-down"
                        style={{ color: colors.primary }}
                      />
                    }
                    onBlur={() => setFieldTouched('skinColor')}
                    style={[
                      styles.itemInput,
                      styles.pickerContainer,
                      this.errorDropdown('skinColor'),
                    ]}
                    placeholder="Selecione"
                    placeholderStyle={{ color: colors.primary }}
                    placeholderIconColor={colors.primary}
                    selectedValue={this.state.skinColor}
                    onValueChange={skinColor => {
                      this.onHandleSelect(skinColor, 'skinColor');
                      setFieldValue('skinColor', skinColor);
                    }}
                  >
                    {this.onHandleDropdown('skinColor')}
                  </Picker>
                </FormField>

                <FormField
                  validateStatus={this.getValidateStatus('maritalStatus')}
                  error={this.getError('maritalStatus')}
                >
                  <Text style={styles.question}> ESTADO CIVIL </Text>
                  <Picker
                    mode="dropdown"
                    iosIcon={
                      <Icon
                        name="arrow-down"
                        style={{ color: colors.primary }}
                      />
                    }
                    onBlur={() => setFieldTouched('maritalStatus')}
                    style={[
                      styles.itemInput,
                      styles.pickerContainer,
                      this.errorDropdown('maritalStatus'),
                    ]}
                    placeholder="Selecione"
                    placeholderStyle={{ color: colors.primary }}
                    placeholderIconColor={colors.primary}
                    selectedValue={this.state.maritalStatus}
                    onValueChange={maritalStatus => {
                      this.onHandleSelect(maritalStatus, 'maritalStatus');
                      setFieldValue('maritalStatus', maritalStatus);
                    }}
                  >
                    {/* {this.androidPicker()} */}
                    {this.onHandleDropdown('estadoCivil')}
                  </Picker>
                </FormField>

                {this.state.maritalStatus === 'CASADO(A)' && (
                  <View>
                    <FormField
                      validateStatus={this.getValidateStatus('spouseName')}
                      error={this.getError('spouseName')}
                    >
                      <Text style={styles.question}> NOME DO CÔNJUGE </Text>
                      <TextInput
                        returnKeyType="done"
                        value={this.state.spouseName}
                        onBlur={() => setFieldTouched('spouseName')}
                        maxLength={32}
                        style={[
                          styles.itemInput,
                          this.errorDropdown('spouseName'),
                        ]}
                        onChangeText={spouseName => {
                          this.mask(spouseName, 'spouseName');
                          setFieldValue('spouseName', spouseName);
                        }}
                      />
                    </FormField>
                  </View>
                )}

                {this.state.maritalStatus === 'CASADO(A)' && (
                  <View>
                    <FormField
                      validateStatus={this.getValidateStatus('spouseCpf')}
                      error={this.getError('spouseCpf')}
                    >
                      <Text style={styles.question}> CPF DO CÔNJUGE </Text>
                      <TextInput
                        ref={ref => (this.spouseCpf = ref)}
                        value={this.state.spouseCpf}
                        onEndEditing={() =>
                          this.errorCpf('spouseCpf', 'spouseCpfError')
                        }
                        onBlur={() => setFieldTouched('spouseCpf')}
                        overlayText="CPF"
                        maskType="cpf"
                        returnKeyType="done"
                        keyboardType="numeric"
                        maxLength={32}
                        style={[
                          styles.itemInput,
                          this.errorDropdown('spouseCpf'),
                        ]}
                        onChangeText={spouseCpf => {
                          this.mask(spouseCpf, 'spouseCpf');
                          setFieldValue('spouseCpf', spouseCpf);
                        }}
                      />
                    </FormField>
                  </View>
                )}
                {this.state.cpfRepeated && <CpfError cpfRepeated />}
                {this.state.spouseCpfError && <CpfError />}
              </Collapsible>

              {/* FIM DO COLLAPSE DADOS */}

              {/* INICIO COLLAPSE COJUGE */}
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    cojuge: !this.state.cojuge,
                  });
                  this.focusInput('cep');
                }}
              >
                <View style={styles.viewCollapse}>
                  <Text style={styles.question2}>Endereço</Text>
                  <Image
                    style={{ width: 15, height: 15 }}
                    source={require('../assets/i/arrow.png')}
                    onPress={() => {
                      this.setState({
                        cojuge: !this.state.cojuge,
                      });
                    }}
                  />
                </View>
              </TouchableOpacity>

              {/* COLLAPSE */}

              <Collapsible
                collapsed={this.state.cojuge}
                style={styles.collapseTab}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    // flex: 1,
                  }}
                >
                  <FormField
                    validateStatus={this.getValidateStatus('zipCode')}
                    error={this.getError('zipCode')}
                  >
                    <Text style={styles.question}> CEP </Text>
                    <TextInput
                      ref={c => {
                        this.cep = c;
                      }}
                      returnKeyType="done"
                      value={this.state.zipCode}
                      maxLength={32}
                      keyboardType="numeric"
                      style={[
                        styles.itemInput,
                        { width: Dimensions.get('window').width / 2 },
                        this.errorInput('zipCode'),
                      ]}
                      onBlur={() => setFieldTouched('zipCode')}
                      onChangeText={zipCode => {
                        this.mask(zipCode, 'zipCode');
                        this.setState({ invalidCep: false });
                        setFieldValue('zipCode', zipCode);
                      }}
                    />
                  </FormField>
                  <TouchableOpacity
                    style={[styles.cepButton]}
                    onPress={() => {
                      this.getCep(this.unMask(this.state.zipCode), 'zipCode');
                      this.focusInput('address');
                    }}
                  >
                    <Text
                      style={[
                        styles.proceedButtonText,
                        { textAlign: 'center', padding: 10, fontSize: 14 },
                      ]}
                      uppercase={false}
                    >
                      CONSULTAR
                    </Text>
                  </TouchableOpacity>
                </View>
                {this.invalidCep && <CepError />}

                <FormField
                  validateStatus={this.getValidateStatus('address')}
                  error={this.getError('address')}
                >
                  <Text style={styles.question}> ENDEREÇO </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: 'Rubik-Light',
                      color: colors.primary,
                      marginLeft: 10,
                    }}
                  >
                    Idêntico ao escrito no Comprovante de Residência enviado.
                  </Text>
                  <TextInput
                    ref={c => {
                      this.address = c;
                    }}
                    returnKeyType="done"
                    // onSubmitEditing={() =>
                    //   this.focusInput('addressComplement')
                    // }
                    value={this.state.address}
                    maxLength={32}
                    style={[styles.itemInput, this.errorInput('address')]}
                    onBlur={() => setFieldTouched('address')}
                    onChangeText={address => {
                      this.mask(address, 'address');
                      setFieldValue('address', address);
                    }}
                  />
                </FormField>

                <FormField
                  validateStatus={this.getValidateStatus('addressComplement')}
                  error={this.getError('addressComplement')}
                >
                  <Text style={styles.question}> COMPLEMENTO </Text>
                  <TextInput
                    ref={c => {
                      this.addressComplement = c;
                    }}
                    returnKeyType="done"
                    value={this.state.addressComplement}
                    maxLength={32}
                    style={[
                      styles.itemInput,
                      this.errorInput('addressComplement'),
                    ]}
                    onBlur={() => setFieldTouched('addressComplement')}
                    onChangeText={addressComplement => {
                      this.mask(addressComplement, 'addressComplement');
                      setFieldValue('addressComplement', addressComplement);
                    }}
                  />
                </FormField>

                <FormField
                  validateStatus={this.getValidateStatus('neighborhood')}
                  error={this.getError('neighborhood')}
                >
                  <Text style={styles.question}> BAIRRO </Text>
                  <TextInput
                    ref={c => {
                      this.neighborhood = c;
                    }}
                    returnKeyType="done"
                    value={this.state.neighborhood}
                    maxLength={32}
                    style={[styles.itemInput, this.errorInput('neighborhood')]}
                    onBlur={() => setFieldTouched('neighborhood')}
                    onChangeText={neighborhood => {
                      this.setState({ neighborhood });
                      setFieldValue('neighborhood', neighborhood);
                    }}
                  />
                </FormField>

                <FormField
                  validateStatus={this.getValidateStatus('city')}
                  error={this.getError('city')}
                >
                  <Text style={styles.question}> CIDADE </Text>
                  <TextInput
                    ref={c => {
                      this.city = c;
                    }}
                    returnKeyType="done"
                    value={this.state.city}
                    maxLength={32}
                    style={[styles.itemInput, this.errorInput('city')]}
                    onBlur={() => setFieldTouched('city')}
                    onChangeText={city => {
                      this.setState({ city });
                      setFieldValue('city', city);
                    }}
                  />
                </FormField>

                <FormField
                  validateStatus={this.getValidateStatus('stateCode')}
                  error={this.getError('stateCode')}
                >
                  <Text style={styles.question}> ESTADO </Text>
                  <Picker
                    mode="dropdown"
                    iosIcon={
                      <Icon
                        name="arrow-down"
                        style={{ color: colors.primary }}
                      />
                    }
                    onBlur={() => setFieldTouched('stateCode')}
                    style={[
                      styles.itemInput,
                      styles.pickerContainer,
                      this.errorDropdown('stateCode'),
                    ]}
                    placeholder="Selecione um estado"
                    placeholderStyle={{ color: colors.primary }}
                    placeholderIconColor={colors.primary}
                    selectedValue={this.state.stateCode}
                    onValueChange={stateCode => {
                      this.setState({ stateCode });
                      setFieldValue('stateCode', stateCode);
                    }}
                  >
                    {/* {this.androidPicker()} */}
                    {this.onHandleDropdown('state', 'code')}
                  </Picker>
                </FormField>

                <FormField
                  validateStatus={this.getValidateStatus('phone')}
                  error={this.getError('phone')}
                >
                  <Text style={styles.question}> CELULAR </Text>
                  <TextInput
                    ref={c => {
                      this.phone = c;
                    }}
                    returnKeyType="done"
                    value={this.state.phone}
                    onBlur={() => setFieldTouched('phone')}
                    placeholder="DDD + Telefone"
                    maxLength={32}
                    keyboardType="numeric"
                    style={[styles.itemInput, this.errorInput('phone')]}
                    onChangeText={phone => {
                      this.mask(phone, 'phone');
                      setFieldValue('phone', phone);
                    }}
                  />
                </FormField>

                <FormField
                  validateStatus={this.getValidateStatus('email')}
                  error={this.getError('email')}
                >
                  <Text style={styles.question}> EMAIL </Text>
                  <TextInput
                    ref={c => {
                      this.email = c;
                    }}
                    returnKeyType="done"
                    value={this.state.email}
                    onBlur={() => setFieldTouched('email')}
                    maxLength={32}
                    style={[styles.itemInput, this.errorInput('email')]}
                    onChangeText={email => {
                      this.mask(email, 'email');
                      setFieldValue('email', email);
                    }}
                  />
                </FormField>

                <FormField
                  validateStatus={this.getValidateStatus('fatherName')}
                  error={this.getError('fatherName')}
                >
                  <Text style={styles.question}> NOME COMPLETO DO PAI</Text>
                  <TextInput
                    ref={c => {
                      this.fatherName = c;
                    }}
                    returnKeyType="done"
                    value={this.state.fatherName}
                    onBlur={() => setFieldTouched('fatherName')}
                    maxLength={32}
                    style={[styles.itemInput, this.errorInput('fatherName')]}
                    onChangeText={fatherName => {
                      this.mask(fatherName, 'fatherName');
                      setFieldValue('fatherName', fatherName);
                    }}
                  />
                </FormField>

                <FormField
                  validateStatus={this.getValidateStatus('motherName')}
                  error={this.getError('motherName')}
                >
                  <Text style={styles.question}> NOME COMPLETO DA MÃE </Text>
                  <TextInput
                    ref={c => {
                      this.motherName = c;
                    }}
                    returnKeyType="done"
                    value={this.state.motherName}
                    maxLength={32}
                    onBlur={() => setFieldTouched('motherName')}
                    style={[styles.itemInput, this.errorInput('motherName')]}
                    onChangeText={motherName => {
                      this.mask(motherName, 'motherName');
                      setFieldValue('motherName', motherName);
                    }}
                  />
                </FormField>

                <FormField
                  validateStatus={this.getValidateStatus('civCapacity')}
                  error={this.getError('civCapacity')}
                >
                  <Text style={styles.question}> CAPACIDADE CIVIL </Text>
                  <View
                    style={[
                      styles.itemInput,
                      styles.pickerContainer,
                      this.errorDropdown('civCapacity'),
                    ]}
                  >
                    <Picker
                      mode="dropdown"
                      iosIcon={
                        <Icon
                          name="arrow-down"
                          style={{ color: colors.primary }}
                        />
                      }
                      style={[
                        styles.dropAndSwitchInput,
                        styles.pickerContainer,
                      ]}
                      placeholder="Selecione"
                      onBlur={() => setFieldTouched('civCapacity')}
                      placeholderStyle={{ color: colors.primary }}
                      placeholderIconColor={colors.primary}
                      selectedValue={this.state.civCapacity}
                      onValueChange={value => {
                        this.onHandleSelect(value, 'civCapacity');
                        if (value === 'MENOR' || value === 'INCAPAZ') {
                          this.setState({
                            hasRepresentative: true,
                          });
                        } else if (value === 'MAIOR') {
                          this.setState({
                            hasRepresentative: false,
                          });
                        }
                        setFieldValue('civCapacity', value);
                      }}
                    >
                      {/* {this.androidPicker()} */}
                      {this.onHandleDropdown('capacidade')}
                    </Picker>
                  </View>
                </FormField>

                <Text style={styles.question}>
                  {' '}
                  HÁ REPRESENTANTE/PROCURADOR?{' '}
                </Text>
                <View
                  style={[
                    styles.itemInput,
                    styles.checkBoxContainer,
                    this.errorDropdown('hasRepresentative'),
                  ]}
                >
                  <Text style={styles.question2}>
                    {' '}
                    {this.state.hasRepresentative ? 'SIM' : 'NÃO'}{' '}
                  </Text>
                  <Checkbox
                    style={styles.checkbox}
                    onChange={(name, checked) => {
                      this.setState({
                        hasRepresentative: !this.state.hasRepresentative,
                      });
                    }}
                    checked={this.state.hasRepresentative}
                  />
                </View>

                {this.state.hasRepresentative && (
                  <View>
                    <FormField
                      validateStatus={this.getValidateStatus(
                        'representativeName'
                      )}
                      error={this.getError('representativeName')}
                    >
                      <Text style={styles.question}>
                        {' '}
                        NOME DO REPRESENTANTE{' '}
                      </Text>
                      <TextInput
                        ref={c => {
                          this.representativeName = c;
                        }}
                        returnKeyType="done"
                        // onSubmitEditing={() =>
                        //   this.focusInput('representativeCpf')
                        // }
                        value={this.state.representativeName}
                        onBlur={() => setFieldTouched('representativeName')}
                        maxLength={32}
                        style={[
                          styles.itemInput,
                          this.errorDropdown('representativeName'),
                        ]}
                        onChangeText={representativeName => {
                          this.mask(representativeName, 'representativeName');
                          setFieldValue(
                            'representativeName',
                            representativeName
                          );
                        }}
                      />
                    </FormField>
                  </View>
                )}

                {this.state.hasRepresentative && (
                  <View>
                    <FormField
                      validateStatus={this.getValidateStatus(
                        'representativeCpf'
                      )}
                      error={this.getError('representativeCpf')}
                    >
                      <Text style={styles.question}>
                        {' '}
                        CPF DO REPRESENTANTE{' '}
                      </Text>
                      <TextInput
                        ref={c => {
                          this.representativeCpf = c;
                        }}
                        returnKeyType="done"
                        // onSubmitEditing={() =>
                        //   this.focusInput('representativeRelationShip')
                        // }
                        value={this.state.representativeCpf}
                        onBlur={() => setFieldTouched('representativeCpf')}
                        onEndEditing={() =>
                          this.errorCpf(
                            'representativeCpf',
                            'representativeCpfError'
                          )
                        }
                        maxLength={32}
                        style={[
                          styles.itemInput,
                          this.errorDropdown('representativeCpf'),
                        ]}
                        overlayText="CPF"
                        maskType="cpf"
                        keyboardType="numeric"
                        onChangeText={representativeCpf => {
                          this.mask(representativeCpf, 'representativeCpf');
                          setFieldValue('representativeCpf', representativeCpf);
                        }}
                      />
                    </FormField>
                    {this.state.cpfRepeated && <CpfError cpfRepeated />}
                    {this.state.representativeCpfError && <CpfError />}
                  </View>
                )}
                {this.state.hasRepresentative && (
                  <View>
                    <FormField
                      validateStatus={this.getValidateStatus(
                        'representativeRelationShip'
                      )}
                      error={this.getError('representativeRelationShip')}
                    >
                      <Text style={styles.question}>
                        VÍNCULO COM O REPRESENTANTE
                      </Text>
                      <TextInput
                        ref={c => {
                          this.representativeRelationShip = c;
                        }}
                        returnKeyType="done"
                        value={this.state.representativeRelationShip}
                        maxLength={32}
                        onBlur={() =>
                          setFieldTouched('representativeRelationShip')
                        }
                        style={[
                          styles.itemInput,
                          this.errorDropdown('representativeRelationShip'),
                        ]}
                        onChangeText={representativeRelationShip => {
                          this.mask(
                            representativeRelationShip,
                            'representativeRelationShip'
                          );
                          setFieldValue(
                            'representativeRelationShip',
                            representativeRelationShip
                          );
                        }}
                      />
                    </FormField>
                  </View>
                )}
              </Collapsible>

              {/* FIM COLLAPSE CONJUGE */}

              {/* INICIO COLAPSE DADOS PROFISSIONAIS */}

              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    professional: !this.state.professional,
                  });
                  this.focusInput('ocupation');
                }}
              >
                <View style={styles.viewCollapse}>
                  <Text style={styles.question2}>Dados Profissionais</Text>
                  <Image
                    style={{ width: 15, height: 15 }}
                    source={require('../assets/i/arrow.png')}
                  />
                </View>
              </TouchableOpacity>

              {/* COLLAPSE */}

              <Collapsible
                collapsed={this.state.professional}
                style={styles.collapseTab}
              >
                <FormField
                  validateStatus={this.getValidateStatus('ocupation')}
                  error={this.getError('ocupation')}
                >
                  <Text style={styles.question}> OCUPAÇÃO PROFISSIONAL </Text>
                  <TextInput
                    ref={c => {
                      this.ocupation = c;
                    }}
                    returnKeyType="done"
                    onBlur={() => setFieldTouched('ocupation')}
                    value={this.state.ocupation}
                    maxLength={32}
                    style={[styles.itemInput, this.errorInput('ocupation')]}
                    onChangeText={ocupation => {
                      this.mask(ocupation, 'ocupation');
                      setFieldValue('ocupation', ocupation);
                    }}
                  />
                </FormField>
                <FormField
                  validateStatus={this.getValidateStatus('workCompany')}
                  error={this.getError('workCompany')}
                >
                  <Text style={styles.question}>
                    {' '}
                    EMPRESA NA QUAL TRABALHA{' '}
                  </Text>
                  <TextInput
                    ref={c => {
                      this.workCompany = c;
                    }}
                    returnKeyType="done"
                    onBlur={() => {
                      setFieldTouched('workCompany');
                    }}
                    value={this.state.workCompany}
                    maxLength={32}
                    style={[styles.itemInput, this.errorInput('workCompany')]}
                    onChangeText={workCompany => {
                      this.setState({ workCompany, work: true });
                      setFieldValue('workCompany', workCompany);
                    }}
                  />
                </FormField>
                <Text style={styles.question}>
                  ENDEREÇO COMERCIAL IDÊNTICO AO ENDEREÇO RESIDENCIAL ?
                </Text>
                <View style={[styles.itemInput, styles.checkBoxContainer]}>
                  <Text style={styles.question2}>
                    {' '}
                    {this.state.companyAddressFlag ? 'SIM' : 'NÃO'}{' '}
                  </Text>
                  <Switch
                    backgroundActive={colors.primary}
                    backgroundInactive="#cecece"
                    circleBorderWidth={0}
                    value={this.state.companyAddressFlag}
                    onValueChange={value => {
                      this.setState({
                        companyAddressFlag: value,
                      });
                      if (value) {
                        this.setState(
                          {
                            ocupationZipCode: this.state.zipCode,
                            ocupationAddress: this.state.address,
                            ocupationAddressComplement: this.state
                              .addressComplement,
                            ocupationNeighborhood: this.state.neighborhood,
                            ocupationCity: this.state.city,
                            ocupationStateCode: this.state.stateCode,
                          },
                          () => {
                            this.touchOcupationFieldsProcess('ocupation');
                          }
                        );
                      } else {
                        this.setState({
                          ocupationZipCode: '',
                          ocupationAddress: '',
                          ocupationAddressComplement: '',
                          ocupationNeighborhood: '',
                          ocupationCity: '',
                          ocupationStateCode: '',
                        });
                      }
                    }}
                  />
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  }}
                >
                  <FormField
                    validateStatus={this.getValidateStatus('ocupationZipCode')}
                    error={this.getError('ocupationZipCode')}
                  >
                    <Text style={styles.question}> CEP </Text>
                    <TextInput
                      ref={c => {
                        this.ocupationZipCode = c;
                      }}
                      returnKeyType="done"
                      value={this.state.ocupationZipCode}
                      maxLength={32}
                      keyboardType="numeric"
                      style={[
                        styles.itemInput,
                        { width: Dimensions.get('window').width / 2 },
                        this.errorInput('ocupationZipCode'),
                      ]}
                      onBlur={() => setFieldTouched('ocupationZipCode')}
                      onChangeText={ocupationZipCode => {
                        this.mask(ocupationZipCode, 'ocupationZipCode');
                        this.setState({ invalidCep: false });
                        setFieldValue('ocupationZipCode', ocupationZipCode);
                      }}
                    />
                  </FormField>
                  <TouchableOpacity
                    style={[styles.cepButton]}
                    onPress={() => {
                      this.getCep(
                        this.unMask(this.state.ocupationZipCode),
                        'ocupationZipCode'
                      );
                      this.focusInput('ocupationAddress');
                    }}
                  >
                    <Text
                      style={[
                        styles.proceedButtonText,
                        { textAlign: 'center', padding: 10, fontSize: 14 },
                      ]}
                      uppercase={false}
                    >
                      CONSULTAR
                    </Text>
                  </TouchableOpacity>
                </View>
                {this.state.invalidCep && <CepError />}

                <FormField
                  validateStatus={this.getValidateStatus('ocupationAddress')}
                  error={this.getError('ocupationAddress')}
                >
                  <Text style={styles.question}> ENDEREÇO </Text>
                  <TextInput
                    ref={c => {
                      this.ocupationAddress = c;
                    }}
                    returnKeyType="done"
                    // onSubmitEditing={() =>
                    //   this.focusInput('ocupationAddressComplement')
                    // }
                    value={this.state.ocupationAddress}
                    maxLength={32}
                    style={[
                      styles.itemInput,
                      this.errorInput('ocupationAddress'),
                    ]}
                    onBlur={() => setFieldTouched('ocupationAddres')}
                    onChangeText={ocupationAddress => {
                      this.setState({ ocupationAddress });
                      setFieldValue('ocupationAddres', ocupationAddress);
                    }}
                  />
                </FormField>

                <FormField
                  validateStatus={this.getValidateStatus('ocupationAddress')}
                  error={this.getError('ocupationAddress')}
                >
                  <Text style={styles.question}> COMPLEMENTO </Text>
                  <TextInput
                    ref={c => {
                      this.ocupationAddressComplement = c;
                    }}
                    returnKeyType="done"
                    // onSubmitEditing={() =>
                    //   this.focusInput('ocupationNeighborhood')
                    // }
                    value={this.state.ocupationAddressComplement}
                    maxLength={32}
                    style={[styles.itemInput]}
                    onBlur={() => setFieldTouched('ocupationAddressComplement')}
                    onChangeText={ocupationAddressComplement => {
                      this.setState({ ocupationAddressComplement });
                      setFieldValue(
                        'ocupationAddressComplement',
                        ocupationAddressComplement
                      );
                    }}
                  />
                </FormField>

                <FormField
                  validateStatus={this.getValidateStatus(
                    'ocupationNeighborhood'
                  )}
                  error={this.getError('ocupationNeighborhood')}
                >
                  <Text style={styles.question}> BAIRRO </Text>
                  <TextInput
                    ref={c => {
                      this.ocupationNeighborhood = c;
                    }}
                    returnKeyType="done"
                    value={this.state.ocupationNeighborhood}
                    maxLength={32}
                    style={[
                      styles.itemInput,
                      this.errorInput('ocupationNeighborhood'),
                    ]}
                    onBlur={() => setFieldTouched('ocupationNeighborhood')}
                    onChangeText={ocupationNeighborhood => {
                      this.setState({ ocupationNeighborhood });
                      setFieldValue(
                        'ocupationNeighborhood',
                        ocupationNeighborhood
                      );
                    }}
                  />
                </FormField>

                <FormField
                  validateStatus={this.getValidateStatus('ocupationCity')}
                  error={this.getError('ocupationCity')}
                >
                  <Text style={styles.question}> CIDADE </Text>
                  <TextInput
                    ref={c => {
                      this.ocupationCity = c;
                    }}
                    returnKeyType="done"
                    value={this.state.ocupationCity}
                    maxLength={32}
                    style={[styles.itemInput, this.errorInput('ocupationCity')]}
                    onBlur={() => setFieldTouched('ocupationCity')}
                    onChangeText={ocupationCity => {
                      this.setState({ ocupationCity });
                      setFieldValue('ocupationCity', ocupationCity);
                    }}
                  />
                </FormField>

                <FormField
                  validateStatus={this.getValidateStatus('ocupationStateCode')}
                  error={this.getError('ocupationStateCode')}
                >
                  <Text style={styles.question}> ESTADO </Text>
                  <Picker
                    mode="dropdown"
                    iosIcon={
                      <Icon
                        name="arrow-down"
                        style={{ color: colors.primary }}
                      />
                    }
                    onBlur={() => setFieldTouched('ocupationStateCode')}
                    style={[
                      styles.itemInput,
                      styles.pickerContainer,
                      this.errorDropdown('ocupationStateCode'),
                    ]}
                    placeholder="Selecione"
                    placeholderStyle={{ color: colors.primary }}
                    placeholderIconColor={colors.primary}
                    selectedValue={this.state.ocupationStateCode}
                    onValueChange={ocupationStateCode => {
                      this.onHandleSelect(
                        ocupationStateCode,
                        'ocupationStateCode'
                      );
                      setFieldValue('ocupationStateCode', ocupationStateCode);
                    }}
                  >
                    {/* {this.androidPicker()} */}
                    {this.onHandleDropdown('state', 'code')}
                  </Picker>
                </FormField>

                <FormField
                  validateStatus={this.getValidateStatus(
                    'ocupationNationality'
                  )}
                  error={this.getError('ocupationNationality')}
                >
                  <Text style={styles.question}> PAÍS </Text>
                  <Picker
                    mode="dropdown"
                    iosIcon={
                      <Icon
                        name="arrow-down"
                        style={{ color: colors.primary }}
                      />
                    }
                    onBlur={() => setFieldTouched('ocupationNationality')}
                    style={[
                      styles.itemInput,
                      styles.pickerContainer,
                      this.errorDropdown('ocupationNationality'),
                    ]}
                    placeholder="Selecione"
                    placeholderStyle={{ color: colors.primary }}
                    placeholderIconColor={colors.primary}
                    selectedValue={this.state.ocupationNationality}
                    onValueChange={ocupationNationality => {
                      this.onHandleSelect(
                        ocupationNationality,
                        'ocupationNationality'
                      );
                      setFieldValue(
                        'ocupationNationality',
                        ocupationNationality
                      );
                    }}
                  >
                    {this.onHandleDropdown('country')}
                  </Picker>
                </FormField>

                <FormField
                  validateStatus={this.getValidateStatus('ocupationPhone')}
                  error={this.getError('ocupationPhone')}
                >
                  <Text style={styles.question}> TELEFONE </Text>
                  <TextInput
                    ref={c => {
                      this.ocupationPhone = c;
                    }}
                    returnKeyType="done"
                    value={this.state.ocupationPhone}
                    onBlur={() => setFieldTouched('ocupationPhone')}
                    maxLength={32}
                    placeholder="DDD + Telefone"
                    keyboardType="numeric"
                    style={[
                      styles.itemInput,
                      this.errorInput('ocupationPhone'),
                    ]}
                    onChangeText={ocupationPhone => {
                      this.mask(ocupationPhone, 'ocupationPhone');
                      setFieldValue('ocupationPhone', ocupationPhone);
                    }}
                  />
                </FormField>

                <FormField
                  validateStatus={this.getValidateStatus('ocupationEmail')}
                  error={this.getError('ocupationEmail')}
                >
                  <Text style={styles.question}> EMAIL </Text>
                  <TextInput
                    ref={c => {
                      this.ocupationEmail = c;
                    }}
                    returnKeyType="done"
                    value={this.state.ocupationEmail}
                    onBlur={() => setFieldTouched('ocupationEmail')}
                    maxLength={32}
                    style={[
                      styles.itemInput,
                      this.errorInput('ocupationEmail'),
                    ]}
                    onChangeText={ocupationEmail => {
                      this.mask(ocupationEmail, 'ocupationEmail');
                      setFieldValue('ocupationEmail', ocupationEmail);
                    }}
                  />
                </FormField>
                <FormField
                  validateStatus={this.getValidateStatus('salary')}
                  error={this.getError('salary')}
                >
                  <Text style={styles.question}> SALÁRIO PRÓ-LABORE </Text>
                  <TextInputMask
                    type={'money'}
                    ref={c => (this.salary = c)}
                    returnKeyType="done"
                    keyboardType={'numeric'}
                    value={this.state.salary}
                    onBlur={() => {
                      setFieldTouched('salary');
                      this.setState({
                        salaryTotal:
                          this.state.salaryAditional.length > 0
                            ? parseFloat(this.unMask(this.state.salary)) / 100 +
                              parseFloat(
                                this.unMask(this.state.salaryAditional)
                              ) /
                                100
                            : parseFloat(this.unMask(this.state.salary)) / 100,
                      });
                    }}
                    maxLength={32}
                    style={[styles.itemInput, this.errorInput('salary')]}
                    onChangeText={salary => {
                      this.setState({ salary });
                      setFieldValue('salary', salary);
                    }}
                  />
                </FormField>
                <FormField
                  validateStatus={this.getValidateStatus('salaryAditional')}
                  error={this.getError('salaryAditional')}
                >
                  <Text style={styles.question}> OUTROS RENDIMENTOS </Text>
                  <TextInputMask
                    type={'money'}
                    ref={c => {
                      this.salaryAditional = c;
                    }}
                    returnKeyType="done"
                    keyboardType={'numeric'}
                    value={this.state.salaryAditional}
                    onBlur={() => {
                      setFieldTouched('salaryAditional');
                      this.setState({
                        salaryTotal:
                          this.state.salary.length > 0
                            ? parseFloat(this.unMask(this.state.salary)) / 100 +
                              parseFloat(
                                this.unMask(this.state.salaryAditional)
                              ) /
                                100
                            : parseFloat(this.unMask(this.state.salary)) / 100,
                      });
                    }}
                    maxLength={32}
                    style={[
                      styles.itemInput,
                      this.errorInput('salaryAditional'),
                    ]}
                    onChangeText={salaryAditional => {
                      this.setState({ salaryAditional });
                      setFieldValue('salaryAditional', salaryAditional);
                    }}
                  />
                </FormField>
                <FormField
                  validateStatus={this.getValidateStatus(
                    'salaryAditionalSpecification'
                  )}
                  error={this.getError('salaryAditionalSpecification')}
                >
                  <Text style={styles.question}> ESPECIFICAR </Text>
                  <TextInput
                    ref={c => {
                      this.salaryAditionalSpecification = c;
                    }}
                    returnKeyType="done"
                    value={this.state.salaryAditionalSpecification}
                    onBlur={() =>
                      setFieldTouched('salaryAditionalSpecification')
                    }
                    maxLength={32}
                    style={[
                      styles.itemInput,
                      this.errorInput('salaryAditionalSpecification'),
                    ]}
                    onChangeText={salaryAditionalSpecification => {
                      this.onHandleInput(
                        salaryAditionalSpecification,
                        'salaryAditionalSpecification'
                      );
                      setFieldValue(
                        'salaryAditionalSpecification',
                        salaryAditionalSpecification
                      );
                    }}
                  />
                </FormField>
                <FormField
                  validateStatus={this.getValidateStatus(
                    'Rendimentos Totais - Dados Profissionais'
                  )}
                  error={this.getError(
                    'Rendimentos Totais - Dados Profissionais'
                  )}
                >
                  <Text style={styles.question}> RENDIMENTOS TOTAIS </Text>
                  <TextInputMask
                    disabled
                    type={'money'}
                    value={this.state.salaryTotal}
                    maxLength={32}
                    style={[styles.itemInput, this.errorInput('salaryTotal')]}
                    onChangeText={text =>
                      this.setState({ salaryTotal: this.state.salaryTotal }, () => console.log(this.state.salaryTotal))
                    }
                  />
                </FormField>
              </Collapsible>

              {/* FIM DO COLAPSE DADOS PROFISSIONAIS */}

              {/* INICIO COLLAPSE REPRESENTANTE */}

              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    investidor: !this.state.investidor,
                  });
                }}
              >
                <View style={styles.viewCollapse}>
                  <Text style={styles.question2}>Dados Financeiros</Text>
                  <Image
                    style={{ width: 15, height: 15 }}
                    source={require('../assets/i/arrow.png')}
                  />
                </View>
              </TouchableOpacity>

              {/* COLLAPSE */}

              <Collapsible
                collapsed={this.state.investidor}
                style={styles.collapseTab}
              >
                <FormField
                  validateStatus={this.getValidateStatus(
                    'investorFinanceKnowledgment'
                  )}
                  error={this.getError('investorFinanceKnowledgment')}
                >
                  <Text style={styles.question}> CONHECIMENTO FINANCEIRO </Text>
                  <Picker
                    mode="dropdown"
                    iosIcon={
                      <Icon
                        name="arrow-down"
                        style={{ color: colors.primary }}
                      />
                    }
                    onBlur={() =>
                      setFieldTouched('investorFinanceKnowledgment')
                    }
                    style={[
                      styles.itemInput,
                      styles.pickerContainer,
                      this.errorDropdown('investorFinanceKnowledgment'),
                    ]}
                    placeholder="Selecione"
                    placeholderStyle={{ color: colors.primary }}
                    placeholderIconColor={colors.primary}
                    selectedValue={this.state.investorFinanceKnowledgment}
                    onValueChange={investorFinanceKnowledgment => {
                      this.onHandleSelect(
                        investorFinanceKnowledgment,
                        'investorFinanceKnowledgment'
                      );
                      setFieldValue(
                        'investorFinanceKnowledgment',
                        investorFinanceKnowledgment
                      );
                    }}
                  >
                    {/* {this.androidPicker()} */}
                    {this.onHandleDropdown('conhecimentoFinanceiro')}
                  </Picker>
                </FormField>

                <Text style={styles.question}>DESEJA RECEBER EXTRATO?</Text>
                <View style={[styles.itemInput, styles.checkBoxContainer]}>
                  <Text style={styles.question2}>
                    {' '}
                    {this.state.receiveExtract ? 'SIM' : 'NÃO'}{' '}
                  </Text>
                  <Switch
                    backgroundActive={colors.primary}
                    backgroundInactive="#cecece"
                    circleBorderWidth={0}
                    value={this.state.receiveExtract}
                    onValueChange={value =>
                      this.setState({
                        receiveExtract: value,
                      })
                    }
                  />
                </View>

                {/* <Text style={styles.question}>
                    DESEJA RECEBER INFORME DO RENDIMENTO?
                  </Text>
                  <View style={[styles.itemInput, styles.checkBoxContainer]}>
                    <Text style={styles.question2}>
                      {this.state.receiveIncome ? 'SIM' : 'NÃO'}
                    </Text>
                    <Switch
                      backgroundActive={colors.primary}
                      backgroundInactive="#cecece"
                      circleBorderWidth={0}
                      value={this.state.receiveIncome}
                      onValueChange={value =>
                        this.setState({
                          receiveIncome: value,
                        })
                      }
                    />
                  </View> */}

                {/* <Text style={styles.question}>
                    AUTORIZA ENVIO DE EXTRATOS POR E-MAIL?
                  </Text>
                  <View style={[styles.itemInput, styles.checkBoxContainer]}>
                    <Text style={styles.question2}>
                      {this.state.allowDistributionToSendExtractByEmail
                        ? 'SIM'
                        : 'NÃO'}
                    </Text>
                    <Switch
                      backgroundActive={colors.primary}
                      backgroundInactive="#cecece"
                      circleBorderWidth={0}
                      value={this.state.allowDistributionToSendExtractByEmail}
                      onValueChange={value =>
                        this.setState({
                          allowDistributionToSendExtractByEmail: value,
                        })
                      }
                    />
                  </View> */}
                <FormField
                  validateStatus={this.getValidateStatus(
                    'optionToSendCorrespondence'
                  )}
                  error={this.getError('optionToSendCorrespondence')}
                >
                  <Text style={styles.question}>
                    {' '}
                    ENVIO DE CORRESPONDÊNCIA{' '}
                  </Text>
                  <Picker
                    mode="dropdown"
                    iosIcon={
                      <Icon
                        name="arrow-down"
                        style={{ color: colors.primary }}
                      />
                    }
                    onBlur={() => setFieldTouched('optionToSendCorrespondence')}
                    style={[
                      styles.itemInput,
                      styles.pickerContainer,
                      this.errorDropdown('optionToSendCorrespondence'),
                    ]}
                    placeholder="Selecione"
                    placeholderStyle={{ color: colors.primary }}
                    placeholderIconColor={colors.primary}
                    selectedValue={this.state.optionToSendCorrespondence}
                    onValueChange={optionToSendCorrespondence => {
                      this.onHandleSelect(
                        optionToSendCorrespondence,
                        'optionToSendCorrespondence'
                      );
                      setFieldValue(
                        'optionToSendCorrespondence',
                        optionToSendCorrespondence
                      );
                    }}
                  >
                    {/* {this.androidPicker()} */}
                    {this.onHandleDropdown('correspondencia')}
                  </Picker>
                </FormField>

                <FormField
                  validateStatus={this.getValidateStatus(
                    'allowTransmissionOfOrders'
                  )}
                  error={this.getError('allowTransmissionOfOrders')}
                >
                  <Text style={styles.question}>
                    AUTORIZA ORDENS POR REPRESENTANTE/PROCURADOR?
                  </Text>
                  <View style={[styles.itemInput, styles.checkBoxContainer]}>
                    <Text style={styles.question2}>
                      {this.state.allowTransmissionOfOrders ? 'SIM' : 'NÃO'}
                    </Text>
                    <Switch
                      onBlur={() =>
                        setFieldTouched('allowTransmissionOfOrders')
                      }
                      backgroundActive={colors.primary}
                      backgroundInactive="#cecece"
                      circleBorderWidth={0}
                      value={this.state.allowTransmissionOfOrders}
                      onValueChange={allowTransmissionOfOrders => {
                        this.setState({
                          allowTransmissionOfOrders,
                          hasFinanceRepresentative: !this.state
                            .hasFinanceRepresentative,
                        });
                        setFieldValue(
                          'allowTransmissionOfOrders',
                          allowTransmissionOfOrders
                        );
                      }}
                    />
                  </View>
                </FormField>

                {this.state.hasFinanceRepresentative && (
                  <View>
                    <FormField
                      validateStatus={this.getValidateStatus(
                        'investorThirdPartyName'
                      )}
                      error={this.getError('investorThirdPartyName')}
                    >
                      <Text style={styles.question}>
                        {' '}
                        NOME DO REPRESENTANTE/PROCURADOR{' '}
                      </Text>
                      <TextInput
                        onBlur={() => setFieldTouched('investorThirdPartyName')}
                        value={this.state.investorThirdPartyName}
                        maxLength={32}
                        style={[
                          styles.itemInput,
                          this.errorInput('investorThirdPartyName'),
                        ]}
                        onChangeText={investorThirdPartyName => {
                          this.mask(
                            investorThirdPartyName,
                            'investorThirdPartyName'
                          );
                          setFieldValue(
                            'investorThirdPartyName',
                            investorThirdPartyName
                          );
                        }}
                      />
                    </FormField>

                    <FormField
                      validateStatus={this.getValidateStatus(
                        'investorThirdPartyCpf'
                      )}
                      error={this.getError('investorThirdPartyCpf')}
                    >
                      <Text style={styles.question}>
                        {' '}
                        CPF DO REPRESENTANTE/PROCURADOR{' '}
                      </Text>
                      <TextInput
                        onBlur={() => setFieldTouched('investorThirdPartyCpf')}
                        value={this.state.investorThirdPartyCpf}
                        maxLength={32}
                        onEndEditing={() =>
                          this.errorCpf(
                            'investorThirdPartyCpf',
                            'investorThirdPartyCpfError'
                          )
                        }
                        overlayText="CPF"
                        maskType="cpf"
                        keyboardType="numeric"
                        returnKeyType="done"
                        style={[
                          styles.itemInput,
                          this.errorInput('investorThirdPartyCpf'),
                        ]}
                        onChangeText={investorThirdPartyCpf => {
                          setFieldValue(
                            'investorThirdPartyCpf',
                            investorThirdPartyCpf
                          );
                          return this.mask(
                            investorThirdPartyCpf,
                            'investorThirdPartyCpf'
                          );
                        }}
                      />
                    </FormField>
                    {this.state.cpfRepeated && <CpfError cpfRepeated />}
                    {this.state.investorThirdPartyCpfError && <CpfError />}

                    {/* <Text style={styles.question}>
                        OPERA POR CONTA DE TERCEIROS?
                      </Text>
                      <View
                        style={[styles.itemInput, styles.checkBoxContainer]}
                      >
                        <Text style={styles.question2}>
                          {this.state.operateByThirdPartyAccount
                            ? 'SIM'
                            : 'NÃO'}
                        </Text>
                        <Switch
                          backgroundActive={colors.primary}
                          backgroundInactive="#cecece"
                          circleBorderWidth={0}
                          value={this.state.operateByThirdPartyAccount}
                          onValueChange={value =>
                            this.setState({
                              operateByThirdPartyAccount: value,
                            })
                          }
                        />
                      </View> */}
                  </View>
                )}

                {/* <Text style={styles.question}>
                    É VINCULADO AO INTERMEDIÁRIO?
                  </Text>
                  <View style={[styles.itemInput, styles.checkBoxContainer]}>
                    <Text style={styles.question2}>
                      {this.state.linkedToIntermediary ? 'SIM' : 'NÃO'}
                    </Text>
                    <Switch
                      backgroundActive={colors.primary}
                      backgroundInactive="#cecece"
                      circleBorderWidth={0}
                      value={this.state.linkedToIntermediary}
                      onValueChange={value =>
                        this.setState({
                          linkedToIntermediary: value,
                        })
                      }
                    />
                  </View> */}
                {this.state.selectBank && this.selectBank()}
                <View>
                  <FormField
                    validateStatus={this.getValidateStatus('bank')}
                    error={this.getError('bank')}
                  >
                    <Text style={styles.question}> BANCO </Text>
                    <TextInput
                      ref={c => {
                        this.bank = c;
                      }}
                      returnKeyType="done"
                      onBlur={() => {
                        setFieldTouched('bank');
                        this.setState({
                          allowTheDebitOnMyBradescoAccount: this.state.bank.includes(
                            'radesco'
                          ),
                        });
                      }}
                      value={this.state.bank}
                      maxLength={32}
                      style={[styles.itemInput, this.errorInput('bank')]}
                      onChangeText={bank => {
                        const filtered = _.filter(
                          bancos,
                          banco =>
                            banco.nome === bank ||
                            banco.nome.includes(bank) ||
                            banco.codigo === bank
                        );
                        this.setState({
                          bank,
                          bankFiltered: filtered,
                          selectBank: true,
                        });
                        setFieldValue('bank', bank);
                      }}
                    />
                  </FormField>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <FormField
                      validateStatus={this.getValidateStatus('bankBranch')}
                      error={this.getError('bankBranch')}
                    >
                      <Text style={styles.question}> AGÊNCIA </Text>
                      <TextInput
                        ref={c => {
                          this.bankBranch = c;
                        }}
                        returnKeyType="done"
                        // onSubmitEditing={() =>
                        //   this.focusInput('bankBranchDigit')
                        // }
                        onBlur={() => setFieldTouched('bankBranch')}
                        value={this.state.bankBranch}
                        keyboardType="numeric"
                        maxLength={32}
                        style={[
                          styles.itemInput,
                          { width: Dimensions.get('window').width / 2 },
                          this.errorInput('bankBranch'),
                        ]}
                        onChangeText={bankBranch => {
                          this.mask(bankBranch, 'bankBranch');
                          setFieldValue('bankBranch', bankBranch);
                        }}
                      />
                    </FormField>
                    <FormField
                      validateStatus={this.getValidateStatus('bankBranchDigit')}
                      error={this.getError('bankBranchDigit')}
                    >
                      <Text style={styles.question}> DÍGITO </Text>
                      <TextInput
                        ref={c => {
                          this.bankBranchDigit = c;
                        }}
                        returnKeyType="done"
                        keyboardType="numeric"
                        onBlur={() => setFieldTouched('bankBranchDigit')}
                        value={
                          bankBranchDigit.toString().length > 1
                            ? ''
                            : bankBranchDigit
                        }
                        maxLength={32}
                        style={[
                          styles.itemInput,
                          { width: Dimensions.get('window').width / 4 },
                          this.errorInput('bankBranchDigit'),
                        ]}
                        onChangeText={bankBranchDigit => {
                          this.setState({ bankBranchDigit });
                          setFieldValue('bankBranchDigit', bankBranchDigit);
                        }}
                      />
                    </FormField>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <FormField
                      validateStatus={this.getValidateStatus('bankAccount')}
                      error={this.getError('bankAccount')}
                    >
                      <Text style={styles.question}> CONTA-CORRENTE </Text>
                      <TextInput
                        ref={c => {
                          this.bankAccount = c;
                        }}
                        returnKeyType="done"
                        // onSubmitEditing={() =>
                        //   this.focusInput('bankAccountDigit')
                        // }
                        onBlur={() => setFieldTouched('bankAccount')}
                        value={this.state.bankAccount}
                        maxLength={32}
                        keyboardType="numeric"
                        style={[
                          styles.itemInput,
                          { width: Dimensions.get('window').width / 2 },
                          this.errorInput('bankAccount'),
                        ]}
                        onChangeText={bankAccount => {
                          this.mask(bankAccount, 'bankAccount');
                          setFieldValue('bankAccount', bankAccount);
                        }}
                      />
                    </FormField>
                    <FormField
                      validateStatus={this.getValidateStatus(
                        'bankAccountDigit'
                      )}
                      error={this.getError('bankAccountDigit')}
                    >
                      <Text style={styles.question}> DÍGITO </Text>
                      <TextInput
                        ref={c => {
                          this.bankAccountDigit = c;
                        }}
                        returnKeyType="done"
                        keyboardType="numeric"
                        // onSubmitEditing={() =>
                        //   this.focusInput('bankAccountOwner')
                        // }
                        onBlur={() => setFieldTouched('bankAccountDigit')}
                        value={
                          bankAccountDigit.toString().length > 1
                            ? ''
                            : bankAccountDigit
                        }
                        maxLength={32}
                        style={[
                          styles.itemInput,
                          { width: Dimensions.get('window').width / 4 },
                          this.errorInput('bankAccountDigit'),
                        ]}
                        onChangeText={bankAccountDigit => {
                          this.mask(bankAccountDigit, 'bankAccountDigit');
                          setFieldValue('bankAccountDigit', bankAccountDigit);
                        }}
                      />
                    </FormField>
                  </View>

                  <Text style={styles.question}>
                    PERMITIR DÉBITO DA MINHA CONTA BRADESCO
                  </Text>
                  <View style={[styles.itemInput, styles.checkBoxContainer]}>
                    <Text style={styles.question2}>
                      {this.state.allowTheDebitOnMyBradescoAccount
                        ? 'SIM'
                        : 'NÃO'}
                    </Text>
                    <Switch
                      backgroundActive={colors.primary}
                      backgroundInactive="#cecece"
                      circleBorderWidth={0}
                      value={this.state.allowTheDebitOnMyBradescoAccount}
                      onValueChange={value =>
                        this.setState({
                          allowTheDebitOnMyBradescoAccount: value,
                        })
                      }
                    />
                  </View>

                  <FormField
                    validateStatus={this.getValidateStatus('bankAccountOwner')}
                    error={this.getError('bankAccountOwner')}
                  >
                    <Text style={styles.question}> TITULAR </Text>
                    <TextInput
                      ref={c => {
                        this.bankAccountOwner = c;
                      }}
                      returnKeyType="done"
                      onBlur={() => setFieldTouched('bankAccountOwner')}
                      value={this.state.bankAccountOwner}
                      maxLength={32}
                      style={[
                        styles.itemInput,
                        this.errorInput('bankAccountOwner'),
                      ]}
                      onChangeText={bankAccountOwner =>
                        this.setState({ bankAccountOwner })
                      }
                    />
                  </FormField>
                  <FormField
                    validateStatus={this.getValidateStatus(
                      'bankAccountOwnerCpf'
                    )}
                    error={this.getError('bankAccountOwnerCpf')}
                  >
                    <Text style={styles.question}>CPF</Text>
                    <TextInput
                      value={this.state.cpf}
                      onBlur={() => {
                        setFieldTouched('bankAccountOwnerCpf');
                        this.errorCpf('cpf', 'cpfError');
                      }}
                      overlayText="CPF"
                      maskType="cpf"
                      keyboardType="numeric"
                      returnKeyType="done"
                      maxLength={32}
                      style={[styles.itemInput]}
                      onChangeText={cpf => this.mask(cpf, 'cpf')}
                    />
                  </FormField>
                  {this.state.cpfError && <CpfError />}
                  <FormField
                    validateStatus={this.getValidateStatus(
                      'Nome do Co-titular'
                    )}
                    error={this.getError('Nome do Co-titular')}
                  >
                    <Text style={styles.question}>NOME DO CO-TITULAR</Text>
                    <TextInput
                      ref={c => {
                        this.bankCoOwnerAccount = c;
                      }}
                      returnKeyType="done"
                      value={this.state.bankCoOwnerAccount}
                      onBlur={() => {
                        this.errorCpf('cpf', 'cpfError');
                        setFieldTouched('Nome do Co-titular');
                      }}
                      maxLength={32}
                      style={[styles.itemInput]}
                      onChangeText={bankCoOwnerAccount => {
                        setFieldValue('Nome do Co-titular', bankCoOwnerAccount);
                        return this.mask(
                          bankCoOwnerAccount,
                          'bankCoOwnerAccount'
                        );
                      }}
                    />
                  </FormField>
                  <FormField
                    validateStatus={this.getValidateStatus(
                      'bankCoOwnerAccountCpf'
                    )}
                    error={this.getError('bankCoOwnerAccountCpf')}
                  >
                    <Text style={styles.question}>CPF DO CO-TITULAR</Text>
                    <TextInput
                      ref={c => {
                        this.bankCoOwnerAccountCpf = c;
                      }}
                      returnKeyType="done"
                      value={this.state.bankCoOwnerAccountCpf}
                      overlayText="CPF"
                      maskType="cpf"
                      keyboardType="numeric"
                      onEndEditing={() =>
                        this.errorCpf(
                          'bankCoOwnerAccountCpf',
                          'bankCoOwnerAccountCpfError'
                        )
                      }
                      onBlur={() => setFieldTouched('bankCoOwnerAccountCpf')}
                      maxLength={32}
                      style={[styles.itemInput]}
                      onChangeText={bankCoOwnerAccountCpf => {
                        setFieldValue(
                          'bankCoOwnerAccountCpf',
                          bankCoOwnerAccountCpf
                        );
                        return this.mask(
                          bankCoOwnerAccountCpf,
                          'bankCoOwnerAccountCpf'
                        );
                      }}
                    />
                  </FormField>
                  {this.state.bankCoOwnerAccountCpf === this.state.cpf &&
                    this.state.cpf.length > 0 && <CpfError cpfRepeated />}
                  {this.state.bankCoOwnerAccountCpfError && <CpfError />}

                  <Text style={styles.question}>
                    DESEJA ADICIONAR OUTRA CONTA-CORRENTE?
                  </Text>
                  <View style={[styles.itemInput, styles.checkBoxContainer]}>
                    <Text style={styles.question2}>
                      {this.state.addNewBankAccount ? 'SIM' : 'NÃO'}
                    </Text>
                    <Switch
                      backgroundActive={colors.primary}
                      backgroundInactive="#cecece"
                      onBlur={() => setFieldTouched('addNewBankAccount')}
                      circleBorderWidth={0}
                      value={this.state.addNewBankAccount}
                      onValueChange={addNewBankAccount => {
                        this.setState({
                          addNewBankAccount,
                        });
                        setFieldValue('addNewBankAccount', addNewBankAccount);
                      }}
                    />
                  </View>
                  {this.state.selectSecondBank && this.selectSecondBank()}
                  {this.state.addNewBankAccount && this.newBankAccount()}
                </View>
              </Collapsible>

              {/* INICIO COLLAPSE PATRIMONIAL */}

              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    patrimonial: !this.state.patrimonial,
                  });
                  this.focusInput('patrimonialTypeOne');
                }}
              >
                <View style={styles.viewCollapse}>
                  <Text style={styles.question2}>Dados Patrimoniais</Text>
                  <Image
                    style={{ width: 15, height: 15 }}
                    source={require('../assets/i/arrow.png')}
                  />
                </View>
              </TouchableOpacity>

              {/* COLLAPSE */}

              <Collapsible
                collapsed={this.state.patrimonial}
                style={styles.collapseTab}
              >
                <View>
                  <FormField
                    validateStatus={this.getValidateStatus(
                      'patrimonialTypeOne'
                    )}
                    error={this.getError('patrimonialTypeOne')}
                  >
                    <Text style={styles.question}> TIPO </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: 'Rubik-Light',
                        color: colors.primary,
                        marginLeft: 10,
                      }}
                    >
                      Imóvel, Automóvel, Investimento Financeiro
                    </Text>
                    <TextInput
                      placeholderTextColor="#c1c1c1"
                      ref={c => {
                        this.patrimonialTypeOne = c;
                      }}
                      returnKeyType="done"
                      // onSubmitEditing={() =>
                      //   this.focusInput('patrimonialTypeOneValue')
                      // }
                      onBlur={() => setFieldTouched('patrimonialTypeOne')}
                      value={this.state.patrimonialTypeOne}
                      maxLength={32}
                      style={[styles.itemInput]}
                      onChangeText={patrimonialTypeOne => {
                        this.mask(patrimonialTypeOne, 'patrimonialTypeOne');
                        setFieldValue('patrimonialTypeOne', patrimonialTypeOne);
                      }}
                    />
                  </FormField>
                  <FormField
                    validateStatus={this.getValidateStatus(
                      'patrimonialTypeOneValue'
                    )}
                    error={this.getError('patrimonialTypeOneValue')}
                  >
                    <Text style={styles.question}> VALOR ATUAL </Text>
                    <TextInputMask
                      type={'money'}
                      ref={c => {
                        this.salary = c;
                      }}
                      returnKeyType="done"
                      keyboardType="numeric"
                      value={this.state.patrimonialTypeOneValue}
                      onBlur={() => {
                        setFieldTouched('patrimonialTypeOneValue');
                        this.updateTotalPatrimonio();
                      }}
                      maxLength={32}
                      style={[
                        styles.itemInput,
                        this.errorInput('patrimonialTypeOneValue'),
                      ]}
                      onChangeText={patrimonialTypeOneValue => {
                        this.mask(
                          patrimonialTypeOneValue,
                          'patrimonialTypeOneValue'
                        );
                        setFieldValue(
                          'patrimonialTypeOneValue',
                          patrimonialTypeOneValue
                        );
                      }}
                    />
                  </FormField>
                  <FormField
                    validateStatus={this.getValidateStatus(
                      'patrimonialTypeTwo'
                    )}
                    error={this.getError('patrimonialTypeTwo')}
                  >
                    <Text style={styles.question}> TIPO </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: 'Rubik-Light',
                        color: colors.primary,
                        marginLeft: 10,
                      }}
                    >
                      Imóvel, Automóvel, Investimento Financeiro
                    </Text>
                    <TextInput
                      placeholderTextColor="#c1c1c1"
                      ref={c => {
                        this.patrimonialTypeTwo = c;
                      }}
                      returnKeyType="done"
                      // onSubmitEditing={() =>
                      //   this.focusInput('patrimonialTypeTwoValue')
                      // }
                      onBlur={() => setFieldTouched('patrimonialTypeTwo')}
                      value={this.state.patrimonialTypeTwo}
                      maxLength={32}
                      style={[styles.itemInput]}
                      onChangeText={patrimonialTypeTwo => {
                        this.mask(patrimonialTypeTwo, 'patrimonialTypeTwo');
                        setFieldValue('patrimonialTypeTwo', patrimonialTypeTwo);
                      }}
                    />
                  </FormField>
                  <FormField
                    validateStatus={this.getValidateStatus(
                      'patrimonialTypeTwoValue'
                    )}
                    error={this.getError('patrimonialTypeTwoValue')}
                  >
                    <Text style={styles.question}> VALOR ATUAL </Text>
                    <TextInputMask
                      type={'money'}
                      returnKeyType="done"
                      keyboardType={'numeric'}
                      value={this.state.patrimonialTypeTwoValue}
                      onBlur={() => {
                        setFieldTouched('patrimonialTypeTwoValue');
                        this.updateTotalPatrimonio();
                      }}
                      maxLength={32}
                      style={[
                        styles.itemInput,
                        this.errorInput('patrimonialTypeTwoValue'),
                      ]}
                      onChangeText={patrimonialTypeTwoValue => {
                        this.setState({ patrimonialTypeTwoValue });
                        setFieldValue(
                          'patrimonialTypeTwoValue',
                          patrimonialTypeTwoValue
                        );
                      }}
                    />
                  </FormField>
                  <FormField
                    validateStatus={this.getValidateStatus(
                      'patrimonialTypeThree'
                    )}
                    error={this.getError('patrimonialTypeThree')}
                  >
                    <Text style={styles.question}> TIPO </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: 'Rubik-Light',
                        color: colors.primary,
                        marginLeft: 10,
                      }}
                    >
                      Imóvel, Automóvel, Investimento Financeiro
                    </Text>
                    <TextInput
                      placeholderTextColor="#c1c1c1"
                      ref={c => {
                        this.patrimonialTypeThree = c;
                      }}
                      returnKeyType="done"
                      // onSubmitEditing={() =>
                      //   this.focusInput('patrimonialTypeThreeValue')
                      // }
                      onBlur={() => setFieldTouched('patrimonialTypeThree')}
                      value={this.state.patrimonialTypeThree}
                      maxLength={32}
                      style={[styles.itemInput]}
                      onChangeText={patrimonialTypeThree => {
                        this.mask(patrimonialTypeThree, 'patrimonialTypeThree');
                        setFieldValue(
                          'patrimonialTypeThree',
                          patrimonialTypeThree
                        );
                      }}
                    />
                  </FormField>
                  <FormField
                    validateStatus={this.getValidateStatus(
                      'patrimonialTypeThreeValue'
                    )}
                    error={this.getError('patrimonialTypeThreeValue')}
                  >
                    <Text style={styles.question}> VALOR ATUAL </Text>
                    <TextInputMask
                      type={'money'}
                      returnKeyType="done"
                      keyboardType={'numeric'}
                      value={this.state.patrimonialTypeThreeValue}
                      onBlur={() => {
                        setFieldTouched('patrimonialTypeThreeValue');
                        this.updateTotalPatrimonio();
                      }}
                      maxLength={32}
                      style={[
                        styles.itemInput,
                        this.errorInput('patrimonialTypeThreeValue'),
                      ]}
                      onChangeText={patrimonialTypeThreeValue => {
                        this.setState({ patrimonialTypeThreeValue });
                        setFieldValue(
                          'patrimonialTypeThreeValue',
                          patrimonialTypeThreeValue
                        );
                      }}
                    />
                  </FormField>
                  <FormField
                    validateStatus={this.getValidateStatus(
                      'patrimonialTypeFour'
                    )}
                    error={this.getError('patrimonialTypeFour')}
                  >
                    <Text style={styles.question}> TIPO </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: 'Rubik-Light',
                        color: colors.primary,
                        marginLeft: 10,
                      }}
                    >
                      Imóvel, Automóvel, Investimento Financeiro
                    </Text>
                    <TextInput
                      placeholderTextColor="#c1c1c1"
                      ref={c => {
                        this.patrimonialTypeFour = c;
                      }}
                      returnKeyType="done"
                      // onSubmitEditing={() =>
                      //   this.focusInput('patrimonialTypeFourValue')
                      // }
                      onBlur={() => setFieldTouched('patrimonialTypeFour')}
                      value={this.state.patrimonialTypeFour}
                      maxLength={32}
                      style={[styles.itemInput]}
                      onChangeText={patrimonialTypeFour => {
                        this.mask(patrimonialTypeFour, 'patrimonialTypeFour');
                        setFieldValue(
                          'patrimonialTypeFour',
                          patrimonialTypeFour
                        );
                      }}
                    />
                  </FormField>
                  <FormField
                    validateStatus={this.getValidateStatus(
                      'patrimonialTypeFourValue'
                    )}
                    error={this.getError('patrimonialTypeFourValue')}
                  >
                    <Text style={styles.question}> VALOR ATUAL </Text>
                    <TextInputMask
                      type={'money'}
                      returnKeyType="done"
                      keyboardType={'numeric'}
                      value={this.state.patrimonialTypeFourValue}
                      onBlur={() => {
                        setFieldTouched('patrimonialTypeFourValue');
                        this.updateTotalPatrimonio();
                      }}
                      maxLength={32}
                      style={[
                        styles.itemInput,
                        this.errorInput('patrimonialTypeFourValue'),
                      ]}
                      onChangeText={patrimonialTypeFourValue => {
                        this.setState({ patrimonialTypeFourValue });
                        setFieldValue(
                          'patrimonialTypeFourValue',
                          patrimonialTypeFourValue
                        );
                      }}
                    />
                  </FormField>
                  <FormField
                    validateStatus={this.getValidateStatus(
                      'totalPatrimonialValue'
                    )}
                    error={this.getError('totalPatrimonialValue')}
                  >
                    <Text style={[styles.question, { fontSize: 12.5 }]}>
                      PATRIMÔNIO TOTAL
                    </Text>
                    <TextInputMask
                      disabled
                      type={'money'}
                      value={this.state.totalPatrimonialValue}
                      style={[styles.itemInput]}
                      onChangeText={() =>
                        this.setState({
                          totalPatrimonialValue: this.state
                            .totalPatrimonialValue,
                        })
                      }
                    />
                  </FormField>
                </View>

                <Text style={styles.question}>
                  PESSOA POLITICAMENTE EXPOSTA
                </Text>
                <View
                  style={{
                    marginTop: 5,
                    marginBottom: 5,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13.5,
                      fontFamily: 'Rubik-Light',
                      color: colors.primary,
                      // marginLeft: 7,
                      // marginRight: 10,
                    }}
                  >
                    Exerce ou exerceu nos últimos 5 anos algum cargo, emprego ou
                    função pública relevante
                  </Text>
                </View>
                <View
                  style={[styles.itemInput, styles.checkBoxContainer]}
                  onPress={() => {
                    this.setState({
                      relevantPublicFunction: !this.state
                        .relevantPublicFunction,
                    });
                  }}
                >
                  <Text style={styles.question2}>
                    {this.state.relevantPublicFunction ? 'SIM' : 'NÃO'}
                  </Text>
                  <Switch
                    backgroundActive={colors.primary}
                    backgroundInactive="#cecece"
                    circleBorderWidth={0}
                    value={this.state.relevantPublicFunction}
                    onValueChange={value =>
                      this.setState({
                        relevantPublicFunction: value,
                      })
                    }
                  />
                </View>

                <Text
                  style={{
                    fontSize: 13.5,
                    fontFamily: 'Rubik-Light',
                    color: colors.primary,
                    // marginLeft: 7,
                    // marginRight: 10,
                  }}
                >
                  Possui relacionamento com agente Público?
                </Text>
                <View style={[styles.itemInput, styles.checkBoxContainer]}>
                  <Text style={styles.question2}>
                    {this.state.linkWithPublicAgent ? 'SIM' : 'NÃO'}
                  </Text>
                  <Switch
                    backgroundActive={colors.primary}
                    backgroundInactive="#cecece"
                    circleBorderWidth={0}
                    value={this.state.linkWithPublicAgent}
                    onValueChange={value =>
                      this.setState({
                        linkWithPublicAgent: value,
                      })
                    }
                  />
                </View>

                <Text style={styles.question}>INFORMAÇÕES FISCAIS</Text>
                <View
                  style={{
                    marginTop: 5,
                    marginBottom: 5,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13.5,
                      fontFamily: 'Rubik-Light',
                      color: colors.primary,
                      // marginLeft: 7,
                      // marginRight: 10,
                    }}
                  >
                    Possui alguma nacionalidade além da declarada, alguma
                    residência fiscal além da Brasileira ou visto de residência
                    permanente em outros países, como por exemplo Green Card?
                  </Text>
                </View>
                <View style={[styles.itemInput, styles.checkBoxContainer]}>
                  <Text style={styles.question2}>
                    {this.state.usaResidenceVisa ? 'SIM' : 'NÃO'}{' '}
                  </Text>
                  <Switch
                    backgroundActive={colors.primary}
                    backgroundInactive="#cecece"
                    circleBorderWidth={0}
                    value={this.state.usaResidenceVisa}
                    onValueChange={value =>
                      this.setState({
                        usaResidenceVisa: value,
                      })
                    }
                  />
                </View>
              </Collapsible>

              {/* FIM COLLAPSE PATRIMONIAL */}
            </View>
            <Button
              standard
              primary
              style={styles.proceedButton}
              onPress={() => {
                this.setState({
                  visibleModal: true,
                });
              }}
            >
              <Text style={[styles.proceedButtonText]} uppercase={false}>
                Enviar
              </Text>
            </Button>
            <View
              style={{
                flex: 1,
                justifyContent: 'flex-end',
                paddingBottom: 15,
              }}
            />
          </View>
        </Formik>
      </ScrollView>
      // </KeyboardAvoidingView>
    );
  }
}

export default compose(
  withApollo,
  graphql(SET_INVESTOR_DATA, { name: 'createInvestorData' })
)(withNavigation(enhancer(DataValidationSwiper)));

const styles = StyleSheet.create({
  containerAutoComplete: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '50%',
  },
  associatedStyle: {
    fontSize: moderateScale(18),
    color: colors.primary,
    fontFamily: 'Rubik-Regular',
    paddingHorizontal: moderateScale(12),
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
    // backgroundColor: 'blue',
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
    // alignItems: 'center',
    alignSelf: 'center',
    marginTop: moderateScale(12),
  },
  icon: {
    // position: 'absolute',
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
  // itemInput: {
  //   textAlign: 'center',
  //   width: '100%',
  // },
  dropAndSwitchInput: {
    textAlign: 'left',
    fontFamily: 'Rubik-Regular',
    fontSize: moderateScale(16),
    color: '#808281',
    borderColor: 'transparent',
    borderWidth: 1,
    borderRadius: 10,
    width: '100%',
    backgroundColor: 'transparent',
    paddingHorizontal: moderateScale(20),
    height: Platform.OS === 'ios' ? 40 : 48,
  },
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
    height: Platform.OS === 'ios' ? 40 : 48,
  },
  itemInputDisabled: {
    textAlign: 'left',
    fontFamily: 'Rubik-Regular',
    fontSize: moderateScale(16),
    color: '#afadad',
    borderColor: 'transparent',
    borderWidth: 1,
    borderRadius: 10,
    width: '100%',
    backgroundColor: '#eae6e5',
    paddingHorizontal: moderateScale(20),
    height: Platform.OS === 'ios' ? 40 : 48,
  },
  pickerContainer: {
    width: '100%',
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
    flex: 1,
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
  viewTitle: {
    padding: moderateScale(16),
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
  modalButton: {
    marginBottom: moderateScale(20),
  },
  // proceedButton: {
  //   justifyContent: 'center',
  //   marginTop: moderateScale(15),
  //   alignSelf: 'center',
  //   marginBottom: moderateScale(30),
  // },
  // proceedButtonText: {
  //   fontSize: moderateScale(18),
  //   color: '#fff',
  //   fontFamily: 'Rubik-Light',
  // },
});
