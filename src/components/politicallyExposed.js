import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TextInput,
  Platform,
  Dimensions,
  KeyboardAvoidingView,
} from 'react-native';
import { Picker, Icon } from 'native-base';
import Modal from 'react-native-modal';
import { withNavigation } from 'react-navigation';
import { withApollo, compose, graphql } from 'react-apollo';
import { withFormik, Formik } from 'formik';
import VMasker from 'vanilla-masker';
import { Switch } from 'react-native-switch';
import _ from 'lodash';
import Button from './Button';
import colors from '../config/colors';
import { moderateScale } from '../config/scaling';
import yup from '../lib/yup';
import {
  POLITICALLY_EXPOSED_PERSON,
  LINK_WITH_PUBLIC_AGENT,
} from '../graphql/mutations';
import FormField from './FormField';
import {
  publicFunction,
  publicFunctionAndroid,
  relatedCode,
  relatedCodeAndroid,
} from '../utils/Picker';
import { cnpjValidator } from '../utils/Validator';
import CpfError from './CpfError';
import Checkbox from 'react-native-custom-checkbox';

const enhancer = withFormik({
  validationSchema: yup.object().shape({
    // razaoSocial: yup
    //   .string()
    //   .min(7, 'Favor inserir Nome/Razão Social completo')
    //   .required('Esse campo é obrigatório'),
    // cpfCnpj: yup
    //   .string()
    //   .min(14, 'Campo inválido')
    //   .required('Campo obrigatório'),
    RelevantPublicFunction: yup.boolean(),
    publicFunction: yup
      .string()
      .notRequired()
      .when('RelevantPublicFunction', {
        is: val => val === true,
        then: yup.string().required('Obrigatório'),
        otherwise: yup.string().notRequired(),
      }),
    publicFunctionCode: yup
      .number()
      .notRequired()
      .when('RelevantPublicFunction', {
        is: val => val === true,
        then: yup.number().required('Obrigatório'),
        otherwise: yup.number().notRequired(),
      }),
    startDate: yup
      .string()
      .notRequired()
      .when('RelevantPublicFunction', {
        is: val => val === true,
        then: yup.string().required('Obrigatório'),
        otherwise: yup.string().notRequired(),
      }),
    endDate: yup
      .string()
      .notRequired()
      .when('RelevantPublicFunction', {
        is: val => val === true,
        then: yup.string().required('Obrigatório'),
        otherwise: yup.string().notRequired(),
      }),
    companyGovernment: yup
      .string()
      .notRequired()
      .when('RelevantPublicFunction', {
        is: val => val === true,
        then: yup.string().required('Obrigatório'),
        otherwise: yup.string().notRequired(),
      }),
    cnpj: yup
      .string()
      .notRequired()
      .when('RelevantPublicFunction', {
        is: val => val === true,
        then: yup.string().required('Obrigatório'),
        otherwise: yup.string().notRequired(),
      }),
    // branch: yup
    //   .string()
    //   .notRequired()
    //   .when('RelevantPublicFunction', {
    //     is: val => val === true,
    //     then: yup.string().required('Obrigatório'),
    //     otherwise: yup.string().notRequired(),
    //   }),
    // control: yup
    //   .string()
    //   .notRequired()
    //   .when('RelevantPublicFunction', {
    //     is: val => val === true,
    //     then: yup.string().required('Obrigatório'),
    //     otherwise: yup.string().notRequired(),
    //   }),
    relevantPublicFunctionRelationship: yup.boolean(),
    relatedName: yup
      .string()
      .notRequired()
      .when('relevantPublicFunctionRelationship', {
        is: val => val === true,
        then: yup.string().required('Obrigatório'),
        otherwise: yup.string().notRequired(),
      }),
    cpfRelated: yup
      .string()
      .notRequired()
      .when('relevantPublicFunctionRelationship', {
        is: val => val === true,
        then: yup.string().required('Obrigatório'),
        otherwise: yup.string().notRequired(),
      }),
    relatedControl: yup
      .string()
      .notRequired()
      .when('relevantPublicFunctionRelationship', {
        is: val => val === true,
        then: yup.string().required('Obrigatório'),
        otherwise: yup.string().notRequired(),
      }),
    relatedFunction: yup
      .string()
      .notRequired()
      .when('relevantPublicFunctionRelationship', {
        is: val => val === true,
        then: yup.string().required('Obrigatório'),
        otherwise: yup.string().notRequired(),
      }),
    relatedRelationship: yup
      .string()
      .notRequired()
      .when('relevantPublicFunctionRelationship', {
        is: val => val === true,
        then: yup.string().required('Obrigatório'),
        otherwise: yup.string().notRequired(),
      }),
    relatedRelationshipCode: yup
      .number()
      .notRequired()
      .when('relevantPublicFunctionRelationship', {
        is: val => val === true,
        then: yup.number().required('Obrigatório'),
        otherwise: yup.number().notRequired(),
      }),
  }),
});

class DataValidationSwiper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //MODAL
      visibleModal: false,
      modalTitle: '',
      modalText: '', // INPUTS && SWITCHS
      razaoSocial: this.props.navigation.state.params
        ? this.props.navigation.state.params.userData.titularName
        : '',
      cpfCnpj: this.props.navigation.state.params
        ? this.props.navigation.state.params.userData.cpf
        : '',
      RelevantPublicFunction: this.props.navigation.state.params
        ? this.props.navigation.state.params.userData.relevantPublicFunction
        : false,
      publicFunction: '',
      publicFunctionCode: '',
      startDate: '',
      endDate: '',
      companyGovernment: '',
      cnpj: '',
      branch: '',
      control: '',
      relevantPublicFunctionRelationship: this.props.navigation.state.params
        ? this.props.navigation.state.params.userData.linkWithPublicAgent
        : false,
      relatedName: '',
      cpfRelated: '',
      relatedControl: '',
      relatedFunction: '',
      relatedRelationship: '',
      relatedRelationshipCode: '', // Flags
      sendButton: false, //Cnpj Validation
      invalidCnpj: false,
      invalidCpfCnpj: false,

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

  onHandleDropdown = (value, key) => {
    if (value === 'publicFunctionCode') {
      if (Platform.OS === 'android') {
        let publicFunctionAndroidOrdered = _.orderBy(publicFunctionAndroid, [
          'asc',
        ]);
        return publicFunctionAndroidOrdered.map(publicFunction => {
          return (
            <Picker.Item
              label={`${publicFunction.codigo} - ${publicFunction.descricao}`}
              value={
                publicFunction.descricao === 'Selecione'
                  ? 0
                  : publicFunction.codigo
              }
              style={styles.picker}
            />
          );
        });
      } else {
        let publicFunctionOrdered = _.orderBy(
          publicFunction,
          ['codigo'],
          ['asc']
        );
        console.log('public function ordered', publicFunctionOrdered);
        return publicFunctionOrdered.map(publicFunction => {
          return (
            <Picker.Item
              label={`${publicFunction.codigo} - ${publicFunction.descricao}`}
              value={`${publicFunction.codigo}`}
              style={styles.picker}
            />
          );
        });
      }
    } else if (value === 'relatedRelationshipCode') {
      if (Platform.OS === 'android') {
        return relatedCodeAndroid.map(related => {
          return (
            <Picker.Item
              label={`${related.codigo} - ${related.descricao}`}
              value={`${related.codigo}`}
              style={styles.picker}
            />
          );
        });
      } else {
        return relatedCode.map(related => {
          return (
            <Picker.Item
              label={`${related.codigo} - ${related.descricao}`}
              value={`${related.codigo}`}
              style={styles.picker}
            />
          );
        });
      }
    }
  };

  onHandleSelect = (value, key) => {
    console.log(key, value);
    this.setState({ [key]: value });
  };

  handleMutationComplete = () => {
    this.handleMutationOne();
    this.handleMutationTwo();
  };

  handleMutationOne = () => {
    this.props
      .politicallyExposed({
        variables: {
          input: {
            titularName: this.state.razaoSocial,
            //cpf: this.state.cpfCnpj,
            functionOffice: this.state.publicFunction,
            officeCode: parseInt(this.state.publicFunctionCode),
            startFunction: this.state.startDate,
            endFunction: this.state.endDate,
            publicAgency: this.state.companyGovernment,
            cnpj: this.state.cnpj,
            branch: this.state.branch,
            control: this.state.control,
          },
        },
      })
      .then(data => {
        if (
          this.props.navigation.state.params.navigateAfter === 'taxInformation'
        ) {
          return this.props.navigation.navigate('TaxInformation', {
            userData: this.props.navigation.state.params.userData,
          });
        } else {
          return this.props.navigation.navigate('SecuritySteps');
        }
      })
      .catch(error => {
        this.setState({
          modalTitle: 'Opss, algo deu errado.',
          modalText:
            'Favor verifique se todos os campos estão preenchidos corretamente.',
          visibleModal: true,
          backgroundColor: { backgroundColor: '#fff' },
        });
      });
  };

  handleMutationTwo = () => {
    this.props
      .LinkWithPublicAgent({
        variables: {
          input: {
            relatedName: this.state.relatedName,
            cpf: this.state.cpfRelated,
            functionOffice: this.state.relatedControl,
            relationCode: parseInt(this.state.relatedRelationshipCode),
            relationshipType: this.state.relatedRelationship,
            control: this.state.relatedRelationshipCode,
          },
        },
      })
      .then(data => {
        if (
          this.props.navigation.state.params.navigateAfter === 'taxInformation'
        ) {
          return this.props.navigation.navigate('TaxInformation', {
            userData: this.props.navigation.state.params.userData,
          });
        } else {
          return this.props.navigation.navigate('SecuritySteps');
        }
      })
      .catch(error => {
        this.setState({
          modalTitle: 'Opss, algo deu errado.',
          modalText:
            'Favor verifique se todos os campos estão preenchidos corretamente.',
          visibleModal: true,
          backgroundColor: { backgroundColor: '#fff' },
        });
      });
  };
  saveValidationDataMutation = () => {
    this.setState(
      {
        visibleModal: false,
      },
      () => {
        if (Object.keys(this.props.errors).length !== 0) {
          let errorsFieldNames = [];
          for (let key in this.props.errors) {
            errorsFieldNames.push(key);
          }
          this.setState({
            backgroundColor: { backgroundColor: '#fff' },
            sendButton: true,
          });
          console.log('tem erro no yup', this.props.errors);
        } else {
          if (
            this.state.RelevantPublicFunction &&
            this.state.relevantPublicFunctionRelationship
          ) {
            console.log('completo');
            this.handleMutationComplete();
          } else {
            if (this.state.RelevantPublicFunction) {
              console.log('somente a um');
              this.handleMutationOne();
            } else {
              if (this.state.relevantPublicFunctionRelationship) {
                console.log('somente a dois');
                this.handleMutationTwo();
              } else {
                console.log('sei oque é isso nao');
                this.setState({
                  backgroundColor: { backgroundColor: '#fff' },
                  sendButton: true,
                });
              }
            }
          }
        }
      }
    );
  };

  _scrollToInput(reactNode) {
    console.log('OI');
  }

  focusInput(inputField) {
    this[inputField].focus();
  }

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

  errorInput = param => {
    const { sendButton } = this.state;
    let errorInputStyle = {
      borderColor:
        sendButton && this.props.errors[param] ? colors.warning : 'transparent',
    };
    return errorInputStyle;
  };

  render() {
    console.log(this.state);
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
          <Modal isVisible={this.state.visibleModal}>
            <View style={styles.mainContainer}>
              <View style={styles.viewTitle}>
                <Text style={styles.textTitle}>Leia e Confirme nossos</Text>
                <Text style={styles.textTitleSub}>Termos de PPE</Text>
              </View>
              <ScrollView style={styles.modalTexts}>
                <Text style={styles.infoText}>
                  1 - Declaro que, em atendimento ao disposto na Circular 3.461 
                  do Banco Central do Brasil, as informações acima prestadas são 
                  verídicas e de minha inteira responsabilidade.
                  2 - Fico ciente ainda que, eventuais alterações nas informações acima 
                  prestadas deverão ser por mim comunicadas, de imediato, a esta Administradora.
                  ficha de informações fiscais
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
          <Formik
            initialValues={{ razaoSocial: '' }}
            onSubmit={this.props.handleSubmit}
          >
            <View>
              <View style={styles.topbarValidationFields}>
                <View style={styles.logoContainer}>
                  <Image
                    source={require('../assets/i/logo.png')}
                    style={styles.logo}
                  />
                  <Text style={styles.title}>
                    PESSOA POLITICAMENTE
                    {'\n'}
                    EXPOSTA
                  </Text>
                  <Text style={styles.dividerHeader} />
                </View>
              </View>
              <View style={styles.dataValidationHeader}>
                <FormField
                  validateStatus={this.getValidateStatus('razaoSocial')}
                  error={this.getError('razaoSocial')}
                >
                  <Text style={styles.question}> NOME</Text>
                  <TextInput
                    ref={c => {
                      this.razaoSocial = c;
                    }}
                    returnKeyType="done"
                    value={this.state.razaoSocial}
                    onBlur={() => setFieldTouched('razaoSocial')}
                    maxLength={42}
                    style={[styles.itemInput]}
                    onChangeText={razaoSocial => {
                      this.onHandleInput(razaoSocial, 'razaoSocial');
                      setFieldValue('razaoSocial', razaoSocial);
                    }}
                  />
                </FormField>
                <FormField
                  validateStatus={this.getValidateStatus('cpfCnpj')}
                  error={this.getError('cpfCnpj')}
                >
                  <Text style={[styles.question]}>CPF/CNPJ</Text>
                  <TextInput
                    ref={c => {
                      this.cpfCnpj = c;
                    }}
                    returnKeyType="done"
                    value={this.state.cpfCnpj}
                    onBlur={() => {
                      setFieldTouched('cpfCnpj');
                    }}
                    selectTextOnFocus={false}
                    keyboardType="numeric"
                    style={[styles.itemInput]}
                    onChangeText={cpfCnpj => {
                      this.mask(cpfCnpj, 'cpfCnpj');
                      setFieldValue('cpfCnpj', cpfCnpj);
                      this.setState({ invalidCpfCnpj: false });
                    }}
                    maxLength={18}
                  />
                </FormField>
                {/* {this.state.invalidCpfCnpj &&
                  this.state.cpfCnpj.length > 0 &&
                  this.state.cpfCnpj.length > 14 && (
                    <CpfError invalidCnpj={this.state.invalidCpfCnpj} />
                  )} */}
                <Text style={[styles.question]}>
                  EXERCE OU EXERCEU NOS ÚLTIMOS CINCO ANOS, NO BRASIL OU EM
                  TERRITÓRIOS ESTRANGEIROS, ALGUM CARGO, EMPREGO OU FUNÇÃO
                  PÚBLICA RELEVANTE?
                </Text>
                <View style={[styles.itemInput, styles.checkBoxContainer]}>
                  <Text style={styles.question2}>
                    {this.state.RelevantPublicFunction ? 'SIM' : 'NÃO'}
                  </Text>
                  <Switch
                    backgroundActive={colors.primary}
                    backgroundInactive="#cecece"
                    onBlur={() => setFieldTouched('RelevantPublicFunction')}
                    circleBorderWidth={0}
                    value={this.state.RelevantPublicFunction}
                    onValueChange={RelevantPublicFunction => {
                      this.setState({
                        RelevantPublicFunction,
                      });
                      setFieldValue(
                        'RelevantPublicFunction',
                        RelevantPublicFunction
                      );
                    }}
                  />
                </View>
                {this.state.RelevantPublicFunction && (
                  <View>
                    <FormField
                      validateStatus={this.getValidateStatus('publicFunction')}
                      error={this.getError('publicFunction')}
                    >
                      <Text style={styles.question}> CARGO OU FUNÇÃO </Text>
                      <TextInput
                        ref={c => {
                          this.publicFunction = c;
                        }}
                        returnKeyType="done"
                        value={this.state.publicFunction}
                        onBlur={() => setFieldTouched('publicFunction')}
                        maxLength={32}
                        style={[
                          styles.itemInput,
                          this.errorInput('publicFunction'),
                        ]}
                        onChangeText={publicFunction => {
                          this.onHandleInput(publicFunction, 'publicFunction');
                          setFieldValue('publicFunction', publicFunction);
                        }}
                      />
                    </FormField>

                    <Text style={styles.question}> CÓDIGO DO CARGO </Text>
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
                        this.errorDropdown('publicFunctionCode'),
                      ]}
                      placeholder="Selecione"
                      onBlur={() => setFieldTouched('publicFunctionCode')}
                      placeholderStyle={{ color: colors.primary }}
                      placeholderIconColor={colors.primary}
                      selectedValue={this.state.publicFunctionCode}
                      onValueChange={publicFunctionCode => {
                        this.onHandleSelect(
                          publicFunctionCode,
                          'publicFunctionCode'
                        );
                        setFieldValue('publicFunctionCode', publicFunctionCode);
                      }}
                    >
                      {this.onHandleDropdown('publicFunctionCode')}
                    </Picker>
                    <FormField
                      validateStatus={this.getValidateStatus('startDate')}
                      error={this.getError('startDate')}
                    >
                      <Text style={styles.question}>
                        DATA DE INÍCIO DO EXERCÍCIO
                      </Text>
                      <TextInput
                        ref={c => {
                          this.startDate = c;
                        }}
                        returnKeyType="done"
                        value={this.state.startDate}
                        onBlur={() => setFieldTouched('startDate')}
                        maxLength={10}
                        keyboardType="number-pad"
                        style={[styles.itemInput, this.errorInput('startDate')]}
                        onChangeText={startDate => {
                          this.mask(startDate, 'startDate');
                          setFieldValue('startDate', startDate);
                        }}
                      />
                    </FormField>
                    <FormField
                      validateStatus={this.getValidateStatus('endDate')}
                      error={this.getError('endDate')}
                    >
                      <Text style={styles.question}>
                        DATA DE TÉRMINO DO EXERCÍCIO
                      </Text>
                      <TextInput
                        ref={c => {
                          this.endDate = c;
                        }}
                        returnKeyType="done"
                        value={this.state.endDate}
                        onBlur={() => setFieldTouched('endDate')}
                        maxLength={10}
                        keyboardType="number-pad"
                        style={[styles.itemInput, this.errorInput('endDate')]}
                        onChangeText={endDate => {
                          this.mask(endDate, 'endDate');
                          setFieldValue('endDate', endDate);
                        }}
                      />
                    </FormField>
                    <FormField
                      validateStatus={this.getValidateStatus(
                        'companyGovernment'
                      )}
                      error={this.getError('companyGovernment')}
                    >
                      <Text style={styles.question}>
                        {' '}
                        EMPRESA/ORGÃO PÚBLICO{' '}
                      </Text>
                      <TextInput
                        ref={c => {
                          this.companyGovernment = c;
                        }}
                        returnKeyType="done"
                        value={this.state.companyGovernment}
                        onBlur={() => setFieldTouched('companyGovernment')}
                        maxLength={32}
                        style={[
                          styles.itemInput,
                          this.errorInput('companyGovernment'),
                        ]}
                        onChangeText={companyGovernment => {
                          this.onHandleInput(
                            companyGovernment,
                            'companyGovernment'
                          );
                          setFieldValue('companyGovernment', companyGovernment);
                        }}
                      />
                    </FormField>
                    <FormField
                      validateStatus={this.getValidateStatus('cnpj')}
                      error={this.getError('cnpj')}
                    >
                      <Text style={[styles.question]}>CNPJ</Text>
                      <TextInput
                        ref={c => {
                          this.cnpj = c;
                        }}
                        returnKeyType="done"
                        value={this.state.cnpj}
                        selectTextOnFocus={false}
                        keyboardType="numeric"
                        style={[styles.itemInput, this.errorInput('cnpj')]}
                        onChangeText={cnpj => {
                          this.mask(cnpj, 'cnpj');
                          setFieldValue('cnpj', cnpj);
                          this.setState({ invalidCnpj: false });
                        }}
                        maxLength={18}
                      />
                    </FormField>
                    {/* {this.state.invalidCnpj && this.state.cnpj.length > 0 && (
                      <CpfError invalidCnpj={this.state.invalidCnpj} />
                    )} */}
                    <FormField
                      validateStatus={this.getValidateStatus('branch')}
                      error={this.getError('branch')}
                    />
                    <FormField
                      validateStatus={this.getValidateStatus('control')}
                      error={this.getError('control')}
                    />
                  </View>
                )}
                <Text style={[styles.question]}>
                  POSSUI RELACIONAMENTO/LIGAÇÃO COM PESSOAS POLITICAMENTE
                  EXPOSTAS?
                </Text>
                <View style={[styles.itemInput, styles.checkBoxContainer]}>
                  <Text style={styles.question2}>
                    {this.state.relevantPublicFunctionRelationship
                      ? 'SIM'
                      : 'NÃO'}
                  </Text>
                  <Switch
                    onBlur={() => setFieldTouched('RelevantPublicFunction')}
                    backgroundActive={colors.primary}
                    backgroundInactive="#cecece"
                    circleBorderWidth={0}
                    value={this.state.relevantPublicFunctionRelationship}
                    onValueChange={relevantPublicFunctionRelationship => {
                      this.setState({
                        relevantPublicFunctionRelationship,
                      });
                      setFieldValue(
                        'relevantPublicFunctionRelationship',
                        relevantPublicFunctionRelationship
                      );
                    }}
                  />
                </View>
                {this.state.relevantPublicFunctionRelationship && (
                  <View>
                    <FormField
                      validateStatus={this.getValidateStatus('relatedName')}
                      error={this.getError('relatedName')}
                    >
                      <Text style={styles.question}> NOME DO RELACIONADO </Text>
                      <TextInput
                        ref={c => {
                          this.relatedName = c;
                        }}
                        returnKeyType="done"
                        value={this.state.relatedName}
                        onBlur={() => setFieldTouched('relatedName')}
                        maxLength={32}
                        style={[
                          styles.itemInput,
                          this.errorInput('relatedName'),
                        ]}
                        onChangeText={relatedName => {
                          this.onHandleInput(relatedName, 'relatedName');
                          setFieldValue('relatedName', relatedName);
                        }}
                      />
                    </FormField>
                    <FormField
                      validateStatus={this.getValidateStatus('cpfRelated')}
                      error={this.getError('cpfRelated')}
                    >
                      <Text style={[styles.question]}>CPF</Text>
                      <TextInput
                        ref={c => {
                          this.cpfRelated = c;
                        }}
                        returnKeyType="done"
                        value={this.state.cpfRelated}
                        onBlur={() => setFieldTouched('cpfRelated')}
                        selectTextOnFocus={false}
                        keyboardType="numeric"
                        style={[
                          styles.itemInput,
                          this.errorInput('cpfRelated'),
                        ]}
                        onChangeText={cpfRelated => {
                          this.mask(cpfRelated, 'cpfRelated');
                          setFieldValue('cpfRelated', cpfRelated);
                        }}
                        maxLength={18}
                      />
                    </FormField>
                    <FormField
                      validateStatus={this.getValidateStatus('relatedControl')}
                      error={this.getError('relatedControl')}
                    />
                    <FormField
                      validateStatus={this.getValidateStatus('relatedFunction')}
                      error={this.getError('relatedFunction')}
                    >
                      <Text style={styles.question}> CARGO OU FUNÇÃO </Text>
                      <TextInput
                        ref={c => {
                          this.relatedFunction = c;
                        }}
                        returnKeyType="done"
                        // onSubmitEditing={() =>
                        //   this.focusInput('relatedRelationship')
                        // }
                        value={this.state.relatedFunction}
                        onBlur={() => setFieldTouched('relatedFunction')}
                        maxLength={32}
                        style={[
                          styles.itemInput,
                          this.errorInput('relatedFunction'),
                        ]}
                        onChangeText={relatedFunction => {
                          this.onHandleInput(
                            relatedFunction,
                            'relatedFunction'
                          );
                          setFieldValue('relatedFunction', relatedFunction);
                        }}
                      />
                    </FormField>
                    <FormField
                      validateStatus={this.getValidateStatus(
                        'relatedRelationship'
                      )}
                      error={this.getError('relatedRelationship')}
                    >
                      <Text style={styles.question}>
                        TIPO DE RELACIONAMENTO/LIGAÇÃO
                      </Text>
                      <TextInput
                        ref={c => {
                          this.relatedRelationship = c;
                        }}
                        returnKeyType="done"
                        value={this.state.relatedRelationship}
                        onBlur={() => setFieldTouched('relatedRelationship')}
                        maxLength={32}
                        style={[
                          styles.itemInput,
                          this.errorInput('relatedRelationship'),
                        ]}
                        onChangeText={relatedRelationship => {
                          this.onHandleInput(
                            relatedRelationship,
                            'relatedRelationship'
                          );
                          setFieldValue(
                            'relatedRelationship',
                            relatedRelationship
                          );
                        }}
                      />
                    </FormField>
                    <Text style={styles.question}>
                      CÓDIGO DO RELACIONAMENTO
                    </Text>
                    <Picker
                      mode="dropdown"
                      iosIcon={
                        <Icon
                          name="arrow-down"
                          style={{ color: colors.primary }}
                        />
                      }
                      onBlur={() => setFieldTouched('relatedRelationshipCode')}
                      style={[
                        styles.itemInput,
                        styles.pickerContainer,
                        this.errorDropdown('relatedRelationshipCode'),
                      ]}
                      placeholder="Selecione"
                      placeholderStyle={{ color: colors.primary }}
                      placeholderIconColor={colors.primary}
                      selectedValue={this.state.relatedRelationshipCode}
                      onValueChange={relatedRelationshipCode => {
                        this.setState({ relatedRelationshipCode });
                        setFieldValue(
                          'relatedRelationshipCode',
                          relatedRelationshipCode
                        );
                      }}
                    >
                      {this.onHandleDropdown('relatedRelationshipCode')}
                    </Picker>
                  </View>
                )}
              </View>
              <View style={styles.proceedButtonView}>
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
              </View>
            </View>
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

export default compose(
  withApollo,
  graphql(POLITICALLY_EXPOSED_PERSON, { name: 'politicallyExposed' }),
  graphql(LINK_WITH_PUBLIC_AGENT, { name: 'LinkWithPublicAgent' })
)(withNavigation(enhancer(DataValidationSwiper)));

const styles = StyleSheet.create({
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
    alignSelf: 'center',
  },
  proceedButtonText: {
    fontSize: moderateScale(18),
    color: '#fff',
    fontFamily: 'Rubik-Light',
  },
  proceedButtonView: {
    paddingTop: moderateScale(14),
    paddingBottom: moderateScale(24),
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
